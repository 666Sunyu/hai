import axios from 'axios'
export default {
    methods: {
        //抽稀判断
        getNoIntersectData(datas) {
            var result = [];
            var widthOffet = 55;
            var heightOffset = 20;
            var bounds = this.map.getBounds();
            var sw = bounds.getSouthWest(); //西南角
            var ne = bounds.getNorthEast(); //东北角

            // 过滤掉屏幕外的点
            var vaildData = datas.filter(function (el) {
                var isRange = false; //当前经纬度是否在屏幕范围内
                isRange =
                    el.lon > sw.lng &&
                    el.lon < ne.lng &&
                    el.lat < ne.lat &&
                    el.lat > sw.lat;
                return isRange;
            });
            vaildData.forEach(el => {
                var p = this.map.latLngToLayerPoint([el.lat, el.lon]);
                var left1 = p.x - widthOffet;
                var right1 = p.x + widthOffet;
                var top1 = p.y - heightOffset;
                var bottom1 = p.y + heightOffset;
                var isNoIntersect = true; //是否不相交
                result.forEach(item => {
                    var p = this.map.latLngToLayerPoint([item.lat, item.lon]);
                    var left2 = p.x - widthOffet;
                    var right2 = p.x + widthOffet;
                    var top2 = p.y - heightOffset;
                    var bottom2 = p.y + heightOffset;
                    // 判断两个矩形是否相交
                    if (
                        !(
                            left2 > right1 ||
                            right2 < left1 ||
                            top2 > bottom1 ||
                            bottom2 < top1
                        )
                    ) {
                        isNoIntersect = false;
                    }
                });
                if (isNoIntersect) {
                    result.push(el);
                }
            });
            return result;
        },
    }
}