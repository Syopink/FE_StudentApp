const Footer = () => {
    return (
        <div class="panel-footer">
            <div id="toolbar" class="btn-group">
                <a href="/admin/category/trash" class="btn btn-info">
                    <i class="fa fa-trash"></i> Giáo viên đã xóa
                </a>
            </div>
            <nav>
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
                </ul>
            </nav>
        </div>

    )
}

export default Footer;