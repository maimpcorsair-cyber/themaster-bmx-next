import express from 'express';
import cors from 'cors';
import { Ollama } from 'langchain/llms/ollama';

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

// Initialize Ollama with qwen
const model = new Ollama({
  baseUrl: 'http://localhost:11434',
  model: 'qwen2.5:3b',
});

// System prompt for The Master BMX
const SYSTEM_PROMPT = `คุณคือผู้ช่วย AI ของ The Master BMX ร้านสอนขี่จักรยาน BMX สำหรับเด็กๆ อายุ 4-15 ปี

ข้อมูลเกี่ยวกับร้าน:
- ชื่อ: The Master BMX
- เบอร์โทร: 088-934-5146
- LINE: @rushfest
- Instagram: @rushfestth
- สถานที่: สเกตปาร์ครัชดาภิเษก, สเกตปาร์คบางแค, สเกตปาร์คพัทยา

คอร์สเรียน:
- Little Rider (4-6 ปี): 1,500 บาท/เดือน
- Junior Rider (7-12 ปี): 2,000 บาท/เดือน
- Competitor (13+ ปี): 2,500 บาท/เดือน

สินค้า:
- จักรยาน BMX ราคา 7,499 - 30,000 บาท
- อุปกรณ์เซฟตี้ (หมวก, ถุงมือ, เสื่อเข่า)

ให้คำตอบที่เป็นมิตร, กระชับ, ให้ข้อมูลถูกต้อง
ตอบเป็นภาษาไทยหรืออังกฤษตามที่ผู้ใช้ถาม`;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', model: 'qwen2.5:3b' });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation history
    let conversation = SYSTEM_PROMPT;
    if (history && Array.isArray(history)) {
      for (const [user, bot] of history) {
        conversation += `\n\nHuman: ${user}\nAssistant: ${bot}`;
      }
    }
    conversation += `\n\nHuman: ${message}\nAssistant:`;

    // Generate response
    const response = await model.call(conversation, {
      maxTokens: 500,
      temperature: 0.7,
    });

    res.json({ 
      response: response.trim(),
      model: 'qwen2.5:3b'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 Chat server running on http://localhost:${PORT}`);
  console.log(`📱 Model: qwen2.5:3b`);
});
