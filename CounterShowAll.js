import React from "react"

function CounterShowAll({ counterOutputValue, chosenDate, untilFlag }) {
	let sinceOrUntilDisplay = "since"
	if (untilFlag) {
		sinceOrUntilDisplay = "until"
	}
	counterOutputValue = Math.abs(counterOutputValue)

	let converted = {
		years: 0,
		months: 0,
		weeks: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	}

	let template = {
		years: 31557600,
		months: 2627424,
		weeks: 604800,
		days: 86400,
		hours: 3600,
		minutes: 60,
		seconds: 1
	}
	calculateAll(counterOutputValue)

	function calculateAll(seconds) {
		for (let key in template) {
			if (seconds >= template[key]) {
				converted[key] = Math.floor(seconds / template[key])
				if (converted[key].toString().length === 1) {
					converted[key] = "0" + converted[key]
				}
				seconds = seconds % template[key]
			} else if (seconds < template[key]) {
				converted[key] = "00"
			}
		}
	}

	//-------------------------------------------------------------------------------render------------------
	return (
		<div>
			<div className="counterContainer">
				<div id="displayAllContainer" className="counterValue timeFont">
					<div>{converted["years"]}:</div>
					<div>{converted["months"]}:</div>
					<div>{converted["weeks"]}:</div>
					<div>{converted["days"]}:</div>
					<div>{converted["hours"]}:</div>
					<div>{converted["minutes"]}:</div>
					<div>{converted["seconds"]}</div>
				</div>
				<div className="displayAllUnits font">
					<div className="displayUnit">years</div>
					<div className="displayUnit">months</div>
					<div className="displayUnit">weeks</div>
					<div className="displayUnit">days</div>
					<div className="displayUnit">hours</div>
					<div className="displayUnit">minutes</div>
					<div className="displayUnit">seconds</div>
				</div>
				<div className="counterText font">
					{sinceOrUntilDisplay} {chosenDate}
				</div>
			</div>
		</div>
	)
}

export default CounterShowAll
