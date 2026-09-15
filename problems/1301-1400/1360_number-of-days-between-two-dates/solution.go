import "strconv"
import "strings"

func daysBetweenDates(date1 string, date2 string) int {
	// Day numbers from a fixed epoch; the answer is their difference.
	return absInt(dayNumber(date1) - dayNumber(date2))
}

func dayNumber(date string) int {
	parts := strings.Split(date, "-")
	year, _ := strconv.Atoi(parts[0])
	month, _ := strconv.Atoi(parts[1])
	day, _ := strconv.Atoi(parts[2])
	monthLengths := [12]int{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
	total := 0
	for y := 1971; y < year; y++ {
		if isLeap(y) {
			total += 366
		} else {
			total += 365
		}
	}
	for m := 1; m < month; m++ {
		total += monthLengths[m-1]
		if m == 2 && isLeap(year) {
			total++
		}
	}
	return total + day - 1
}

func isLeap(year int) bool {
	return year%4 == 0 && (year%100 != 0 || year%400 == 0)
}

func absInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
