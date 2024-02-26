import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  console.log(repositoryData)
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = repositoryData

  return (
    <li className="li-container">
      <img src={avatarUrl} alt={name} className="logo" />
      <h1 className="title">{name}</h1>
      <p className="star">
        <span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
            className="star-logo"
          />
        </span>
        {starsCount} Stars
      </p>
      <p className="star">
        <span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
            className="star-logo"
          />
        </span>
        {forksCount} Forks
      </p>
      <p className="star">
        <span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
            className="star-logo"
          />
        </span>
        {issuesCount} issues
      </p>
    </li>
  )
}

export default RepositoryItem
