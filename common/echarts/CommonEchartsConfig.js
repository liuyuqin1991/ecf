/**
 * echart 通用全局配置
 *
 * @author liuyuqin
 * @date 2018年6月4日11:26:01
 *
 */

const color = ["#ff0552","#cfb307","#38c268"];

//坐标轴颜色
const axis_color = '#55B9F7';
//折线图
const chart_type_line = 'line';
//柱状图
const chart_type_bar = 'bar';
//饼图
const chart_type_pie = 'pie';
//地图
const chart_type_map = 'map';

//分割段数
const split_number = 5;


class CommonEchartsConfig {

    /**
     * 折线图通用化配置调用入口
     * @param echartTitle 图表名称
     * @param legendData 图例 例如['最低气温','最高气温']
     * @param seriesData 数据 例如[['12°','15°','16°'],['22°','25°','32°']]，注意seriesData数组的长度要等于legendData的长度
     * @param tooltipCallBack 提示信息回调函数
     * @param xAxisData x轴类别信息 例如['五月','六月','七月']
     * @returns {*}
     */
    static initDefaultLine(echartTitle, legendData, seriesData, tooltipCallBack, xAxisData) {
        let option = initDefault(chart_type_line, echartTitle, legendData, seriesData, tooltipCallBack);
        customLineAxis(option, xAxisData, legendData, chart_type_line);
        return option;
    }

    /**
     * 柱状图通用化配置调用入口
     * @param echartTitle 图表名称
     * @param legendData 图例 例如['最低气温','最高气温']
     * @param seriesData 数据 例如[['12°','15°','16°'],['22°','25°','32°']]，注意seriesData数组的长度要等于legendData的长度
     * @param tooltipCallBack 提示信息回调函数
     * @param xAxisData x轴类别信息 例如['五月','六月','七月']
     * @returns {*}
     */
    static initDefaultBar(echartTitle, legendData, seriesData, tooltipCallBack, xAxisData) {
        let option = initDefault(chart_type_bar, echartTitle, legendData, seriesData, tooltipCallBack);
        customLineAxis(option, xAxisData, legendData, chart_type_bar);
        return option;
    }

    /**
     * 地图通用化配置调用入口
     * @param echartTitle 图表名称
     * @param legendData 图例
     * @param seriesData 数据
     * @param tooltipCallBack 提示信息回调函数
     * @param max 最大值
     * @returns {*}
     */
    static initDefaultMap(echartTitle, legendData, seriesData, tooltipCallBack, max) {
        let option = initDefault(chart_type_map, echartTitle, legendData, seriesData, tooltipCallBack);
        customMinMaxDataRange(option, max);
        return option;
    }

    /**
     * 饼图通用化配置调用入口
     * @param echartTitle 图表名称
     * @param legendData 图例 例如['最低气温','最高气温']
     * @param seriesData 数据 例如['22°','25°']，注意seriesData数组的长度要等于legendData的长度
     * @param tooltipCallBack 提示信息回调函数
     * @param max 最大值（为切换漏斗图使用，如不需切换，可修改代码）
     * @returns {*}
     */
    static initDefaultPie(echartTitle, legendData, seriesData, tooltipCallBack, max) {
        let option = initDefault(chart_type_pie, echartTitle, legendData, seriesData, tooltipCallBack);
        customMaxFunnel(option, max);
        return option;
    }

    /**
     * 个性化配置调用方法：给Y轴标签加上百分号，数据范围0~1
     * @param option option对象
     * @param num 需要加百分号的Y轴序号，限0,1,2 2即两个Y轴都百分号format
     */
    static setYAxisPercent(option, num) {
        if (num && num === 2) {
            for (let i = 0; i < num; i++) {
                option.yAxis[i].axisLabel.formatter = function (value) {
                    return value * 100 + '%';
                };
            }
        }
        else {
            option.yAxis[num].axisLabel.formatter = function (value) {
                return value * 100 + '%';
            };
        }
    }

    /**
     * 个性化配置调用方法：根据省市县名称获取该省或该市或该县行政区划地图
     * @param option 配置对象
     * @param name 省市县名称
     * @param level 地图级别
     */
    static getSpecificMap(option, name, level) {
        //点击省级后 显示 该省的市级
        if (level === 2) {
            option.series[0].mapType = name;
        }
        //点击市级后 显示 回到省级
        else {
            option.series[0].mapType = 'china';
        }
        return option;
    }


    /**
     * 个性化配置调用方法：禁用toolBox
     * @param option
     */
    static setToolBoxDisable(option) {
        option.toolbox.show = false;
    }

