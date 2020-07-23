import React from "react"

function Counter({ counterOutputValue, chosenDate, chosenView, untilFlag }) {
	let sinceOrUntilDisplay = "since"
	if (untilFlag) {
		sinceOrUntilDisplay = "until"
	}
	counterOutputValue = Math.abs(counterOutputValue)

	return (
		<div>
			<div className="counterContainer">
				<div className="counterValue timeFont">
					{counterOutputValue.toLocaleString()}
				</div>
				<div className="counterText font">
					{chosenView} {sinceOrUntilDisplay} {chosenDate}
				</div>
			</div>
		</div>
	)
}

export default Counter
