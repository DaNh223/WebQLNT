var openCheckBtn = document.querySelector('.register_btn');
var closeCheckBtn = document.querySelector('#check-email_modal .close_btn');

var modal = document.querySelector('.modal');

var checkMail_modal = document.getElementById('check-email_modal');

var inputOTP = document.querySelectorAll('.input');


document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateOfBirth').max = today;
});
function showCheckModal() {
    checkMail_modal.classList.add('open');
}

function closeCheckModal() {
    checkMail_modal.classList.remove('open');

    inputOTP.forEach(function (item) {
        item.value = '';
        return;
    })

    $('.submit_btn').css('pointer-events', 'all');
    $('.submit_btn').css('cursor', 'pointer');

    //inputChange.forEach(function (item) {
    //    item.value = '';
    //    return;
    //})
}

//openCheckBtn.addEventListener('click', showCheckModal);

closeCheckBtn.addEventListener('click', closeCheckModal);


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

//Check login pass
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



    //Post Register
    $(document).ready(function () {
        $(".register_form").submit(function (event) {
            event.preventDefault();


            var formData = $(".register_form").serializeArray();
            //const OTP = generateOTP();
            //formData.push({ name: "OTP", value: OTP });
            var serializedData = $.param(formData);

            $.ajax({
                type: "POST",
                url: "/DangKy/CheckInputRegister",
                // data: $("#register_form").serialize(),
                data: serializedData,
                success: function (response) {
                    // console.log($("#register_form").serialize());
                    // console.log(response.emailCheck);
                    console.log(response);

                    if (response.emailCheck === 'fail') {
                        $(".email_input span").html("Tài khoản có email tương tự đã tồn tại");
                        $("#email").focus();
                    }
                    else if (response.phoneCheck === 'fail') {
                        $(".phone_input span").html("Số điện thoại tối thiểu 10 số");
                        $("#phoneNumber").focus();
                    }
                    else if (response.passwordCheck === 'fail') {
                        $(".pass_input span").html("Mật khẩu ít nhất 8 ký tự");
                        $("#password").focus();
                    }
                    else if (response.confirmPassCheck === 'fail') {
                        $(".confirm-pass_input span").html("Mật khẩu ít nhất 8 ký tự");
                        $("#confirm_password").focus();
                    }
                    else if (response.passEqualCheck === 'fail') {
                        $(".confirm-pass_input span").html("Vui lòng nhập đúng mật khẩu");
                        $("#confirm_password").focus();
                    }
                    else if (response.status === "success") {
                        showCheckModal();
                    }
                },
            });
        });
    });

    var inputBox = document.querySelectorAll(".input_box");

    inputBox.forEach(function (item) {
        var input = item.querySelector("input");
        var span = item.querySelector("span");

        input.addEventListener("input", function () {
            span.innerHTML = "";
        })
    });

//Post loss pass otp form
$(document).ready(function () {
    $("#check_mail_otp_form").submit(function (event) {
        event.preventDefault();
        var formData = $("#check_mail_otp_form").serializeArray();
        //const action = 'checkLossPassOTP';
        //formData.push({ name: "action", value: action });
        var serializedData = $.param(formData);
        $.ajax({
            type: "POST",
            url: "/DangKy/CheckOTP",
            data: serializedData,
            // dataType: "json",
            success: function (response) {
                console.log(serializedData);
                console.log(response);
                if (response.otp1Check === 'fail') {
                    $('#check_mail_otp_form input[name="otp1"]').focus();
                }
                else if (response.otp2Check === 'fail') {
                    $('#check_mail_otp_form input[name="otp2"]').focus();
                }
                else if (response.otp3Check === 'fail') {
                    $('#check_mail_otp_form input[name="otp3"]').focus();
                }
                else if (response.otp4Check === 'fail') {
                    $('#check_mail_otp_form input[name="otp4"]').focus();
                }
                else {
                    if (response.status === "success") {
                        //toChangeForm();
                        closeCheckModal();
                        $(".input_box input").val("");
                        showRegisterSuccessToast();
                    }
                    else {
                        $('.messageOTP').html('<span style="color: red; font-size: 20px">Mã OTP sai, chọn gửi lại để nhận mã mới</span>')
                        $('#check_mail_otp_form input').css('cursor', 'none');
                        $('#check_mail_otp_form input').css('pointer-events', 'none');
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
$("#check_mail_otp_form .resend").click(function () {
    $.ajax({
        type: "POST",
        url: "/DangKy/ResendOTP",
        //data: { 'newOTP': newOTP, 'action': 'resendOTPLossPass'},
        success: function (response) {
            console.log('OTP sent successfully');
            console.log(response);

            // $(".messageOTP").html("OTP has been sent successfully");
            $('.messageOTP').html('Đã gửi lại OTP');
            $('#check_mail_otp_form input').css('cursor', 'pointer');
            $('#check_mail_otp_form input').css('pointer-events', 'all');
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

$('#phoneNumber').on('input', function () {
    // Lấy giá trị hiện tại của input
    var value = $(this).val();

    // Xóa tất cả các ký tự không phải số
    value = value.replace(/\D/g, '');

    // Giới hạn độ dài tối đa là 11 ký tự
    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    // Cập nhật lại giá trị input
    $(this).val(value);
});