<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Input v-model="schoolName"
             placeholder="学校名称"
             clearable
             search
             style="width: 200px; margin-right: 5px"
             @on-enter="searchSchool"
      />
      <!--      <Button type="default" icon="ios-search-outline" @click="searchSchool">查询</Button>-->
      <Button type="primary" icon="ios-add-circle-outline" @click="addSchoolModal">新建</Button>
      <Button type="warning" icon="ios-trash-outline" @click="deleteSchool">删除</Button>
    </div>

<!--    学校列表-->
    <div class="tableBox">
      <Table border
             :columns="columns"
             :data="data"
             @on-select="handleSelect"
             @on-select-all="handleSelect"
      ></Table>
    </div>

    <div class="btnBox">
      <Button type="success" icon="ios-checkmark-circle-outline" @click="pass">通过</Button>
      <Button type="error" icon="ios-close-circle-outline" @click="notPass">不通过</Button>
    </div>

    <!--    新增学校-->
    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>{{modalTitle}}</h4>
        </Divider>
        <Form ref="formValidate" :model="schoolInfo" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称" prop="name">
            <Input v-model="schoolInfo.name" :disabled="schoolInfo.status === '1'"></Input>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="schoolInfo.address"></Input>
          </FormItem>
<!--          <FormItem label="负责人" prop="tid" v-if="modalTitle==='修改学校'">-->
<!--            <Select v-model="schoolInfo.tid" filterable clearable placeholder="请选择负责人">-->
<!--              <Option v-for="(item, key) in tList" :key="key" :value="item.id">{{item.name}}</Option>-->
<!--            </Select>-->
<!--&lt;!&ndash;            <Input v-model="schoolInfo.charge" v-else></Input>&ndash;&gt;-->
<!--          </FormItem>-->
          <FormItem>
            <Button type="primary" style="width: 100%" @click="addSchool">确认</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getSchools, updateSchool, addSchool, deleteSchool, getTeachersBySid,
    schoolChecked, schoolUnchecked} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        schoolName: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '学校名称',
            key: 'name'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '审核状态',
            width: 120,
            key: 'status',
            render: (h, params) => {
              if(params.row.status === '0') {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'orange'
                    }
                  }, '待审核')
                ])
              } else if(params.row.status === '1') {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'green'
                    }
                  }, '已通过')
                ])
              } else {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'orange'
                    }
                  }, '未通过')
                ])
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#2d8cf0',
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.row)
                    }
                  }
                }, '编辑'),
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
                      this.deleteSchool(params.row.id)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [{}],
        modal: false,
        modalTitle: '',
        // 新增学校的验证规则
        ruleValidate: {
          name: [
            { required: true, message: '学校名称不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '学校地址不能为空', trigger: 'blur' }
          ],
          // tid: [
          //   { required: true, message: '学校负责人不能为空' }
          // ]
        },
        // 新增学校的表单
        schoolInfo: {
          name: '',
          address: '',
          // tid: ''
        },
        selection: [],
        // 学校id
        // sid: '',
        // tList: []
      }
    },
    methods: {
      // 多选
      handleSelect(selection) {
        // console.log(selection);
        this.selection = selection;
      },
      // 获取某个学校的所有教练员列表
      // getTeachersBySid() {
      //   // console.log(this.sid);
      //   getTeachersBySid(this.sid).then(res => {
      //     const data = res.data;
      //     if(data.code === 0) {
      //       this.tList = data.data;
      //     } else {
      //       this.$Message.error(data.data.message);
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //     this.$Message.error("出错啦！");
      //   });
      // },
      // 获取学校列表
      getSchoolList() {
        getSchools().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
          }
        }).catch(err => {
          // console.log(err);
          // this.$Message.error("出错啦！");
        })
      },
      // 查询学校
      searchSchool() {
        getSchools({name: this.schoolName}).then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
            this.$Message.success('查询成功！');
          }
        }).catch(err => {
          // console.log(err);
          // this.$Message.error("出错啦！");
        })
      },
      // 新增学校Modal
      addSchoolModal() {
        this.modalTitle = '新增学校';
        this.modal = true;
      },
      // 修改学校Modal
      update(data) {
        // 浅拷贝：避免重置表单时影响原table中数据
        // console.log(data);
        this.schoolInfo = {...data};
        // this.sid = data.id;
        // this.getTeachersBySid();
        this.modalTitle = '修改学校';
        this.modal = true;
      },
      // 新增&修改学校
      addSchool() {
        // console.log(this.schoolInfo);
        this.$refs['formValidate'].validate(valid => {
          if(valid) {
            if(this.modalTitle === "新增学校") {
              addSchool(this.schoolInfo).then(res => {
                const data = res.data;
                if(data.code === 0) {
                  this.$Message.success(data.data.message);
                  this.modal = false;
                  this.getSchoolList();
                  // 重置表单
                  this.$refs['formValidate'].resetFields();
                } else {
                  this.$Message.error(data.data.message);
                }
              }).catch(err => {
                // console.log(err);
                // this.$Message.error("出错啦！");
              })
            } else {
              updateSchool(this.schoolInfo).then(res => {
                const data = res.data;
                if(data.code === 0) {
                  this.$Message.success(data.data.message);
                  this.modal = false;
                  this.getSchoolList();
                  // 重置表单
                  this.$refs['formValidate'].resetFields();
                } else {
                  this.$Message.error(data.data.message);
                }
              }).catch(err => {
                // console.log(err);
                // this.$Message.error("出错啦！");
              })
            }
          } else {
            this.$Message.error('请填写必填项！');
          }
        });
      },
      // 删除学校
      deleteSchool(id) {
        let arr = [];
        let flag = 1;
        if(typeof id !== 'number') {
          // 多选
          if(this.selection.length === 0) {
            flag = 0;
            this.$Message.warning('请选择要删除的学校！');
          } else {
            //处理数据
            for(let item of this.selection) {
              arr.push(item.id);
            }
          }
        } else {
          arr.push(id);
        }
        // 删除
        if(flag === 1) {
          deleteSchool(arr).then(res => {
            const data = res.data;
            // console.log(data);
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.selection = [];
              this.getSchoolList();
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          });
        }
      },
      // 审核通过
      pass(id) {
        let flag = 1;
        let arr = [];
        if(typeof id !== 'number') {
          // 多选
          if(this.selection.length === 0) {
            flag = 0;
            this.$Message.warning('请选择要审核的学校！');
          } else {
            //处理数据
            for (let item of this.selection) {
              arr.push(item.id);
            }
          }
        } else {
          // 单选
          arr.push(id);
        }
        if(flag) {
          // console.log(arr);
          schoolChecked(arr).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.getSchoolList();
              this.selection = [];
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          });
        }
      },
      // 审核不通过
      notPass(id) {
        let flag = 1;
        let arr = [];
        if(typeof id !== 'number') {
          // 多选
          if(this.selection.length === 0) {
            flag = 0;
            this.$Message.warning('请选择要审核的学校！');
          } else {
            //处理数据
            for (let item of this.selection) {
              arr.push(item.id);
            }
          }
        } else {
          // 单选
          arr.push(id);
        }
        // console.log(arr);
        if(flag) {
          schoolUnchecked(arr).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.getSchoolList();
              this.selection = [];
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          });
        }
      }
    },
    mounted() {
      this.getSchoolList();
    },
    watch: {
      modal(val) {
        if(val === false) {
          // 重置表单
          this.$refs['formValidate'].resetFields();
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
    align-items: flex-start;
  }
  .tableBox {
    width: 100%;
  }
  .father {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
  }
  Button {
    margin-right: 5px;
  }
  .formBox {
     width: 100%;
     padding: 4% 8%;
   }
  .btnBox {
    margin-top: 10px;
  }
</style>
