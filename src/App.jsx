import { useState } from 'react';
import Papa from 'papaparse';
import './App.css';
import ResumeByCategories from './components/ResumeByCategories/ResumeByCategories';

/* 
{
  "Activity": "Programming on Club TC",
  "Start and End": "16/03/2024 20:00 (GMT-3) → 18/03/2024 3:00 (GMT-3)",
  "Category": "Deep Work",
  "Formula": "",
  "ID": "ACT-112",
  "end": "17/03/2024 3:00 (GMT-3)",
  "start": "16/03/2024 18:00 (GMT-3)"
}
 */


function App() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  console.log('activities', activities);
  console.log('filtered activities', filteredActivities);

  const onSubmit = e => {
    e.preventDefault();
    const file = e.target.elements['csv-file'].files[0];

    if (file) {
      Papa.parse(file, {
        complete: function (results) {
          setActivities(results.data);
        },
        header: true
      });
    } else {
      console.log('No file selected');
    }
  }

  const filterActivitiesByDays = (days) => {

    if(days === null) {
      setFilteredActivities(activities);
      return;
    }

    const today = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const msDaysAgo = days * msPerDay;
  
    // Crear una nueva fecha restando `msDaysAgo` de la fecha actual
    const dateDaysAgo = new Date(today.getTime() - msDaysAgo);
    let newFilteredActivities = [];

    activities.forEach(activity => {
      const activityDate = new Date(activity.start);
      console.log(activityDate - dateDaysAgo);
      
      if((activityDate - dateDaysAgo) > 0) {
        newFilteredActivities.push(activity);
        console.log('yes')
      }

    });

    setFilteredActivities(newFilteredActivities);
  }

  return (
    <div className='app'>

      <header>
        <h1>Life Time Tracker</h1>
        <p>Insert your CSV below. <a href='#'>How to get the csv?</a></p>

        <form id="form-csv" onSubmit={onSubmit}>
          <input type="file" id="csv-file" />
          <input type="submit" value='Analyze data' />
        </form>
      </header>
      <br />
      <div>
        <button disabled={!activities.length > 0} onClick={() => filterActivitiesByDays(7)}>Últimos 7 días</button>
        <button disabled={!activities.length > 0} onClick={() => filterActivitiesByDays(30)}>Últimos 30 días</button>
        <button disabled={!activities.length > 0} onClick={() => filterActivitiesByDays(36500)}>Todas las actividades</button>
      </div>

      <main>
        {
          activities.length > 0 ? <ResumeByCategories activities={filteredActivities}></ResumeByCategories>
            : <p>Select your file and click on "Analyze data"</p>

        }
      </main>

    </div>
  )
}

export default App
