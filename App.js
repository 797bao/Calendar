

import React from 'react'
import MonthView from './components/RegistrationPage'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/MonthView' element={<MonthView />} />
      
      </Routes>
    </Router>
  )
}

export default App