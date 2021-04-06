<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Input v-model="schoolName" placeholder="学校名称" clearable style="width: 200px; margin-right: 5px"/>
      <Button type="success" icon="ios-search-outline">查询</Button>
      <Button type="primary" icon="ios-add-circle-outline" @click="addSchoolModal">新建</Button>
      <Button type="error" icon="ios-trash-outline" @click="deleteSchool">删除</Button>
    </div>

<!--    学校列表-->
    <div class="tableBox">
      <Table border :columns="columns" :data="data"></Table>
    </div>

    <!--    新增学校-->
    <Modal
      v-model="modal"
      @on-ok="addSchool"
      @on-cancel="modal=false">
      <div class="formBox">
        <Divider>
          <h4>{{modalTitle}}</h4>
        </Divider>
        <Form ref="formValidate" :model="schoolInfo" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称" prop="name">
            <Input v-model="schoolInfo.name"></Input>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="schoolInfo.address"></Input>
          </FormItem>
          <FormItem label="负责人" prop="charge">
            <Input v-model="schoolInfo.charge"></Input>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="schoolInfo.remark" type="textarea"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        schoolName: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '学校名称',
            minWidth: 200,
            key: 'name'
          },
          {
            title: '地址',
            minWidth: 200,
            key: 'address'
          },
          {
            title: '负责人',
            minWidth: 100,
            key: 'charge'
          },
          {
            title: '备注',
            minWidth: 200,
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteSchool(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [
          {
            name: '上海大学',
            address: '上海市宝山区上大路99号',
            charge: '沈俊',
            remark: null
          }
        ],
        modal: false,
        modalTitle: '',
        // 新增学校的验证规则
        ruleValidate: {
          name: [
            { required: true, message: '学校名称不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '学校地址不能为空', trigger: 'blur' }
          ],
          charge: [
            { required: true, message: '学校负责人不能为空', trigger: 'blur' }
          ]
        },
        // 新增学校的表单
        schoolInfo: {
          name: '',
          address: '',
          charge: '',
          remark: ''
        }
      }
    },
    methods: {
      // 新增学校Modal
      addSchoolModal() {
        this.modalTitle = '新增学校';
        this.modal = true;
      },
      // 新增&修改学校
      addSchool() {
        this.$refs['formValidate'].validate(valid => {
          if(valid) {

          } else {
            this.$Message.error('请填写必填项！');
          }
        });
      },
      // 删除学校
      deleteSchool() {
        this.$Message.success('删除成功！');

      },
      // 修改学校Modal
      update() {
        this.modalTitle = '修改学校';
        this.modal = true;
      }
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
    margin-right: 5px;
  }
  .formBox {
     width: 100%;
     padding: 4% 8%;
   }
</style>
