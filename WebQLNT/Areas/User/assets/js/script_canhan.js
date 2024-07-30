
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('namsinh').max = today;
});

function chooseImg(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var file = fileInput.files[0];
        var fileType = file.type;
        var validFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

        if (validFileTypes.includes(fileType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#user_img').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        } else {
            alert('Chỉ chấp nhận các tệp hình ảnh có đuôi png, jpg, jpeg, và gif.');
            fileInput.value = ''; // Reset file input
        }
    }
}

$("#info_form").submit(function (event) {
    event.preventDefault();

    var hoten = $("#hoten").val();
    var namsinh = $("#namsinh").val();
    var sdt = $("#sdt").val();
    var email = $("#email").val();
    var diachi = $("#diachi").val();
    var zalo = $("#zalo").val();
    var facebook = $("#facebook").val();


    if ($.trim(hoten) == '') {
        $("#hoten").focus();
        $(".msg_ten").html("*Vui lòng điền tên");
        return false;
    }
    else if ($.trim(namsinh) == '') {
        $("#ngaysinh").focus();
        $(".msg_namsinh").html("*Vui lòng chọn ngày sinh");
        return false;
    }
    else if ($.trim(sdt) == '') {
        $("#sdt").focus();
        $(".msg_sdt").html("*Vui lòng điền số điện thoại");
        return false;
    }
    else if ($.trim(sdt).length < 10) {
        $("#sdt").focus();
        $(".msg_sdt").html("*Số điện thoại phải tối thiểu 10 số");
        return false;
    }
    else if ($.trim(email) == '') {
        $("#email").focus();
        $(".msg_email").html("*Vui lòng điền email");
        return false;
    }
    else if ($.trim(diachi) == '') {
        $("#diachi").focus();
        $(".msg_diachi").html("*Vui lòng điền địa chỉ");
        return false;
    }
    else {
        var formData = new FormData(this);

        $.ajax({
            url: '/CaNhan/UpdateProfile',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
                if (response.status === "success") {
                    showUpdateInfoSuccessToast();
                    var timestamp = new Date().getTime(); // Thêm timestamp để tránh caching
                    $(".user_img").attr("src", "/uploads/" + response.img + "?t=" + timestamp);
                }
            },
            error: function (error) {
                console.error("Error", error);
            }
        });
    }
});

$('#sdt').on('input', function () {
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