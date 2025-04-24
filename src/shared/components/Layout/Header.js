const Header = () => {
    return(
        <>
         <section class="header">
        <nav>
            <a href="index.html"><img src="Images/logo.png"/></a>
            <div className="nav-links">
                <ul>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="about.html">Giới thiệu</a></li>
                    <li><a href="course.html">Thông báo</a></li>
                    <li><a href="blog.html">Sinh viên cần biết</a></li>
                    <li><a href="contact.html">Liên hệ</a></li>
                    <li><a href="/login">Đăng nhập</a></li>
                </ul>
            </div>
        </nav>
        <div className="text-box">
            <h1>Truyền Cảm Hứng, Thay Đổi Cuộc Sống</h1>
            <p>Sử dụng thuật toán đánh giá chất lượng tiên tiến và Machine Learning để giúp sinh viên học tập hiệu quả hơn.</p>
            <a className="hero-btn" href="">Ghé thăm chúng tôi để biết thêm</a>
        </div>
    </section>
        </>
    )

}

export default Header;