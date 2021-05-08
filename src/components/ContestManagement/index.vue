<template>
    <div class="con">

<!--      查询行-->
      <div class="father">
        <div class="son">
          <Input v-model="search.contestName" placeholder="赛事名称" clearable/>
          <Select v-model="search.type" placeholder="类型" clearable>
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="search.state" placeholder="状态" clearable>
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Button type="success" icon="ios-search-outline" @click="searchContest">查询</Button>
        <Button type="primary" icon="ios-add-circle-outline" @click="addContestModal">新建</Button>
        <Button type="error" icon="ios-trash-outline" @click="deleteContest">删除</Button>
      </div>

<!--      赛事列表-->
      <div class="tableBox">
        <Table border :columns="columns" :data="data" @on-select="handleSelect"></Table>
      </div>

<!--      新建/修改赛事-->
      <Modal
        v-model="modal"
        footer-hide
        :styles="{width: '800px'}">
<!--        fullscreen>-->
        <div class="formBox">
          <Divider>
            <h4>{{modalTitle}}</h4>
          </Divider>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" :disabled="isDisabled" label-colon>
            <div style="width: 65%">
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
                <Row>
                  <Col span="12">
                    <Select v-model="formValidate.isEqual">
                      <Option value="yes">等于</Option>
                      <Option value="no">小于等于</Option>
                    </Select>
                  </Col>
                  <Col span="12">
                    <Input v-model="formValidate.limit" placeholder="人数限制"></Input>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="报名时间">
                <Row>
                  <Col span="11">
                    <FormItem prop="startApp">
                      <DatePicker type="date" placeholder="开始日期" v-model="formValidate.startApp"></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                    <FormItem prop="endApp">
                      <DatePicker type="date" placeholder="结束日期" v-model="formValidate.endApp"></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="举办时间">
                <Row>
                  <Col span="11">
                    <FormItem prop="startHold">
                      <DatePicker
                        type="date"
                        placeholder="开始日期"
                        v-model="formValidate.startHold"
                        placement="top"></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                    <FormItem prop="endHold">
                      <DatePicker
                        type="date"
                        placeholder="结束日期"
                        v-model="formValidate.endHold"
                        placement="top"></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
            </div>
            <FormItem label="简介" prop="remark">
              <Input v-model="formValidate.remark" placeholder="请输入赛事简介..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="比赛规则" prop="rules">
<!--              <div v-show="isDisabled" style="padding-left: 20px">-->
<!--                <div v-html="formValidate.rules"></div>-->
<!--              </div>-->
<!--              <div v-show="!isDisabled">-->
                <div id="editor1"></div>
<!--              </div>-->
            </FormItem>
            <FormItem label="奖励说明" prop="rewards">
<!--              <div v-show="isDisabled" style="padding-left: 20px">-->
<!--                <div v-html="formValidate.rewards"></div>-->
<!--              </div>-->
<!--              <div v-show="!isDisabled">-->
                <div id="editor2"></div>
<!--              </div>-->
            </FormItem>
            <FormItem v-show="modalTitle === '新建赛事'">
              <Button type="success" @click="saveContest('yes')">确认新建</Button>
              <Button type="primary" @click="saveContest('no')">存为草稿</Button>
              <Button type="warning" @click="handleReset('formValidate')">重置表单</Button>
            </FormItem>
            <FormItem label="发布赛事" v-show="modalTitle!=='新建赛事'">
              <i-switch size="large" true-value="yes" false-value="no" v-model="formValidate.publish">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem v-show="modalTitle === '修改赛事'">
              <Button type="primary" style="width: 100%" @click="updateContest">确认</Button>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
</template>

