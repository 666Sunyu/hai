<template>
  <div class="container">
    <div class="head">
      <div class="imgWrap">
        <img class="save_img" src="./imgs/7.png" alt />
      </div>
      <div class="back" @click="$router.back()">
        <img src="./imgs/back.png" alt />
        <span>返回上级</span>
      </div>
    </div>
    <div class="centerWrap">
      <div class="saveFile">
        <div class="typeWrap">
          <span @click="listType='unCheck'" :class="{active:listType==='unCheck'}">未审核</span>
          <span @click="listType='unPass'" :class="{active:listType==='unPass'}">未通过</span>
          <span @click="listType='pass'" :class="{active:listType==='pass'}">已通过</span>
        </div>
        <div class="tableWrap">
          <a-table
            :columns="columns"
            :dataSource="tableData"
            @change="change"
            :loading="isLoading"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="text, record">
              <span v-if="listType==='unCheck'" class="td_audit" @click="onAudit(text,record)"></span>
              <span
                v-else-if="listType==='unPass'"
                class="td_xiugai"
                @click="onModific(text,record)"
              ></span>
              <span v-else class="td_xiugai" @click="onModificPass(text,record)"></span>
              <span class="td_delete" @click="onDelete(text,record)"></span>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
    
<style src='./CaseAudit.scss' lang="scss" scoped >
</style>
<script src='./CaseAudit.js'>
</script>