// Animation account
var accSetting = document.querySelector('.account_setting');
var accSubnav = document.querySelector('.account_subnav');
var accSettingIcon = document.querySelector('.bi-chevron-down');
accSetting.addEventListener('click', function () {
    accSubnav.classList.toggle('disappear');
    accSettingIcon.classList.toggle('spin');
});