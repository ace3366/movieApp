// Hàm chia Paging, mỗi page chứa số movie dựa theo pagePerOne
module.exports = function (movies, pagePerOne) {
  // Chuẩn bị trước một array rỗng
  const fetchedData = [];
  // Tìm số page tối đa dựa theo movie hiện tại
  const totalPage = movies.length / pagePerOne;
  // Tạo từng phần tử để push vào fetchedData
  for (let i = 0; i < totalPage; i++) {
    const preparedData = {};
    // Từ array đã được xếp theo trending ta cắt ra 20 bộ phim đầu
    preparedData.results = movies.splice(0, pagePerOne);
    preparedData.page = i + 1;
    preparedData.totalPage = Math.ceil(totalPage);
    fetchedData.push(preparedData);
  }
  return fetchedData;
};