    /**
     * 个性化配置调用方法：设置饼图空心
     * @param option
     * @param radiusBegin 半径开始百分比数值，选择范围：0-100 半径
     * @param radiusEnd 半径结束百分比数值，选择范围：0-100
     */
    static setPieHollow(option, radiusBegin, radiusEnd) {
        option.series[0].radius = [radiusBegin + '%', radiusEnd + '%'];
        option.series[0].itemStyle = {
            emphasis: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            }
        };
    }

    /**
     * 个性化配置调用方法：显示饼图lable到空心区域（必须是空心饼图）
     * @param option
     */
    static setPieLabelToCenter(option) {
        //去掉label和label线，在空心区域显示label
        option.series[0].itemStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            }
        };
    }

    /**
     * 个性化配置调用方法：隐藏饼图lable
     * @param option
     */
    static setPieLabelHide(option) {
        //去掉label和label线，在空心区域显示label
        option.series[0].itemStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        };
    }

    /**
     * 个性化配置调用方法：设置饼图的显示位置
     * @param option
     * @param center 位置坐标 例如：['40%', '60%']
     */
    static setPiePosition(option, center) {
        option.series[0].center = center;
    }

    /**
    * 个性化配置调用方法：设置图表图例的是否显示
    * @param option
    * @param isShow 是否显示，boolean类型
    */
    static setLegendIsShow(option, isShow) {
        option.legend.show = isShow;
    }

    /**
     * 个性化配置调用方法：设置图表图例的显示位置
     * @param option
     * @param orient 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
     * @param x 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
     * @param y 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
     */
    static setLegendPosition(option, orient, x, y) {
        option.legend.orient = orient;
        option.legend.x = x;
        option.legend.y = y;
    }

    /**
     * 个性化配置调用方法：设置图表工具栏的是否显示
     * @param option
     * @param isShow
     */
    static setToolboxIsShow(option, isShow) {
      option.toolbox.show = isShow;
    }

    /**
    * 个性化配置调用方法：设置图表工具栏的显示位置
    * @param option
    * @param orient 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
    * @param x 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
    * @param y 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
    */
    static setToolboxPosition(option, orient, x, y) {
        option.toolbox.orient = orient;
        option.toolbox.x = x;
        option.toolbox.y = y;
    }


	/**
	 * 设置主标题位置
     * @param option
     * @param x 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
	 * @param y 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
	 */
    static setTitlePosition(option, x, y) {
        option.title.x = x;
        option.title.y = y;
    }


    /**
     * 个性化配置调用方法：为折线坐标轴添加辅助线
     * @param option
     * @param labelData 例如：'开始时间'
     * @param xAxisData 横轴起始
     * @param isSingle 是否单一，是，只显示第一数据组的辅助线，否则所有数据组都显示辅助线
     * @param length 辅助线长度
     */
    static setXAxisMarkerLine(option, labelData, xAxisData, isSingle, length) {
        let start = {
            xAxis: xAxisData,
            yAxis: 0,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: function () {
                            return labelData;
                        },
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        }
                    }
                }
            }
        };
        let end = {
            xAxis: xAxisData,
            yAxis: length,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: function () {
                            return labelData;
                        },
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        }
                    }
                }
            }
        };
        if (isSingle) {
            if (option.series[0]) {
                if (option.series[0].markLine) {
                    let data = [start, end];
                    option.series[0].markLine.data.push(data);
                }
                else {
                    let markLine = {
                        data: [
                            [start, end]
                        ]
                    };
                    option.series[0].markLine = markLine;
                }
            }
        }
        else {
            for (let s of option.series) {
                s.markLine.data.push([start, end]);
            }
        }
    }

    /**
     * 个性化配置调用方法：开启地图漫游组件 仅支持地图
     * @param option
     */
    static setMapRoam(option) {
        option.roamController = {
            show: true,
            x: 'left',
            width: 50,
            height: 80,
            handleColor: '#55B9F7',
            mapTypeControl: {
                'china': true
            }
        };
    }

    /**
     * 设置主标题
     * @param option
     * @param title 标题
     */
    static setTitleText(option, titleText) {
        if (option.title) {
            option.title.text = titleText;
        }
        else {
            option.title = {
                text: titleText
            }
        }
    }

	/**
	 * 设置主标题是否显示
	 * @param option
	 * @param isShow 是否显示
	 */
    static setTitleIsShow(option, isShow) {
        if (isShow) {
            option.title.show = true;
        }
        else {
            option.title.show = false;
        }
    }

    /**
     * 设置坐标轴是否显示
     * @param option
     * @param XAxisShow X轴是否显示
     * @param YAxisShow Y轴是否显示
     */
    static setAxisIsShow(option, XAxisShow, YAxisShow){
        option.xAxis.forEach(function (value, i) {
            if (!value.axisLine){
                value.axisLine = {
                    show:XAxisShow
                };
            }
            else{
              value.axisLine.show = XAxisShow;
            }
        });
        option.yAxis.forEach(function (value, i) {
            if (!value.axisLine){
                value.axisLine = {
                   show:YAxisShow
                };
            }
            else{
                value.axisLine.show = YAxisShow;
            }
        });
    }

    /**
     * 设置坐标轴lable是否显示
     * @param option
     * @param XAxisLableShow X轴lable是否显示
     * @param YAxisLableShow Y轴lable是否显示
     */
    static setAxisLableIsShow(option, XAxisLableShow, YAxisLableShow){
        option.xAxis.forEach(function (value, i) {
            if (!value.axisLabel){
                value.axisLabel = {
                    show:XAxisLableShow
                };
            }
            else{
                value.axisLabel.show = XAxisLableShow;
            }
        });
        option.yAxis.forEach(function (value, i) {
            if (!value.axisLabel){
                value.axisLabel = {
                    show:YAxisLableShow
                };
            }
            else{
                value.axisLabel.show = YAxisLableShow;
            }
        });
    }

    /**
     * 设置分隔线是否显示
     * @param option
     * @param XAxisSplitLineShow X轴分隔线是否显示
     * @param YAxisSplitLineShow Y轴分隔线是否显示
     */
    static setAxisSplitLineIsShow(option, XAxisSplitLineShow, YAxisSplitLineShow){
        option.xAxis.forEach(function (value, i) {
            if (!value.splitLine){
                value.splitLine = {
                    show : XAxisSplitLineShow
                };
            }
            else{
                value.splitLine.show = XAxisSplitLineShow;
            }
        });
        option.yAxis.forEach(function (value, i) {
            if (!value.splitLine){
                value.splitLine = {
                  show : YAxisSplitLineShow
                };
            }
            else{
                value.splitLine.show = YAxisSplitLineShow;
            }
        });
    }

    /**
     * 设置坐标轴小标记是否显示
     * @param option
     * @param XAxisTickShow X轴坐标轴小标记是否显示
     * @param YAxisTickShow Y轴坐标轴小标记是否显示
     */
    static setAxisTickIsShow(option, XAxisTickShow, YAxisTickShow){
        option.xAxis.forEach(function (value, i) {
            if (!value.axisTick){
                value.axisTick = {
                    show : XAxisTickShow
                };
            }
            else{
                value.axisTick.show = XAxisTickShow;
            }
        });
        option.yAxis.forEach(function (value, i) {
            if (!value.axisTick){
                value.axisTick = {
                    show : YAxisTickShow
                };
            }
            else{
                value.axisTick.show = YAxisTickShow;
            }
        });
    }

    /**
     * 设置坐标轴显示lable的样式
     * @param option
     * @param XAxisLableStyle X轴lable样式对象，样式用驼峰法编写
     * @param YAxisLableStyle Y轴lable样式对象，样式用驼峰法编写
     */
    static setAxisLableStyle(option, XAxisLableStyle, YAxisLableStyle){
        if(XAxisLableStyle){
          option.xAxis.forEach(function (value, i) {
            if (!value.axisLabel){
              value.axisLabel = {
                textStyle : XAxisLableStyle
              };
            }
            else{
              value.axisLabel.textStyle = XAxisLableStyle;
            }
          });
        }
        if(YAxisLableStyle){
          option.yAxis.forEach(function (value, i) {
            if (!value.axisLabel){
              value.axisLabel = {
                textStyle : YAxisLableStyle
              };
            }
            else{
              value.axisLabel.textStyle = YAxisLableStyle;
            }
          });
        }
    }

    /**
     * 设置series的样式
     * @param option
     * @param item 对象数组，每一个对象中包含该条series对应的type及相应的属性
     */
    static setSeriesItemStyle(option,item){
        option.series.forEach(function (value, i) {
            if (item){
                Object.keys(item[i]).forEach(function(key){
                    value[key] = item[i][key];
                });
            }
        });
    }

    /**
     * 设置X轴是否两端留白
     * @param option
     * @param XAxisIsBoundaryGap X轴是否两端留白
     */
    static setXAxisIsBoundaryGap(option, XAxisIsBoundaryGap){
        option.xAxis.forEach(function (value, i) {
            value.boundaryGap = XAxisIsBoundaryGap;
        });
    }

    /**
     * 设置legend的属性
     * @param option
     * @param name 属性名称
     * @param value 属性值
     */
    static setLegendAttr(option,name,value){
        option.legend[name] = value;
    }

    /**
     * 设置legend的文字样式
     * @param option
     * @param textStyle 文字样式
     */
    static setLegendTextStyle(option,textStyle){
        option.legend.textStyle = textStyle;
    }

    /**
     * 设置legend的icon
     * @param option
     * @param icon 可以设置默认icon，也可以是自定义图片路径
     */
    static setLegendIcon(option,icon){
        option.legend.data.forEach(function (value, i) {
            value.icon = icon;
        });
    }

    /**
     * 设置grid的位置
     * @param x 直角坐标系内绘图网格左上角横坐标
     * @param y 直角坐标系内绘图网格左上角纵坐标
     * @param x2 直角坐标系内绘图网格右下角横坐标
     * @param y2 直角坐标系内绘图网格右下角纵坐标
     */
    static setGrid(option,x,y,x2,y2){
        if (option.grid){
            option.grid.x = x;
            option.grid.y = y;
            option.grid.x1 = x2;
            option.grid.y1 = y2;
        }
        else{
            option.grid = {
                x : x,
                y : y,
                x2 : x2,
                y2 : y2
            }
        }
    }

    /**
     * 设置Y轴名称是否显示
     * @param opstion
     * @param YAxisNameIsShow
     */
    static setYAxisNameIsShow(option,YAxisNameIsShow){
      option.yAxis.forEach(function (value, i) {
        if (!YAxisNameIsShow){
          value.name = "";
        }
      });
    }

    /**
     * 设置提示框的文字样式
     * @param option
     * @param textStyle 样式对象
     */
    static setToolTipTextStyle(option,textStyle){
      option.tooltip.textStyle = textStyle;
    }
}

