function getClockAngle(hh_mm:string): number {
	const time = hh_mm.split(":")
	const hour = parseInt(time[0])
	const minute = parseInt(time[1])
	
	const HourAngle = ( hour % 12 ) * 30 + minute / 2
	const MinuteAngle = minute * 6

	let angle = Math.abs(HourAngle - MinuteAngle)
	if ( angle > 180 )
		return 360 - angle
	return angle
}

// console.log(getClockAngle("00:01"))
// console.log(getClockAngle("09:00"))
// console.log(getClockAngle("17:30"))