<script>
  import {getContestList, addContest, deleteContest, showContestDetail, updateContest} from "../../api/api";
  import E from "wangeditor"
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
            minWidth: 280,
            key: 'name'
          },
          {
            title: '类型',
            minWidth: 100,
            key: 'type'
          },
          {
            title: '状态',
            minWidth: 100,
            key: 'state'
          },
          {
            title: '报名开始时间',
            minWidth: 150,
            key: 'startApp'
          },
          {
            title: '报名结束时间',
            minWidth: 150,
            key: 'endApp'
          },
          {
            title: '比赛开始时间',
            minWidth: 150,
            key: 'startHold'
          },
          {
            title: '比赛结束时间',
            minWidth: 150,
            key: 'endHold'
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
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#2d8cf0'
                  },
                  on: {
                    click: () => {
                      this.detail(params.row.cid)
                    }
              }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#2d8cf0'
                  },
                  on: {
                    click: () => {
                      this.update(params.row.cid)
                    }
                  }
                }, '编辑')
              ]);
            }
          }
        ],
        data: [],
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
            { required: true, message: '赛事名称不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择比赛类型', trigger: 'change' }
          ],
          startApp: [
            { required: true, type: 'date', message: '请选择报名开始时间', trigger: 'change' }
          ],
          endApp: [
            { required: true, type: 'date', message: '请选择报名结束时间', trigger: 'change' }
          ],
          startHold: [
            { required: true, type: 'date', message: '请选择比赛开始时间', trigger: 'change' }
          ],
          endHold: [
            { required: true, type: 'date', message: '请选择比赛结束时间', trigger: 'change' }
          ],
          rules: [
            { required: true, message: '比赛规则不能为空', trigger: 'blur' }
          ],
          rewards: [
            { required: true, message: '奖励说明不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '赛事简介不能为空', trigger: 'blur' }
          ]
        },
        selection: [],
        editorRule: null,
        editorRewards: null
      }
    },
    computed: {
      isDisabled() {
        return this.modalTitle === '赛事详情';
      }
    },
    methods: {
      // 获取赛事列表
      getContest() {
        getContestList().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
          }
        }).catch(err => {
          // console.log(err);
        })
      },
      // 查询赛事
      searchContest() {
        getContestList(this.search).then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
            this.$Message.success('查询成功！');
          } else {
            this.$Message.warning('查询成功，无结果！');
            this.data = [];
          }
        }).catch(err => {
          // console.log(err);
        });
      },
      // 多选
      handleSelect(selection) {
        this.selection = selection;
      },
      // 获取赛事详情
      getDetail(id) {
        let params = {id: id};
        showContestDetail(params).then(res => {
          const data = res.data;
          this.formValidate = data.data;
          if(this.formValidate.type === '团队赛') {
            this.formValidate.type = 'group';
          } else {
            this.formValidate.type = 'single';
          }
          if(this.formValidate.state === '已发布') {
            this.formValidate.publish = 'yes';
          } else {
            this.formValidate.publish = 'no';
          }
          this.formValidate.id = id;
          this.editorRule.txt.html(this.formValidate.rules);
          this.editorRewards.txt.html(this.formValidate.rewards);
        });
      },
      // 查看赛事详情
      detail(id) {
        // console.log(id);
        this.getDetail(id);
        this.editorRule.disable();
        this.editorRewards.disable();
        this.modalTitle = '赛事详情';
        this.modal = true;
      },
      // 打开修改赛事的modal
      update (id) {
        // 先获取赛事详情
        this.getDetail(id);
        this.editorRule.enable();
        this.editorRewards.enable();
        this.modalTitle = '修改赛事';
        this.modal = true;
      },
      // 修改赛事
      updateContest() {
        // console.log(this.formValidate);
        this.$refs['formValidate'].validate(valid => {
          if(valid) {
            updateContest(this.formValidate).then(res => {
              const data = res.data;
              if(data.code === 0) {
                this.$Message.success(data.data.message);
                this.getContest();
                this.modal = false;
              } else {
                this.$Message.error(data.data.message);
              }
            }).catch(err => {
              // this.$Message.error(err);
            });
          } else {
            this.$Message.error('请填写必填项！');
          }
        });
      },
      // 打开新建赛事的modal
      addContestModal() {
        this.editorRule.enable();
        this.editorRewards.enable();
        this.modalTitle = '新建赛事';
        this.modal = true;
      },
      // 新建赛事&暂存草稿
      saveContest(isPublish) {
        this.$refs['formValidate'].validate(valid => {
          if(valid) {
            this.formValidate.publish = isPublish;
            addContest(this.formValidate).then(res => {
              const data = res.data;
              // console.log(data);
              if(data.code === 0 || data.code === 1) {
                this.$Message.success(data.data.message);
                // 重置表单
                this.editorRule.txt.clear();
                this.editorRewards.txt.clear();
                this.$refs['formValidate'].resetFields();
                this.modal = false;
                this.getContest();
              } else {
                this.$Message.error(data.data.message);
              }
            }).catch(err => {
              // console.log(err);
            });
          } else {
            this.$Message.error("请填写必填项！");
          }
        });
      },
      // 删除赛事
      deleteContest() {
        if(this.selection.length === 0) {
          this.$Message.warning('请选择要删除的赛事！');
        } else {
          //处理数据
          let arr = [];
          for(let item of this.selection) {
            arr.push(item.cid);
          }
          deleteContest(arr).then(res => {
            const data = res.data;
            // console.log(data);
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.selection = [];
              this.getContest();
            }
          }).catch(err => {
            // console.log(err);
          });
        }
      },
      // 重置表单：
      handleReset () {
        this.$refs['formValidate'].resetFields();
      },
      // 设置富文本编辑器
      setEditors() {
        this.createEditor('#editor1');
        this.createEditor('#editor2');
      },
      createEditor(id){
        // 创建富文本编辑器
        const editor = new E(id);
        // 配置高度
        editor.config.height = 200;
        // 配置菜单
        editor.config.menus = [
          'fontSize',
          'foreColor',
          'bold',
          'head',
          'italic',
          'underline',
          'list',
          // 'image',
          'undo',
          'redo'
        ];
        // 配置 server 接口地址
        editor.config.uploadImgServer = '/upload-img';
        editor.config.onchange = (html) =>{
          if(id === '#editor1') {
            // this.editorRule = editor;
            this.formValidate.rules = html;
          } else {
            // this.editorRewards = editor;
            this.formValidate.rewards = html;
          }
        };
        editor.create();
        if(id === '#editor1') {
          this.editorRule = editor;
          // this.formValidate.rules = html;
        } else {
          this.editorRewards = editor;
          // this.formValidate.rewards = html;
        }
      }
    },
    mounted() {
      this.getContest();
      this.setEditors();
    },
    watch: {
      modal(){
        if(this.modal === false) {
          // 重置表单
          this.$refs['formValidate'].resetFields();
          this.editorRule.txt.clear();
          this.editorRewards.txt.clear();
        }
      }
    }
  }
</script>

<style scoped>
  .con {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .father {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }
  .son {
    display: flex;
    flex-grow: 1;
  }
  .son>* {
    margin-right: 5px;
  }
  .tableBox {
    width: 100%;
  }
  Button {
    margin-right: 5px;
  }
  .formBox {
    margin: 30px;
  }
</style>
