<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Select v-model="id" filterable clearable placeholder="请选择竞赛名称" style="width: 280px; margin-right: 5px">
        <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>
      </Select>
      <Button type="primary" icon="ios-search-outline" @click="search('-1')">查询</Button>
      <Button type="success" icon="ios-information-circle-outline" @click="createAdm">生成准考证</Button>
<!--      <Button type="warning" icon="ios-download-outline" @click="exportFile">导出Excel</Button>-->
    </div>

    <!--    报名列表-->
    <div class="tableBox">
      <Table border
             :columns="columns"
             :data="data" ref="table"
             v-if="isSingle"
             @on-select="handleSelect"
             @on-select-all="handleSelect"
      ></Table>
      <Table border
             :columns="columns1"
             :data="data"
             v-else
             :span-method="handleSpan"
             @on-select="handleSelect"
             @on-select-all="handleSelect"
             @on-select-cancel="handleSelect"
             @on-select-all-cancel="handleSelect"
      ></Table>
    </div>

<!--    审核按钮-->
    <div class="btnBox">
      <Button type="success" icon="ios-checkmark-circle-outline" @click="pass">通过</Button>
      <Button type="error" icon="ios-close-circle-outline" @click="notPass">不通过</Button>
    </div>

    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>{{modalTitle}}</h4>
        </Divider>
        <Form ref="formValidate" :label-width="80" label-colon>
          <FormItem label="备注">
            <Input v-model="remark"></Input>
          </FormItem>
        </Form>
        <div style="overflow: hidden">
          <Button type="primary" style="float: right" @click="confirm">确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Expand from './expandRow'
  import {showContestList, getListByCid, signUpChecked, signUpUnchecked, createAdm} from "../../api/api";

  export default {
    name: "index",
    components: {Expand},
    data() {
      return {
        // 当前所查询竞赛是否为个人赛
        isSingle: true,
        id: '',
        // 导出报名名单的文件名
        cname: 'test',
        contestList: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center',
            key: 'idx'
          },
          {
            title: '中文名',
            key: 'chineseName'
          },
          {
            title: '英文名',
            key: 'englishName'
          },
          {
            title: '学号',
            key: 'id'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '电话',
            key: 'phone'
          },
          {
            title: '入学年份',
            key: 'year'
          },
          {
            title: '审核状态',
            key: 'status',
            render: (h, params) => {
              if(params.row.status === '0') {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'blue'
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
            title: '备注',
            key: 'remark'
          }
        ],
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(Expand, {
                props: {
                  row: params.row.members
                }
              })
            }
          },
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center',
            key: 'idx'
          },
          {
            title: '团队名称',
            key: 'groupName'
          },
          {
            title: '教练',
            key: 'tname'
          },
          {
            title: '审核状态',
            key: 'status',
            render: (h, params) => {
              if(params.row.status === '0') {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'blue'
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
            title: '备注',
            key: 'remark'
          }
        ],
        // table数据
        data: [],
        // 多选
        selection: [],
        modal: false,
        modalTitle: '添加备注',
        remark: ''
      }
    },
    methods: {
      // 合并列
      handleSpan ({ row, column, rowIndex, columnIndex }) {
        // if (rowIndex === 0 && columnIndex === 0) {
        //   return [1, 2];
        // } else if (rowIndex === 0 && columnIndex === 1) {
        //   return [0, 0];
        // }
        // if (rowIndex === 0 && columnIndex === 1) {
        //   return {
        //     rowspan: 0,
        //     colspan: 3
        //   };
        // }
      },
      // 导出报名表
      exportFile() {
        const cols = this.columns.reduce((prev, itm, idx) => {
          if(idx > 0 && idx < 7) {
            prev.push(itm.key);
          }
          return prev;
        }, []);
        // console.log(cols);
        this.$refs.table.exportCsv({
          filename: this.cname,
          // type: 'xlsx',
          columns: this.columns.slice(1, 7),
          data: this.data.filter((itm, idx) => {
            itm.idx = idx+1;
            return true;
          })
        });
      },
      // 查询报名信息
      search(d) {
        // console.log(this.id);
        if(this.id) {
          getListByCid(this.id).then(res => {
            const data = res.data;
            if(data.code === 0) {
              if(data.data.length === 0) {
                if(d === '-1') {
                  this.$Message.success("查询成功, 暂无数据！");
                  this.data = [];
                }
              } else {
                this.isSingle = !Object.keys(data.data[0]).includes('groupName');
                this.data = data.data;
                if(d === '-1') {
                  this.$Message.success("查询成功！");
                }
              }
            } else {
              if(d === '-1') {
                this.$Message.error("查询失败！");
              }
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          });
        } else {
          this.$Message.warning("请选择竞赛！");
        }
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
        })
      },
      // 多选
      handleSelect(selection) {
        this.selection = selection;
      },
      // 审核通过
      pass() {
        if(this.selection.length === 0) {
          this.$Message.warning("请选择要审核的报名信息！");
        } else {
          let arr = [];
          for(let i of this.selection) {
            let tmp = this.isSingle ? i.sid : i.id;
            arr.push(tmp);
          }
          let obj = {};
          obj.id = arr;
          obj.type = this.isSingle ? 'single' : 'group';
          signUpChecked(obj).then(res => {
            let data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
            } else {
              this.$Message.error(data.data.message);
            }
            this.search(-1);
            this.selection = [];
          }).catch(err => {
            console.log(err);
          })
        }
      },
      // 审核不通过
      notPass() {
        if(this.selection.length === 0) {
          this.$Message.warning("请选择要审核的报名信息！");
        } else {
          this.modal = true;
        }
      },
      confirm() {
        let arr = [];
        for(let i of this.selection) {
          let tmp = this.isSingle ? i.sid : i.id;
          arr.push(tmp);
        }
        let obj = {};
        // if(this.isSingle) {
          obj.id = arr;
        // } else {
        //   obj.gid = arr;
        // }
        obj.type = this.isSingle ? 'single' : 'group';
        obj.remark = this.remark;
        signUpUnchecked(obj).then(res => {
          let data = res.data;
          if(data.code === 0) {
            this.$Message.success(data.data.message);
          } else {
            this.$Message.error(data.data.message);
          }
          this.search(-1);
          this.selection = [];
          this.modal = false;
          this.remark = "";
        }).catch(err => {
          console.log(err);
        })
      },
      // 生成准考证
      createAdm() {
        if(!this.id) {
          this.$Message.warning("请先选择竞赛！");
        } else {
          createAdm(this.id).then(res => {
            const data = res.data;
            if(data.code === 0) {
              this.$Message.success(data.data.message);
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
      this.getContests();
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
  .btnBox {
    margin-top: 10px;
  }
  .formBox {
    width: 100%;
    padding: 4% 8%;
  }
</style>
