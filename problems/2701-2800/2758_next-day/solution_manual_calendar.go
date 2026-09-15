import (
	"fmt"
	"strconv"
)

// Hand-rolled: parse the three fields, step the day-of-month, and roll over
// through a days-in-month table — February widened to 29 on leap years
// (divisible by 4, except centuries unless divisible by 400), December's
// overflow carrying into the next year. Sprintf zero-pads month and day to
// two digits and the year to four, so the result is exactly "YYYY-MM-DD".
func nextDay(date string) string {
	year, _ := strconv.Atoi(date[0:4])
	month, _ := strconv.Atoi(date[5:7])
	day, _ := strconv.Atoi(date[8:10])
	leap := (year%4 == 0 && year%100 != 0) || year%400 == 0
	monthLengths := []int{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
	if leap {
		monthLengths[1] = 29
	}
	nextYear, nextMonth, nextDayOfMonth := year, month, day+1
	if nextDayOfMonth > monthLengths[month-1] {
		nextDayOfMonth = 1
		nextMonth++
		if nextMonth > 12 {
			nextMonth = 1
			nextYear++
		}
	}
	return fmt.Sprintf("%04d-%02d-%02d", nextYear, nextMonth, nextDayOfMonth)
}
