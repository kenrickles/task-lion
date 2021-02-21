import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/CreateTask.jsx';
import './styles.scss';

export default function App() {
  const [taskerList, setTaskerList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [locationList, setLocationList] = useState([]);

  // const handleStepClick(clickType) {
  //   setCurrentStep()
  // }

  useEffect(() => {
    axios.get('/categories')
      .then((result) => {
        setCategoriesList(result.data.categoriesList);
      })
      .catch((error) => {
        console.log('categories error', error);
      });
    axios.get('/taskers')
      .then((result) => {
        setTaskerList(result.data.taskerList);
      });
  }, []);

  return (
    <>
      <TaskForm
        categoriesList={categoriesList}
        sendCategoriesList={setCategoriesList}
        taskerList={taskerList}
        sendTaskerList={setTaskerList}
      />
    </>
  );
}
