import React from "react";
const Home = () => {
  return (
    <div>
      {/* Chương trình học */}
      <section className="course">
        <h1>Chương Trình Học</h1>
        <p>Chúng tôi cung cấp các khóa học chất lượng cao với phương pháp giảng dạy tiên tiến.</p>
        <div className="row">
          <div className="course-col">
            <h3>Trung học</h3>
            <p>Khóa học dành cho sinh viên trung học với các môn học cơ bản và nâng cao.</p>
          </div>
          <div className="course-col">
            <h3>Đại học</h3>
            <p>Chương trình cử nhân với nhiều chuyên ngành đa dạng, đáp ứng nhu cầu thực tế.</p>
          </div>
          <div className="course-col">
            <h3>Sau đại học</h3>
            <p>Các chương trình thạc sĩ và nghiên cứu giúp phát triển chuyên môn sâu rộng.</p>
          </div>
        </div>
      </section>

      {/* Cơ sở vật chất */}
      <section className="facilities">
        <h1>Cơ Sở Vật Chất</h1>
        <p>Chúng tôi cung cấp môi trường học tập hiện đại, đầy đủ tiện nghi.</p>
        <div className="row">
          <div className="facilities-col">
            <img src="images/library.png" alt="Thư viện" />
            <h3>Thư Viện Hiện Đại</h3>
            <p>Hàng nghìn đầu sách và tài liệu nghiên cứu phục vụ sinh viên và giảng viên.</p>
          </div>
          <div className="facilities-col">
            <img src="images/basketball.png" alt="Sân thể thao" />
            <h3>Sân Thể Thao Lớn</h3>
            <p>Hệ thống sân thể thao đa năng giúp sinh viên rèn luyện thể chất.</p>
          </div>
          <div className="facilities-col">
            <img src="images/cafeteria.png" alt="Nhà ăn" />
            <h3>Nhà Ăn Chất Lượng</h3>
            <p>Thực đơn đa dạng, đảm bảo dinh dưỡng và vệ sinh an toàn thực phẩm.</p>
          </div>
        </div>
      </section>

\    <section class="testimoninals">
        <h1>Cảm Nhận Của Sinh Viên</h1>
        <p>Những chia sẻ thực tế từ sinh viên đã và đang theo học.</p>
        <div class="row">
            <div class="testimoninals-col">
                <img src="Images/user1.jpg" alt=""/>
                <div>
                    <p>"Chương trình học rất bổ ích, giảng viên tận tâm, cơ sở vật chất hiện đại."</p>
                    <h3>Nguyễn Văn A</h3>
                    <i class="fa fa-solid fa-star"></i>
                    <i class="fa fa-solid fa-star"></i>
                    <i class="fa fa-solid fa-star"></i>
                    <i class="fa fa-solid fa-star"></i>
                    <i class="fa fa-regular fa-star"></i>
                </div>
            </div>
            <div class="testimoninals-col">
                <img src="Images/user2.jpg" alt=""/>
                <div>
                    <p>"Môi trường học tập tốt, nhiều hoạt động ngoại khóa bổ ích."</p>
                    <h3>Trần Thị B</h3>
                    <i class="fa fa-solid fa-star"></i>
                    <i class="fa fa-solid fa-star"></i>
                    <i class="fa fa-solid fa-star"></i>
                    <i class="fa fa-regular fa-star-half-stroke"></i>
                </div>
            </div>
        </div>
    </section>
    <section class="cta">
        <h1>Đăng Ký Ngay Để Biết Thêm Chi Tiết</h1>
        <a href="" class="hero-btn">LIÊN HỆ NGAY</a>
    </section>
    </div>
  );
};

export default Home;
