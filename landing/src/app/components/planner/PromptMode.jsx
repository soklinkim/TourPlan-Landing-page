import { useState } from 'react'
import { FaPaperPlane, FaRobot, FaMagic, FaRedo } from 'react-icons/fa'

const SUGGESTIONS = [
  '3 days, love temples and street food',
  'Weekend food crawl with my partner',
  'Relaxed culture trip for a family of 4',
  'Fast-paced nightlife and shopping weekend',
]

const INTEREST_KEYWORDS = {
  Culture: /temple|culture|history|pagoda|heritage/i,
  Food: /food|eat|restaurant|street food|grill|crawl/i,
  Nature: /nature|rice field|countryside|outdoor|garden/i,
  Nightlife: /nightlife|bar|club|party|drink/i,
  Shopping: /shop|market|souvenir/i,
  Relaxation: /relax|spa|chill|slow|easy-going|easygoing/i,
}

const BUDGET_SYMBOL = { 'Budget-friendly': '$', Moderate: '$$', Premium: '$$$' }
const BUDGETS = Object.keys(BUDGET_SYMBOL)
const PACES = ['Relaxed', 'Balanced', 'Packed']

// Rule-based stand-in for what a real AI planner would infer from free text.
function detectIntent(text) {
  const daysMatch = text.match(/(\d+)\s*-?\s*day/i)

  let budget = 'Moderate'
  if (/budget|cheap|backpack/i.test(text)) budget = 'Budget-friendly'
  else if (/luxury|premium|splurge/i.test(text)) budget = 'Premium'

  let pace = 'Balanced'
  if (/relax|chill|slow|easy-going|easygoing/i.test(text)) pace = 'Relaxed'
  else if (/packed|busy|non-stop|nonstop|fast-paced|fast paced/i.test(text)) pace = 'Packed'

  const interests = Object.keys(INTEREST_KEYWORDS).filter((tag) => INTEREST_KEYWORDS[tag].test(text))

  return {
    days: daysMatch ? Number(daysMatch[1]) : null,
    budget,
    pace,
    interests: interests.length ? interests : ['Culture', 'Food'],
  }
}

export default function PromptMode({ onGenerate }) {
  const [phase, setPhase] = useState('input') // 'input' | 'thinking' | 'result'
  const [prompt, setPrompt] = useState('')
  const [days, setDays] = useState(null)
  const [matchedInterests, setMatchedInterests] = useState([])
  const [budget, setBudget] = useState('Moderate')
  const [pace, setPace] = useState('Balanced')

  function submitPrompt(text) {
    const trimmed = text.trim()
    if (!trimmed || phase === 'thinking') return
    setPrompt(trimmed)
    setPhase('thinking')
    setTimeout(() => {
      const intent = detectIntent(trimmed)
      setDays(intent.days)
      setMatchedInterests(intent.interests)
      setBudget(intent.budget)
      setPace(intent.pace)
      setPhase('result')
    }, 700)
  }

  function reset() {
    setPhase('input')
    setPrompt('')
  }

  if (phase !== 'result') {
    return (
      <div className="tp-prompt-hero">
        {phase === 'thinking' ? (
          <div className="tp-prompt-thinking">
            <span className="tp-prompt-avatar tp-prompt-avatar-ai">
              <FaRobot />
            </span>
            <div className="tp-prompt-bubble tp-prompt-typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : (
          <>
            <form
              className="tp-prompt-hero-input"
              onSubmit={(e) => {
                e.preventDefault()
                submitPrompt(prompt)
              }}
            >
              <textarea
                autoFocus
                rows={3}
                placeholder="Describe your trip, e.g. 3 days, love food and temples..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    submitPrompt(prompt)
                  }
                }}
                aria-label="Describe your trip"
              />
              <button type="submit" className="tp-btn tp-btn-primary tp-prompt-hero-send" disabled={!prompt.trim()}>
                <FaPaperPlane /> Plan it
              </button>
            </form>
            <div className="tp-prompt-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="tp-chip" onClick={() => submitPrompt(s)}>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="tp-card tp-card-pad tp-prompt-result">
      <p className="tp-prompt-result-quote">&ldquo;{prompt}&rdquo;</p>

      <div className="tp-prompt-msg">
        <span className="tp-prompt-avatar tp-prompt-avatar-ai">
          <FaRobot />
        </span>
        <div className="tp-prompt-bubble">
          Got it{days ? ` — a ${days}-day trip` : ''} matched to {matchedInterests.join(' and ').toLowerCase()}.
          Adjust anything below, then see your trip packages.
        </div>
      </div>

      <div className="tp-field">
        <label>Matched to</label>
        <div className="tp-chip-select">
          {matchedInterests.map((tag) => (
            <span key={tag} className="tp-pill">{tag}</span>
          ))}
        </div>
      </div>

      <div className="tp-field">
        <label>Budget</label>
        <div className="tp-chip-select">
          {BUDGETS.map((b) => (
            <button type="button" key={b} className={`tp-chip ${budget === b ? 'tp-chip-selected' : ''}`} onClick={() => setBudget(b)}>
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-field">
        <label>Travel pace</label>
        <div className="tp-chip-select">
          {PACES.map((p) => (
            <button type="button" key={p} className={`tp-chip ${pace === p ? 'tp-chip-selected' : ''}`} onClick={() => setPace(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-prompt-result-actions">
        <button type="button" className="tp-btn tp-btn-ghost" onClick={reset}>
          <FaRedo /> Ask something else
        </button>
        <button
          type="button"
          className="tp-btn tp-btn-primary"
          onClick={() => onGenerate({ pace, budget: `${BUDGET_SYMBOL[budget]} ${budget}` })}
        >
          <FaMagic /> See Trip Packages
        </button>
      </div>
    </div>
  )
}
