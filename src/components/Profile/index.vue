<template>
  <div class="formBox">
    <Divider>
      <h3>基本信息</h3>
    </Divider>
    <Form ref="formVal" :model="userInfo" :label-width="100" label-colon :rules="formValidate">
      <Row>
        <Col span="12">
          <FormItem label="中文名" prop="chineseName">
            <Input
              v-model="userInfo.chineseName"
              placeholder="请输入中文名"
              :disabled="$store.state.status === 'manager' || userInfo.status === '1'">
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="英文名" prop="englishName">
            <Input
              v-model="userInfo.englishName"
              placeholder="请输入英文名"
              :disabled="$store.state.status === 'manager' || userInfo.status === '1'">
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="userInfo.sex">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="学校" prop="school" v-if="$store.state.status !== 'manager'">
            <Select v-model="userInfo.school" filterable clearable placeholder="请选择学校" :disabled="userInfo.status === '1'">
              <Button v-if="$store.state.status === 'teacher'" style="width: 100%" type="primary" icon="ios-add-circle-outline" @click="modal=true">新增学校</Button>
              <Option v-for="(item, key) in schoolList" :key="key" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12" v-if="$store.state.status === 'student'">
          <FormItem label="入学年份" prop="year">
            <DatePicker type="year"
                        v-model="userInfo.year"
                        style="width: 100%;"
                        placeholder="请选择入学年份"
                        :disabled="userInfo.status === '1'"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="学号" prop="id" v-if="$store.state.status === 'student'">
            <Input v-model="userInfo.id" placeholder="请输入学号" :disabled="userInfo.status === '1'"></Input>
          </FormItem>
          <FormItem label="工号" prop="id" v-if="$store.state.status === 'teacher'">
            <Input v-model="userInfo.id" placeholder="请输入工号" :disabled="userInfo.status === '1'"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="手机" prop="phone">
            <Input v-model="userInfo.phone" placeholder="请输入手机号"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="邮箱" prop="email">
            <Input v-model="userInfo.email" placeholder="请输入电子邮箱" disabled></Input>
          </FormItem>
        </Col>
      </Row>
    <Divider>
      <h3>通讯方式</h3>
    </Divider>
      <Row>
        <Col span="12">
          <FormItem label="国家">
            <Input v-model="userInfo.country" placeholder="请输入国家"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="城市">
            <Input v-model="userInfo.city" placeholder="请输入城市"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="详细地址">
            <Input v-model="userInfo.address" placeholder="请输入详细地址"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="邮编">
            <Input v-model="userInfo.zipCode" placeholder="请输入邮政编码"></Input>
          </FormItem>
        </Col>
      </Row>
    <Divider>
      <h3>社交媒体</h3>
    </Divider>
      <Row>
        <Col span="12">
          <FormItem label="QQ">
            <Input v-model="userInfo.qq" placeholder="请输入qq号"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="微信">
            <Input v-model="userInfo.weChat" placeholder="请输入微信号"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem style="float: right">
        <Button type="primary" @click="save">保存</Button>
      </FormItem>
    </Form>

<!--    新增学校-->
    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
        <Divider>
          <h4>新增学校</h4>
        </Divider>
        <Form ref="ruleValidate" :model="schoolInfo" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称" prop="name">
            <Input v-model="schoolInfo.name"></Input>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="schoolInfo.address"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" style="width: 100%" @click="addSchool">确定</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {addSchoolForTea, getInfo, getSchoolList, updateInfo} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        schoolList: [],
        userInfo: {
          chineseName: '',
          sex: '',
          englishName: '',
          year: '',
          id: '',
          phone: '',
          email: '',
          school: '',
          country: '',
          city: '',
          address: '',
          zipCode: '',
          qq: '',
          weChat: '',
          status: 0
        },
        // 个人信息的验证规则
        formValidate: {
          chineseName: [
            { required: true, message: '请输入中文名', trigger: 'blur' }
          ],
          englishName: [
            { required: true, message: '请输入英文名', trigger: 'blur' }
          ],
          school: [
            { required: true, message: '请选择学校' }
          ],
          id: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          year: [
            { required: true, message: '请选择入学年份' }
          ],
          // email: [
          //   { required: true, message: '请输入邮箱', trigger: 'blur' }
          // ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
        },
        // 新增学校的验证规则
        ruleValidate: {
          name: [
            { required: true, message: '学校名称不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '学校地址不能为空', trigger: 'blur' }
          ]
        },
        // 新增学校的表单
        schoolInfo: {
          name: '',
          address: '',
          remark: ''
        },
        modal: false
      }
    },
    methods: {
      // 修改个人信息
      save() {
        // console.log("??");
        this.$refs['formVal'].validate((valid) => {
          if (valid) {
            // 发送请求
            let d = {...this.userInfo};
            if(this.$store.state.status === 'student') {
              // 修正年份
              d.year = this.userInfo.year.getFullYear();
            }

            updateInfo(d).then(res => {
              const data = res.data;
              if(data.code === 0) {
                this.$Message.success(data.data.message);
              } else {
                this.$Message.error(data.data.message);
              }
              this.getInfo();
            }).catch(err => {
              // console.log(err);
              // this.$Message.error("出错啦！");
            });
          } else {
            this.$Message.error('请完善必填字段!');
          }
        });
      },
      // 新增学校
      addSchool() {
        this.$refs['ruleValidate'].validate((valid) => {
          if (valid) {
            addSchoolForTea(this.schoolInfo).then(res => {
              const data = res.data;
              if(data.code === 0) {
                this.$Message.success(data.data.message);
                this.getSchools();
              } else {
                this.$Message.error(data.data.message);
              }
            }).catch(err => {
              // this.$Message.error(err);
            });
            this.modal = false;
            // 重置表单
            this.$refs['ruleValidate'].resetFields();
          } else {
            this.$Message.error('请填写必填项!');
          }
        })
      },
      // 获取个人信息
      getInfo() {
        getInfo().then(res => {
          // 修正日期格式
          let d = res.data.data;
          let date = d.year ? new Date(d.year) : '';
          d.year = date;
          this.userInfo = d;
          // 修正school类型，防止option绑定失败
          this.userInfo.school = Number(d.school);
          // console.log(typeof this.userInfo.school);
        }).catch(err => {
          // console.log(err);
        })
      },
      // 获取学校列表
      getSchools() {
        getSchoolList().then(res => {
          const data = res.data;
          if(data.code === 0) {
            this.schoolList = data.data;
            // console.log(this.schoolList);
          }
        }).catch(err => {
          // console.log(err.response.data);
          // this.$Message.error(err);
        })
      }
    },
    mounted() {
      this.getInfo();
      this.getSchools();
    }
  }
</script>

<style scoped>
  .formBox {
    width: 100%;
    padding: 4% 8%;
  }
  .ivu-radio-wrapper {
    margin: 0 10px;
  }
</style>
