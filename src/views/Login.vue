<template>
  <div class="home">
    <Card class="card">
      <div>
        <span class="loginSpan">登 录</span>
        <div class="contentBox">
          <div class="noId">
            <span class="labelSpan" style="margin-top: 6%">账 号：</span>
            <a @click="$router.push('/register')" style="">暂无账号？</a>
          </div>
          <Input class="inputBox" v-model="user.email" placeholder="请输入账号"/>
          <span class="labelSpan">密 码：</span>
          <Input class="inputBox" type="password" v-model="user.password" password placeholder="请输入密码" autocomplete='new-password'/>
          <RadioGroup class="radioBox" v-model="user.status">
            <Radio label="student">
              <span>学生</span>
            </Radio>
            <Radio label="teacher">
              <span>教练</span>
            </Radio>
            <Radio label="manager">
              <span>管理员</span>
            </Radio>
          </RadioGroup>
          <Button class="btnBox" type="primary" long @click="login">
            <span>确 定</span>
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import {login} from '../api/api'
  export default {
    name: "Login",
    data() {
      return {
        user: {
          email: '',
          password: '',
          status: ''
        },
      }
    },
    methods: {
      login() {
        if (this.user.email === "" || this.user.password === "") {
          this.$Notice.error({
            title: "账号或密码不能为空！",
            duration: 2
          });
        } else if (this.user.status === "") {
          this.$Notice.error({
            title: "请选择角色！",
            duration: 2
          });
        } else {
          // 登陆的判断逻辑
          login(this.user).then(res => {
            const data = res.data;
            // console.log(data);
            if(data.code === 0) {
              this.$Message.success(data.data.message);
              // 存储token到sessionStorage
              sessionStorage.setItem('authorization', data.data.token);
              // console.log(sessionStorage.getItem('authorization'));
              this.$store.commit('saveStatus', this.user.status);
              this.$store.commit('saveEmail', this.user.email);
              // console.log(this.$store.state);
              this.$router.push('/user');
            } else {
              this.$Message.error(data.message);
            }
          }).catch(err => {
            // console.log(err);
            // this.$Message.error("出错啦！");
          });
        }
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
  .radioBox {
    margin: 3% 0;
    display: flex;
    justify-content: space-around;
  }
  a {
    position: absolute;
    right: 0;
    bottom: 5px;
    display: block;
  }
  .noId {
    position: relative;
    overflow: hidden;
  }
</style>