export { CommonEchartsConfig };

/**
 * 增加值域最大值，最小值默认为0
 * @param option
 * @param max 值域的最大值
 */
function customMinMaxDataRange(option, max) {
    option.dataRange.min = 0;
    option.dataRange.max = max;
}

/**
 * 设置漏斗图的最大值
 * @param option
 * @param max 值域的最大值
 */
function customMaxFunnel(option, max) {
    if (max) {
        option.toolbox.feature.magicType.option.funnel.max = max;
    }
}

/**
 * 自定义Axis坐标轴
 * @param option
 * @param xAxisData 坐标轴数据
 * @legendData 图例数据
 * @param chartType 图表类型，line或者bar
 */
function customLineAxis(option, xAxisData, legendData, chartType) {
    let xAxis = [];
    xAxis.push({
        data: xAxisData,
        type: 'category',
        boundaryGap: (chartType === chart_type_line ? false : true),
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: axis_color
            }
        }
    });
    //设置yAxis 可适应最多两个坐标轴，当多余两个需要显示的系列数据时，只显示一个Y坐标轴，并以seriesData的第一个数组的数据作为Y轴分段算法
    let yAxis = [], yAixsNum = legendData.length;
    if (yAixsNum > 2) {
        yAxis.push({
            type: 'value'
        });
    }


    else {
        for (let i = 0; i < yAixsNum; i++) {
            yAxis.push({
                type: 'value',
                name: legendData[i] instanceof Object?legendData[i].name:legendData[i],
                splitNumber: (legendData.length === 1) ? null : split_number,
                axisLine: {
                    lineStyle: {
                        color: axis_color
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: color[i]
                    }
                }
            });
        }
    }
    option.xAxis = xAxis;
    option.yAxis = yAxis;
}


