<template>
  <div class="container">
    <div class="head">
      <div class="imgWrap">
        <span>个例计算分析</span>
      </div>
      <div class="hebing" @click="onMerge">
        <img src="./imgs/merge.png" alt />
        <span>合并个例</span>
      </div>
      <div class="back" @click="$router.back()">
        <img src="../caseAudit/imgs/back.png" alt />
        <span>返回上级</span>
      </div>
    </div>
    <div class="centerWrap">
      <div class="saveFile">
        <div class="tableWrap">
          <a-table
            :columns="columns"
            :rowSelection="rowSelection"
            :dataSource="tableData"
            @change="change"
            :loading="isLoading"
            :pagination="pagination"
          >
            <template slot="operation" slot-scope="text, record">
              <span class="td_xiugai" @click="onModific(text,record)"></span>
              <span class="td_delete" @click="onDelete(text,record)"></span>
            </template>
          </a-table>
        </div>
      </div>
      <div class="popup" v-if="showModal&&selectedRows.length>=2">
        <div class="close" @click="showModal=false">X</div>
        <form class="form">
          <div class="data wraper">
            <label class="lab">
              <span>开始日期:</span>
            </label>
            <a-date-picker v-model="beginDate" />
            <a-time-picker format="HH" v-model="beTiem[0]" />
            <label class="lab">
              <span>结束日期:</span>
            </label>
            <a-date-picker v-model="endDate" />
            <a-time-picker format="HH" v-model="beTiem[1]" />
          </div>

          <!-- 天气类型 -->
          <div class="weatherType wraper">
            <label class="lab">
              <span>天气类型:</span>
            </label>
            <ul class="typeList">
              <a-checkbox
                :indeterminate="indeterminateType"
                @change="onCheckAllChange"
                :checked="isCheckAllType"
              >全选</a-checkbox>
              <a-checkbox-group
                :options="weatherTypeOptions"
                v-model="typeCheckedList"
                @change="onTypeChange"
              />
            </ul>
          </div>
          <!-- 别名 -->
          <div class="weatherName wraper">
            <label>
              <span>别名:</span>
            </label>
            <a-input class="ipt" v-model="saveData.name" />
            <span class="small">(例:山竹)</span>
          </div>
          <!-- 发生地 -->
          <div class="weatherArea wraper">
            <label class="lab">
              <span>发生地:</span>
              <br />
              <span class="small">(落区及区县)</span>
            </label>
            <div class="happenArea">
              <a-checkbox @change="checkAllHappen" :checked="isCheckAllHappen">全选</a-checkbox>
              <a-checkbox-group
                :options="plainOptionsHappen"
                v-model="happenCheckedList"
                @change="happenListChange"
              />
            </div>
          </div>
          <!-- 消息来源 -->
          <div class="weatherMessage wraper">
            <label class="lab">
              <span>消息来源:</span>
            </label>
            <a-input class="ipt" v-model="saveData.source" />
          </div>
          <!-- 人数统计 -->
          <div class="weatherCount wraper">
            <label class="lab">
              <span>死亡人数:</span>
            </label>
            <a-input class="ipt" v-model="saveData.deathToll" />
            <label class="lab">
              <span>受伤人数:</span>
            </label>
            <a-input class="ipt" v-model="saveData.injuryToll" />
            <label class="lab">
              <span>失踪人数:</span>
            </label>
            <a-input class="ipt" v-model="saveData.disappearToll" />
            <label class="lab">
              <span>经济损失(万元):</span>
            </label>
            <a-input class="ipt" v-model="saveData.lose" />
          </div>
          <!-- 
          <div class="weatherDetail wraper">
            <label class="lab">
              <span>灾情详情:</span>
            </label>
            <a-textarea :rows="4" v-model="saveData.remarks" />
          </div>
          <div class="weatherEnter wraper">
            <label class="lab">
              <span>录入人:</span>
            </label>
            <a-input class="ipt" v-model="saveData.enterName" />
          </div>
         
          </div>-->
          <!-- <div class="weatherFile wraper">
            <label class="labFile">
              <span>文件上传:</span>
            </label>
            <div>
              <a-button @click="handelShowUpload">
                <a-icon type="upload" />点击上传文件
              </a-button>
            </div>
          </div>-->
        </form>
        <!-- 上传列表 -->
        <div class="filesWrap" :class="{filesAudit:isAudit}" v-show="showUpload">
          <div class="close2" @click="showUpload = false">X</div>
          <div class="left">
            <el-tree
              :data="tree"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              ref="tree"
              :highlight-current="true"
              @node-click="handleCheckChange"
            >
              <span v-if="!isAudit" class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="!data.showInput">{{ node.label }}</span>
                <el-input
                  v-else
                  size="mini"
                  placeholder="请输入名称"
                  v-model="data.editName"
                  @change="handelEnter(data)"
                  @blur="handelEnter(data)"
                ></el-input>
                <span class="apd">
                  <!-- 编辑名称 -->
                  <i class="el-icon-edit" style="margin-right:10px" @click="editName(data)"></i>
                  <!-- 增加 -->
                  <i
                    style="margin-right:10px"
                    class="el-icon-circle-plus-outline"
                    @click="append(data)"
                  ></i>
                  <!-- 删除 -->
                  <el-popconfirm title="确定删除该目录？" @onConfirm="remove(node, data)">
                    <i class="el-icon-delete" slot="reference"></i>
                  </el-popconfirm>
                </span>
              </span>
              <span v-else class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="!data.showInput">{{ node.label }}</span>
                <el-input
                  v-else
                  size="mini"
                  placeholder="请输入名称"
                  v-model="data.editName"
                  @change="handelEnter(data)"
                  @blur="handelEnter(data)"
                ></el-input>
              </span>
            </el-tree>
          </div>
          <!-- 上传/下载 -->
          <div class="butn">
            <a-upload
              :show-file-list="false"
              class="upload"
              name="file"
              :multiple="true"
              action="/stweather/proxy/172.22.68.119:8667/multiUpload"
              @change="handleChange"
              :disabled="!uploadItem.label"
            >
              <!-- <span class="sc">上传</span> -->
              <el-button :disabled="!uploadItem.label" type="primary" icon="el-icon-upload2" circle></el-button>
            </a-upload>
          </div>
          <div class="right">
            <ul v-if="uploadItem.fileList&&uploadItem.fileList.length">
              <li v-for="(file,index) in uploadItem.fileList" :key="index">
                <i class="el-icon-document"></i>
                {{file.name}}
                <i v-if="file.status==='uploading'">···</i>
                <i class="el-icon-success" v-else-if="file.status==='done'"></i>
                <i class="el-icon-error" v-else-if="file.status==='error'"></i>
                <el-popconfirm title="确定删除该文件？" @onConfirm="removeFile(file,uploadItem.fileList)">
                  <i class="el-icon-delete del" slot="reference"></i>
                </el-popconfirm>
              </li>
            </ul>
            <ul class="empty" v-else>暂无数据</ul>
          </div>
        </div>
        <div class="submit">
          <a-button class="save" type="primary" @click="onSave">确定</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
    
<style src='./CaseCalc.scss' lang="scss" scoped >
</style>
<script src='./CaseCalc.js'>
</script>