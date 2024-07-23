// Mở modal 
var openLossBtn = document.querySelector('.loss_pass');
var closeLossBtn = document.querySelector('#loss-pass_modal .close_btn');


var modal = document.querySelector('.modal');
var lossPass_modal = document.getElementById('loss-pass_modal');


var inputOTP = document.querySelectorAll('.input');
var inputChange = document.querySelectorAll('.change_input');

var messageLossPassMail = document.querySelector('.messageLossPassMail');
var messageLossPassOTP = document.querySelector('#loss_pass_otp_form .modal_title');

var inputLossPassMail = document.querySelector('#forget-pass_email');
/*var inputLossPassOTP = document.querySelectorAll('#loss_pass_otp_form .input');*/

function showLossModal() {
    lossPass_modal.classList.add('open');
    console.log(lossPass_modal);
}

function closeLossModal() {
    lossPass_modal.classList.remove('open');

    sendForm.style.right = '0';
    otpForm.style.left = '100%';
    otpForm.style.top = '0'
    changeForm.style.left = '100%';
    modalContainer.style.height = '300px';

    inputOTP.forEach(function (item) {
        item.value = '';
        return;
    })

    inputChange.forEach(function (item) {
        item.value = '';
        return;
    })

    messageLossPassMail.innerHTML = "Chúng tôi sẽ gửi mã đến email của bạn";
    messageLossPassOTP.innerHTML = "Vui lòng nhập mã OTP";
    inputLossPassMail.value = '';
    $('#loss_pass_otp_form input').css('cursor', 'pointer');
    $('#loss_pass_otp_form input').css('pointer-events', 'all');
    $('.messageError').html("");
    $('.submit_btn').css('pointer-events', 'all');
    $('.submit_btn').css('cursor', 'pointer');
}
openLossBtn.addEventListener('click', showLossModal);
closeLossBtn.addEventListener('click', closeLossModal);

// OTP 
// const inputs = document.getElementById("input_otp");

var inputs = document.querySelectorAll('.input_number');
inputs.forEach(function (item) {
    item.addEventListener("input", function (e) {
        const target = e.target;
        const val = target.value;

        if (isNaN(val)) {
            target.value = "";
            return;
        }

        if (val != "") {
            const next = target.nextElementSibling;
            if (next) {
                next.focus();
            }
        }
    });

    item.addEventListener("keyup", function (e) {
        const target = e.target;
        const key = e.key.toLowerCase();

        if (key == "backspace" || key == "delete") {
            target.value = "";
            const prev = target.previousElementSibling;
            if (prev) {
                prev.focus();
            }
            return;
        }
    });
})


// Chuyển form send email và otp
var sendForm = document.querySelector('.send-email_form');
var otpForm = document.querySelector('.otp_form');
var sendBtn = document.querySelector('.send_btn');

function toOTPForm() {
    sendForm.style.right = '100%';
    otpForm.style.left = '0';
}

//sendBtn.addEventListener('click', toOTPForm);


// Chuyển form otp và change
var changeForm = document.querySelector('.change_form');
var submitBtn = document.querySelector('.submit_btn');
var modalContainer = document.querySelector('.modal_container');

function toChangeForm() {
    modalContainer.style.height = '400px';
    otpForm.style.top = '100%';
    changeForm.style.left = '0';
}

//submitBtn.addEventListener('click', toChangeForm);



//Form đăng nhập

//Login Input
var loginName = document.getElementById("input_email");
var loginPass = document.getElementById("input_password");

// Check login input
loginName.addEventListener("input", function () {
    //document.querySelector('#login_form .login_container>.messageError').innerHTML = "";
    var inputValue = loginName.value;
    if (/\s/.test(inputValue)) {
        loginName.value = inputValue.replace(/\s/g, '');
    }
    if (inputValue.length > 100) {
        loginName.value = inputValue.substring(0, 100);
    }
});

loginPass.addEventListener("input", function () {
    //document.querySelector('#login_form .login_container>.messageError').innerHTML = "";
    var inputValue = loginPass.value;
    if (/\s/.test(inputValue)) {
        loginPass.value = inputValue.replace(/\s/g, '');
    }
    if (inputValue.length > 40) {
        loginPass.value = inputValue.substring(0, 40);
    }
    //if (inputValue.length >= 8) {
    //    document.querySelector('.login_title .messageError').innerHTML = "";
    //}
    //if (inputValue.length < 8) {
    //    document.querySelector('.login_title .messageError').innerHTML = "At least <span>8</span> characters";
    //}
});

//Post Login
$(document).ready(function () {
    $(".login_form").submit(function (event) {
        event.preventDefault();
        var formData = {
            input_email: $("#input_email").val(),
            input_password: $("#input_password").val(),
            remember: $("#remember").is(":checked")
        };
        $.ajax({
            type: "POST",
            url: "/DangNhap/Login",
            data: formData,
            success: function (response) {
                if (response && response.status === 'success') {
                    //sessionStorage.setItem('loginState', true);
                    window.location.href = response.redirect;
                } else {
                    $(".login_form .messageError").html("Email hoặc Mật khẩu không đúng");
                }
            },
            error: function (error) {
                $(".login_form .messageError").html("Có lỗi xảy ra. Vui lòng thử lại sau.");
                console.error(error);
            }
        });
    });
});

