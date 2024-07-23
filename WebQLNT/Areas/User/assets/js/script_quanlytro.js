$(document).ready(function () {
    var selectedFiles = [];
    var deletedFiles = []; // Mảng lưu trữ các URL của các hình ảnh đã bị xóa

    // Function to display selected images
    function displaySelectedImages() {
        var previewDiv = $('.imagePreview');
        previewDiv.empty(); // Clear previous images

        selectedFiles.forEach(function (fileObject, index) {
            var imgContainer = $('<div class="image-container"></div>');

            var imgElement = $('<img class="preview-image">');
            imgElement.attr('src', fileObject.url);

            var deleteButton = $('<i class="delete_icon bi bi-trash3-fill"></i>');

            imgElement.on('click', function () {
                if (!fileObject.isEdited) {
                    var fileName = fileObject.url.split('/').pop(); 
                    deletedFiles.push(fileName); 
                }
                selectedFiles.splice(index, 1); 
                checkImg();
                displaySelectedImages(); 
            });
            deleteButton.on('click', function () {
                if (!fileObject.isEdited) {
                    var fileName = fileObject.url.split('/').pop(); 
                    deletedFiles.push(fileName); 
                }
                selectedFiles.splice(index, 1);
                checkImg();
                displaySelectedImages();
            });

            imgContainer.append(imgElement);
            imgContainer.append(deleteButton);
            previewDiv.append(imgContainer);
        });
    }

    $('#imageInput').on('change', function () {
        var files = this.files;

        // Check if more files can be added
        var canAddMore = selectedFiles.length + files.length <= 5;
        if (!canAddMore) {
            alert('Bạn chỉ có thể chọn tối đa 5 hình ảnh.');
            return;
        }

        // Add selected files to selectedFiles array
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type)) {
                var fileObject = {
                    file: file,
                    url: URL.createObjectURL(file),
                    isEdited: true
                };
                selectedFiles.push(fileObject);
            } else {
                alert('Vui lòng chỉ chọn file PNG, JPEG, JPG, hoặc GIF.');
            }
        }
        displaySelectedImages(); // Display selected images
        checkImg(); // Check
        this.value = null; // Reset file input to allow selecting same file again
    });

    function checkImg() {
        if (selectedFiles.length >= 5) {
            $(".input_img_btn").css("background-color", "var(--gray_color)");
            $(".input_img_btn").css("cursor", "default");
            $(".input_img_btn").css("pointer-events", "none");
        } else {
            $(".input_img_btn").css("background-color", "var(--blue_color)");
            $(".input_img_btn").css("cursor", "pointer");
            $(".input_img_btn").css("pointer-events", "all");
        }
    }

    //Api Map
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

    // Tạo bản đồ Leaflet
    var map = L.map('map');
    var marker; // Khai báo biến marker

    function removeMarker() {
        if (marker) {
            map.removeLayer(marker);
        }
    }

    function LoadMap(lat, lon) {
        removeMarker();
        map.setView([lat, lon], 13); // Đặt vị trí ban đầu cho bản đồ
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    // Hàm để hiển thị phường xã lên bản đồ khi được chọn
    $("#phuong").change(function () {

        var idphuong = $(this).val();
        var idquan = $("#quan").val();

        if (idphuong != 0) {
            //removeMarker();
            // Gửi yêu cầu lấy thông tin về phường xã từ API của bạn
            $.getJSON('https://esgoo.net/api-tinhthanh/3/' + idquan + '.htm', function (data_phuong) {
                if (data_phuong.error == 0 && data_phuong.data.length > 0) {
                    var phuong = data_phuong.data.find(function (item) {
                        return item.id == idphuong; // Tìm phường/xã với ID tương ứng
                    });
                    var lat = parseFloat(phuong.latitude); // Lấy vĩ độ và kinh độ của phường xã
                    var lon = parseFloat(phuong.longitude);

                    // Kiểm tra lat và lon có giá trị hợp lệ hay không
                    if (!isNaN(lat) && !isNaN(lon)) {
                        // Xóa các điểm đánh dấu cũ (nếu có)
                        map.eachLayer(function (layer) {
                            if (layer instanceof L.Marker) {
                                map.removeLayer(layer);
                            }
                        });

                        // Đánh dấu phường xã trên bản đồ
                        var diachi = $('#diachi').val();

                        marker = L.marker([lat, lon]).addTo(map)
                            .bindPopup('<b>' + phuong.full_name + '</b>' + '<br>' + diachi)
                            .openPopup();

                        // Di chuyển bản đồ tới vị trí của phường xã
                        map.setView([lat, lon], 15);
                    } else {
                        alert('Không có thông tin về vị trí của phường xã.');
                    }
                } else {
                    alert('Không tìm thấy thông tin về phường xã.');
                }
            }).fail(function () {
                alert('Không thể lấy dữ liệu từ API.');
            });
        }
    });

    var editBtns = document.querySelectorAll('.edit_button');
    var closeEditBtn = document.querySelector('.close_btn');
    var editModal = document.querySelector('.edit_modal');

    function showEditModal() {
        editModal.classList.add('open');

    }

    function closeEditModal() {
        editModal.classList.remove('open');
        $(".msg").html("");
    }

    editBtns.forEach(item => {
        item.addEventListener('click', showEditModal);
    });

    closeEditBtn.addEventListener('click', closeEditModal);

    var deleteBtns = document.querySelectorAll('.delete_button');
    var closeDeleteBtn = document.querySelector('#btn-close');
    var closeDeleteIcon = document.querySelector('.closeIcon');

    var deleteModal = document.querySelector('.modal-confirm');

    function showDeleteModal() {
        deleteModal.classList.add('open');
    }

    function closeDeleteModal() {
        deleteModal.classList.remove('open');
    }

    deleteBtns.forEach(item => {
        item.addEventListener('click', showDeleteModal);
    });

    closeDeleteBtn.addEventListener('click', closeDeleteModal);
    closeDeleteIcon.addEventListener('click', closeDeleteModal);


    //Post id trọ
    $('.edit_button').on('click', function () {
        var maNT = $(this).closest('tr').find('#col1').html();
        console.log($.trim(maNT)); // In ra console để kiểm tra

        $.ajax({
            type: "POST",
            url: "/QuanLyTro/LoadEditData",
            data: { maNT: maNT },
            success: function (response) {
                console.log(response);
                if (response.status === "success") {
                    var diaChi = response.TTNT.DiaChi;
                    $("#diachi").val(diaChi);

                    var phuong = response.TTNT.Phuong;

                    $("#phuong option").each(function () {
                        if ($.trim($(this).text()) === $.trim(phuong)) {
                            $("#phuong").val($(this).val());
                            return false;
                        }
                    });

                    var lon = parseFloat(response.TTNT.Lng);
                    var lat = parseFloat(response.TTNT.Lat);

                    LoadMap(lat, lon);

                    marker = L.marker([lat, lon]).addTo(map)
                        .bindPopup('<b>' + $('#phuong option:selected').text() + '</b>' + '<br>' + diaChi)
                        .openPopup();

                    $("#ten_tro").val(response.TTNT.TenTro);
                    $("#dien_tich").val(parseFloat(response.TTNT.DienTich));
                    $("#gia_phong").val(parseInt(response.TTNT.GiaPhong));
                    $("#gia_dien").val(parseInt(response.TTNT.GiaDien));
                    $("#gia_nuoc").val(parseInt(response.TTNT.GiaNuoc));
                    $("#tien_ich").val(response.TTNT.TienIch);
                    $("#mo_ta").val(response.TTNT.MoTa);

                    $("#trang_thai option").each(function () {
                        if ($.trim($(this).text()) === $.trim(response.TTNT.TrangThai)) {
                            $("#trang_thai").val($(this).val());
                            return false;
                        }
                    });

                    selectedFiles = [];
                    var imageNames = response.TTNT.DanhSachHinhAnh;
                    imageNames.forEach(function (imageName) {
                        var imageUrl = '/uploads/' + imageName;

                        var fileObject = {
                            file: null,
                            url: imageUrl
                        };
                        selectedFiles.push(fileObject);
                        checkImg();
                    });
                    displaySelectedImages();
                } else {
                    alert(data.message);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });

    $("#formEdit").submit(function (event) {
        event.preventDefault();

        var phuong = $("#phuong").val();
        var trang_thai = $("#trang_thai").val();
        var diachi = $("#diachi").val();
        var ten_tro = $("#ten_tro").val();
        var tien_ich = $("#tien_ich").val();
        var mo_ta = $("#mo_ta").val();

        if ($.trim(diachi) == '') {
            $("#diachi").focus();
            $(".msg_diachi").html("*Vui lòng điền địa chỉ");
            return false;
        } else if (phuong == 0) {
            $("#phuong").focus();
            $(".msg_phuong").html("*Vui lòng chọn");
            return false;
        }
        else if ($.trim(ten_tro) == '') {
            $("#ten_tro").focus();
            $(".msg_tentro").html("*Vui lòng điền tên trọ");
            return false;
        } else if (trang_thai == 0) {
            $("#trang_thai").focus();
            $(".msg_trangthai").html("*Vui lòng chọn");
            return false;
        } else if ($.trim(tien_ich) == '') {
            $("#tien_ich").focus();
            $(".msg_tienich").html("*Vui lòng điền tiện ích");
            return false;
        } else if ($.trim(mo_ta) == '') {
            $("#mo_ta").focus();
            $(".msg_mota").html("*Vui lòng điền mô tả");
            return false;
        } else if (selectedFiles.length === 0) {
            $(".msg_hinhanh").html("*Vui lòng chọn hình ảnh");
            $(".msg_hinhanh").focus();
            return false;
        } else {
            var formData = new FormData(this); 

            formData.set('tinh', $("#tinh option:selected").text());
            formData.set('quan', $("#quan option:selected").text());
            formData.set('phuong', $("#phuong option:selected").text());
            formData.set('trang_thai', $("#trang_thai option:selected").text());
            selectedFiles.forEach(function (fileObject, index) {
                if (fileObject.isEdited) {
                    if (fileObject.file != null) {
                        var fileName = fileObject.file.name;
                        var fileExtension = fileName.split('.').pop();
                        formData.append('imageInput[]', fileObject.file, 'image' + index + '.' + fileExtension);
                    }
                    formData.append('editedImages[]', fileObject.url);
                }
            });

            deletedFiles.forEach(function (deletedUrl) {
                formData.append('deletedFiles[]', deletedUrl);
            });

            if (marker) {
                var latlng = marker.getLatLng();
                formData.append('lat', latlng.lat);
                formData.append('lng', latlng.lng);
            }

            $.ajax({
                type: "POST",
                url: "/QuanLyTro/Edit",
                data: formData,
                contentType: false, // Không đặt loại nội dung
                processData: false, // Không xử lý dữ liệu
                success: function (response) {
                    console.log(response);
                    if (response.status === "success") {
                        $(".msg").html("");
                        deletedFiles = [];
                        displaySelectedImages();
                        showEditSuccessToast();

                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        }
    });


    $('.delete_button').on('click', function () {
        var maNT = $(this).closest('tr').find('#col1').html();
        console.log($.trim(maNT)); // In ra console để kiểm tra
        $('#btn-confirm').on('click', function () {
            $.ajax({
                type: "POST",
                url: "/QuanLyTro/Delete",
                data: { maNT: maNT },
                success: function (response) {
                    console.log(response);
                    if (response.status === "success") {
                        window.location.reload();
                    }
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        })
    });

});

$('.gia').on('input', function () {
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