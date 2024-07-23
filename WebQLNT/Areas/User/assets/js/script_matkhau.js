$(document).ready(function () {

    var inputPass = document.querySelectorAll("input[type='password']");
    inputPass.forEach(function (item) {
        item.addEventListener("input", function () {
            //document.querySelector('#login_form .login_container>.messageError').innerHTML = "";
            var inputValue = item.value;
            if (/\s/.test(inputValue)) {
                item.value = inputValue.replace(/\s/g, '');
            }
            if (inputValue.length > 40) {
                item.value = inputValue.substring(0, 40);
            }
            //if (inputValue.length >= 8) {
            //    document.querySelector('.login_title .messageError').innerHTML = "";
            //}
            //if (inputValue.length < 8) {
            //    document.querySelector('.login_title .messageError').innerHTML = "At least <span>8</span> characters";
            //}
        });
    })



    $("#changePassForm").submit(function (event) {
        event.preventDefault();
        var newPass = $("#newPass").val();
        var confirmPass = $("#confirmPass").val();
        if (newPass.length < 8) {
            $("#newPass").focus();
            $(".msg_newPass").html("*Mật khẩu tối thiểu 8 ký tự");
        }
        else if (confirmPass.length < 8) {
            $("#confirmPass").focus();
            $(".msg_confirmPass").html("*Mật khẩu tối thiểu 8 ký tự");
        }
        else if (newPass != confirmPass) {
            $("#confirmPass").focus();
            $(".msg_confirmPass").html("*Mật khẩu không trùng khớp");
        }
        else {
            var formData = new FormData(this);
            $.ajax({
                url: '/MatKhau/ChangePass',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    console.log(response);
                    if (response.status === "success") {
                        $(".msg").html("");
                        $("input").val("");
                        showChangePassSuccessToast();
                    }
                    else {
                        $("#curPass").focus();
                        $(".msg_curPass").html("*Mật khẩu không trùng khớp");
                    }
                },
                error: function (error) {
                    console.error("Error", error);
                }
            });
        }
    });
});



