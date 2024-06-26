// Parse Page and Size || Default Values
const ParsePageAndSize = (page, size) => {
    // Default Values
    const PAGE = 1;
    const SIZE = 5;

    // Try to Parse the values
    page = parseInt(page, 10) || PAGE;
    size = parseInt(size, 10) || SIZE;

    return { page, size };
};

// Get Limit & Offset
exports.getPageInation = (page, size) => {
    const { parsedPage, ParsedSize } = ParsePageAndSize(page, size);

    const limit = ParsedSize ? +ParsedSize : 10;
    const offset = parsedPage ? (parsedPage - 1) * limit : 0;

    return { limit, offset };
};

// Get Paginated Date Response
exports.getPagingData = (data, page, limit) => {
    const { parsedPage } = ParsePageAndSize(page);

    const { count: totalItems, rows: pageData } = data;
    const currentPage = parsedPage ? +parsedPage : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages, currentPage, pageData };
};
