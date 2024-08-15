document.addEventListener('DOMContentLoaded', function() {
    const listImage = document.querySelector('.list-images');
    const imgs = document.querySelectorAll('.list-images img');
    const btnLeft = document.querySelector('.btn-left');
    const btnRight = document.querySelector('.btn-right');
    const length = imgs.length;
    let current = 0;

    const getWidth = () => listImage.parentElement.offsetWidth;

    const handleChangeSlide = (direction) => {
        let width = getWidth();

        if (direction === 'next') {
            current++;
            if (current === length) {
                current = 0; // Quay về ảnh đầu tiên
            }
        } else if (direction === 'prev') {
            current--;
            if (current < 0) {
                current = length - 1; // Quay về ảnh cuối cùng
            }
        }

        listImage.style.transform = `translateX(${-width * current}px)`;
    };

    let handleEventChangeSlide = setInterval(() => handleChangeSlide('next'), 4000);

    btnRight.addEventListener('click', () => {
        clearInterval(handleEventChangeSlide);
        handleChangeSlide('next');
        handleEventChangeSlide = setInterval(() => handleChangeSlide('next'), 4000);
    });

    btnLeft.addEventListener('click', () => {
        clearInterval(handleEventChangeSlide);
        handleChangeSlide('prev');
        handleEventChangeSlide = setInterval(() => handleChangeSlide('next'), 4000);
    });

    // Khởi tạo slide đầu tiên
    handleChangeSlide();
});

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Xóa thông báo lỗi cũ
    document.getElementById('errorMessages').innerHTML = '';

    // Lấy giá trị từ các trường input
    const hoTen = document.getElementById('hoTen').value.trim();
    const sdt = document.getElementById('sdt').value.trim();
    const email = document.getElementById('email').value.trim();
    const diaChi = document.getElementById('diaChi').value.trim();
    const ghiChu = document.getElementById('ghiChu').value.trim();

    let valid = true;
    let errorMessages = [];

    // Kiểm tra trường họ và tên
    if (hoTen === '' || hoTen.length < 8) {
        valid = false;
        errorMessages.push('Họ và tên phải có ít nhất 8 ký tự.');
    }
    if (diaChi === '') {
        valid = false;
        errorMessages.push('Không được để trống địa chỉ');
    }
    if (ghiChu === '') {
        valid = false;
        errorMessages.push('Không được để trống ghi chú');
    }
    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(sdt)) {
        valid = false;
        errorMessages.push('Số điện thoại phải đúng định dạng');
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        valid = false;
        errorMessages.push('Email không đúng định dạng.');
    }

    // Kiểm tra nếu có lỗi
    if (!valid) {
        // Hiển thị thông báo lỗi
        document.getElementById('errorMessages').innerHTML = errorMessages.join('<br>');
        return;
    }

    // Nếu không có lỗi, thực hiện hành động gửi form (hoặc xử lý khác)
    alert('Đã gửi!');
});
