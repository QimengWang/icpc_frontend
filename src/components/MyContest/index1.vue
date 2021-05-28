<template>
  <div class="con">
    <Table border :columns="columns" :data="data"></Table>

    <Modal
      v-model="modal"
      footer-hide>
      <div id="printBox">
        <Divider>
          <h4>{{modalTitle}}</h4>
        </Divider>
        <Col class="col">
          <Row class="row">
            <h4>竞赛名称：</h4>
            <span>{{admData.cname}}</span>
          </Row>
          <Row class="row" v-if="isSingle">
            <h4>姓名：</h4>
            <span>{{admData.chineseName}}</span>
          </Row>
          <Row class="row" v-else>
            <h4>团队名称：</h4>
            <span>{{admData.groupName}}</span>
          </Row>
          <Row class="row" v-if="isSingle">
            <h4>性别：</h4>
            <span>{{admData.sex === 'female' ? '女' : '男'}}</span>
          </Row>
          <Row class="row" v-else>
            <h4>教练：</h4>
            <span>{{admData.tname}}</span>
          </Row>
          <Row class="row" v-if="isSingle">
            <h4>学校：</h4>
            <span>{{admData.school}}</span>
          </Row>
          <Row class="row" v-if="isSingle">
            <h4>学号：</h4>
            <span>{{admData.id}}</span>
          </Row>
          <Row class="row">
            <h4>准考证号：</h4>
            <span>{{admData.admissionNumber}}</span>
          </Row>
          <Row class="row">
            <h4>考场：</h4>
            <span>{{admData.rName}}</span>
          </Row>
          <Row class="row">
            <h4>座位号：</h4>
            <span>{{admData.seat}}</span>
          </Row>
        </Col>
      </div>

      <div class="btnBox">
        <Button type="primary" icon="ios-download-outline" @click="print">打印</Button>
      </div>
    </Modal>

    <Modal
      v-model="modal1"
      footer-hide>
      <Divider>
        <h4>{{modalTitle}}</h4>
      </Divider>
<!--      <Form ref="ruleValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-colon>-->
<!--        <FormItem label="团队名称" prop="groupName">-->
<!--          <Input v-model="formValidate.groupName" placeholder="请填写团队名称"></Input>-->
<!--        </FormItem>-->
<!--        <FormItem label="教练" prop="tid">-->
<!--          <Select v-model="formValidate.tid" filterable clearable>-->
<!--            <Option v-for="(item, key) in tList" :key="key" :value="item.id">{{item.name}}</Option>-->
<!--          </Select>-->
<!--        </FormItem>-->
<!--        <FormItem-->
<!--          v-for="(itm, idx) in formValidate.members"-->
<!--          :key="idx"-->
<!--          :label="'队员' + itm.idx"-->
<!--        >-->
<!--          <Row span="24">-->
<!--            <Col span="10">-->
<!--              <Input v-model="itm.id" placeholder="学号"></Input>-->
<!--            </Col>-->
<!--            <Col span="1"></Col>-->
<!--            <Col span="10">-->
<!--              <Input v-model="itm.name" placeholder="姓名"></Input>-->
<!--            </Col>-->
<!--            &lt;!&ndash;              <Col span="1"></Col>&ndash;&gt;-->
<!--            <Col span="2" offset="1">-->
<!--              <Button icon="md-remove" @click="handleRemove"></Button>-->
<!--            </Col>-->
<!--          </Row>-->
<!--        </FormItem>-->

<!--        <FormItem>-->
<!--          <Button type="dashed" style="width: 100%" icon="md-add" @click="handleAdd">增加队员</Button>-->
<!--        </FormItem>-->

<!--        <FormItem>-->
<!--          <Button type="primary" style="width: 100%" @click="signUpGroup">确定</Button>-->
<!--        </FormItem>-->
<!--      </Form>-->
    </Modal>
  </div>
</template>

<script>
  import {getApplyList, cancelApply, showAdm, getGroupDetail} from "../../api/api";

  export default {
    name: "index1",
    data() {
      return {
        isSingle: true,
        modal1: false,
        columns: [
          {
            title: '赛事名称',
            key: 'name',
            width: 250
          },
          {
            title: '类型',
            key: 'type'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status === '0') {
                return h('div', [
                  h('Tag', {
                    props: {
                      color: 'blue'
                    }
                  }, '待审核')
                ])
              } else if (params.row.status === '1') {
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
          },
          {
            title: '操作',
            key: 'action',
            width: 280,
            render: (h, params) => {
              return h('div', [
                // h('Button', {
                //   props: {
                //     type: 'warning',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px',
                //     display: params.row.type === '团体赛' ? 'inline' : 'none'
                //   },
                //   on: {
                //     click: () => {
                //       this.update(params.row.id)
                //     }
                //   }
                // }, '详情/修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row)
                    }
                  }
                }, '取消报名'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.detail(params.row.cid)
                    }
                  }
                }, '准考证')
              ]);
            }
          }
        ],
        data: [],
        modal: false,
        modalTitle: '准考证',
        admData: {}
      }
    },
    methods: {
      // 获取报名列表
      getData() {
        getApplyList().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
          } else {
            this.$Message.error(data.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 详情/修改报名信息（团体赛）
      update(id) {
        getGroupDetail(id).then(res => {
          const data = res.data;

        }).catch(err => {
          console.log(err);
        });
        this.modalTitle ="团队详情";
        this.modal1 = true;
      },
      // 取消报名
      cancel(data) {
        console.log(data);
        cancelApply({cid: data.cid, type: data.type === '个人赛' ? 'single' : 'group'}).then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.$Message.success(data.data.message);
          } else {
            this.$Message.error(data.data.message);
          }
          this.getData();
        }).catch(err => {
          console.log(err);
        })
      },
      // 查看准考证
      detail(id) {
        showAdm(id).then(res => {
          let data = res.data;
          if(data.code === 0) {
            this.admData = data.result;
            this.isSingle = this.admData.type !== '团队赛';
            // console.log(data.data);
            this.modal = true;
          } else {
            this.$Message.error(data.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 打印准考证
      print() {
        let bdHtml = document.body.innerHTML;
        let tmp = document.getElementById("printBox").innerHTML;
        document.body.innerHTML = tmp;
        window.print();
        document.body.innerHTML = bdHtml;
        window.location.reload();
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style scoped>
  .con {
    padding: 20px;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
  }
  .btnBox {
     overflow: hidden;
   }
  .btnBox Button {
    float: right;
  }
  .row {
    margin-bottom: 8px;
  }
  .col {
    margin-left: 20px;
  }
</style>
