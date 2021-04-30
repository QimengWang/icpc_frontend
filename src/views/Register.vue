<template>
  <div class="home">
    <Card class="card">
      <div>
        <span class="loginSpan">注 册</span>
        <div class="contentBox">
          <Input class="inputBox" v-model="user.email" placeholder="邮箱/手机"/>
          <div class="verifyBox">
            <Input class="inputBox" v-model="user.code" placeholder="验证码"/>
            <Button type="primary" @click="sending" :loading="loading" :disabled="isSent">
<!--              发送验证码-->
              <div v-if="!isSent">
                <p v-if="!loading">发送验证码</p>
                <p v-else>发送中</p>
              </div>
              <div v-else>
                <p>{{timer}}秒后重试</p>
              </div>
            </Button>
          </div>
          <Input class="inputBox" type="password" v-model="user.password" password placeholder="密码" autocomplete='new-password'/>
          <Select v-model="user.status">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button class="btnBox" type="primary" long @click="register">
            <span>确 定</span>
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import {sendCode, register} from '../api/api';
  export default {
    name: "Register",
    data() {
      return {
        timer: 60,
        isSent: false,
        loading: false,
        user: {
          email: '',
          password: '',
          status: '',
          code: ''
        },
        statusList: [
          {
            value: 'student',
            label: '学生'
          },
          {
            value: 'teacher',
            label: '教练'
          }
        ]
      }
    },
    methods: {
      // 发送邮箱验证码
      sending() {
        if(!this.user.email.includes('@')) {
          this.$Message.warning('请输入正确的邮箱!');
        } else {
          this.loading = true;
          sendCode(this.user.email).then(res => {
            const data = res.data;
            // console.log(data);
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              this.isSent = true;
              let flag = setInterval(() => {
                if(this.timer > 0) {
                  this.timer--;
                } else {
                  clearInterval(flag);
                  this.isSent = false;
                  this.timer = 60;
                }
              }, 1000);
            } else if(data.code === 1){
              this.$Message.warning(data.data.message);
            } else {
              this.$Message.error(data.data.message);
            }
            this.loading = false;
          }).catch(err => {
            // console.log(err);
            // this.$Message.error('出错了！');
            this.loading = false;
          })
        }
      },
      register() {
        register(this.user).then(res => {
          const data = res.data;
          // console.log(data);
          if(data.code === 0) {
            this.$Message.success(data.data.message);
            this.$router.push('/login');
          } else {
            this.$Message.error(data.data.message);
          }
        }).catch(err => {
          // console.log(err);
          // this.$Message.error('出错了！');
        });
      }
    }
  }
</script>

<style scoped>
  .home {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: whitesmoke;
  }
  .card {
    min-width: 300px;
    flex-basis: 25%;
    padding: 1%;
    background-color: rgba(255, 255, 255, 0.9);
  }
  span {
    color: #333333;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .loginSpan {
    font-size: 1.5rem;
  }
  .labelSpan {
    float: left;
    font-size: 0.9rem;
    margin-bottom: 2%;
  }
  .contentBox {
    margin: 3%;
  }
  .inputBox {
    margin-bottom: 5%;
  }
  .btnBox {
    margin-top: 7%;
  }
  .btnBox span {
    color: white;
  }
  .verifyBox {
    display: flex;
    /*justify-content: space-between;*/
  }
  .verifyBox Button {
    margin-left: 2px;
  }
</style>

