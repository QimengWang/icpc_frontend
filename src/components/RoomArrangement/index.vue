<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Select v-model="id" filterable clearable placeholder="请选择竞赛名称" style="width: 280px">
        <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>
      </Select>
      <Button type="success" icon="ios-search-outline" @click="search">查询</Button>
    </div>

    <!--    考场安排列表-->
    <div class="tableBox">
      <Table border :columns="columns" :data="data" @on-select="handleSelect"></Table>
    </div>

    <div class="btnBox">
      <Button type="primary" icon="ios-add-circle-outline" @click="openAddModal">新增</Button>
      <Button type="error" icon="ios-trash-outline" @click="deleteArrange">删除</Button>
    </div>

<!--    新增考场安排-->
    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>{{modalTitle}}</h4>
        </Divider>
        <Form ref="formValidate" :model="arrInfo" :rules="ruleValidate" :label-width="80" label-colon>
          <FormItem label="竞赛" prop="cid">
            <Select v-model="arrInfo.cid" filterable clearable placeholder="请选择竞赛名称" @on-change="getTotal">
              <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>
            </Select>
          </FormItem>
          <div v-show="arrInfo.cid">
            <FormItem label="总人数">
              <Input v-model="total" disabled></Input>
            </FormItem>

<!--            <div  v-for="(itm, idx) in arrInfo.items" :key="idx">-->
<!--              <FormItem label="考场名">-->
<!--                <Select v-model="itm.rid" filterable clearable placeholder="请选择考场名称">-->
<!--                  <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>-->
<!--                </Select>-->
<!--              </FormItem>-->
<!--              <FormItem label="人数">-->
<!--                <Input v-model="itm.num" placeholder="请输入实际考场安排人数"></Input>-->
<!--              </FormItem>-->
<!--              <FormItem>-->
<!--                <Button>Delete</Button>-->
<!--              </FormItem>-->
<!--            </div>-->
            <FormItem
              v-for="(itm, idx) in arrInfo.items"
              :key="idx"
              :label="'考场' + itm.idx"
            >
              <Row span="24">
                <Col span="10">
                  <Select v-model="itm.rid" filterable clearable placeholder="考场名称">
                    <Option v-for="(item, key) in roomList" :key="key" :value="item.rid">{{item.rid + '/' + item.number}}</Option>
                  </Select>
                </Col>
                <Col span="10">
                  <Input v-model="itm.num" placeholder="实际安排人数"></Input>
                </Col>
                <Col span="2">
                  <Button icon="md-remove" @click="handleRemove"></Button>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Button type="dashed" style="width: 100%" icon="md-add" @click="handleAdd">增加考场</Button>
            </FormItem>

          </div>
<!--          <FormItem label="考场" prop="rid">-->
<!--            <Select v-model="arrInfo.rid" filterable clearable placeholder="请选择竞赛名称">-->
<!--              <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--          <FormItem label="人数" prop="num">-->
<!--            <Input v-model="arrInfo.num" placeholder="请输入考场可容纳人数"></Input>-->
<!--          </FormItem>-->
          <FormItem>
            <Button type="primary" style="width: 100%" @click="addArrange">确认</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>


    <!--    修改考场安排-->
    <Modal
      v-model="modal1"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>{{modalTitle}}</h4>
        </Divider>
        <Form ref="formValidate1" :model="updateInfo" :rules="ruleValidate1" :label-width="80" label-colon>
          <FormItem label="竞赛">
            <Input v-model="updateInfo.cname" disabled></Input>
          </FormItem>
          <FormItem label="总人数">
            <Input v-model="total" disabled></Input>
          </FormItem>
          <FormItem label="考场" prop="rid">
            <Select v-model="updateInfo.rid" filterable clearable placeholder="请选择考场">
              <Option v-for="(item, key) in roomList" :key="key" :value="item.rid">{{item.rid + '/' + item.number}}</Option>
            </Select>
          </FormItem>
          <FormItem label="人数" prop="num">
            <Input v-model="updateInfo.num" placeholder="请输入考场可容纳人数"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" style="width: 100%" @click="updateArr">确认</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

  </div>
</template>

