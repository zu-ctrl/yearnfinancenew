import React from 'react'

const LangChooser = ({ currentLang, setCurrentLang, langList }) => {
  const handleChangeLang = (newLang) => {
    setCurrentLang(newLang)
    localStorage.setItem('yearnfinewLang', newLang)
  }
  return (
    <div>
      <select value={currentLang} onChange={(e) => handleChangeLang(e.target.value)}>
        {langList.map((el, i) => (
          <option key={i} value={el.toUpperCase()}>
            {el.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LangChooser
