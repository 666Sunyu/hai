<template>
  <div class="container">
    <div class="centerWrap" @click="onHide" :class="{ modal: onShowSearchPage }">
      <!-- 历史个例查询 -->
      <div class="history_search">
        <!-- 查询结果 -->
        <div class="weather_info_result">
          <h3 class="title">
            <span>
              <img src alt />个例详情
            </span>
            <span class="back" @click="$router.back()">
              <img src="./imgs/back.png" alt />返回上级
            </span>
          </h3>
          <div class="timeWrap">
            <span>时间:</span>
            <span
              class="time"
            >{{moment(getData.item.startTime,'YYYYMMDDHHmmss').format('YYYY年MM月DD日')}}~{{moment(getData.item.endTime,'YYYYMMDDHHmmss').format('YYYY年MM月DD日')}}</span>
            <div class="btm">
              <div class="type">
                类型:
                <span>{{getData.item.type}}</span>
                <span v-if="getData.item.name">({{getData.item.name}})</span>
              </div>
              <div class="happen">
                发生地:
                <span>{{getData.item.occurred}}</span>
              </div>
              <div v-if="getData.item.cupyState==3">
                <a-button type="link" icon="download" @click="downCaseDate">下载个例数据</a-button>
              </div>
            </div>
          </div>
          <div class="message">
            详细信息:
            <br />
            <div class="content">{{getData.item.remarks}}</div>
          </div>
          <div class="download">
            附件下载:
            <a-button @click="handelShowUpload">
              <a-icon type="download" />点击下载附件
            </a-button>
          </div>
        </div>
        <!-- 下载列表 -->
        <div class="filesWrap filesAudit" v-show="showUpload">
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
              <span class="custom-tree-node" slot-scope="{ node }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
          <!-- 下载 -->
          <div class="butn">
            <el-button
              @click="download"
              :disabled="!uploadItem.label"
              type="primary"
              icon="el-icon-download"
              circle
            ></el-button>
          </div>
          <!-- 显示列表 -->
          <div class="right">
            <ul v-if="uploadItem.fileList&&uploadItem.fileList.length">
              <li v-for="(file,index) in uploadItem.fileList" :key="index">
                <el-checkbox v-model="file.checked"></el-checkbox>
                <span>{{file.name}}</span>
                <i class="el-icon-success"></i>
              </li>
            </ul>
            <ul class="empty" v-else>暂无数据</ul>
          </div>
        </div>
        <!-- 选择产品类型 -->
        <div class="weather_info_check">
          <h2 class="title">
            <div class="left">
              <img src="./imgs/pic.png" alt />
              <span>选择产品类型</span>
            </div>
            <div class="right" v-if="info">
              <a-date-picker class="date" @change="onChangeDate" v-model="productTime" />
              <a-select
                v-if="timeinList.length"
                v-model="timeHour"
                @change="onHourChange"
                class="time"
                style="width: 80px;"
              >
                <a-select-option v-for="hour in timeinList" :key="hour.name">
                  {{
                  hour.name
                  }}
                </a-select-option>
              </a-select>
              <a-select
                v-if="minuteList.length"
                v-model="timeMinute"
                @change="onMinuteChange"
                class="time"
                style="width: 80px;"
              >
                <a-select-option v-for="minute in minuteList" :key="minute.name">{{ minute.name }}</a-select-option>
              </a-select>
            </div>
          </h2>
          <div class="search_wrap">
            <ul class="searchHead">
              <li
                v-for="product in productType"
                :key="product.name"
                :class="{ active: product.checked }"
                @click="onCheckProduct(product)"
              >{{ product.name }}</li>
            </ul>
            <div class="searchBody" v-if="treeData.length">
              <a-tree
                autoExpandParent
                defaultExpandAll
                showLine
                :treeData="treeData"
                @select="onSelectTree"
              />
            </div>
            <div class="searchBody nodate" v-else>无数据</div>
          </div>
          <div class="menuWrap">
            <!-- 区域 -->
            <div class="menu" v-for="menu in menus" :key="menu.type" v-show="!menu.disabled">
              <span>{{ menu.type }}</span>
              <div class="scrollWrapper" :ref="menu.ref">
                <ul :class="{ disabled: menu.disabled }">
                  <li
                    :class="{ num: menu.type != '区域', active: list.checked,angle:menu.type == '仰角' }"
                    v-for="list in menu.lists"
                    :key="list.name"
                    @click="onCheckMenu(list)"
                  >{{ list.name }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 地图展示 -->

      <div class="product_show">
        <div class="imgWrap">
          <img :src="imgsUrl" :onerror="defaultImg" />
          <div
            class="prev"
            v-if="minuteList.length||timeinList.length"
            @click="onChangePage(false)"
          ></div>
          <div class="next" v-if="minuteList.length||timeinList.length" @click="onChangePage(true)"></div>
          <a-spin class="spin" :spinning="spinning"></a-spin>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./CaseView.scss" lang="scss" scoped></style>
<script src="./CaseView.js"></script>
