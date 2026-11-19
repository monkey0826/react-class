import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

app.get('/', (req, res) => {
  res.send('Gemini 서버 정상 실행')
})

app.post('/api/recommend', async (req, res) => {
  const { budget, category, purpose, preference } = req.body

  console.log('예산 :', budget)
  console.log('카테고리 :', category)
  console.log('사용 목적 :', purpose)
  console.log('선호 조건 :', preference)

  try {
    const prompt = `다음 조건에 맞는 상품을 추천해주세요.

    예산: ${budget}원
    카테고리: ${category}
    사용 목적: ${purpose}
    선호 조건: ${preference}

    추천 상품 3개와 각각의 추천 이유를
    쉽게 설명해주세요.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt
    })

    res.json({ answer: response.text })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Gemini API 호출 중 오류가 발생했습니다.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Gemini 서버 실행 : http://localhost:${PORT}`)
})