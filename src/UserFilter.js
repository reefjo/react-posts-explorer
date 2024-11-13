const getButtonClass = (id, filteredUserIds) => {
  return filteredUserIds.includes(id)
    ? "button-filtered"
    : "button-not-filtered";
};

const UserFilter = ({allUniqueUserIds, filteredUserIds, onToggleUserFilter}) => {
  console.log("received unique users:",allUniqueUserIds)

return(
  <div className="user-filter">
  {allUniqueUserIds.map((id) => (
    <button
      key={id}
      className={`button ${getButtonClass(id, filteredUserIds)}`}
      onClick={() => onToggleUserFilter(id)}
    >
      User {id}
    </button>
  ))}
</div>
)

}
export default UserFilter