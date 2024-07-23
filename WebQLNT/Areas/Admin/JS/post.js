const modal_delete_post = document.querySelector('.js-modal-post-delete');
const btn_post_delete = document.querySelectorAll('.js-delete-post');
const btn_post_cancel = document.querySelector(".js-modal-post-delete-cancel")

function ShowMessageDelete() {
    modal_delete_post.classList.add('open');
}
function HideMessageDeleted() {
    modal_delete_post.classList.remove('open');
}
btn_post_delete.forEach(button => {
    button.addEventListener('click', ShowMessageDelete);
});
btn_post_cancel.addEventListener('click', HideMessageDeleted);

//modal Edit

const modal_approve_post = document.querySelector('.js-modal-approve-post');
const btn_appove_post = document.querySelectorAll('.js-approve-post');
const btn_close_modal_post = document.querySelector('.js-close-approve-modal');
const approved_btn = document.getElementById('approved-btn');
var id_home;

$(document).ready(function () {
    var id_home;

    function ShowApproveModal(event) {
        const button = event.currentTarget;
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const address = button.getAttribute('data-address');
        const dt = button.getAttribute('data-dt');
        const price = button.getAttribute('data-price');
        const electric = button.getAttribute('data-elc');
        const water = button.getAttribute('data-water');
        const desc = button.getAttribute('data-desc');
        const utilities = button.getAttribute('data-utilities');

        document.getElementById('id-home').value = id;
        document.getElementById('name').value = name;
        document.getElementById('address').value = address;
        document.getElementById('dt').value = dt;
        document.getElementById('price').value = price;
        document.getElementById('elec').value = electric;
        document.getElementById('water').value = water;
        document.getElementById('desc').value = desc;
        document.getElementById('utilities').value = utilities;


        const images = button.getAttribute('data-images').split(',');
        // Xóa các hình ảnh cũ trong img-box-home
        const imgBoxHome = document.querySelector('.img-box-home');
        imgBoxHome.innerHTML = '';

        // Thêm các hình ảnh mới vào img-box-home
        images.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = `/uploads/${img.trim()}`;
            imgBoxHome.appendChild(imgElement);
        });

        id_home = id;

        document.querySelector('.js-modal-approve-post').classList.add('open');
    }

    // Sự kiện khi ấn nút duyệt trên modal
    $('#approved-btn').click(function () {
        $.ajax({
            url: '/admin/dsbaidang/duyetbai',
            type: 'post',
            data: { id: id_home },
            success: function (response) {
                if (response.success) {
                    Toastify({
                        text: response.message,
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                        style: {
                            font: "16px Arial",
                            padding: "15px",
                            minWidth: "300px"
                        }
                    }).showToast();

                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                } else {
                    Toastify({
                        text: response.message,
                        duration: 3000,
                        close: true,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                        style: {
                            font: "16px Arial",
                            padding: "15px",
                            minWidth: "300px"
                        }
                    }).showToast();
                }
            },
            error: function () {
                Toastify({
                    text: "Đã có lỗi xảy ra.",
                    duration: 3000,
                    close: true,
                    gravity: "bottom",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)"
                }).showToast();
            }
        });

        document.querySelector('.js-modal-approve-post').classList.remove('open');
    });

    // Gán sự kiện click cho nút .js-approve-post để mở modal
    $(".js-approve-post").click(ShowApproveModal);


    function HideApproveModal() {
        modal_approve_post.classList.remove('open');
        document.getElementById('name').value = null;
        document.getElementById('address').value = null;
        document.getElementById('dt').value = null;
        document.getElementById('price').value = null;
        document.getElementById('elec').value = null;
        document.getElementById('water').value = null;
        document.getElementById('desc').value = null;
        document.getElementById('utilities').value = null;
    }
    btn_appove_post.forEach(button => {
        button.addEventListener('click', ShowApproveModal);
    });
    btn_close_modal_post.addEventListener('click', HideApproveModal);

    $(document).ready(function () {
        // Tìm kiếm
        $("#searchInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#dataTable tbody tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });

        $("#sort_list").on("change", function () {
            var value = $(this).val();
            var rows = $("#dataTable tbody tr").get();

            rows.sort(function (a, b) {
                var keyA, keyB;
                switch (value) {
                    case "dateAsc":
                        keyA = $(a).find("td").eq(0).text();
                        keyB = $(b).find("td").eq(0).text();
                        break;
                    case "pending":
                        keyA = $(a).find("td.post-status .status-info").hasClass("pending") ? 0 : 1;
                        keyB = $(b).find("td.post-status .status-info").hasClass("pending") ? 0 : 1;
                        break;
                    case "approved":
                        keyA = $(a).find("td.post-status .status-info").hasClass("approve") ? 0 : 1;
                        keyB = $(b).find("td.post-status .status-info").hasClass("approve") ? 0 : 1;
                        break;
                    case "priceAsc":
                        keyA = parseFloat($(a).find("td.hom-price p").text().replace(/[^0-9.-]+/g, ""));
                        keyB = parseFloat($(b).find("td.hom-price p").text().replace(/[^0-9.-]+/g, ""));
                        break;
                    case "priceDesc":
                        keyA = parseFloat($(a).find("td.hom-price p").text().replace(/[^0-9.-]+/g, ""));
                        keyB = parseFloat($(b).find("td.hom-price p").text().replace(/[^0-9.-]+/g, ""));
                        break;
                    default:
                        keyA = parseInt($(a).find("td").eq(0).text());
                        keyB = parseInt($(b).find("td").eq(0).text());
                }

                if (value === "priceAsc") {
                    return keyA - keyB;
                } else if (value === "priceDesc") {
                    return keyB - keyA;
                } else if (value === "dateAsc") {
                    return keyA.localeCompare(keyB);
                } else {
                    return keyA - keyB;
                }
            });

            $.each(rows, function (index, row) {
                $("#dataTable tbody").append(row);
            });
        });

        var postIdToDelete;

        // Hiển thị modal xóa bài
        $(".js-delete-post").click(function () {
            postIdToDelete = $(this).data("id");
            $(".js-modal-post-delete").addClass('open');
        });

        // Đóng modal xóa bài
        $(".js-modal-post-delete-cancel").click(function () {
            $(".js-modal-post-delete").removeClass('open');
        });

        // Xóa bài
        $(".js-modal-post-deleted").click(function () {
            $.ajax({
                url: '/admin/dsbaidang/xoabai',
                type: 'POST',
                data: { id: postIdToDelete },
                success: function (response) {
                    if (response.success) {
                        Toastify({
                            text: response.message,
                            duration: 3000,
                            close: true,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                            style: {
                                font: "16px Arial",
                                padding: "15px",
                                minWidth: "300px"
                            }
                        }).showToast();

                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        Toastify({
                            text: response.message,
                            duration: 3000,
                            close: true,
                            gravity: "bottom",
                            position: "center",
                            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                            style: {
                                font: "16px Arial",
                                padding: "15px",
                                minWidth: "300px"
                            }
                        }).showToast();
                    }
                },
                error: function () {
                    Toastify({
                        text: "Đã có lỗi xảy ra.",
                        duration: 3000,
                        close: true,
                        gravity: "bottom",
                        position: "center",
                        backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)"
                    }).showToast();
                }
            });

            $(".js-modal-post-delete").removeClass('open');
        });
    });
});

