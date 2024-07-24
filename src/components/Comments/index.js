import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  onAddingName = event => {
    this.setState({nameInput: event.target.value})
  }

  onAddingComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onClickAddingComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      isLiked: false,
      date: formatDistanceToNow(new Date()),
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const updatedList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: updatedList})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="bg-container">
        <h1 className="title">Comments</h1>
        <div className="comment-container">
          <div className="writing-comment-section">
            <p className="topic">Say something about 4.0 technologies</p>
            <form onSubmit={this.onClickAddingComment} className="comment-area">
              <input
                type="text"
                value={nameInput}
                onChange={this.onAddingName}
                placeholder="Your Name"
                className="username"
              />
              <textarea
                value={commentInput}
                onChange={this.onAddingComment}
                placeholder="Your Comment"
                className="comment"
              />
              <button type="submit" className="add-btn">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-png"
          />
        </div>
        <div className="commment-list-container">
          <div className="total-comment-card">
            <div className="total-comment">
              <p className="num-of_comment">{commentsList.length}</p>
            </div>
            <p className="sub-heading">Comments</p>
          </div>
          <ul className="users-comment-list">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLike={this.toggleIsLike}
                deleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
