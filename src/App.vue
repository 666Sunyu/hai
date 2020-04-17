<template>
  <!-- <keep-alive>
    <router-view />
  </keep-alive>-->
  <router-view />
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  font-family: "Microsoft YaHei", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol" !important;
  margin: 0;
  padding: 0;
}
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: "myNum";
  src: url("./font/1.eot");
  src: url("./font/1.eot?#font-spider") format("embedded-opentype"),
    url("./font/1.otf") format("opentype"),
    url("./font/1.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Helvetica";
  src: url("./font/Helvetica.eot");
  src: url("./font/Helvetica.eot?#font-spider") format("embedded-opentype"),
    url("./font/Helvetica.otf") format("opentype"),
    url("./font/Helvetica.ttf") format("truetype");

}
@font-face {
  font-family: "lato";
  src: url("./font/lato.eot");
  src: url("./font/lato.eot?#font-spider") format("embedded-opentype"),
    url("./font/lato.otf") format("opentype"),
    url("./font/lato.ttf") format("truetype");

}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: #fff;
}
::-webkit-scrollbar-thumb {
  background: #b3d0ee;
}
.w{
  width: 1290px;
  margin: 0 auto;
}
</style>
