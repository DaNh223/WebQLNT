document.addEventListener('DOMContentLoaded', function () {

    const detailButtons = document.querySelectorAll('.detail_button');

    detailButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            const item = this.closest('.list_item');
            item.classList.add('hovered');
        });

        button.addEventListener('mouseleave', function () {
            const item = this.closest('.list_item');
            item.classList.remove('hovered');
        });
    });
});


// Lấy tỉnh thành
$.getJSON('https://esgoo.net/api-tinhthanh/1/0.htm', function (data_tinh) {
    if (data_tinh.error == 0) {
        $.each(data_tinh.data, function (key_tinh, val_tinh) {
            if (val_tinh.full_name === 'Tỉnh Đồng Tháp') {
                $("#tinh").append('<option selected value="' + val_tinh.id + '">' + val_tinh.full_name + '</option>');

            } else {
                $("#tinh").append('<option value="' + val_tinh.id + '">' + val_tinh.full_name + '</option>');
            }
        });
        var idtinh = $("#tinh").val();
        $.getJSON('https://esgoo.net/api-tinhthanh/2/' + idtinh + '.htm', function (data_quan) {
            if (data_quan.error == 0) {
                $("#quan").html('<option value="0">Quận Huyện</option>');
                $("#phuong").html('<option value="0">Phường Xã</option>');
                $.each(data_quan.data, function (key_quan, val_quan) {
                    if (val_quan.full_name === "Thành phố Cao Lãnh") {
                        $("#quan").append('<option selected value="' + val_quan.id + '">' + val_quan.full_name + '</option>');
                    } else {
                        $("#quan").append('<option value="' + val_quan.id + '">' + val_quan.full_name + '</option>');
                    }
                });
                var idquan = $("#quan").val();
                $.getJSON('https://esgoo.net/api-tinhthanh/3/' + idquan + '.htm', function (data_phuong) {
                    if (data_phuong.error == 0) {
                        $("#phuong").html('<option value="0" selected>Phường/Xã</option>');
                        $.each(data_phuong.data, function (key_phuong, val_phuong) {
                            $("#phuong").append('<option value="' + val_phuong.id + '">' + val_phuong.full_name + '</option>');
                        });
                    }
                });
            }
        });
    }
});


$(".search_button").on("click", function () {
    var ten = $("#tenTro").val();
    var phuong = $("#phuong option:selected").text();
    var gia = $("#gia").val();
    console.log(phuong, gia, ten);

    $.ajax({
        type: "POST",
        url: "/NhaTro/Search",
        data: { ten: ten, phuong: phuong, gia: gia },
        success: function (response) {
            console.log(response);
            if (response.status === "success") {
                // Hiển thị kết quả tìm kiếm
                displaySearchResults(response.dsNhaTroDTO);
            }
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
});
function displaySearchResults(results) {
    const listContent = document.querySelector('.list_content');
    listContent.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const listItem = document.createElement('div');
        listItem.className = 'list_item';

        const imageSrc = result.DanhSachHinhAnh.length > 0 ? `/uploads/${result.DanhSachHinhAnh[0]}` : '~/Areas/User/assets/img/img1.jpg';

        listItem.innerHTML = `
            <a href="/User/NhaTro/ChiTiet/${result.MaNT}" class="item">
                <div class="item_img">
                    <img src="${imageSrc}" alt="">
                </div>
                <div class="item_info">
                    <h3>${result.TenTro}</h3>
                    <p>${result.DiaChi}, ${result.Phuong}, ${result.Quan}, ${result.Tinh}</p>
                     <div class="price_detail">
                        <h3>Giá từ: <span>${result.GiaPhong.toLocaleString('vi-VN')} VNĐ</span></h3>
                        <h3>${result.DienTich} m2</h3>
                    </div>
                </div>
            </a>
            <div class="more_detail">
                <div class="detail_button">
                    <a href="~/User/NhaTro/ChiTiet">Xem chi tiết</a>
                </div>
            </div>
        `;

        listContent.appendChild(listItem);
    });
}