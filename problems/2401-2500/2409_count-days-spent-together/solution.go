func countDaysTogether(arriveAlice string, leaveAlice string, arriveBob string, leaveBob string) int {
	// Month lengths of a non-leap year, turned into "days before month m"
	// so any "MM-DD" maps to one day-of-year integer.
	monthStart := [12]int{0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334}
	dayOfYear := func(date string) int {
		month := int(date[0]-'0')*10 + int(date[1]-'0')
		day := int(date[3]-'0')*10 + int(date[4]-'0')
		return monthStart[month-1] + day
	}

	// Both stays are now integer intervals; the shared days are their
	// inclusive intersection, empty exactly when the bounds cross.
	arrival := max(dayOfYear(arriveAlice), dayOfYear(arriveBob))
	departure := min(dayOfYear(leaveAlice), dayOfYear(leaveBob))
	return max(0, departure-arrival+1)
}