//sendBtn.addEventListener('click', toOTPForm);
////Post email quên mk
$("#loss-pass_modal .send_btn").click(function () {
    const lossPassEmail = $("#forget-pass_email").val();
    $.ajax({
        type: "POST",
        url: "/DangNhap/CheckLossPassEmail",
        data: { 'lossPassEmail': lossPassEmail},
        success: function (response) {
            console.log(response);
            if (response.status === 'success') {
                toOTPForm();
                console.log(response.otp);
            }
            else {
                 //console.log("sai email");
                $('.messageLossPassMail').html('<span style="color: red">Tài khoản không tồn tại, vui lòng thử lại</span>')
            }
        },
        error: function (error) {
            console.error('Error post email:', error);
        }
    })
})


//submitBtn.addEventListener('click', toChangeForm);
//Post loss pass otp form
$(document).ready(function () {
    $("#loss_pass_otp_form").submit(function (event) {
        event.preventDefault();
        var formData = $("#loss_pass_otp_form").serializeArray();
        //const action = 'checkLossPassOTP';
        //formData.push({ name: "action", value: action });
        var serializedData = $.param(formData);
        $.ajax({
            type: "POST",
            url: "/DangNhap/CheckLossPassOTP",
            data: serializedData,
            // dataType: "json",
            success: function (response) {
                console.log(serializedData);
                console.log(response);
                if (response.otp1Check === 'fail') {
                    $('#loss_pass_otp_form input[name="otp1"]').focus();
                }
                else if (response.otp2Check === 'fail') {
                    $('#loss_pass_otp_form input[name="otp2"]').focus();
                }
                else if (response.otp3Check === 'fail') {
                    $('#loss_pass_otp_form input[name="otp3"]').focus();
                }
                else if (response.otp4Check === 'fail') {
                    $('#loss_pass_otp_form input[name="otp4"]').focus();
                }
                else {
                    if (response.status === "success") {
                        toChangeForm();
                    }
                    else {
                        $('#loss_pass_otp_form .modal_title').html('<span style="color: red; font-size: 20px">Mã OTP sai, chọn gửi lại để nhận mã mới</span>')
                        $('#loss_pass_otp_form input').css('cursor', 'none');
                        $('#loss_pass_otp_form input').css('pointer-events', 'none');
                        $('.submit_btn').css('pointer-events', 'none');
                        $('.submit_btn').css('cursor', 'default');
                    }
                }
            },
            error: function (xhr, status, error, response) {
                console.log("Lỗi AJAX: " + status + " - " + error);
                console.log(response);
            },
        });
    });
});

//Post resend otp
$("#loss_pass_otp_form .resend").click(function () {
    $.ajax({
        type: "POST",
        url: "/DangNhap/ResendOTP",
        //data: { 'newOTP': newOTP, 'action': 'resendOTPLossPass'},
        success: function (response) {
            console.log('OTP sent successfully');
            console.log(response);

            // $(".messageOTP").html("OTP has been sent successfully");
            $('#loss_pass_otp_form .modal_title').html('Đã gửi lại OTP');
            $('#loss_pass_otp_form input').css('cursor', 'pointer');
            $('#loss_pass_otp_form input').css('pointer-events', 'all');
            $('.submit_btn').css('pointer-events', 'all');
            $('.submit_btn').css('cursor', 'pointer');
            inputOTP.forEach(function (item) {
                item.value = '';
                return;
            })
        },
        error: function (error) {
            console.error('Error sending OTP:', error);
        }
    });
})

$("#change_pass_form").submit(function (event) {

    event.preventDefault();

    var formData = $("#change_pass_form").serializeArray();
    //const action = 'changePassLoginForm';
    //formData.push({ name: "action", value: action });
    var serializedData = $.param(formData);

    $.ajax({
        type: "POST",
        url: "/DangNhap/ChangePass",
        data: serializedData,
        success: function (response) {
            console.log(response);

            if (response.newPassCheck === "fail") {

                $('#change_pass_form #change_password').focus();
                $('#change_pass_form .newPassMessage').html('<span style="color: red">Mật khẩu phải dài hơn 8 ký tự</span>');

            }
            else if (response.confirmPassCheck === "fail") {
                $('#change_pass_form #confirm_change_password').focus();
                $('#change_pass_form .newConfirmPassMessage').html('<span style="color: red">Mật khẩu phải dài hơn 8 ký tự</span>');
            }
            else if (response.passEqualCheck === "fail") {
                $('#change_pass_form #confirm_change_password').focus();
                $('#change_pass_form .newConfirmPassMessage').html('<span style="color: red">Mật khẩu không đúng</span>');
            }
            else if (response.status === "success") {
                $('#change_pass_form .modal_title').html('<span style="color: green">Đổi mật khẩu thành công</span>');
                localStorage.setItem('toastShown', 'true');
                window.location.reload();
            }
        },
        error: function (error) {
            console.error('Error change password:', error);
        }
    })
})

var changePassInput = document.querySelectorAll(".change_input");
changePassInput.forEach(function (item) {
    item.addEventListener("input", function () {
        //document.querySelector('#login_form .login_container>.messageError').innerHTML = "";
        var inputValue = item.value;
        if (/\s/.test(inputValue)) {
            item.value = inputValue.replace(/\s/g, '');
        }
        if (inputValue.length > 40) {
            item.value = inputValue.substring(0, 40);
        }
    });
})

