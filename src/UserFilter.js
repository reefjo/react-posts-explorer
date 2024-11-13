const getButtonClass = (id, allowedUserIds) => {
  return allowedUserIds.includes(id)
    ? "button-allowed"
    : "button-not-allowed";
};

const UserFilter = ({uniqueUserIds, allowedUserIds, onToggleUserFilter}) => {
  console.log("received unique authors:",uniqueUserIds)

return(
  <div className="user-filter">
  {uniqueUserIds.map((id) => (
    <button
      key={id}
      className={`button ${getButtonClass(id, allowedUserIds)}`}
      onClick={() => onToggleUserFilter(id)}
    >
      User {id}
    </button>
  ))}
</div>
)

}
export default UserFilter