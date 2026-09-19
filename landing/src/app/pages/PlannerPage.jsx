import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCommentDots, FaListUl } from 'react-icons/fa'
import PromptMode from '../components/planner/PromptMode'
import GuidedMode from '../components/planner/GuidedMode'
import GeneratingOverlay from '../components/planner/GeneratingOverlay'
import PackageOptions from '../components/planner/PackageOptions'
import PaywallModal from '../components/planner/PaywallModal'

export default function PlannerPage() {
  const [mode, setMode] = useState('prompt')
  const [generating, setGenerating] = useState(false)
  const [showPackages, setShowPackages] = useState(false)
  const [overrides, setOverrides] = useState(null)
  const [payingPkg, setPayingPkg] = useState(null)
  const [unlocked, setUnlocked] = useState([])
  const navigate = useNavigate()

  function handleGenerate(nextOverrides) {
    setOverrides(nextOverrides)
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setShowPackages(true)
    }, 1100)
  }

  function goToPackage(pkg) {
    navigate(`/app/trip/${pkg.tripId}`, { state: { overrides } })
  }

  function selectPackage(pkg) {
    if (pkg.price > 0 && !unlocked.includes(pkg.id)) {
      setPayingPkg(pkg)
      return
    }
    goToPackage(pkg)
  }

  function handleUnlock(pkg) {
    setUnlocked((cur) => [...cur, pkg.id])
    setPayingPkg(null)
    goToPackage(pkg)
  }

  function startOver() {
    setShowPackages(false)
    setOverrides(null)
  }

  const recommendedId = overrides?.budget?.includes('Premium')
    ? 'pkg-premium'
    : overrides?.budget?.includes('Budget')
    ? 'pkg-bkk1'
    : 'pkg-daunpenh'

  return (
    <div className="tp-page tp-planner-page">
      <div className="tp-planner-hero">
        <h1 className="tp-page-title">AI Planner</h1>
        <p className="tp-page-sub">Describe your trip, or fill out a guided form. Either way, you get matched to trip packages.</p>

        {!showPackages && (
          <div className="tp-mode-toggle" role="tablist" aria-label="Planning mode">
            <button
              role="tab"
              aria-selected={mode === 'prompt'}
              className={`tp-mode-tab ${mode === 'prompt' ? 'tp-active' : ''}`}
              onClick={() => setMode('prompt')}
            >
              <FaCommentDots /> Prompt Mode
            </button>
            <button
              role="tab"
              aria-selected={mode === 'guided'}
              className={`tp-mode-tab ${mode === 'guided' ? 'tp-active' : ''}`}
              onClick={() => setMode('guided')}
            >
              <FaListUl /> Guided Mode
            </button>
          </div>
        )}
      </div>

      {showPackages ? (
        <div className="tp-planner-body tp-planner-body-wide">
          <PackageOptions recommendedId={recommendedId} onSelect={selectPackage} />
          <div className="tp-planner-start-over">
            <button className="tp-btn tp-btn-ghost" onClick={startOver}>
              Start over
            </button>
          </div>
        </div>
      ) : (
        <div className="tp-planner-body">
          {mode === 'prompt' ? <PromptMode onGenerate={handleGenerate} /> : <GuidedMode onGenerate={handleGenerate} />}
        </div>
      )}

      {generating && <GeneratingOverlay />}

      <PaywallModal pkg={payingPkg} open={!!payingPkg} onClose={() => setPayingPkg(null)} onUnlock={handleUnlock} />
    </div>
  )
}
