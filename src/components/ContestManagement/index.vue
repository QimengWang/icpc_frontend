<template>
    <div class="con">

<!--      查询行-->
      <div class="father">
        <div class="son">
          <Input v-model="search.contestName" placeholder="赛事名称" />
          <Select v-model="search.type" placeholder="类型">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="search.state" placeholder="状态">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Button type="success" icon="ios-search-outline" @click="searchContest">查询</Button>
        <Button type="primary" icon="ios-add-circle-outline" @click="addContest">新建</Button>
        <Button type="error" icon="ios-trash-outline" @click="deleteContest">删除</Button>
      </div>

<!--      赛事列表-->
      <div class="tableBox">
        <Table border :columns="columns" :data="data" @on-select="handleSelect"></Table>
      </div>

<!--      新建/修改赛事-->
      <Modal
        v-model="modal"
        footer-hide>
        <div class="formBox">
          <Divider>
            <h4>{{modalTitle}}</h4>
          </Divider>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" :disabled="isDisabled">
            <FormItem label="赛事名称" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入赛事名称"></Input>
            </FormItem>
            <FormItem label="类型" prop="type">
              <RadioGroup v-model="formValidate.type">
                <Radio label="single">个人赛</Radio>
                <Radio label="group">团体赛</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem v-show="formValidate.type === 'group'" label="人数限制">
              <div style="display: flex">
                <Select v-model="formValidate.isEqual">
                  <Option value="yes">等于</Option>
                  <Option value="no">小于等于</Option>
                </Select>
                <Input v-model="formValidate.limit" placeholder="人数限制"></Input>
              </div>
            </FormItem>
            <FormItem label="报名时间">
              <Row>
                <Col span="11">
                  <FormItem prop="date">
                    <DatePicker type="date" placeholder="开始日期" v-model="formValidate.startApp"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                  <FormItem prop="date">
                    <DatePicker type="date" placeholder="结束日期" v-model="formValidate.endApp"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="举办时间">
              <Row>
                <Col span="11">
                  <FormItem prop="date">
                    <DatePicker type="date" placeholder="开始日期" v-model="formValidate.startHold"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                  <FormItem prop="date">
                    <DatePicker type="date" placeholder="结束日期" v-model="formValidate.endHold"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="比赛规则" prop="rules">
              <Input v-model="formValidate.rules" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="奖励说明" prop="rewards">
              <Input v-model="formValidate.rewards" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="备注" prop="remark">
              <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem v-show="modalTitle === '新建赛事'">
              <Button type="success" @click="confirmAdd">确认新建</Button>
              <Button type="primary" @click="saveContest">存为草稿</Button>
              <Button type="warning" @click="handleReset('formValidate')">重置表单</Button>
            </FormItem>
            <FormItem v-show="modalTitle === '修改赛事'">
              <Button type="primary" style="width: 100%" @click="updateContest">确认修改</Button>
            </FormItem>
            <FormItem label="发布赛事" v-show="modalTitle==='修改赛事' && formValidate.publish==='no'">
              <i-switch v-model="formValidate.publish" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        modal: false,
        modalTitle: '修改赛事',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '赛事名称',
            minWidth: 150,
            key: 'contestName'
          },
          {
            title: '类型',
            minWidth: 50,
            key: 'type'
          },
          {
            title: '报名时间',
            minWidth: 100,
            key: 'applicationPeriod'
          },
          {
            title: '举办时间',
            minWidth: 100,
            key: 'holdingTime'
          },
          {
            title: '举办地点',
            minWidth: 100,
            key: 'address'
          },
          {
            title: '状态',
            minWidth: 50,
            key: 'state'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.detail(params.index)
                    }
              }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.update(params.index)
                    }
                  }
                }, '编辑')
              ]);
            }
          }
        ],
        data: [
          {
            contestName: '第27届信息能力检索大赛',
            type: '个人赛',
            applicationPeriod: '2021.3.31-2021.4.15',
            holdingTime: '2021.4.24-2021.4.25',
            address: '宝山校区校内D楼405',
            state: '已上线'
          }
        ],
        search: {
          state: '',
          type: '',
          contestName: ''
        },
        stateList: [
          {
            label: '未上线',
            value: 'ready'
          },
          {
            label: '已发布',
            value: 'published'
          },
          {
            label: '已结束',
            value: 'finished'
          }
        ],
        typeList: [
          {
            label: '个人赛',
            value: 'single'
          },
          {
            label: '团体赛',
            value: 'group'
          }
        ],
        formValidate: {
          name: '',
          type: '',
          isEqual: '',
          limit: '',
          startHold: '',
          endHold: '',
          startApp: '',
          endApp: '',
          rules: '',
          rewards: '',
          remark: '',
          publish: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          type: [
            { required: true, message: 'Please select the city', trigger: 'change' }
          ]
        },
        selection: []
      }
    },
    computed: {
      isDisabled() {
        return this.modalTitle === '赛事详情';
      }
    },
    methods: {
      // 查询赛事
      searchContest() {
        this.$Message.success('查询成功！');
      },
      // 多选
      handleSelect(selection) {
        this.selection = selection;
        // console.log(selection);
      },
      // 查看赛事详情
      detail() {
        this.modalTitle = '赛事详情';
        this.modal = true;
      },
      // 打开修改赛事的modal
      update (index) {
        this.modalTitle = '修改赛事';
        this.modal = true;
      },
      // 修改赛事
      updateContest() {
        this.$Message.success('编辑赛事成功！');
        this.modal = false;
      },
      // 打开新建赛事的modal
      addContest() {
        this.modalTitle = '新建赛事';
        this.modal = true;
      },
      // 新建赛事
      confirmAdd() {
        this.formValidate.publish = 'yes';
        this.$Message.success('新建赛事成功！');
        this.modal = false;
      },
      // 暂存草稿
      saveContest() {
        this.formValidate.publish = 'no';
        this.$Message.success('存为草稿成功！');
        this.modal = false;
      },
      // 删除赛事
      deleteContest() {
        if(this.selection.length === 0) {
          this.$Message.warning('请选择要删除的赛事！');
        } else {
          this.$Message.success('删除成功！');
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      // 重置表单：
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped>
  .con {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  .father {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }
  .son {
    display: flex;
    width: 70%;
    justify-content: space-around;
  }
  .son>* {
    margin-right: 5px;
    width: 50%;
  }
  .tableBox {
    width: 100%;
  }
  .father>Button {
    width: 10%;
  }
  Button {
    margin-right: 5px;
  }
  .formBox {
    margin: 30px;
  }
</style>
