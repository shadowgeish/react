function userSignup() {

    var $form = $('#user-signup');
    $form.validate({
        errorPlacement: errorPlacementInput,
        // Form rules
        rules: {
            emailaddress: {
                required: true,
                email: true
            },
            accountPassword: {
                required: true
            },
            accountPasswordCheck: {
                required: true,
                equalTo: '#account-password'
            }
        }
    });

    $('#user-signup').submit(function(e){
        return false;
    });


    $('#email-validation').submit(function(e){
        return false;
    });

    $('#create-new-user').click(function() {
        console.log('Form submitted!');

        var email = $('#emailaddress').val();
        var password = $('#account-password').val();

        var xhr = new XMLHttpRequest();
        var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open("POST", "http://localhost:8888/add_user", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            //alert(xhr.responseText);
            var json = JSON.parse(xhr.responseText);
            if(json.existing_email == 'yes'){
                $('#user-signup-taken-email-text').hide().removeClass('hidden').show(500);
            }

            if(json.user_added == 'yes' || (json.user_added == 'no' && json.existing_email == 'yes')){
                $('#form-ok').hide().removeClass('hidden').show(500);
                $('#user-signup').hide().addClass('hidden').show(500);
                $('#email-validation').hide().removeClass('hidden').show(500);
            }
          }
        }
        var pemail = encodeURIComponent(email);
        var ppassword = encodeURIComponent(password);
        xhr.send('email=' + pemail + '&password=' + ppassword);
    });


    $('#email-validate-but').click(function() {

      if($('#email-validation').valid()){


            var valicationCode = $('#emailvalidationcode').val();
            var email = $('#emailaddress').val();

            var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open("POST", "http://localhost:8888/check_user_email", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4) {
                // JSON.parse does not evaluate the attacker's scripts.
                //alert(xhr.responseText);
                var json = JSON.parse(xhr.responseText);

                if(json.code_check == 'no'){
                    $('#email-validation-text').hide().removeClass('hidden').show(500);
                }

                if(json.code_check == 'yes'){
                    //Router.go('dashboard');
                    //alert(json.token);
                    window.location.href = 'http://localhost:3000';
                }
              }
            }
            var pemail = encodeURIComponent(email);
            var pvalicationCode = encodeURIComponent(valicationCode);
            xhr.send('email=' + pemail + '&valicationCode=' + pvalicationCode);
      }

    });


    var $form = $('#email-validation');
    $form.validate({
        errorPlacement: errorPlacementInput,
        // Form rules
        rules: {
            emailvalidationcode: {
                required: true
            }
        }
    });

    $('#email-validate-cancel').click(function() {
        $('#form-ok').hide().addClass('hidden').show(500);
        $('#user-signup').hide().removeClass('hidden').show(500);
        $('#email-validation').hide().addClass('hidden').show(500);
    });



}


// Necessary to place dyncamic error messages
// without breaking the expected markup for custom input
function errorPlacementInput(error, element) {
    if (element.parent().is('.mda-form-control')) {
        error.insertAfter(element.parent()); // insert after .mda-form-control
    } else if (element.is(':radio') || element.is(':checkbox')) {
        error.insertAfter(element.parent());
    } else {
        error.insertAfter(element);
    }
}

export default userSignup;
