import { useState } from 'react'
import { FaMagic } from 'react-icons/fa'

const INTERESTS = ['Culture', 'Food', 'Nature', 'Nightlife', 'Shopping', 'Relaxation']
const BUDGET_SYMBOL = { 'Budget-friendly': '$', Moderate: '$$', Premium: '$$$' }
const BUDGETS = Object.keys(BUDGET_SYMBOL)
const PACES = ['Relaxed', 'Balanced', 'Packed']
const STAYS = ['Hotel', 'Guesthouse', 'Homestay']

export default function GuidedMode({ onGenerate }) {
  const [interests, setInterests] = useState(['Culture', 'Food'])
  const [budget, setBudget] = useState('Moderate')
  const [pace, setPace] = useState('Balanced')
  const [stay, setStay] = useState('Hotel')
  const [travelers, setTravelers] = useState(2)
  const [startDate, setStartDate] = useState('2026-10-10')
  const [endDate, setEndDate] = useState('2026-10-12')

  function toggleInterest(tag) {
    setInterests((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]))
  }

  return (
    <form
      className="tp-card tp-card-pad"
      onSubmit={(e) => {
        e.preventDefault()
        onGenerate({ startDate, endDate, travelers, pace, budget: `${BUDGET_SYMBOL[budget]} ${budget}` })
      }}
    >
      <div className="tp-field">
        <label>Destination</label>
        <input type="text" value="Phnom Penh, Cambodia" disabled />
        <span className="tp-field-hint">TourPlan currently plans trips within Phnom Penh.</span>
      </div>

      <div className="tp-form-row">
        <div className="tp-field">
          <label htmlFor="start-date">Start date</label>
          <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="tp-field">
          <label htmlFor="end-date">End date</label>
          <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} />
        </div>
      </div>

      <div className="tp-field">
        <label htmlFor="travelers">Number of travelers</label>
        <input
          id="travelers"
          type="number"
          min={1}
          max={12}
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
        />
      </div>

      <div className="tp-field">
        <label>Budget</label>
        <div className="tp-chip-select">
          {BUDGETS.map((b) => (
            <button
              type="button"
              key={b}
              className={`tp-chip ${budget === b ? 'tp-chip-selected' : ''}`}
              onClick={() => setBudget(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-field">
        <label>Interests</label>
        <div className="tp-chip-select">
          {INTERESTS.map((i) => (
            <button
              type="button"
              key={i}
              className={`tp-chip ${interests.includes(i) ? 'tp-chip-selected' : ''}`}
              onClick={() => toggleInterest(i)}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-field">
        <label>Travel pace</label>
        <div className="tp-chip-select">
          {PACES.map((p) => (
            <button
              type="button"
              key={p}
              className={`tp-chip ${pace === p ? 'tp-chip-selected' : ''}`}
              onClick={() => setPace(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-field">
        <label>Accommodation</label>
        <div className="tp-chip-select">
          {STAYS.map((s) => (
            <button
              type="button"
              key={s}
              className={`tp-chip ${stay === s ? 'tp-chip-selected' : ''}`}
              onClick={() => setStay(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="tp-btn tp-btn-primary tp-btn-block" disabled={interests.length === 0}>
        <FaMagic /> See Trip Packages
      </button>
    </form>
  )
}
