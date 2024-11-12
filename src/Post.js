import React, {useState} from 'react';

function Post({post, onSave}){
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  
  return(
    <div className='post'>
    <div className='post-data'>

  <h3>{isEditing? post.title : editedTitle} (User {post.userId})</h3>
  <p>{isEditing ? post.body : editedBody}</p>
    </div>
  <div className='post-buttons'>
    {!isEditing ? (

    <button onClick={setIsEditing(true)}>Edit</button>
    )
    : (
      <div className='editing-buttons'>
      <button onClick={onSave}>Save</button>
      <button onClick={cancelEdit}>Cancel</button>
      </div>
    )

  }
    </div>
  </div>

  )


}