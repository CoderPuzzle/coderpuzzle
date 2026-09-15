func dayOfTheWeek(day int, month int, year int) string {
	// Anchored: Jan 1 1971 was a Friday, so offset 0 maps to Friday.
	names := []string{"Friday", "Saturday", "Sunday", "Monday", "Tuesday",
		"Wednesday", "Thursday"}
	monthDays := []int{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}

	isLeap := func(y int) bool {
		return y%4 == 0 && (y%100 != 0 || y%400 == 0)
	}

	days := 0
	for y := 1971; y < year; y++ {
		if isLeap(y) {
			days += 366
		} else {
			days += 365
		}
	}
	for m := 1; m < month; m++ {
		days += monthDays[m-1]
		if m == 2 && isLeap(year) {
			days++
		}
	}
	days += day - 1
	return names[days%7]
}
