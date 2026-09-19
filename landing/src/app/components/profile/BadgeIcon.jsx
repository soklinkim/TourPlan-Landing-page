import { FaCompass, FaCamera, FaUtensils, FaLandmark, FaStar, FaMapMarkedAlt } from 'react-icons/fa'

const ICONS = {
  compass: <FaCompass />,
  camera: <FaCamera />,
  utensils: <FaUtensils />,
  landmark: <FaLandmark />,
  star: <FaStar />,
  map: <FaMapMarkedAlt />,
}

export default function BadgeIcon({ name }) {
  return ICONS[name] || <FaStar />
}
