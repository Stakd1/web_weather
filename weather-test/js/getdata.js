$(function () {
    // var baseurl = './images/';

    //天气图标
    var wthIcon = {
        yun: {
            title: '多云',
            icon: './images/yun.png',
        },
        yin: {
            title: '阴',
            icon: './images/yun.png',
        },
        qing: {
            title: '晴',
            icon: './images/qing.png',
        },
        lei: {
            title: '雷阵雨',
            icon: './images/lei.png',
        },
        yu: {
            title: '小雨',
            icon: './images/xiao.png',
        },
        zhong: {
            title: '中雨',
            icon: './images/zhong.png',
        },
        zhen: {
            title: '阵雨',
            icon: './images/zhen.png',
        },
        default: {
            title: '未知天气',
            icon: '',
        }
    }

    //获取实时天气
    function getWeatherData(city) {
        var data = {
            appid: '94537594',
            appsecret: '5f7VEYgM',
            version: 'v6',
        };
        if (city !== undefined) {
            data.city = city;
        }
        $.ajax({
            type: 'GET',
            url: 'https://www.tianqiapi.com/api',
            data: data,
            //转换数据
            dataType: 'jsonp',
            //创建方法
            success: function (data) {
                // console.log(data);
                //定位
                $('#location-city').text(data.city);

                //绑定天气数据
                var wthData = ['date', 'week', 'tem', 'wea', 'air_level', 'win', 'win_speed', 'win_meter'];

                for (var i = 0; i < wthData.length; i++) {
                    if (wthData[i] === 'wea') {
                        // console.log(data.wea_img);
                        
                        // console.log(wthIcon.default);

                        $('.' + wthData[i]).css({
                            backgroundImage: 'url(' + (wthIcon[data.wea_img] == undefined ? wthIcon[data.wea_img].default : wthIcon[data.wea_img].icon) + ')'
                        });
                    } else {
                        $('.' + wthData[i]).text(data[wthData[i]]);
                    }
                }
                //获取24小时天气
                var params = {
                    appid: '28627881',
                    appsecret: 'NmwTQ4XY',
                    version: 'v9',
                }
                if (city !== undefined) {
                    params.city = city;
                }
                $.ajax({
                    type: 'GET',
                    url: 'https://www.tianqiapi.com/api',
                    data: params,
                    //转换数据
                    dataType: 'jsonp',
                    success: function (result) {
                        // console.log(result);
                        var hoursewthData = result.data[0].hours;
                        // console.log(hoursewthData);
                        $.each(hoursewthData, function (i, v) {
                            // console.log(v);
                            var $li = $(`<li>
                            <div>${v.hours}</div>
                            <div class="list-icon" style="background-image: url('${(wthIcon[data.wea_img]==undefined ?wthIcon[data.wea_img].default:wthIcon[data.wea_img].icon)}')"></div>
                            <div>${v.tem}℃</div>
                            <div>${v.win}</div>
                        </li>`)
                            $('#hoursWeather').append($li);
                        })

                        //未来6天气
                        var futureWeatherData = result.data.slice(1);
                        // console.log(futureWeatherData);
                        $.each(futureWeatherData, function (i, v) {
                            var $li = $(`  <li>
                            <span>${v.day.replace(/（星期[一二三四五六日]）/, '')}</span>
                            <span>
                                <i class="future-icon"style="background-image: url('${(wthIcon[data.wea_img]==undefined ?wthIcon[data.wea_img].default:wthIcon[data.wea_img].icon)}')" ></i>
                            </span>
                            <span>${v.tem2+'℃~'+v.tem1+'℃'}</span>
                            <span>${v.win[1]}</span>
                        </li> `)
                            $('#future-weather').append($li);
                        })
                    }
                })
            }
        })
    }
    getWeatherData();
    //搜索城市
    $('.search-icon').on('click', function () {
        //获取val值
        var citys = $('.search').val();
        // console.log(city);
        $('#hoursWeather,#future-weather').empty();
        getWeatherData(citys);
    })
})