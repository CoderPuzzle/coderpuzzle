import "strconv"

func dayOfYear(date string) int {
	year, _ := strconv.Atoi(date[0:4])
	month, _ := strconv.Atoi(date[5:7])
	day, _ := strconv.Atoi(date[8:10])
	days := [12]int{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
	// Gregorian leap rule: div by 4, except centuries, except 400.
	leap := year%4 == 0 && (year%100 != 0 || year%400 == 0)
	if leap {
		days[1] = 29
	}
	total := day
	for _, d := range days[:month-1] {
		total += d
	}
	return total
}
