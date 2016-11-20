function initProfile() {

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


    $('.is-editable').each(function() {
        var opts = $(this).data();
        $(this).editable({
            showbuttons: 'bottom',
            disabled: true,
            mode: opts.mode || 'inline',
            type: opts.type || 'text'
        });
    });

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


    $('#groupAddedSuccessfully').on('click', function(e) {
        e.preventDefault();
        swal('!');
    });


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

export default initProfile;
