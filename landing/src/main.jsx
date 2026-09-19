import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles.css'
import './app/app.css'
import './pino/pino.css'
import App from './App.jsx'
import AppShell from './app/AppShell.jsx'
import PlannerPage from './app/pages/PlannerPage.jsx'
import TripResultPage from './app/pages/TripResultPage.jsx'
import MyTripsPage from './app/pages/MyTripsPage.jsx'
import ForumPage from './app/pages/ForumPage.jsx'
import ProfilePage from './app/pages/ProfilePage.jsx'
import PublicProfilePage from './app/pages/PublicProfilePage.jsx'
import PinoGreeno from './pino/PinoGreeno.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="planner" replace />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="trip/:tripId" element={<TripResultPage />} />
          <Route path="trips" element={<MyTripsPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="u/:username" element={<PublicProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PinoGreeno />
    </BrowserRouter>
  </StrictMode>
)
