document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form không được gửi đi

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const message = `Name: ${name}, Email: ${email}`;
    alert(message); // Hiển thị thông báo Alert
});
