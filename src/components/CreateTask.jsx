/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Stepper from './Stepper.jsx';

function TaskLocation({
  newTask, sendNewTask, locationSaved, sendLocationSaved, sendCurrentStep, submitted,
}) {
  // // handle location Change
  const handleTaskLocationChange = (e) => {
    const taskLocationChange = e.target.value;
    sendNewTask({ ...newTask, location: taskLocationChange });
  };
  const onLocationSubmit = (clickType) => {
    sendLocationSaved(true);
    sendCurrentStep(2);
  };
  const onLocationEdit = () => {
    sendLocationSaved(false);
    sendCurrentStep(1);
  };
  if (submitted === true) {
    return (
      <>
      </>
    );
  }
  if (locationSaved === true) {
    return (
      <div>
        <div className="row">
          <div className="col-12 col-lg-10 task-container">
            <div className="row div-margin">
              <h3 className="h3-title"> Your Task Location </h3>
            </div>
            <h5 className="margin-input">
              You have chosen
              {' '}
              {newTask.location}
            </h5>
            <div className="button-div">
              <button className="btn btn-success button-save" type="button" onClick={onLocationEdit}> Edit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-10 task-container">
          <div className="row div-margin">
            <h3 className="h3-title"> Your Task Location </h3>
          </div>
          <div>
            <label htmlFor="task-location">
              <input className="input-field margin-input" key="fixed" id="task-location" type="text" value={newTask.location} onChange={handleTaskLocationChange} placeholder="Enter your address" />
            </label>
          </div>
          <div className="button-div">
            <button className="btn btn-success button-save" type="button" onClick={onLocationSubmit}> Save</button>
          </div>
        </div>

      </div>
    </div>
  ); }

function BookingConfirmation({ newTask, sendNewTask, submitted }) {
  if (submitted === false) {
    return (
      <>
      </>
    );
  }
  return (
    <div className="container">
      <h3>Booking Confirmation</h3>
      You have selected
      {' '}
      {newTask.taskerName}
      .
      <br />
      His hourly rate is
      {' '}
      $
      {newTask.rate}
      /hour
      .
      <br />
      Your tasker will meet you on the
      {' '}
      {moment(newTask.date).format('Do MMM YYYY')}
      {' '}
      to complete the requested
      {' '}
      {newTask.category}
    </div>
  );
}

export default function TaskForm({
  taskerList, sendTaskerList, categoriesList, sendCategoriesList, sendCurrentStep, currentStep,
}) {
  const [newTask, setNewTask] = useState({
    location: '', taskerId: null, taskSize: '', vehicle: '', description: '', date: '', categoryId: 1, category: 'Furniture Assembly', taskerName: '', rate: null,
  });
  const [categorySaved, setCategorySaved] = useState(false);
  const [radioSaved, setRadioSaved] = useState(false);
  const [descriptionSaved, setDescriptionSaved] = useState(false);
  const [locationSaved, setLocationSaved] = useState(false);
  const [taskerSaved, setTaskerSaved] = useState(false);
  const [dateSaved, setDateSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [currentSteps, setCurrentSteps] = useState(1);
  const stepsArray = [
    '123',
    'Fill up Task Information',
    'Select Date',
    'Select Tasker',
    'Booking Confirmation',
  ];

  function CategoriesSelection() {
    const categoryOnChange = (e) => {
      const catValue = e.target.value;
      const split = catValue.split(',');
      const selectedCategoryId = split[0];
      const selectedCategoryName = split[1];
      setNewTask({ ...newTask, category: selectedCategoryName, categoryId: selectedCategoryId });
    };
    const onCategorySubmit = (e) => {
      setCategorySaved(true);
    };
    const onCategoryEdit = (e) => {
      setCategorySaved(false);
    };
    const categoryJSX = categoriesList.map((category, index) => (
      <option key={category.id} value={[category.id, category.name]}>
        {' '}
        {category.name}

      </option>
    ));
    if (submitted === true) {
      return (
        <>
        </>
      );
    }
    if (categorySaved === true) {
      return (
        <div className="row">
          <div className="col-12 col-lg-10 task-container">
            <div className="row div-margin">
              <h3 className="h3-title">Select Task Category </h3>
            </div>
            <h5 className="margin-input">
              You have chosen
              {' '}
              {newTask.category}
            </h5>
            <div className="button-div">
              <button className="btn btn-success button-save" type="button" onClick={onCategoryEdit}> Edit</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-12 col-lg-10 task-container">
          <div className="row div-margin">
            <h3 className="h3-title">Select Task Category </h3>
          </div>
          <div className="category-input">
            <option value="" disabled selected> Select your Option</option>
          </div>
          <div className="category-input">
            <div className="select">
              <select value={newTask.categories} onChange={categoryOnChange}>
                {categoryJSX}
              </select>
            </div>
          </div>
          <div className="button-div">
            <button className="btn btn-success button-save" type="button" onClick={onCategorySubmit}> Save</button>
          </div>
        </div>
      </div>
    );
  }
  // task radio function
  function TaskRadio() {
    const taskSizeOnChange = (e) => {
      const selectedTaskSize = e.target.value;
      setNewTask({ ...newTask, taskSize: selectedTaskSize });
    };
    const selectedVehicleOnChange = (e) => {
      const selectedVehicle = e.target.value;
      setNewTask({ ...newTask, vehicle: selectedVehicle });
      console.log(newTask);
    };
    const onTaskRadioSubmit = () => {
      setRadioSaved(true);
    };
    const onTaskRadioEdit = () => {
      setRadioSaved(false);
    };
    if (submitted === true) {
      return (
        <>
        </>
      );
    }
    if (radioSaved === true) {
      return (
        <div>
          <div className="row">
            <div className="col-12 col-lg-10 task-container">
              <div className="row div-margin">
                <h3 className="h3-title"> Your Task information </h3>
              </div>
              <h5 className="margin-input">
                You have selected a
                {' '}
                {newTask.taskSize}
                {' '}
                task
              </h5>
              <h5 className="margin-input">
                You have selected
                {' '}
                {newTask.vehicle}
                {' '}
                for vehicle
              </h5>
              <div className="button-div">
                <button className="btn btn-success button-save" type="button" onClick={onTaskRadioEdit}> Edit</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-12 col-lg-10 task-container">
          <div className="row div-margin">
            <h3 className="h3-title"> How big is your task?</h3>
            <div className="row">
              <div className="col-5">
                <label htmlFor="task-size" name="task"> Small - Est. 1 hour </label>
              </div>
              <div className="col-1">
                <input type="radio" checked={newTask.taskSize === 'small'} value="small" onChange={taskSizeOnChange} />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-5">
                <label htmlFor="task-size" name="task"> Medium - Est. 2-3 hours </label>
              </div>
              <div className="col-1">
                <input type="radio" name="task" checked={newTask.taskSize === 'medium'} value="medium" onChange={taskSizeOnChange} />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-5">
                <label htmlFor="task-size"> Large - Est. Over 4 hours </label>
              </div>
              <div className="col-1">
                <input type="radio" checked={newTask.taskSize === 'large'} value="large" onChange={taskSizeOnChange} />
              </div>
            </div>
            <br />
            <br />
            <h3 className="h3-title">What vehicle do you require?</h3>
            <br />
            <div className="row">
              <div className="col-5">
                <label htmlFor="vehicle-required" name="task"> Car </label>
              </div>
              <div className="col-1">
                <input type="radio" checked={newTask.vehicle === 'car'} value="car" onChange={selectedVehicleOnChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <label htmlFor="vehicle-required" name="task"> Truck </label>
              </div>
              <div className="col-1">
                <input type="radio" name="task" checked={newTask.vehicle === 'truck'} value="truck" onChange={selectedVehicleOnChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <label htmlFor="vehicle-required"> Not Required </label>
              </div>
              <div className="col-1">
                <input type="radio" checked={newTask.vehicle === 'not required'} value="not required" onChange={selectedVehicleOnChange} />
              </div>
            </div>
            <br />
          </div>
          <div className="button-div">
            <button className="btn btn-success button-save" type="button" onClick={onTaskRadioSubmit}> Save</button>
          </div>
        </div>
      </div>
    );
  }
  // task description function
  function TaskDescription() {
    const taskDescriptionOnChange = (e) => {
      const taskDescriptionChange = e.target.value;
      setNewTask({ ...newTask, description: taskDescriptionChange });
    };
    const onDescriptionSubmit = () => {
      setDescriptionSaved(true);
      setCurrentSteps(3);
    };
    const onDescriptionEdit = () => {
      setDescriptionSaved(false);
      setCurrentSteps(2);
    };
    if (submitted === true) {
      return (
        <>
        </>
      );
    }
    if (descriptionSaved === true) {
      return (
        <div>
          <div className="row">
            <div className="col-12 col-lg-10 task-container">
              <div className="row div-margin">
                <h3 className="h3-title"> Provide more details of your task </h3>
              </div>
              <h5 className="margin-input">
                You have entered
                {' '}
                {newTask.description}
              </h5>
              <div className="button-div">
                <button className="btn btn-success button-save" type="button" onClick={onDescriptionEdit}> Edit</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-12 col-lg-10 task-container">
          <div className="row div-margin">
            <h3 className="h3-title">Provide more details of your task </h3>
          </div>
          <input className="input-field margin-input" id="task-description" type="text" value={newTask.description} onChange={taskDescriptionOnChange} />
          <div className="button-div">
            <button className="btn btn-success button-save" type="button" onClick={onDescriptionSubmit}> Save</button>
          </div>
        </div>
      </div>
    );
  }
  // date selection function
  function DateSelect() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateOnChange = (date) => {
      console.log(selectedDate);
      setSelectedDate(date);
      console.log(newTask);
    };
    const handleDateSave = () => {
      setNewTask({ ...newTask, date: selectedDate });
      setDateSaved(true);
      setCurrentSteps(4);
    };
    const onDateEdit = () => {
      setDateSaved(false);
      setCurrentSteps(3);
    };
    if (submitted === true) {
      return (
        <>
        </>
      );
    }
    if (dateSaved === true) {
      return (
        <div>
          <div className="row">
            <div className="col-12 col-lg-10 task-container">
              <div className="row div-margin">
                <h3 className="h3-title"> Select your date </h3>
              </div>
              <h5 className="margin-input">
                You have selected
                {' '}
                {moment(selectedDate).format('Do MMM YYYY')}
              </h5>

              <div className="button-div">
                <button className="btn btn-success button-save" type="button" onClick={onDateEdit}> Edit</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-12 col-lg-10 task-container">
          <div className="row div-margin">
            <h3 className="h3-title"> Select your date </h3>
          </div>
          <div className="flex-row d-flex margin-input">
            <Calendar
              className="align-center"
              onChange={dateOnChange}
              value={selectedDate}
              minDate={new Date()}
            />
            <div className="col-5 offset-2">
              <div className="row">
                <div className="col-10 offset-1">
                  <br />
                  <br />
                  <h3>You have selected</h3>
                </div>
                <div className="row offset-2">
                  <h4>{moment(selectedDate).format('Do MMM YYYY')}</h4>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-2 offset-md-3">
                  <button className="btn btn-sucess button-save" type="button" onClick={handleDateSave}>Save </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // JSX Taskers List function
  function SelectTasker() {
    // handle Tasker Select
    const selectTaskerOnClick = (e) => {
      const taskerValue = e.target.value;
      const split = taskerValue.split(',');
      const selectedTaskerId = split[0];
      const selectedTaskerName = split[1];
      const selectedTaskerRate = split[2];
      setTaskerSaved(true);
      setCurrentSteps(5);
      // console.log('selected taskerId', selectedTaskerId);
      setNewTask({
        ...newTask,
        taskerId: selectedTaskerId,
        taskerName: selectedTaskerName,
        rate: selectedTaskerRate,
      });
    };
    const onTaskerEdit = () => {
      setTaskerSaved(false);
      setCurrentSteps(4);
    };

    // handle Tasker Select
    const taskerJSX = taskerList.map((tasker) => (
      <div className="row" key={tasker.id}>
        <div className="col-12 col-lg-10 task-container">
          <div className="row">
            <div className="col-4">
              Name:
              {' '}
              {tasker.name}
            </div>
            <div className="col-4">
              Location:
              {' '}
              {tasker.location}
            </div>
            <div className="col-4">
              Rate:
              {' '}
              $
              {tasker.rate}
              {' '}
              per hour
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              No of Completed Task:
              {' '}
              {tasker.numOfCompletedTasks}
            </div>
            <div className="col-3">
              Vehicle:
              {' '}
              {tasker.vehicle}
            </div>
            <div className="col-3 offset-md-1">
              <button type="button" id={tasker.id} className="btn-outline-success" value={[tasker.id, tasker.name, tasker.rate]} onClick={selectTaskerOnClick}> Select </button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-12">
              Description:
              {' '}
              {tasker.description}
            </div>
          </div>
        </div>
      </div>
    ));
    const handleFinalSubmit = () => {
      setSubmitted(true);
      setCurrentSteps(6);
      const createdTask = {
        location: newTask.location,
        description: newTask.description,
        taskerId: newTask.taskerId,
        date: newTask.date,
        vehicle: newTask.vehicle,
        taskSize: newTask.taskSize,
        categoryId: newTask.categoryId,

      };
      console.log(createdTask);
      // on submit i want to create a new Task in the database
      axios.post('/newTask', { createdTask })
        .then((result) => {
          console.log(result.data);
        });
    };
    if (submitted === true) {
      return (
        <>
        </>
      );
    }
    if (locationSaved === false || descriptionSaved === false
      || categorySaved === false || radioSaved === false || dateSaved === false) {
      return (
        <div />
      );
    }
    if (taskerSaved === true) {
      return (
        <div>
          <div className="row">
            <div className="col-12 col-lg-10 task-container">
              <div className="row div-margin">
                <h3 className="h3-title"> Select your tasker: </h3>
              </div>
              <h5 className="margin-input">
                You have selected
                {' '}
                {newTask.taskerName}
              </h5>
              <h5 className="margin-input">
                His rate is $
                {' '}
                {newTask.rate}
                {' '}
                per hour
              </h5>
              <div className="button-div">
                <button className="btn btn-success button-save" type="button" onClick={onTaskerEdit}> Select Another Tasker</button>
              </div>
            </div>
          </div>
          <div className="button-div">
            <button className="btn btn-sucess button-save" type="button" onClick={handleFinalSubmit}> Submit </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3 className="h3-title"> Select your tasker: </h3>
        { taskerJSX }
      </div>
    );
  }
  return (
    <div className="stepper-container-horizontal">
      <Stepper
        direction="horizontal"
        currentStepNumber={currentStep - 1}
        steps={stepsArray}
        stepColor="purple"
        currentStep={currentSteps}
      />
      <div className="container">
        <TaskLocation
          newTask={newTask}
          sendNewTask={setNewTask}
          locationSaved={locationSaved}
          sendLocationSaved={setLocationSaved}
          currentStepsNumber={currentSteps}
          sendCurrentStep={setCurrentSteps}
          submitted={submitted}
        />
        {CategoriesSelection()}
        {TaskRadio()}
        {TaskDescription()}
        {DateSelect()}
        <SelectTasker />
        <br />
        <BookingConfirmation
          newTask={newTask}
          sendNewTask={setNewTask}
          submitted={submitted}
        />
      </div>
    </div>
  );
}
