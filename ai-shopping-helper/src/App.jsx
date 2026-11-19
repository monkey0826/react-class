import { useState } from "react";
import './App.css'

function App() {
  const [budget, setBudget] = useState('')
  const [category, setCategory] = useState('운동화')
  const [purpose, setPurpose] = useState('')
  const [preference,  setPreference] = useState('')
  const [answer, setAnswer] = useState('')

const recommendProduct = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        budget,
        category,
        purpose,
        preference
      })
    })

    const data = await response.json()

    if (!response.ok) {
      setAnswer(data.error)
      return
    }

    setAnswer(data.answer)
  } catch (error) {
    console.error(error)
    setAnswer('서버 연결 중 오류가 발생했습니다.')
  }
}

 return (
  <main className="page">
    <section className="container">
      {}
      <header className="header">
        <h1>AI 쇼핑 추천 도우미</h1>

        <p>
          원하는 조건을 입력하면
          AI가 적합한 상품을 추천합니다.
        </p>
      </header>
      {}
      <section className="search-box">
        <h2>상품 추천 조건</h2>
        {}
        <label>예산</label>
        <input type="number" placeholder="예: 100,000" 
          value={budget} onChange={(e) => setBudget(e.target.value)}/>
          {}
          <label>카테고리</label>
          <select value={category}
          onChange={(e) => setCategory(e.target.value)}>
            <option value="운동화">운동화</option>
            <option value="가방">가방</option>
            <option value="노트북">노트북</option>
            <option value="이어폰">이어폰</option>
          </select>
          {}
          <label>사용 목적</label>
          <input type="text" placeholder="예: 운동, 출퇴근, 공부"
           value={purpose} onChange={(e) => setPurpose(e.target.value)}/>
           {}
           <label>선호 조건</label>
           <textarea placeholder="예: 가볍고 디자인이 심플한 제품"
           value={preference} onChange={(e) => setPreference(e.target.value)}>
           </textarea>
           {}
           <button onClick={recommendProduct}>AI 추천받기</button>
      </section>
      {}
      <section className="result-box">
        <h2>AI 추천 결과</h2>
        <p>{
          answer === '' ? '아직 추천 결과가 없습니다.' : answer}.</p>
      </section>
    </section>
  </main>
 ) 
}

export default App