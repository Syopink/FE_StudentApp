import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={i === currentPage ? 'active' : ''}>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleClick(i); }}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    return (
        <ul className="pagination">
            <li className={currentPage === 1 ? 'disabled' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleClick(currentPage - 1); }}>
                    &laquo;
                </a>
            </li>
            {renderPageNumbers()}
            <li className={currentPage === totalPages ? 'disabled' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleClick(currentPage + 1); }}>
                    &raquo;
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
