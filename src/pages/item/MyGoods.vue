<template>
  <v-card>
    <v-card-title class="layout row">
      <v-btn color="primary" @click="show = true">
        新增商品
      </v-btn>
      <v-spacer/>
      <v-flex>
        状态：
        <v-btn-toggle v-model="saleable">
          <v-btn flat >全部</v-btn>
          <v-btn flat :value="true">上架</v-btn>
          <v-btn flat :value="false">下架</v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-text-field
        label="输入搜索条件"
        append-icon="search"
        single-line
        hide-details
        class="flex sm3"
        v-model="search"
      />
    </v-card-title>
    <v-divider/>
    <v-data-table
      :headers="headers"
      :items="goodsList"
      :pagination.sync="pagination"
      :total-items="totalGoods"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{props.item.cname}}</td>
        <td class="text-xs-center">{{ props.item.bname }}</td>
        <td class="justify-center layout px-1">
          <v-btn small color="info">
            编辑
          </v-btn>
          <v-btn small color="warning">
            删除
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="show" max-width="500" scrollable persistent>
      <v-card>
        <v-toolbar dense color="primary" dark class="title px-2">
          <span>新增商品</span>
          <v-spacer/>
          <v-btn icon @click="show = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="height: 600px;" class="px-5">
          hello
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>

</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {
        headers: [
          {text: "id", value: "id", align: 'center', sortable: true},
          {text: "标题", value: "title", align: 'center', sortable: false},
          {text: "分类", value: "cname", align: 'center', sortable: false},
          {text: "品牌", value: "bname", align: 'center', sortable: false},
          {text: "操作", align: 'center', sortable: false},
        ],
        goodsList: [],
        pagination: {},
        totalGoods: 0,
        loading: false,
        search: '',
        show:false,// 窗口显示
        saleable: 0,//
      }
    },
    watch: {
      pagination: {
        deep: true,
        handler() {
          this.getDataFromServer();
        }
      },
      search() {
        this.getDataFromServer();
      },
      saleable(){
        this.getDataFromServer();
      }
    },
    created() {
      this.getDataFromServer();
    },
    methods: {
      getDataFromServer() {
        // 开启进度条
        this.loading = true;

        // 发起ajax请求
        // page,rows,key,sortBy, desc
        this.$http.get("/item/spu/page", {
          params: {
            page: this.pagination.page,
            rows: this.pagination.rowsPerPage,
            sortBy: this.pagination.sortBy,
            desc: this.pagination.descending,
            key: this.search,
            saleable: this.saleable === 0 ? null : this.saleable
          }
        }).then(resp => {
          // 赋值
          this.goodsList = resp.data.items;
          this.totalGoods = resp.data.total;
          // 把进度条关闭
          this.loading = false;
        })
      }
    },
    components:{

    }
  }
</script>

<style scoped>

</style>
