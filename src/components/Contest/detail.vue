<template>
  <div class="mainCon">
    <div class="box">
      <h2>{{data.name}}</h2>
      <div class="item">
        <h3>报名时间：</h3>
        <span>{{data.startApp}} ~ {{data.endApp}}</span>
      </div>
      <div class="item">
        <h3>比赛时间：</h3>
        <span>{{data.startHold}} ~ {{data.endHold}}</span>
      </div>
      <div class="item">
        <h3>比赛类型：</h3>
        <span>{{data.type}}</span>
      </div>
      <div class="item" v-if="type==='group'">
        <h3>人数限制：</h3>
        <span v-if="data.isEqual==='no'">小于等于</span>
        <span>{{data.limit}}人</span>
      </div>
      <div class="intro">
        <h3>简介：</h3>
        <p>{{data.remark}}</p>
      </div>
      <div class="intro">
        <h3>比赛规则：</h3>
        <div class="rules">
          <div v-html="data.rules"></div>
        </div>
      </div>
      <div class="intro">
        <h3>奖励说明：</h3>
        <div class="rules">
          <div v-html="data.rewards"></div>
        </div>
      </div>
      <Button type="primary" @click="signUp">报名</Button>
    </div>

<!--    团体赛报名弹窗-->
    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>团体赛报名</h4>
        </Divider>
        <Form ref="ruleValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-colon>
          <FormItem label="团队名称" prop="groupName">
            <Input v-model="formValidate.groupName" placeholder="请填写团队名称"></Input>
          </FormItem>
          <FormItem label="教练" prop="tid">
            <Select v-model="formValidate.tid" filterable clearable>
              <Option v-for="(item, key) in tList" :key="key" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            v-for="(itm, idx) in formValidate.members"
            :key="idx"
            :label="'队员' + itm.idx"
          >
            <Row span="24">
              <Col span="10">
                <Input v-model="itm.id" placeholder="学号"></Input>
              </Col>
              <Col span="1"></Col>
              <Col span="10">
                <Input v-model="itm.name" placeholder="姓名"></Input>
              </Col>
<!--              <Col span="1"></Col>-->
              <Col span="2" offset="1">
                <Button icon="md-remove" @click="handleRemove"></Button>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Button type="dashed" style="width: 100%" icon="md-add" @click="handleAdd">增加队员</Button>
          </FormItem>

          <FormItem>
            <Button type="primary" style="width: 100%" @click="signUpGroup">确定</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {showContestDetail, singleSignUp, getTeachers, groupSignUp} from "../../api/api";

  export default {
    name: "detail",
    data() {
      return {
        id: this.$route.params.id,
        data: {},
        type: '',
        modal: false,
        formValidate: {
          groupName: '',
          tid: '',
          members: []
        },
        limit: 0,
        isEqual: '',
        members: [],
        ruleValidate: {
          groupName: [
            { required: true, message: '团队名称不能为空', trigger: 'blur' }
          ],
          tid: [
            { required: true, message: '请选择教练' }
          ],
          members: [
            { required: true, message: '请填写小组成员' }
          ]
        },
        tList: []
      }
    },
    methods: {
      // 获取赛事详情
      getDetail() {
        showContestDetail({id: this.id}).then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.data = data.data;
            this.type = data.data.type === '个人赛' ? 'single' : 'group';
            if(this.type === 'group') {
              this.isEqual = data.data.isEqual;
              this.limit = data.data.limit;
              // const obj = {id: '', name: ''};
              // this.members = new Array(this.limit);
              // for(let i=0; i<this.limit; i++) {
              //   this.members[i] = {id: '', name: ''};
              // }
              // console.log(this.members);
            }
          }
        }).catch(err => {
          // this.$Message.error(err);
        });
      },
      // 报名
      signUp() {
        // console.log("报名！");
        const token = sessionStorage.getItem('authorization');
        if(token) {
          if(this.$store.state.status === 'teacher' || this.$store.state.status === 'manager') {
            this.$Message.error("教练或管理员不可报名！");
          } else {
            if(this.type === 'single') {
              // 个人赛报名
              singleSignUp({cid: this.id}).then(res => {
                const data = res.data;
                if(data.code === 0) {
                  this.$Message.success(data.data.message);
                } else {
                  this.$Message.error(data.data.message);
                }
              }).catch(err => {
                // this.$Message.error(err);
              })
            } else {
              // 团队赛报名
              this.getTeachers();
              this.modal = true;
            }
          }
        } else {
          this.$Message.warning('请先登录！');
          this.$router.push('/login');
        }
      },
      // 获取教练列表
      getTeachers() {
        getTeachers().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.tList = data.data;
          }
        })
      },

      // 新增FormItem
      handleAdd() {
        const len = this.formValidate.members.length;
        this.formValidate.members.push({
          id: '',
          idx: len+1,
          name: ''
        })
      },
      handleRemove() {
        this.formValidate.members.pop();
      },

      // 团队赛报名
      signUpGroup() {
        let flag = 1; // 能否发起后端请求的标志
        // console.log(this.formValidate.members);
        let len = this.formValidate.members.length;
        if(this.isEqual === 'yes') {
          if(len !== this.limit) {
            flag = 0;
          }
        } else {
          if(len > this.limit  || len === 0) {
            flag = 0;
          }
        }
        if(flag) {
          for(let i of this.formValidate.members) {
            if(!i.id || !i.name) {
              flag = 0;
              this.$Message.error("团队成员信息不能为空！");
              return;
            }
          }
        }
        // this.formValidate.members = this.members;
        if(flag) {
          this.$refs['ruleValidate'].validate(valid => {
            if(valid) {
              this.formValidate.cid = this.id;
              groupSignUp(this.formValidate).then(res => {
                const data = res.data;
                if(data.code === 0) {
                  this.$Message.success(data.data.message);
                  this.modal = false;
                  // 重置表单
                  // for(let i of this.members) {
                  //   this.members[i].id = '';
                  //   this.members[i].name = '';
                  // }
                  this.formValidate.members = [];
                  this.$refs['ruleValidate'].resetFields();
                } else {
                  this.$Message.error(data.data.message);
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              this.$Message.error('请填写必填项!');
            }
          })
        } else {
          this.$Message.error("报名失败！请注意团队人数限制！");
        }
      }
    },
    mounted() {
      this.getDetail();
    },
    watch: {
      modal(){
        if(this.modal === false) {
          // 重置表单
          this.$refs['ruleValidate'].resetFields();
        }
      }
    }
  }
</script>

<style scoped>
  .mainCon {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .box {
    width: 80%;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
  }
  .intro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .rules {
    margin-left: 20px;
    margin-top: 5px;
  }
  .item, .intro, .rules {
    margin-bottom: 8px;
    text-align: left;
  }
  p {
    text-indent: 2em;
    text-align-last: left;
  }
  h2 {
    margin: 20px auto;
  }
  p, h2, h3 {
    color: #333333;
  }
  .formBox {
    margin: 30px;
  }
</style>
