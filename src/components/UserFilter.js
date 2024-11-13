const getUserButtonClass = (id, filteredUserIds) => {
  return filteredUserIds.includes(id)
    ? "user-button-filtered"
    : "user-button-not-filtered";
};

const UserFilter = ({
  allUniqueUserIds,
  filteredUserIds,
  onToggleUserFilter,
}) => {
  return (
    <div className="user-filter">
      <span className="toggle-message">
        Click to toggle on/off users to display:
      </span>
      {allUniqueUserIds.map((id) => (
        <button
          key={id}
          className={`button ${getUserButtonClass(id, filteredUserIds)}`}
          onClick={() => onToggleUserFilter(id)}
        >
          User {id}
        </button>
      ))}
    </div>
  );
};
export default UserFilter;
