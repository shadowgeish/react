function userLogin() {

    $('#user-login').submit(function(e){
        return false;
    });

    var $form = $('#user-login');
    $form.validate({
        errorPlacement: errorPlacementInput,
        // Form rules
        rules: {
            accountName: {
                required: true,
                email: true
            },
            accountPassword: {
                required: true
            }
        }
    });

    //alert('ok');
    /*
    $('#user-login-submit').click(function() {
        if($('#user-login').valid()){
            var email = $('#accountEmail').val();
            var password = $('#accountPassword').val();

            var xhr = new XMLHttpRequest();
            var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open("POST", "http://localhost:8888/log_user", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4) {
                var json_result = JSON.parse(xhr.responseText);
                if(json_result.login == 'yes'){
                    //alert(json_result.token);
                    localStorage.setItem('token', json_result.token);
                    window.location.href = 'http://localhost:3000';
                    //var Router = require('react-router').Router;
                    //Router.go('dashboard');
                }
                else{
                    $('#user-login-text').hide().removeClass('hidden').show(500);
                }
              }
            }
            var pemail = encodeURIComponent(email);
            var ppassword = encodeURIComponent(password);
            xhr.send('email=' + pemail + '&password=' + ppassword);

        }
    });
    */

}

// Necessary to place dyncamic error messages
// without breaking the expected markup for custom input
function errorPlacementInput(error, element) {
    if( element.parent().is('.mda-form-control') ) {
        error.insertAfter(element.parent()); // insert after .mda-form-control
    }
    else if ( element.is(':radio') || element.is(':checkbox')) {
        error.insertAfter(element.parent());
    }
    else {
        error.insertAfter(element);
    }
}

export default userLogin;
