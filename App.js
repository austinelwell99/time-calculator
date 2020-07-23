import React, { useState, useEffect } from "react"
import "./App.css"
import Counter from "./Counter"
import CounterShowAll from "./CounterShowAll"

const SECONDS = 1000,
	MINUTES = SECONDS * 60,
	HOURS = MINUTES * 60,
	DAYS = HOURS * 24,
	WEEKS = DAYS * 7,
	MONTHS = DAYS * 30.41,
	YEARS = DAYS * 365.25

let chosenDate,
	chosenView,
	tempClickedView,
	timeUnit,
	intervalFlag,
	interval,
	showAllFlag,
	untilFlag

function App() {
	//-----------------------------------------------------------------------------------------local vars---------------------------

	let dateIn,
		hourIn,
		validDateRegex = /(\d\d)\/(\d\d)\/(\d\d\d\d)/

	//-------------------------------------------------------------------------------------useState and useEffect---------------------------

	let [counterOutputValue, setCounterOutputValue] = useState(0)
	let [state, setState] = useState([])

	useEffect(() => {
		//-----------------------------------setting default button and values
		showAllFlag = false
		intervalFlag = true //----------we will be using an active setInterval
		timeUnit = SECONDS
		chosenView = "seconds"
		tempClickedView = "seconds"
		untilFlag = false

		//-----------------------------------random loading screen
		let randomIndex = Math.floor(Math.random() * 9),
			randomObj = {
				"aliens abducted you": Math.floor(Math.random() * 10000),
				"your uncle took a dump": Math.floor(Math.random() * 3000),
				"george shot lenny": "11/23/1937",
				"a mango rotted": Math.floor(Math.random() * 40000),
				"you got hacked": 0,
				"a pigeon pooped": Math.floor(Math.random() * 200),
				"this website loaded": 0,
				"our last incident": Math.floor(Math.random() * 100000),
				"the moon landing": "07/20/1969"
			}

		chosenDate = Object.keys(randomObj)[randomIndex]
		counterOutputValue = randomObj[chosenDate]

		if (validDateRegex.test(counterOutputValue)) {
			//----meaning it is the moon landing or of mice and men
			counterOutputValue = calculateTime(counterOutputValue)
		} else {
			//-----all the other options
			setCounterOutputValue(counterOutputValue)
		}
		setState([...state])
	}, [])

	useEffect(() => {
		clearInterval(interval)
		if (intervalFlag) {
			interval = setInterval(() => {
				setCounterOutputValue((counterOutputValue) => counterOutputValue + 1)
			}, timeUnit)
		}
	}, [state])

	//-----------------------------------------------------------------------------------------------methods-------------------------

	function submitDate() {
		if (validDateRegex.test(dateIn.value)) {
			chosenView = tempClickedView
			chosenDate = dateIn.value
			if (chosenView === "seconds") {
				timeUnit = SECONDS
				intervalFlag = true
				showAllFlag = false
			}
			if (chosenView === "minutes") {
				timeUnit = MINUTES
				intervalFlag = true
				showAllFlag = false
			}
			if (chosenView === "hours") {
				timeUnit = HOURS
				intervalFlag = true
				showAllFlag = false
			}
			if (chosenView === "days") {
				timeUnit = DAYS
				intervalFlag = false
				showAllFlag = false
			}
			if (chosenView === "weeks") {
				timeUnit = WEEKS
				intervalFlag = false
				showAllFlag = false
			}
			if (chosenView === "months") {
				timeUnit = MONTHS
				intervalFlag = false
				showAllFlag = false
			}
			if (chosenView === "years") {
				timeUnit = YEARS
				intervalFlag = false
				showAllFlag = false
			}
			if (chosenView === "all") {
				timeUnit = SECONDS //will set counterOutput to seconds, which will be converted inside the component
				intervalFlag = true
				showAllFlag = true //will render special component instead of normal one
			}
			calculateTime(chosenDate)
		}
	}

	function calculateTime(chosenDate) {
		let hour = hourIn.value || "00:00"
		let currentTime = new Date()
		let givenTime = new Date(chosenDate + ", " + hour.toString())

		if (currentTime.getTime() - givenTime.getTime() < 0) {
			untilFlag = true
		} else {
			untilFlag = false
		}

		let calculatedValue =
			(currentTime.getTime() - givenTime.getTime()) / timeUnit

		if (calculatedValue < 0) {
			setCounterOutputValue(Math.ceil(calculatedValue))
		} else {
			setCounterOutputValue(Math.floor(calculatedValue))
		}
		setState([...state])
	}

	function addSlashes(e) {
		if (e.key !== "Backspace") {
			dateIn.value = dateIn.value
				.replace(/^(\d\d)$/g, "$1/")
				.replace(/^(\d\d\/\d\d)$/g, "$1/")
		}
	}

	function addColon(e) {
		if (e.key !== "Backspace") {
			hourIn.value = hourIn.value.replace(/^(\d\d)$/g, "$1:")
		}
	}

	//---------------------------------------------------------------------------------------render--------------------------------------------
	return (
		<div className="App">
			{/*-------------------------------------------------------------------------counter display------------*/}
			{!showAllFlag && (
				<Counter
					counterOutputValue={counterOutputValue}
					chosenDate={chosenDate}
					chosenView={chosenView}
					untilFlag={untilFlag}
				/>
			)}
			{showAllFlag && (
				<CounterShowAll
					counterOutputValue={counterOutputValue}
					chosenDate={chosenDate}
					untilFlag={untilFlag}
				/>
			)}
			{/*-------------------------------------------------------------------------input UI-------------------*/}
			<div className="inputContainer">
				<div className="dateInputContainer">
					<input
						type="text"
						id="dateInput"
						className="font"
						ref={(input) => (dateIn = input)}
						placeholder="mm/dd/yyyy"
						onKeyUp={addSlashes}
					></input>
					<input
						type="text"
						id="hourInput"
						className="font"
						ref={(input) => (hourIn = input)}
						placeholder="hh:mm"
						onKeyUp={addColon}
					></input>
				</div>
				<div className="secondaryOptions font">
					<input
						type="radio"
						name="inputView"
						value="all"
						id="allRadio"
						onClick={() => (tempClickedView = "all")}
					></input>
					<label htmlFor="allRadio" className="radioButtons">
						all
					</label>
					<input
						type="radio"
						name="inputView"
						value="YEARS"
						id="yearsRadio"
						onClick={() => (tempClickedView = "years")}
					></input>
					<label htmlFor="yearsRadio" className="radioButtons">
						years
					</label>
					<input
						type="radio"
						name="inputView"
						value="MONTHS"
						id="monthsRadio"
						onClick={() => (tempClickedView = "months")}
					></input>
					<label htmlFor="monthsRadio" className="radioButtons">
						months
					</label>
					<input
						type="radio"
						name="inputView"
						value="WEEKS"
						id="weeksRadio"
						onClick={() => (tempClickedView = "weeks")}
					></input>
					<label htmlFor="weeksRadio" className="radioButtons">
						weeks
					</label>
					<input
						type="radio"
						name="inputView"
						value="DAYS"
						id="daysRadio"
						onClick={() => (tempClickedView = "days")}
					></input>
					<label htmlFor="daysRadio" className="radioButtons">
						days
					</label>
					<input
						type="radio"
						name="inputView"
						value="HOURS"
						id="hoursRadio"
						onClick={() => (tempClickedView = "hours")}
					></input>
					<label htmlFor="hoursRadio" className="radioButtons">
						hours
					</label>
					<input
						type="radio"
						name="inputView"
						value="MINUTES"
						id="minutesRadio"
						onClick={() => (tempClickedView = "minutes")}
					></input>
					<label htmlFor="minutesRadio" className="radioButtons">
						minutes
					</label>
					<input
						type="radio"
						name="inputView"
						value="SECONDS"
						id="secondsRadio"
						onClick={() => (tempClickedView = "seconds")}
						defaultChecked
					></input>
					<label htmlFor="secondsRadio" className="radioButtons">
						seconds
					</label>
				</div>
				<button onClick={submitDate} id="submitDate" className="font">
					calculate
				</button>
			</div>
			<div className="finePrint">
				<div className="finePrintText font">
					*because this calculator approximates months as 30.41 days, and years
					as 365.25 days, it's accuracy may vary
				</div>
			</div>
		</div>
	)
}

export default App
