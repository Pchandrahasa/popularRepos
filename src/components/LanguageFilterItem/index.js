import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, activeFilter} = props
  const {id, language} = languageFiltersData

  const onClickLanguageFilter = () => {
    activeFilter(id)
  }

  return (
    <li>
      <button type="button" onClick={onClickLanguageFilter}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
