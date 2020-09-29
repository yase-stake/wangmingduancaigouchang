<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="info.isShow"
      @close="cancel"
      width="68%"
    >
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <el-row>
              <el-col :span="14" :offset="5">
                <el-form-item label="一级分类">
                  <el-select
                    v-model="forminfo.first_cateid"
                    @change="topChange"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in categorylist"
                      :key="item.id"
                      :label="item.catename"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                  <el-select
                    v-model="forminfo.second_cateid"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in secondlist"
                      :key="item.id"
                      :label="item.catename"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="goodsname">
                  <el-input
                    v-model="forminfo.goodsname"
                    placeholder="请输入商品名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                  <el-input
                    v-model="forminfo.price"
                    placeholder="请输入商品价格"
                  ></el-input>
                </el-form-item>
                <el-form-item label="市场价格" prop="market_price">
                  <el-input
                    v-model="forminfo.market_price"
                    placeholder="请输入市场价格"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                  <el-upload
                    action=""
                    :auto-upload="false"
                    list-type="picture-card"
                    :limit="1"
                    :on-preview="see"
                    :file-list="filelist"
                    :on-change="change"
                    :on-remove="remove"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <el-dialog
                    title="查看图片"
                    :visible.sync="dialogVisible"
                    :append-to-body="true"
                  >
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </el-form-item>
                <el-form-item label="商品规格">
                  <el-select
                    v-model="forminfo.specsid"
                    @change="specsChange"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in specslist"
                      :key="item.id"
                      :label="item.specsname"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品属性值">
                  <el-select
                    v-model="forminfo.specsattr"
                    multiple
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in attrslist"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="详细描述" name="second">
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否新品">
                  <el-switch
                    v-model="forminfo.isnew"
                    :active-value="1"
                    :inactive-value="2"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否热卖">
                  <el-switch
                    v-model="forminfo.ishot"
                    :active-value="1"
                    :inactive-value="2"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态">
                  <el-switch
                    v-model="forminfo.status"
                    :active-value="1"
                    :inactive-value="2"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col>
                <vue-wangeditor
                  ref="wangeditor"
                  id="editor"
                  width="100%"
                ></vue-wangeditor>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 表单 -->
        <!-- rules 是设置表单必填项-->

        <el-row>
          <el-col :span="10" :offset="5">
            <el-form-item label="">
              <el-button type="primary" @click="submit()">提交</el-button>
              <el-button type="warning" @click="reset()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="info.isShow = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </span> -->
    </el-dialog>
  </div>
</template> 

<script>
import vueWangeditor from "vue-wangeditor";
import { addGoods, editGoods } from "@/request/goods";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  first_cateid: "",
  second_cateid: "",
  goodsname: "",
  price: "",
  market_price: "",
  img: "",
  description: "",
  specsid: "",
  specsattr: [],
  isnew: 2,
  ishot: 2,
  status: 1, //1正常
};
let resetItem = { ...defaultItem };

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      forminfo: { ...defaultItem },
      rules: {
        catename: [{ required: true, message: "必填", trigger: "blur" }, {}],
      },
      filelist: [],
      activeName: "first",
      secondlist: [],
      attrslist: [], //二级分类
    };
  },
  computed: {
    ...mapGetters({
      categorylist: "category/categorylist",
      specslist: "specs/specslist",
    })
  },
  mounted() {
    if (!this.categorylist.length) {
      this.get_category_list();
    }
    if (!this.specslist.length) {
      this.get_specs_list();
    }
  },

  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
      get_specs_list: "specs/get_specs_list",
      get_goods_list: "goods/get_goods_list",
    }),
    topChange(val) {
      this.secondlist = [];
      this.forminfo.second_cateid = "";
      this.categorylist.forEach((v) => {
        if (v.id == val) {
          this.secondlist = v.children;
        }
      });
    },
    specsChange(id) {
      this.attrslist = [];
      this.forminfo.specsattr = [];
      this.specslist.forEach((val) => {
        if (val.id == id) {
          this.attrslist = val.attrs;
        }
      });
    },
    remove(file, fileList) {
      this.forminfo.img = [];
    },
    async submit() {
      this.forminfo.description = this.$refs.wangeditor.getHtml();
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //如果验证通过
          let res;
          let fd = new FormData();
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          if (this.info.isAdd) {
            res = await addGoods(fd);
          } else {
            res = await editGoods(fd);
          }

          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_goods_list();
            this.cancel();
          } else {
            this.$message.error(res.msg);
            
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        //添加重置
        this.forminfo = { ...defaultItem };
      } else {
        //修改重置
        this.setinfo({ ...defaultItem });
      }
    },
    setinfo(val) {
     
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      val.children ? delete val.children : "";
      this.topChange(val.first_cateid);
      this.specsChange(val.specsid);
      "firstcatename" in val ? delete val.firstcatename : "";
      "secondcatename" in val ? delete val.secondcatename : "";

      //手动设置编辑器的内容
        this.$nextTick(()=>{
                this.$refs.wangeditor.setHtml(val.description);
            })

      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    change(file, fileList) {
      this.forminfo.img = file.raw;
    },
    cancel() {
      this.forminfo = { ...resetItem };

      this.filelist = [];
       this.$refs.wangeditor.setHtml('')
    },
  },
  components: { vueWangeditor },
};
</script>
<style scoped>
</style>