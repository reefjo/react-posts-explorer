import { ASCENDING, DESCENDING, NO_SORTING } from "./constants"
const Sort = ({sortOrder, handleSortChange}) => {
  return (
    <div className="sorting">
    <label>Sort title by:</label>
    <select
      className="sort-select"
      value={sortOrder}
      onChange={handleSortChange}
    >
      <option value={NO_SORTING}>{NO_SORTING}</option>
      <option value={ASCENDING}>{ASCENDING}</option>
      <option value={DESCENDING}>{DESCENDING}</option>
    </select>
  </div>

  )
}
export default Sort