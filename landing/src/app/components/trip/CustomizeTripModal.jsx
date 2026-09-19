import { useState } from 'react'
import Modal from '../shared/Modal'

const BUDGETS = ['Budget-friendly', 'Moderate', 'Premium']
const PACES = ['Relaxed', 'Balanced', 'Packed']

export default function CustomizeTripModal({ trip, open, onClose, onSave }) {
  const [budget, setBudget] = useState(trip.budget.replace(/^\$+\s?/, ''))
  const [pace, setPace] = useState(trip.pace)
  const [travelers, setTravelers] = useState(trip.travelers)
  const [startDate, setStartDate] = useState(trip.startDate || '')
  const [endDate, setEndDate] = useState(trip.endDate || '')

  const budgetSymbol = budget === 'Budget-friendly' ? '$' : budget === 'Premium' ? '$$$' : '$$'

  return (
    <Modal open={open} onClose={onClose} title="Customize trip" size="sm">
      <div className="tp-form-row">
        <div className="tp-field">
          <label htmlFor="c-start">Start date</label>
          <input id="c-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="tp-field">
          <label htmlFor="c-end">End date</label>
          <input id="c-end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} />
        </div>
      </div>

      <div className="tp-field">
        <label htmlFor="c-travelers">Number of travelers</label>
        <input id="c-travelers" type="number" min={1} max={12} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} />
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

      <button
        className="tp-btn tp-btn-primary tp-btn-block"
        onClick={() => {
          onSave({ startDate, endDate, travelers, pace, budget: `${budgetSymbol} ${budget}` })
          onClose()
        }}
      >
        Save changes
      </button>
    </Modal>
  )
}
