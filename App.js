

import React from 'react'
import DailyView from './components/DailyView'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/DailyView' element={<DailyView />} />
      
      </Routes>
    </Router>
  )
}

export default App