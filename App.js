

import React from 'react'
import DailyView from './components/DailyView'
import MonthlyView from './components/MonthlyView'
import TempHome from './components/TempHome'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<TempHome />} />
        <Route path='/DailyView' element={<DailyView />} />
        <Route path='/MonthlyView' element={<MonthlyView />} />
      </Routes>
    </Router>
  )
}

export default App