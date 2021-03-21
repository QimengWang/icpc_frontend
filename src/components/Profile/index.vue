<template>
  <div class="formBox">
    <Divider>
      <h3>基本信息</h3>
    </Divider>
    <Form :model="formItem" :label-width="80" label-colon>
      <Row>
        <Col span="12">
          <FormItem label="中文名">
            <Input v-model="formItem.chineseName"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="英文名">
            <Input v-model="formItem.chineseName"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="性别" prop="gender">
        <RadioGroup v-model="formItem.sex">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="年级">
            <Select v-model="formItem.grade">
              <Option value="beijing">大一</Option>
              <Option value="shanghai">大二</Option>
              <Option value="shenzhen">大三</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="学号">
            <Input v-model="formItem.id"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="手机">
            <Input v-model="formItem.phone"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="邮箱">
            <Input v-model="formItem.email"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem style="float: right">
        <Button type="primary">保存</Button>
      </FormItem>
    </Form>

    <Divider>
      <h3>通讯方式</h3>
    </Divider>
    <Form :model="formItem" :label-width="80" label-colon>
      <Row>
        <Col span="12">
          <FormItem label="国家">
            <Input v-model="formItem.phone"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="城市">
            <Input v-model="formItem.email"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="详细地址">
            <Input v-model="formItem.phone"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="邮编">
            <Input v-model="formItem.email"></Input>
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
    <Form :model="formItem" :label-width="80" label-colon>
      <Row>
        <Col span="12">
          <FormItem label="QQ">
            <Input v-model="formItem.phone"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="微信">
            <Input v-model="formItem.email"></Input>
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
        formItem: {
          chineseName: '',
          sex: '',
          firstName: '',
          lastName: '',
          grade: '',
          id: '',
          phone: '',
          email: ''
        }
      }
    }
  }
</script>

<style scoped>
  .formBox {
    width: 100%;
    padding: 4% 8%;
  }
</style>
