const getButtonClass = (id, allowedAuthorIds) => {
  return allowedAuthorIds.includes(id)
    ? "button-allowed"
    : "button-not-allowed";
};

const AutoFilter = ({uniqueAuthorIds, allowedAuthorIds, onToggleAuthorFilter}) => {
  console.log("received unique authors:",uniqueAuthorIds)

return(
  <div className="author-filter">
  {uniqueAuthorIds.map((id) => (
    <button
      key={id}
      className={`button ${getButtonClass(id, allowedAuthorIds)}`}
      onClick={() => onToggleAuthorFilter(id)}
    >
      User {id}
    </button>
  ))}
</div>
)

}
export default AutoFilter