//验证数据数组数目的正确性
function verifyDataLength(legendData, seriesData) {
    if (legendData && seriesData) {
        if (legendData.length === seriesData.length) {
            return true;
        }
    }
    return false;
}

/**
 * 默认初始化项
 * 1.xAxis x轴数组
 * 2.yAxis y轴数组
 * 3.series 数据内容数组,数组中每一项为一个系列的选项及数据
 * 4.legend 图例对象
 * 5.color 颜色数组
 * 6.tooltip 提示框对象
 * 7.toolbox 工具箱对象
 *
 * @params chartType 图表类型，例如"line"或者"bar"或者"map"
 * @params echartTitle 图表名称
 * @params xAxisData X轴数据数组，例如['五月','六月','七月']
 * @params legendData 图例数据数组，例如['最低气温','最高气温']
 * @params seriesData 详细数据多维数组，例如[['12°','15°','16°'],['22°','25°','32°']]
 * @params tooltipCallBack tooltip的显示回调函数
 */
function initDefault(chartType, echartTitle, legendData, seriesData, tooltipCallBack) {
    let option = {};
    if (verifyDataLength(legendData, seriesData)) {
        //装载title
        let title = {
            text: echartTitle,
            show: true //默认应该开启，显示图标标题
        };
        //设置legend
        let legend = {
            data: legendData
        };
        //装载option;
        option.title = title;
        option.color = color;
        option.legend = legend;
        //设置特殊默认series
        if (chartType === chart_type_line || chartType === chart_type_bar) {
            settingDefaultLineSeries(option, legendData, seriesData, tooltipCallBack, chartType);
        }
        else if (chartType === chart_type_map) {
            settingDefaultMapSeries(option, legendData, seriesData, tooltipCallBack);
        }
        else if (chartType === chart_type_pie) {
            settingDefaultPieSeries(option, legendData, seriesData, tooltipCallBack);
        }
        return option;
    }
    else {
        return null;
    }
}

