var swiper = new Swiper(".mySwiper", {
    // loop: true,
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    thumbs: {
        swiper: swiper,
    },
});


const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    })
});

function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

var map = L.map('map');
var marker; // Khai báo biến marker
function removeMarker() {
    if (marker) {
        map.removeLayer(marker);
    }
}

function LoadMap(lat, lon, diachi, phuong) {
    removeMarker();
    map.setView([lat, lon], 13); // Đặt vị trí ban đầu cho bản đồ
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    marker = L.marker([lat, lon]).addTo(map)
        .bindPopup('<b>' + phuong + '</b>' + '<br>' + diachi)
        .openPopup();
}