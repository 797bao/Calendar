import React from 'react';
import { Link } from 'react-router-dom'
import DailyView from './DailyView'
import MonthlyView from './MonthlyView'

const TempHome = () => {
    return (
        <div>
        <h1>Temporary Home Page</h1>
        <div>
            <Link to="/DailyView" state = {DailyView}><button>Daily View</button></Link>
        </div>
        <div>
            <Link to="/MonthlyView" state = {MonthlyView}><button>Monthly View</button></Link>
        </div>
        </div>
       
        
    );
    }
export default TempHome;