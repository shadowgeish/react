
function initGroup() {



$('#addMemberInput').select2({
        tags: true,
        tokenSeparators: [',', ' ', ';']
    });


$('#group-selector').select2();
$('#group-selector2').select2();
$('#group-selector3').select2();
$('#group-selector4').select2();

if (!$.fn.editable) return;




var editables = $('.is-editable, #gender');

$('#edit-enable').click(function(e) {
    e.preventDefault();
    editables.editable('toggleDisabled');
    $('#edit-disable').removeClass('hidden');
    $('#edit-enable').addClass('hidden');
});
$('#edit-disable').click(function(e) {
    e.preventDefault();
    editables.editable('toggleDisabled');
    $('#edit-enable').removeClass('hidden');
    $('#edit-disable').addClass('hidden');
});


if (!$.fn.dataTable) return;
$('#groupsPaymentTable').dataTable({
    'paging': true, // Table pagination
    'ordering': true, // Column ordering
    'info': true, // Bottom left status text
    // Text translation options
    // Note the required keywords between underscores (e.g _MENU_)
    oLanguage: {
        sSearch: '<em class="ion-search"></em>',
        sLengthMenu: '_MENU_ records per page',
        info: 'Showing page _PAGE_ of _PAGES_',
        zeroRecords: 'Nothing found - sorry',
        infoEmpty: 'No records available',
        infoFiltered: '(filtered from _MAX_ total records)',
        oPaginate: {
            sNext: '<em class="ion-ios-arrow-right"></em>',
            sPrevious: '<em class="ion-ios-arrow-left"></em>'
        }
    }
});

$('.is-editable').each(function() {
    var opts = $(this).data();
    $(this).editable({
        showbuttons: 'bottom',
        disabled: true,
        mode: opts.mode || 'inline',
        type: opts.type || 'text'
    });
});
//

$('#gender').editable({
    // prepend: "not selected",
    disabled: true,
    mode: 'inline',
    url: '',
    source: [{
        value: 1,
        text: 'Male'
    }, {
        value: 2,
        text: 'Female'
    }]
});

var msgList = $('.msg-display');

    msgList.each(function() {
        var msg = $(this);

        msg.on('click', function(e){
            // Ignores drodown click to avoid opening modal at the same time
            if( $(e.target).is('.dropdown') ||
                $(e.target).parents('.dropdown').length > 0  ) {
                return;
            }
            // Open modal
            $('.modal-message').modal();

        });

    });

    $('#compose').on('click', function(){
        $('.modal-compose').modal();
    });


$.get('server/chart/line.json', function(data) {

        var lineData = data;
        var lineOptions = {
            series: {
                lines: {
                    show: true,
                    fill: 0.11,
                    lineWidth: 15
                },
                points: {
                    show: true,
                    radius: 10
                }
            },
            grid: {
                borderColor: 'rgba(162,162,162,.26)',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: 'transparent'
            },
            tooltip: true,
            legend: {
                show: false
            },
            tooltipOpts: {
                content: function(label, x, y) {
                    return x +'<br/><img src="img/user/03.jpg" width="50px"/>';
                }
            },
            xaxis: {
                tickColor: 'rgba(162,162,162,.26)',
                font: {
                    color: Colors.byName('blueGrey-200')
                },
                mode: 'categories'
            },
            yaxis: {
                show: false,
                // position: (isRTL ? 'right' : 'left'),
                tickColor: 'rgba(162,162,162,.26)',
                font: {
                    color: Colors.byName('blueGrey-200')
                }
            },
            shadowSize: 5
        };

        $('#group-round').plot(lineData, lineOptions);
    });

//-------------------------- CHECK IF BELOW IS REQUIRED ---------------------------------------------
    // $.fn.plot = plot;

    // if (!$.fn.plot || !$.fn.easyPieChart) return;

    // Main Flot chart
    var splineData = [{
        'label': 'Clicks',
        'color': Colors.byName('purple-300'),
        data: [
            ['1', 40],
            ['2', 50],
            ['3', 40],
            ['4', 50],
            ['5', 66],
            ['6', 66],
            ['7', 76],
            ['8', 96],
            ['9', 90],
            ['10', 105],
            ['11', 125],
            ['12', 135]

        ]
    }, {
        'label': 'Unique',
        'color': Colors.byName('green-400'),
        data: [
            ['1', 30],
            ['2', 40],
            ['3', 20],
            ['4', 40],
            ['5', 80],
            ['6', 90],
            ['7', 70],
            ['8', 60],
            ['9', 90],
            ['10', 150],
            ['11', 130],
            ['12', 160]
        ]
    }, {
        'label': 'Recurrent',
        'color': Colors.byName('blue-500'),
        data: [
            ['1', 10],
            ['2', 20],
            ['3', 10],
            ['4', 20],
            ['5', 6],
            ['6', 10],
            ['7', 32],
            ['8', 26],
            ['9', 20],
            ['10', 35],
            ['11', 30],
            ['12', 56]

        ]
    }];
    var splineOptions = {
        series: {
            lines: {
                show: false
            },
            points: {
                show: false,
                radius: 3
            },
            splines: {
                show: true,
                tension: 0.39,
                lineWidth: 5,
                fill: 1,
                fillColor: Colors.byName('primary')
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 0,
            hoverable: true,
            backgroundColor: 'transparent'
        },
        tooltip: true,
        tooltipOpts: {
            content: function(label, x, y) {
                return x + ' : ' + y;
            }
        },
        xaxis: {
            tickColor: 'transparent',
            mode: 'categories',
            font: {
                color: Colors.byName('blueGrey-200')
            }
        },
        yaxis: {
            show: false,
            min: 0,
            max: 220, // optional: use it for a clear representation
            tickColor: 'transparent',
            font: {
                color: Colors.byName('blueGrey-200')
            },
            //position: 'right' or 'left',
            tickFormatter: function(v) {
                return v /* + ' visitors'*/ ;
            }
        },
        shadowSize: 0
    };

    $('#flot-main-spline').each(function() {
        var $el = $(this);
        if ($el.data('height')) $el.height($el.data('height'));
        $el.plot(splineData, splineOptions);
    });


    // Bar chart stacked
    // ------------------------
    var stackedChartData = [{
        data: [
            [1, 45],
            [2, 42],
            [3, 45],
            [4, 43],
            [5, 45],
            [6, 47],
            [7, 45],
            [8, 42],
            [9, 45],
            [10, 43]
        ]
    }, {
        data: [
            [1, 35],
            [2, 35],
            [3, 17],
            [4, 29],
            [5, 10],
            [6, 7],
            [7, 35],
            [8, 35],
            [9, 17],
            [10, 29]
        ]
    }];

    var stackedChartOptions = {
        bars: {
            show: true,
            fill: true,
            barWidth: 0.3,
            lineWidth: 1,
            align: 'center',
            // order : 1,
            fillColor: {
                colors: [{
                    opacity: 1
                }, {
                    opacity: 1
                }]
            }
        },
        colors: [Colors.byName('blue-100'), Colors.byName('blue-500')],
        series: {
            shadowSize: 3
        },
        xaxis: {
            show: true,
            position: 'bottom',
            ticks: 10,
            font: {
                color: Colors.byName('blueGrey-200')
            }
        },
        yaxis: {
            show: false,
            min: 0,
            max: 60,
            font: {
                color: Colors.byName('blueGrey-200')
            }
        },
        grid: {
            hoverable: true,
            clickable: true,
            borderWidth: 0,
            color: 'rgba(120,120,120,0.5)'
        },
        tooltip: true,
        tooltipOpts: {
            content: 'Value %x.0 is %y.0',
            defaultTheme: false,
            shifts: {
                x: 0,
                y: -20
            }
        }
    };

    $('#flot-stacked-chart').each(function() {
        var $el = $(this);
        if ($el.data('height')) $el.height($el.data('height'));
        $el.plot(stackedChartData, stackedChartOptions);
    });


    // Flot bar chart
    // ------------------
    var barChartOptions = {
        series: {
            bars: {
                show: true,
                fill: 1,
                barWidth: 0.2,
                lineWidth: 0,
                align: 'center'
            },
            highlightColor: 'rgba(255,255,255,0.2)'
        },
        grid: {
            hoverable: true,
            clickable: true,
            borderWidth: 0,
            color: '#8394a9'
        },
        tooltip: true,
        tooltipOpts: {
            content: function getTooltip(label, x, y) {
                return 'Visitors for ' + x + ' was ' + (y * 1000);
            }
        },
        xaxis: {
            tickColor: 'transparent',
            mode: 'categories',
            font: {
                color: Colors.byName('blueGrey-200')
            }
        },
        yaxis: {
            tickColor: 'transparent',
            font: {
                color: Colors.byName('blueGrey-200')
            }
        },
        legend: {
            show: false
        },
        shadowSize: 0
    };

    var barChartData = [{
        'label': 'New',
        bars: {
            order: 0,
            fillColor: Colors.byName('primary')
        },
        data: [
            ['Jan', 20],
            ['Feb', 15],
            ['Mar', 25],
            ['Apr', 30],
            ['May', 40],
            ['Jun', 35]
        ]
    }, {
        'label': 'Recurrent',
        bars: {
            order: 1,
            fillColor: Colors.byName('green-400')
        },
        data: [
            ['Jan', 35],
            ['Feb', 25],
            ['Mar', 45],
            ['Apr', 25],
            ['May', 30],
            ['Jun', 15]
        ]
    }];

    $('#flot-bar-chart').each(function() {
        var $el = $(this);
        if ($el.data('height')) $el.height($el.data('height'));
        $el.plot(barChartData, barChartOptions);
    });

    // Small flot chart
    // ---------------------
    var chartTaskData = [{
        'label': 'Total',
        color: Colors.byName('primary'),
        data: [
            ['Jan', 14],
            ['Feb', 14],
            ['Mar', 12],
            ['Apr', 16],
            ['May', 13],
            ['Jun', 14],
            ['Jul', 19]
            //4, 4, 3, 5, 3, 4, 6
        ]
    }];
    var chartTaskOptions = {
        series: {
            lines: {
                show: false
            },
            points: {
                show: false
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 3,
                fill: 1
            },
        },
        legend: {
            show: false
        },
        grid: {
            show: false,
        },
        tooltip: true,
        tooltipOpts: {
            content: function(label, x, y) {
                return x + ' : ' + y;
            }
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            min: 0,
            max: 30, // optional: use it for a clear representation
            tickColor: '#eee',
            //position: 'right' or 'left',
            tickFormatter: function(v) {
                return v /* + ' visitors'*/ ;
            }
        },
        shadowSize: 0
    };

    $('#flot-task-chart').each(function() {
        var $el = $(this);
        if ($el.data('height')) $el.height($el.data('height'));
        $el.plot(chartTaskData, chartTaskOptions);
    });

    // Easy Pie charts
    // -----------------

    var pieOptionsTask = {
        lineWidth: 6,
        trackColor: 'transparent',
        barColor: Colors.byName('primary'),
        scaleColor: false,
        size: 90,
        lineCap: 'round',
        animate: {
            duration: 3000,
            enabled: true
        }
    };
    $('#dashboard-easypiechartTask').easyPieChart(pieOptionsTask);


    // Vector Map
    // -----------------

    // USA Map
    var usa_markers = [{
        latLng: [40.71, -74.00],
        name: 'New York'
    }, {
        latLng: [34.05, -118.24],
        name: 'Los Angeles'
    }, {
        latLng: [41.87, -87.62],
        name: 'Chicago',
        style: {
            fill: Colors.byName('pink-500'),
            r: 15
        }
    }, {
        latLng: [29.76, -95.36],
        name: 'Houston',
        style: {
            fill: Colors.byName('purple-500'),
            r: 10
        }
    }, {
        latLng: [39.95, -75.16],
        name: 'Philadelphia'
    }, {
        latLng: [38.90, -77.03],
        name: 'Washington'
    }, {
        latLng: [37.36, -122.03],
        name: 'Silicon Valley',
        style: {
            fill: Colors.byName('green-500'),
            r: 20
        }
    }];

    var usa_options = {
        map: 'us_mill_en',
        normalizeFunction: 'polynomial',
        backgroundColor: '#fff',
        regionsSelectable: false,
        markersSelectable: false,
        zoomButtons: false,
        zoomOnScroll: false,
        markers: usa_markers,
        regionStyle: {
            initial: {
                fill: Colors.byName('blueGrey-200')
            },
            hover: {
                fill: Colors.byName('gray-light'),
                stroke: '#fff'
            },
        },
        markerStyle: {
            initial: {
                fill: Colors.byName('blue-500'),
                stroke: '#fff',
                r: 10
            },
            hover: {
                fill: Colors.byName('orange-500'),
                stroke: '#fff'
            }
        }
    };

    $('#vector-map').vectorMap(usa_options);

    // Datepicker
    // -----------------

    $('#dashboard-datepicker').datepicker();

    // Sparklines
    // -----------------

    var sparkValue1 = [4, 4, 3, 5, 3, 4, 6, 5, 3, 2, 3, 4, 6];
    var sparkValue2 = [2, 3, 4, 6, 5, 4, 3, 5, 4, 3, 4, 3, 4, 5];
    var sparkValue3 = [4, 4, 3, 5, 3, 4, 6, 5, 3, 2, 3, 4, 6];
    var sparkValue4 = [6, 5, 4, 3, 5, 4, 3, 4, 3, 4, 3, 2, 2];
    var sparkOpts = {
        type: 'line',
        height: 20,
        width: '70',
        lineWidth: 2,
        valueSpots: {
            '0:': Colors.byName('blue-700'),
        },
        lineColor: Colors.byName('blue-700'),
        spotColor: Colors.byName('blue-700'),
        fillColor: 'transparent',
        highlightLineColor: Colors.byName('blue-700'),
        spotRadius: 0
    };

    initSparkline($('#sparkline1'), sparkValue1, sparkOpts);
    initSparkline($('#sparkline2'), sparkValue2, sparkOpts);
    initSparkline($('#sparkline3'), sparkValue3, sparkOpts);
    initSparkline($('#sparkline4'), sparkValue4, sparkOpts);
    // call sparkline and mix options with data attributes
    function initSparkline(el, values, opts) {
        el.sparkline(values, $.extend(sparkOpts, el.data()));
    }

}






export default initGroup;
