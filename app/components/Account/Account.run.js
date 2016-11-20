function initAccount() {

    if (!$.fn.dataTable) return;

    // Zero configuration

    $('#paymentTable').dataTable({
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

}

export default initAccount;
