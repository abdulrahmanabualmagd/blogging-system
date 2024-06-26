// Parse Page and Size || Default Values
const ParsePageAndSize = (page, size) => {
    // Default Values
    const PAGE = 1;
    const SIZE = 5;

    // Try to Parse the values
    const parsedPage = parseInt(page, 10) || PAGE;
    const parsedSize = parseInt(size, 10) || SIZE;

    return { parsedPage, parsedSize };
};

// Get Limit & Offset
exports.getPageInation = (page, size) => {
    const { parsedPage, parsedSize } = ParsePageAndSize(page, size);

    const limit = parsedSize ? +parsedSize : 10;
    const offset = parsedPage ? (parsedPage - 1) * limit : 0;

    return { limit, offset };
};

// Get Paginated Data Response
exports.getPagingData = (data, page, limit) => {
    const { parsedPage } = ParsePageAndSize(page);

    const { count: totalItems, rows: pageData } = data;
    const currentPage = parsedPage ? +parsedPage : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages, currentPage, pageData };
};
