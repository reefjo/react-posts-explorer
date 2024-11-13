import React, { useState } from "react";
import "./Post.css";
function Post({ post, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleCancelEdit = () => {
    setEditedTitle(post.title);
    setEditedBody(post.body);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(post.id, editedTitle, editedBody);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="post">
      <div className="post-author">
        <span>User {post.userId}</span>
      </div>
      <div className="post-edit">
        {isEditing ? (
          <>
            <textarea
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="edit-input"
            />
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="edit-input"
            />
          </>
        ) : (
          <>
            <h3 className="post-title">{post.title} </h3>
            <p className="post-body">{post.body}</p>
          </>
        )}
      </div>
      <div className="post-button">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelEdit}>Cancel </button>
          </>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default Post;
