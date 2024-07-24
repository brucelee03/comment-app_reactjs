import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLike, deleteComment} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails

  const onDeleteComment = () => {
    deleteComment(id)
  }

  const onClickToggleIsLike = () => {
    toggleIsLike(id)
  }

  const imgLabel = isLiked ? 'liked' : ''

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li className="comment-item-card">
      <div className="comment-item">
        <div className={`profile-container ${initialClassName}`}>
          <p className="profile-icon">{name[0]}</p>
        </div>
        <div>
          <div className="name-container">
            <div>
              <h2 className="name">{name}</h2>
            </div>
            <div>
              <p className="date">{date}</p>
            </div>
          </div>
          <p className="user-comment">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <button
          type="button"
          onClick={onClickToggleIsLike}
          className={`like-button ${imgLabel}`}
        >
          <img src={likeImgUrl} alt="like" className="like" />
          <p className="like-btn-label">Like</p>
        </button>
        <button
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
          className="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
