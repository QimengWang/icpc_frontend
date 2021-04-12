<template>
  <div class="con">
    <div class="tableBox">
      <Divider>
        <h3>个人赛</h3>
      </Divider>
      <Table border :columns="columnsSingle" :data="dataSingle"></Table>
    </div>
    <div class="tableBox">
      <Divider>
        <h3>团体赛</h3>
      </Divider>
      <Table border :columns="columnsGroup" :data="dataGroup"></Table>
    </div>

<!--    修改赛事模态框-->
    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>修改报名信息</h4>
        </Divider>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <div>
            <FormItem label="赛事名称" prop="cname">
              <Input v-model="formValidate.cname" disabled></Input>
            </FormItem>
            <FormItem label="团队名称" prop="gname">
              <Input v-model="formValidate.gname"></Input>
            </FormItem>
            <FormItem label="教练" prop="tid">
              <Select v-model="formValidate.tid" filterable clearable>
                <Option v-for="(item, key) in tList" :key="key" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="小组成员" prop="members">
              <Input v-model="formValidate.members"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" style="width: 100%" @click="updateSignUp">确定</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        // table相关
        columnsSingle: [
          {
            title: '赛事名称',
            key: 'name'
          },
          {
            title: '操作',
            key: 'action',
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
                      this.detail(params.row.id)
                    }
                  }
                }, '赛事详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row.id)
                    }
                  }
                }, '取消报名')
              ]);
            }
          }
        ],
        dataSingle: [
          {
            name: '第19届上海大学程序设计联赛'
          }
        ],
        columnsGroup: [
          {
            title: '赛事名称',
            minWidth: 200,
            key: 'cname'
          },
          {
            title: '团队名称',
            minWidth: 180,
            key: 'gname'
          },
          {
            title: '教练',
            minWidth: 80,
            key: 'tname'
          },
          {
            title: '团队成员',
            minWidth: 200,
            key: 'members'
          },
          {
            title: '操作',
            fixed: 'right',
            width: 250,
            key: 'action',
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
                      this.detail(params.row.cid)
                    }
                  }
                }, '赛事详情'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row.cid)
                    }
                  }
                }, '取消报名')
              ]);
            }
          }
        ],
        dataGroup: [
          {
            cname: '第20届信息能力检索大赛',
            gname: 'test队',
            tname: '沈俊',
            tid: '001',
            members: ''
          }
        ],
        // 教师列表
        tList: [
          {
            id: '001',
            name: '沈俊'
          }
        ],
        // 修改报名信息相关数据
        modal: false,
        formValidate: {
          cname: '',
          gname: '',
          tid: '',
          members: ''
        },
        ruleValidate: {
          tid: [
            { required: true, message: '请选择教练', trigger: 'change' }
          ],
          gname: [
            { required: true, message: '团队名称不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      // 查看赛事详情
      detail(id) {

      },
      // 取消报名
      cancel(id) {
        this.$Message.success('取消报名成功！');
      },
      // 修改报名信息（团体赛）
      update(data) {
        this.formValidate = data;
        this.modal = true;
      },
      updateSignUp() {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            this.$Message.success('修改成功！');
            this.modal = false;
          } else {
            this.$Message.error('请完善必填字段!');
          }
        });
      }
    },
    mounted() {

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
  .tableBox {
    width: 100%;
  }
  .formBox {
    margin: 30px;
  }
</style>
