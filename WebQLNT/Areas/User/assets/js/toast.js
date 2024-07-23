
function toast({
    title = '',
    message = '',
    type = '',
    duration = '' }) {
    const main = document.getElementById('toast');
    if (main) {
        const toastCont = document.createElement('div');

        const autoRemove = setTimeout(function () {
            main.removeChild(toastCont);
        }, duration + 1000);

        toastCont.onclick = function (e) {
            if (e.target.closest('.toast_close')) {
                main.removeChild(toastCont);
                clearTimeout(autoRemove);
            }
        }

        const icons = {
            success: 'bi bi-check-circle-fill',
            error: 'bi bi-exclamation-triangle-fill',
        }
        const icon = icons[type]
        const delay = (duration / 1000).toFixed(2);

        toastCont.classList.add('toast_container', `toast_${type}`);
        toastCont.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toastCont.innerHTML = `
                        <div class="toast_icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="toast_body">
                            <h3 class="toast_title">${title}</h3>
                            <div class="toast_msg">${message}</div>
                        </div>
                        <div class="toast_close"><i class="bi bi-x"></i></div>
                    `;

        main.appendChild(toastCont);


    }
}

function showRegisterSuccessToast() {
    toast({
        title: 'Thông báo',
        message: 'Đăng ký tài khoản thành công',
        type: 'success',
        duration: 5000
    })
}

function showUploadSuccessToast() {
    toast({
        title: 'Thông báo',
        message: 'Đăng thông tin nhà trọ thành công',
        type: 'success',
        duration: 5000
    })
}

function showUploadErrorToast() {
    toast({
        title: 'Thông báo',
        message: 'Đăng thông tin nhà trọ không thành công',
        type: 'error',
        duration: 5000
    })
}

function showEditSuccessToast() {
    toast({
        title: 'Thông báo',
        message: 'Sửa thông tin nhà trọ thành công',
        type: 'success',
        duration: 5000
    })
}
function showDeleteSuccessToast() {
    toast({
        title: 'Thông báo',
        message: 'Xóa thông tin nhà trọ thành công',
        type: 'success',
        duration: 5000
    })
}
function showUpdateInfoSuccessToast() {
    toast({
        title: 'Thông báo',
        message: 'Chỉnh sửa thông tin thành công',
        type: 'success',
        duration: 5000
    })
}

function showChangePassSuccessToast() {
    toast({
        title: 'Thông báo',
        message: 'Đổi mật khẩu thành công',
        type: 'success',
        duration: 5000
    })
}