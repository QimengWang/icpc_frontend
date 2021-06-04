<template>
  <div class="con">
    <!--      查询行-->
    <div class="father">
      <Select v-model="id" filterable clearable placeholder="请选择竞赛名称" style="width: 280px">
        <Option v-for="(item, key) in contestList" :key="key" :value="item.cid">{{item.name}}</Option>
      </Select>
      <Button class="btn" type="success" icon="ios-search-outline" @click="search">查询</Button>
    </div>

    <div class="tableBox">
      <Table border :columns="isSingle ? columns : columns1" :data="data"></Table>
    </div>

    <div class="btnBox">
      <Button type="warning" icon="ios-cloud-download-outline" @click="download">下载模板</Button>
      <Upload
        :show-upload-list="false"
        action="http://121.4.159.144:3000/user/manager/addGrade"
        :on-success="upload">
        <Button type="primary" icon="ios-cloud-upload-outline" class="btn">批量上传</Button>
      </Upload>
    </div>
    <Row class="explainBox">
      <h4>注：</h4>
      <span>请在选择竞赛完毕后，先点击 ‘下载模板’ ，将成绩填入模板文件后，再点击 ‘批量上传’</span>
    </Row>

    <Modal
      v-model="modal"
      footer-hide>
      <div class="formBox">
<!--        <Row>-->
<!--          <Col :span="24">-->
            <Divider>
              <h4>{{modalTitle}}</h4>
            </Divider>
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col :span='24'>-->
<!--        个人赛修改-->
            <Form v-if="isSingle" ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="80" label-colon>
              <FormItem label="姓名">
                <Input v-model="formData.name" disabled></Input>
              </FormItem>
              <FormItem label="学号">
                <Input v-model="formData.sid" disabled></Input>
              </FormItem>
              <FormItem label="成绩" prop="grade">
                <Input v-model="formData.grade"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" style="width: 100%" @click="updateGrade">确定</Button>
              </FormItem>
            </Form>
<!--        团队赛修改-->
        <Form v-else ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="80" label-colon>
          <FormItem label="团队名称">
            <Input v-model="formData.groupName" disabled></Input>
          </FormItem>
          <FormItem label="教练">
            <Input v-model="formData.tname" disabled></Input>
          </FormItem>
          <FormItem label="成绩" prop="grade">
            <Input v-model="formData.grade"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" style="width: 100%" @click="updateGrade">确定</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {exportMethod} from "../../utils";
  import {showContestList, getGradesByCid, updateGrade, downloadExcel, uploadExcel} from "../../api/api";

  export default {
    name: "index",
    data() {
      return {
        // 竞赛id
        id: '',
        contestList: [],
        isSingle: true,
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '学号',
            key: 'sid'
          },
          {
            title: '成绩',
            key: 'grade'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
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
                      this.update(params.row);
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        columns1: [
          {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center'
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
            title: '成绩',
            key: 'grade'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
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
                      this.update(params.row);
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        data: [],
        modal: false,
        modalTitle: '',
        formData: {
          // name: '',
          // sid: '',
          // grade: ''
        },
        ruleValidate: {
          grade: [
            { required: true, message: '成绩不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
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
      // 根据竞赛id查询
      search(d) {
        if(!this.id) {
          this.$Message.warning("请选择要查询成绩的竞赛！")
        } else {
          getGradesByCid(this.id).then(res => {
            const data = res.data;
            if(data.code === 0) {
              if(d !== -1 && data.data.length === 0) {
                this.$Message.success("查询成功，暂无数据！");
              } else {
                this.isSingle = data.data[0].type === 'single';
                // console.log(data);
                this.data = data.data;
                if(d !== -1) {
                  this.$Message.success("查询成功！");
                }
              }
            } else {
              this.$Message.error(data.data.message);
            }
          }).catch(err => {
            console.log(err);
          })
        }
      },
      // 打开修改成绩Modal
      update(row) {
        this.modalTitle = '修改成绩';
        this.modal = true;
        // 浅拷贝
        this.formData = {...row};
      },
      // 修改成绩
      updateGrade() {
        this.$refs['formValidate'].validate(valid => {
          if(valid) {
            updateGrade(this.formData).then(res => {
              const data = res.data;
              if(data.code === 0) {
                this.$Message.success(data.data.message);
                this.search(-1);
              } else {
                this.$Message.error(data.data.message);
              }
            }).catch(err => {
              console.log(err);
            });
            this.modal = false;
          } else {
            this.$Message.error("请填写必填项！");
          }
        });
      },
      // 下载模板
      download() {
        if(!this.id) {
          this.$Message.warning("请先选择竞赛！");
        } else {
          // 确定文件名
          let name = "";
          for(let i of this.contestList) {
            if(i.cid === this.id) {
              name = i.name;
            }
          }
          let data = {
            fileName: name + '.xlsx',
            params: {
              cid: this.id
            }
          };
          exportMethod(data);
        }
      },
      //批量上传
      upload(res) {
        // console.log(res);
        if(res.code === 0 ) {
          this.$Message.success(res.data.message);
          this.search(-1);
        } else {
          this.$Message.error("上传失败！");
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
  .father {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
  }
  .btn {
    margin-left: 5px;
  }
  .tableBox {
    width: 100%;
  }
  .formBox {
    width: 100%;
    padding: 4% 8%;
  }
  .btnBox {
    display: flex;
    margin-top: 10px;
  }
  .explainBox {
    color: red;
    margin-top: 8px;
    display: flex;
    font-size: 0.8rem;
  }
</style>
