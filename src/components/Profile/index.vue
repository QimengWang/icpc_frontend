<template>
  <div class="formBox">
    <Divider>
      <h3>基本信息</h3>
    </Divider>
    <Form :model="basicInfo" :label-width="80" label-colon :rules="basicValidate">
      <Row>
        <Col span="12">
          <FormItem label="中文名" prop="chineseName">
            <Input v-model="basicInfo.chineseName"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="英文名" prop="englishName">
            <Input v-model="basicInfo.englishName"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="basicInfo.sex">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="学校" prop="school">
            <Select v-model="basicInfo.school">
              <Option value="1">上海大学</Option>
              <Option value="2">复旦大学</Option>
              <Option value="3">北京大学</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="入学年份">
            <DatePicker type="year" v-model="basicInfo.year" style="width: 100%;"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="学号" prop="id">
            <Input v-model="basicInfo.username"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="手机" prop="phone">
            <Input v-model="basicInfo.phone"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="邮箱" prop="email">
            <Input v-model="basicInfo.email"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem style="float: right">
        <Button type="primary" @click="save">保存</Button>
      </FormItem>
    </Form>

    <Divider>
      <h3>通讯方式</h3>
    </Divider>
    <Form :model="comInfo" :label-width="80" label-colon>
      <Row>
        <Col span="12">
          <FormItem label="国家">
            <Input v-model="comInfo.country"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="城市">
            <Input v-model="comInfo.city"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="详细地址">
            <Input v-model="comInfo.address"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="邮编">
            <Input v-model="comInfo.zipCode"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem style="float: right">
        <Button type="primary">保存</Button>
      </FormItem>
    </Form>

    <Divider>
      <h3>社交媒体</h3>
    </Divider>
    <Form :model="socialInfo" :label-width="80" label-colon>
      <Row>
        <Col span="12">
          <FormItem label="QQ">
            <Input v-model="socialInfo.qq"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="微信">
            <Input v-model="socialInfo.weChat"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem style="float: right">
        <Button type="primary">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        basicInfo: {
          chineseName: '王琦梦',
          sex: 'female',
          englishName: 'Qimeng Wang',
          year: '2012',
          username: '17123079',
          phone: '1883888888',
          email: '188@shu.edu.cn',
          school: '1'
        },
        comInfo: {
          country: '中国',
          city: '上海市',
          address: '宝山区大场镇',
          zipCode: '123456'
        },
        socialInfo: {
          qq: '123456789',
          weChat: 'mjhgfdretyuiolq123'
        },
        basicValidate: {
          chineseName: [
            { required: true, message: 'The Chinese name cannot be empty', trigger: 'blur' }
          ],
          englishName: [
            { required: true, message: 'The English name cannot be empty', trigger: 'blur' }
          ],
          school: [
            { required: true, message: 'The English name cannot be empty', trigger: 'blur' }
          ],
          username: [
            { required: true, message: 'The English name cannot be empty', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: 'Phone number cannot be empty', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      save() {
        this.$Message.success('保存成功！');
      }
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