<script>
  import {showContestList, getArrangementByCid, getTotalByCid,
    getAvailRoom, addArrange, cancelArrange, updateArrange} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        // 竞赛id
        id: '',
        contestList: [],
        roomList: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '竞赛名称',
            key: 'cname'
          },
          {
            title: '报名总人数',
            key: 'sum',
            width: 120
          },
          {
            title: '考场名称',
            key: 'rName'
          },
          {
            title: '可容纳人数',
            key: 'number',
            width: 120
          },
          {
            title: '实际安排人数',
            key: 'num',
            width: 130
          },
          {
            title: '操作',
            key: 'action',
            width: 130,
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
                      this.openUpdateModal(params.row)
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
                      this.deleteArrange(params.row.id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [],
        selection: [],
        modal: false,
        modal1: false,
        modalTitle: '',
        arrInfo: {
          cid: '',
          items: []
        },
        updateInfo: {},
        // 总人数
        total: 0,
        // 新增考场安排的验证规则
        ruleValidate: {
          cid: [
            { required: true, type: 'number', message: '竞赛名称不能为空', trigger: 'change' }
          ]
        },
        ruleValidate1: {
          rid: [
            { required: true, type: 'number', message: '考场名称不能为空', trigger: 'change' }
          ],
          num: [
            { required: true, message: '实际安排人数不能为空', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      // 多选
      handleSelect(selection) {
        // console.log("??");
        this.selection = selection;
      },
      // 获取赛事列表
      getContests() {
        showContestList().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.contestList = data.data;
          } else {
            this.$Message.error(data.data.message);
          }
        }).catch(err => {
          // console.log(err);
          // this.$Message.error("出错啦！");
        })
      },
      // 查询报名信息
      search() {
        // console.log(this.id);
        // if(this.id) {
          this.getArrangement();
        // } else {
        //   this.$Message.warning("请选择竞赛！");
        // }
      },
      // 根据赛事id获取考场安排
      getArrangement(num) {
        getArrangementByCid(this.id).then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
            if(num !== -1) {
              this.$Message.success("查询成功！");
            }
          } else {
            this.$Message.error("查询失败！");
          }
        }).catch(err => {
          // console.log(err);
          // this.$Message.error("出错啦！");
        });
      },
      // 获取指定赛事报名总人数
      getTotal(id) {
        if(this.arrInfo.cid || id) {
          // 增加判断条件 防止重置表单时，发生请求
          let tmp = this.arrInfo.cid ? this.arrInfo.cid : id;
          getTotalByCid(tmp).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.total = data.data.total;
            } else {
              this.$Message.error("获取报名总人数出错！");
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          })
        }
      },
      // 打开新增考场安排模态框
      openAddModal() {
        this.modalTitle = '新增考场安排';
        this.modal = true;
        this.getAvailRoom();
      },
      // 打开修改考场安排的模态框
      openUpdateModal(data) {
        this.modalTitle = '修改考场安排';
        this.getTotal(data.cid);
        // 加入原本占用的考场
        let tmp = {
          rid: data.rid,
          number: data.number
        };
        this.getAvailRoom(tmp);
        this.updateInfo = {...data};
        this.updateInfo.num = String(data.num);
        this.modal1 = true;
      },
      // 修改考场安排
      updateArr() {
        this.$refs['formValidate1'].validate(valid => {
          if(valid) {
            if(this.updateInfo.num > this.total) {
              this.$Message.error("实际安排人数不可大于报名总人数！");
            } else {
              updateArrange(this.updateInfo).then(res => {
                const data = res.data;
                if(data.code === 0) {
                  this.$Message.success(data.data.message);
                  this.modal1 = false;
                  this.getArrangement(-1);
                } else {
                  this.$Message.error(data.data.message);
                }
                this.modal = false;
                // 重置表单
                this.$refs['formValidate1'].resetFields();
              }).catch(err => {
                // console.log(err);
                // this.$Message.error("出错啦！");
              })
            }
          } else {
            this.$Message.error("请填写必填项！");
          }
        });
      },
      // 新增FormItem
      handleAdd() {
        const len = this.arrInfo.items.length;
        this.arrInfo.items.push({
          rid: '',
          idx: len+1,
          num: ''
        })
      },
      handleRemove() {
        this.arrInfo.items.pop();
      },
      // 获取可用考场列表
      getAvailRoom(tmp) {
        getAvailRoom().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.roomList = data.data;
            // 针对修改考场安排的情况
            if(typeof tmp === 'object') {
              this.roomList.push(tmp);
            }
            // console.log(this.roomList);
          } else {
            this.$Message.error("获取可用考场列表失败！");
          }
        }).then(err => {
          console.log(err);
          // this.$Message.error("获取可用考场列表失败！");
        })
      },
      // 新增考场安排
      addArrange(){
        this.$refs['formValidate'].validate(valid => {
          if(valid) {
            // console.log(this.arrInfo);
            // 错误处理
            let sum = this.arrInfo.items.reduce((prev, val) => {
              return prev + Number(val.num);
            }, 0);
            // console.log(sum);
            if(sum !== this.total) {
              this.$Message.error("新增失败：请核实考场实际安排人数与报名总人数！");
            } else {
              // 处理数据
              let data = [];
              for(let item of this.arrInfo.items) {
                data.push({
                  cid: this.arrInfo.cid,
                  rid: item.rid,
                  num: item.num
                })
              }
                addArrange(data).then(res => {
                  const data = res.data;
                  if(data.code === 0) {
                    this.$Message.success(data.data.message);
                    this.getArrangement(-1);
                  } else {
                    this.$Message.error(data.data.message);
                  }
                  this.modal = false;
                  // 重置表单
                  this.$refs['formValidate'].resetFields();
                  this.arrInfo.items = [];
                }).catch(err => {
                  console.log(err);
                  this.$Message.error("出错啦！");
                })
            }
          } else {
            this.$Message.error("请填写必填项!");
          }
        });
      },
      // 删除考场安排
      deleteArrange(id) {
        // console.log(id);
        let arr = [];
        let flag = 1;
        if(typeof id !== 'number') {
          // 多选
          if(this.selection.length === 0) {
            flag = 0;
            this.$Message.warning('请选择要取消的考场安排！');
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
          cancelArrange(arr).then(res => {
            const data = res.data;
            // console.log(data);
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.selection = [];
              this.getArrangement(-1);
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            console.log(err);
            this.$Message.error("出错啦！");
          });
        }
      }

    },
    mounted() {
      this.getContests();
      this.getArrangement(-1);
    },
    watch: {
      // modal(val) {
      //   if(val === false) {
      //     // 重置表单
      //     this.arrInfo.cid = '';
      //     this.total = 0;
      //   }
      // }
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
    margin-left: 5px;
  }
  .btnBox {
    margin-top: 10px;
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
  }
  .formBox {
    width: 100%;
    padding: 4% 8%;
  }
</style>
