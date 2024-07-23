//const modal_delete_acc = document.querySelector('.js-modal-account-delete');
//const btn_acc_delete = document.querySelectorAll('.js-delete-acc');
//const btn_acc_cancel = document.querySelector(".js-modal-account-delete-cancel");

//function ShowMessageDelete() {
//    modal_delete_acc.classList.add('open');
//}
//function HideMessageDeleted() {
//    modal_delete_acc.classList.remove('open');
//}
//btn_acc_delete.forEach(button => {
//    button.addEventListener('click', ShowMessageDelete);
//});
//btn_acc_cancel.addEventListener('click', HideMessageDeleted);

//// Modal edit
//const modal_edit_acc = document.querySelector('.js-modal-edit-acc');
//const btn_acc_edit = document.querySelectorAll('.js-edit-acc');
//const btn_close_modal = document.querySelector('.js-close-modal');

//function ShowEditModal(event) {
//    // Lấy dữ liệu từ các thuộc tính data của nút được nhấn
//    const button = event.currentTarget;
//    const id = button.getAttribute('data-id');
//    const name = button.getAttribute('data-name');
//    const email = button.getAttribute('data-email');
//    const dob = button.getAttribute('data-dob');
//    const address = button.getAttribute('data-address');
//    const phone = button.getAttribute('data-phone');
//    const postCount = button.getAttribute('data-post_count');
//    const zaloLink = button.getAttribute('data-zalo_link');
//    const fbLink = button.getAttribute('data-fb_link');

//    // Điền dữ liệu vào modal
//    document.getElementById('id').value = id;
//    document.getElementById('name').value = name;
//    document.getElementById('email').value = email;
//    document.getElementById('dob').value = dob;
//    document.getElementById('address').value = address;
//    document.getElementById('phone').value = phone;
//    document.getElementById('post_count').value = postCount;
//    document.getElementById('zalo_link').value = zaloLink;
//    document.getElementById('fb_link').value = fbLink;

//    // Hiển thị modal
//    modal_edit_acc.classList.add('open');
//    console.log(id)
//}

//function HideEditModal() {
//    modal_edit_acc.classList.remove('open');
//}

//btn_acc_edit.forEach(button => {
//    button.addEventListener('click', ShowEditModal);
//});
//btn_close_modal.addEventListener('click', HideEditModal);

