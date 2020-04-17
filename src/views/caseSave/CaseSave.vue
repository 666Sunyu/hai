<template>
  <div class="container">
    <div class="head">
      <div class="imgWrap">
        <img v-if="isAudit" class="save_img" src="./imgs/9.png" alt />
        <img v-else class="save_img" src="./imgs/historySave.png" alt />
      </div>
      <div class="back" @click="$router.back()">
        <img src="./imgs/back.png" alt />
        <span>返回上级</span>
      </div>
    </div>
    <div class="centerWrap">
      <div class="saveFile">
        <div class="title">
          <img v-if="isAudit" src="./imgs/sh.png" alt />
          <img v-else src="./imgs/6.png" alt />
        </div>
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
            <!-- 先做成单选 -->
            <!-- <div class="typeList">
              <a-radio-group v-model="saveData.type">
                <a-radio
                  v-for="item in weatherOptions"
                  :value="item.id"
                  :key="item.id"
                >{{item.name}}</a-radio>
              </a-radio-group>
            </div>-->
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
              <!-- <a-radio-group v-model="saveData.occurred">
                <a-radio v-for="name in plainOptionsHappen"
                         :value="name"
                         :key="name">{{name}}</a-radio>

              </a-radio-group>-->
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
          <!-- 灾情详情 -->
          <div class="weatherDetail wraper">
            <label class="lab">
              <span>灾情详情:</span>
            </label>
            <a-textarea :rows="4" v-model="saveData.remarks" />
          </div>
          <!-- 录入人 -->
          <div class="weatherEnter wraper">
            <label class="lab">
              <span>录入人:</span>
            </label>
            <a-input class="ipt" v-model="saveData.enterName" />
          </div>
          <!-- 审核意见 -->
          <div v-if="isAudit || $route.params.unPass" class="weatherOpinion wraper">
            <label :class="{ lab: isAudit }">
              <span>审核意见:</span>
            </label>
            <a-textarea :rows="4" v-model="auditMind" placeholder="审核通过可不填写" />
          </div>
          <!-- 审核人 -->
          <div v-if="isAudit" class="weatherAudit wraper">
            <label class="lab">
              <span>审核人:</span>
            </label>
            <a-input class="ipt" v-model="auditorName" />
          </div>
          <!-- 文件上传/下载 -->
          <div v-if="isAudit" class="weatherDown wraper">
            <label class="labFile">
              <span>附件下载:</span>
            </label>
            <a-button @click="handelShowUpload">
              <a-icon type="download" />点击下载附件
            </a-button>
            <!-- <a-select
              mode="multiple"
              placeholder="请选择附件"
              style="width: 200px"
              @change="selectDownloadList"
            >
              <a-select-option v-for="item in fileNames" :key="item">
                {{
                item
                }}
              </a-select-option>
            </a-select>-->
            <!-- <a-button type="primary" @click="download">下载</a-button> -->
          </div>
          <div v-else class="weatherFile wraper">
            <label class="labFile">
              <span>文件上传:</span>
            </label>
            <div>
              <a-button @click="handelShowUpload">
                <a-icon type="upload" />点击上传文件
              </a-button>
            </div>
          </div>
        </form>
        <!-- 上传列表 -->
        <div class="filesWrap" :class="{filesAudit:isAudit}" v-show="showUpload">
          <div class="close" @click="showUpload = false">X</div>
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
          <div class="butn" v-if="!isAudit">
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
          <div class="butn" v-else>
            <el-button
              @click="download"
              :disabled="!uploadItem.label"
              type="primary"
              icon="el-icon-download"
              circle
            ></el-button>
          </div>
          <!-- 录入或修改页面 -->
          <template v-if="!isAudit">
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
          </template>
          <!-- 审核页面 -->
          <template v-else>
            <div class="right">
              <ul v-if="uploadItem.fileList&&uploadItem.fileList.length">
                <li v-for="(file,index) in uploadItem.fileList" :key="index">
                  <el-checkbox v-model="file.checked"></el-checkbox>
                  {{file.name}}
                  <i class="el-icon-success"></i>
                </li>
              </ul>
              <ul class="empty" v-else>暂无上传数据</ul>
            </div>
          </template>
        </div>
        <div class="saveWrap">
          <div v-if="isAudit">
            <!-- 不通过退回 -->
            <span class="noPass" @click="onAudit(2)"></span>
            <span class="pass" @click="onAudit(0)"></span>
            <!-- 审核通过文档 -->
          </div>
          <div v-else>
            <a-button class="save" @click="onSave" :loading="loading">
              <img src="./imgs/save.png" alt /> 提交存档
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./CaseSave.scss" lang="scss" scoped></style>
<script src="./CaseSave.js"></script>
