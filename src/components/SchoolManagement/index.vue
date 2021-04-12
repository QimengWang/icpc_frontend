<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Input v-model="schoolName" placeholder="学校名称" clearable style="width: 200px; margin-right: 5px"/>
      <Button type="success" icon="ios-search-outline" @click="searchSchool">查询</Button>
      <Button type="primary" icon="ios-add-circle-outline" @click="addSchoolModal">新建</Button>
      <Button type="error" icon="ios-trash-outline" @click="deleteSchool">删除</Button>
    </div>

<!--    学校列表-->
    <div class="tableBox">
      <Table border :columns="columns" :data="data" @on-select="handleSelect"></Table>
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
            <Input v-model="schoolInfo.name"></Input>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="schoolInfo.address"></Input>
          </FormItem>
          <FormItem label="负责人" prop="charge">
            <Input v-model="schoolInfo.charge"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" style="width: 100%" @click="addSchool">确认</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getSchools, updateSchool, addSchool, deleteSchool} from "../../api/api";

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
            minWidth: 200,
            key: 'name'
          },
          {
            title: '地址',
            minWidth: 200,
            key: 'address'
          },
          {
            title: '负责人',
            minWidth: 100,
            key: 'charge'
          },
          {
            title: '操作',
            key: 'action',
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
                      this.update(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
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
        data: [],
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
          charge: [
            { required: true, message: '学校负责人不能为空', trigger: 'blur' }
          ]
        },
        // 新增学校的表单
        schoolInfo: {
          name: '',
          address: '',
          charge: ''
        },
        selection: []
      }
    },
    methods: {
      // 多选
      handleSelect(selection) {
        this.selection = selection;
      },
      // 获取学校列表
      getSchoolList() {
        getSchools().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
          }
        }).catch(err => {
          this.$Message.error(err);
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
          this.$Message.error(err);
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
        this.schoolInfo = {...data};
        this.modalTitle = '修改学校';
        this.modal = true;
      },
      // 新增&修改学校
      addSchool() {
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
                this.$Message.error(err);
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
                this.$Message.error(err);
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
            this.$Message.warning('请选择要删除的赛事！');
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
              this.getSchoolList();
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            console.log(err);
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
</style>
