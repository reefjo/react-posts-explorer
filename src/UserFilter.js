const getButtonClass = (id, filteredUserIds) => {
  return filteredUserIds.includes(id)
    ? "button-filtered"
    : "button-not-filtered";
};

const UserFilter = ({uniqueUserIds, filteredUserIds, onToggleUserFilter}) => {
  console.log("received unique users:",uniqueUserIds)

return(
  <div className="user-filter">
  {uniqueUserIds.map((id) => (
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