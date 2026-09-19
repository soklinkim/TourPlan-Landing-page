import riceTerraces from '../../../assets/img/rice-terraces.jpg'

// A stylized, non-interactive-tile map surface: no map API key is available
// in this prototype, so pins are positioned on a static illustrative canvas
// (percentage coordinates from mockData) instead of real geo tiles.
export default function TripMapMock({ places, activePlaceIds, onSelectPlace }) {
  return (
    <div className="tp-map">
      <img src={riceTerraces} alt="" aria-hidden="true" className="tp-map-bg" />
      <div className="tp-map-tint" />
      {places.map((place, i) => {
        const isActive = activePlaceIds.includes(place.id)
        return (
          <button
            key={place.id}
            className={`tp-map-pin ${isActive ? 'tp-map-pin-active' : 'tp-map-pin-dim'}`}
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
            onClick={() => onSelectPlace(place)}
            title={place.name}
          >
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}
