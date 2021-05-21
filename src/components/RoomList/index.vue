<template>
  <div class="con">
    <!--    考场列表-->
    <div class="tableBox">
      <Table
        border
        :columns="columns"
        :data="data"
        @on-select="handleSelect"
        @on-select-all="handleSelect"
        @on-select-cancel="handleSelect"
        @on-select-all-cancel="handleSelect"
      ></Table>
    </div>

    <div class="btnBox">
      <Button type="primary" icon="ios-add-circle-outline" @click="addRoomModal">新增</Button>
      <Button type="error" icon="ios-trash-outline" @click="deleteRoom">删除</Button>
    </div>

    <!--    新增考场-->
    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>{{modalTitle}}</h4>
        </Divider>
        <Form ref="formValidate" :model="roomInfo" :rules="ruleValidate" :label-width="100" label-colon>
          <FormItem label="名称" prop="name">
            <Input v-model="roomInfo.name" placeholder="例：D211"></Input>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="roomInfo.address" placeholder="例：宝山校区校本部"></Input>
          </FormItem>
          <FormItem label="可容纳人数" prop="number">
            <Input v-model="roomInfo.number" placeholder="请输入考场可容纳人数"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" style="width: 100%" @click="addRoom">确认</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getRooms, addRoom, updateRoom, deleteRoom} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          // {
          //   title: '序号',
          //   type: 'index',
          //   width: 70,
          //   align: 'center'
          // },
          {
            title: '考场名称',
            key: 'name'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '可容纳人数',
            key: 'number'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              if(params.row.status === '1') {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'orange'
                    }
                  }, '已使用')
                ])
              } else {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'green'
                    }
                  }, '未使用')
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
                    color: '#2d85e4',
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
                    color: '#2d85e4'
                  },
                  on: {
                    click: () => {
                      if(params.row.status == 1) {
                        this.$Message.error("该考场正在使用，无法删除！");
                      } else {
                        this.deleteRoom(params.row.rid);
                      }
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
        // 新增考场的验证规则
        ruleValidate: {
          name: [
            { required: true, message: '考场名称不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '考场地址不能为空', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '可容纳人数不能为空', trigger: 'blur' }
          ]
        },
        // 新增学校的表单
        roomInfo: {
          name: '',
          address: '',
          number: ''
        },
        selection: []
      }
    },
    methods: {
      // 多选
      handleSelect(selection) {
        this.selection = selection;
      },
      // 获取考场列表
      getRoomList() {
        getRooms().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
          }
        }).catch(err => {
          // console.log(err);
          // this.$Message.error("出错啦！");
        })
      },
      // 新增考场Modal
      addRoomModal() {
        this.modalTitle = '新增考场';
        this.modal = true;
      },
      // 修改考场Modal
      update(data) {
        // 浅拷贝：避免重置表单时影响原table中数据
        this.roomInfo = {...data};
        // 必须进行number->string的转化，否则表单验证会出错
        this.roomInfo.number = String(data.number);
        // console.log(this.roomInfo)
        this.modalTitle = '修改考场';
        this.modal = true;
      },
      // 新增&修改考场
      addRoom() {
        console.log(this.roomInfo);
        this.$refs['formValidate'].validate(valid => {
          if(valid) {
            if(this.modalTitle === "新增考场") {
              addRoom(this.roomInfo).then(res => {
                const data = res.data;
                if(data.code === 0) {
                  this.$Message.success(data.data.message);
                  this.modal = false;
                  this.getRoomList();
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
              updateRoom(this.roomInfo).then(res => {
                const data = res.data;
                if(data.code === 0) {
                  this.$Message.success(data.data.message);
                  this.modal = false;
                  this.getRoomList();
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
      // 删除考场
      deleteRoom(id) {
        let arr = [];
        let flag = 1;
        if(typeof id !== 'number') {
          // 多选
          if(this.selection.length === 0) {
            flag = 0;
            this.$Message.warning('请选择要删除的考场！');
          } else {
            //处理数据
            for(let item of this.selection) {
              if(item.status === '1') {
                this.$Message.error("该考场正在使用，无法删除！");
                flag = 0;
                break;
              } else {
                arr.push(item.rid);
              }
            }
          }
        } else {
          arr.push(id);
        }
        // 删除
        if(flag === 1) {
          deleteRoom(arr).then(res => {
            const data = res.data;
            // console.log(data);
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.selection = [];
              this.getRoomList();
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
      this.getRoomList();
    },
    // watch: {
    //   modal(val) {
    //     if(val === false) {
    //       // 重置表单
    //       this.$refs['formValidate'].resetFields();
    //     }
    //   }
    // }
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
  .btnBox {
    margin-top: 10px;
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