//设置默认折线图series
function settingDefaultLineSeries(option, legendData, seriesData, tooltipCallBack, chartType) {
    //设置series
    let series = [];
    if (seriesData) {
        seriesData.forEach(function (value, i) {
            let s = {};
            s.type = chartType;
            s.symbolSize = 0;
            if (legendData[i] instanceof Object){
                s.name = legendData[i].name;
            }
            else{
                s.name = legendData[i];
            }
            s.data = seriesData[i];
            if (chartType === chart_type_bar) {
                s.barMinHeight = 5;
            }
            if (seriesData.length <= 2) {
                s.yAxisIndex = i;
            }
            series.push(s);
        });
    }
    //设置tooltip
    let tooltip = {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: axis_color,
                width: 2,
                type: 'solid'
            },
        },
        formatter: tooltipCallBack
    };
    //设置toolbox
    let toolbox = {
        show: true,
        x: 'right',
        y: 'top',
        feature: {
            magicType: {
                show: true,
                type: ['line', 'bar']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    };
    option.series = series;
    option.tooltip = tooltip;
    option.toolbox = toolbox;
    option.calculable = true;
}

//设置默认地图option,series
function settingDefaultMapSeries(option, legendData, seriesData, tooltipCallBack) {
    //设置地图值域
    let dataRange = {
        x: 'left',
        y: 'bottom',
        text: ['高', '低'],
        calculable: true,
        formatter: function (value) {
            return parseInt(value,10);
        }
    };
    //设置tooltip
    let tooltip = {
        trigger: 'item',
        showDelay: 200,
        transitionDuration: 0.8,
        enterable: true,
        formatter: tooltipCallBack
    };

    //设置工具栏
    let toolbox = {
        show: true,
        orient: 'horizontal',
        x: 'right',
        y: 'top',
        feature: {
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    };
    //设置series
    let series = [];
    if (seriesData) {
        seriesData.forEach(function (value, i) {
            series.push({
                type: chart_type_map,
                mapType: 'china',
                roam: false,
                itemStyle: {
                    normal: { label: { show: true } },
                    emphasis: { label: { show: true } }
                },
                name: legendData[i],
                data: seriesData[i],
                yAxisIndex: (seriesData.length <= 2 ? i : null)
            });
        });
    }
    option.series = series;
    option.tooltip = tooltip;
    option.dataRange = dataRange;
    option.legend.show = false;
    option.toolbox = toolbox;
}

//设置默认饼图option,series
function settingDefaultPieSeries(option, legendData, seriesData, tooltipCallBack) {
    //设置tooltip
    let tooltip = {
        trigger: 'item',
        showDelay: 200,
        transitionDuration: 0.8,
        enterable: true,
        formatter: tooltipCallBack
    };
    //设置toolbox
    let toolbox = {
        show: true,
        x: 'right',
        y: 'top',
        feature: {
            magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'center'
                    }
                }
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    };
    //设置series
    let series = [];
    let tempData = [];
    if (seriesData) {
        seriesData.forEach(function (value, i) {
            tempData.push({
                value: seriesData[i].value,
                name: seriesData[i].name,
            });
        });
        series.push({
            type: chart_type_pie,
            radius: '45%',
            minAngle: 5,
            center: ['50%', '60%'],
            data: tempData
        });
    }
    option.series = series;
    option.tooltip = tooltip;
    option.calculable = false;
    option.toolbox = toolbox;

}
