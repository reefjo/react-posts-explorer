const Pagination = ({currentPage, totalPages, onNextPage, onPrevPage}) => (
  <div className="paging">
  <label>
    page: {currentPage} out of {totalPages}
  </label>
  <button onClick={onPrevPage} disabled={currentPage === 1}>
    Previous Page
  </button>
  <button onClick={onNextPage} disabled={currentPage === totalPages}>
    Next Page
  </button>
</div>
)
export default Pagination