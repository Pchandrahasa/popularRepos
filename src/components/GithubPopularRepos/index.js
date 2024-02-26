import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apisStatusContainer = {
  failure: 'Failure',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].id,
    repositoryData: [],
    apiStatus: apisStatusContainer.initial,
    searchFilterList: '',
  }

  componentDidMount() {
    this.getFilterList()
  }

  getFilterList = async () => {
    const {activeFilterId} = this.state
    this.setState({apiStatus: apisStatusContainer.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(i => ({
        id: i.id,
        avatarUrl: i.avatar_url,
        forksCount: i.forks_count,
        issuesCount: i.issues_count,
        name: i.name,
        starsCount: i.stars_count,
      }))
      this.setState({
        repositoryData: updatedData,
        apiStatus: apisStatusContainer.success,
      })
    } else {
      this.setState({apiStatus: apisStatusContainer.failure})
    }
  }

  activeFilter = id => {
    this.setState({activeFilterId: id}, this.getFilterList)
  }

  renderProgressFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
    </div>
  )

  renderProgressStatus = () => (
    <Loader
      type="ThreeDots"
      color="#0284c7"
      height={80}
      width={80}
      data-testid="loader"
    />
  )

  renderGithubPopularRepos = () => {
    const {repositoryData, searchFilterList} = this.state

    const filterList = repositoryData.filter(i =>
      i.name.toLowerCase().includes(searchFilterList.toLowerCase()),
    )

    return (
      <ul className="Repositoryitem-container">
        {filterList.map(i => (
          <RepositoryItem repositoryData={i} key={i.id} />
        ))}
      </ul>
    )
  }

  repositoryList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderGithubPopularRepos()

      case 'INPROGRESS':
        return this.renderProgressStatus()

      case 'FAILURE':
        return this.renderProgressFailure()

      default:
        return null
    }
  }

  onChangeSearchItem = event => {
    this.setState({searchFilterList: event.target.value})
  }

  render() {
    return (
      <div className="container">
        <h1 className="header">Popular</h1>
        <input
          type="search"
          className="search"
          onChange={this.onChangeSearchItem}
        />

        <ul>
          {languageFiltersData.map(i => (
            <LanguageFilterItem
              languageFiltersData={i}
              key={i.id}
              activeFilter={this.activeFilter}
            />
          ))}
        </ul>
        {this.repositoryList()}
      </div>
    )
  }
}

export default GithubPopularRepos
