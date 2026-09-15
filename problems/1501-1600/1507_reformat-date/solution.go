import "strings"

// Split on spaces to get the day (with its ordinal suffix), the
// three-letter month, and the four-digit year.
func reformatDate(date string) string {
	parts := strings.Split(date, " ")
	dayPart, monthPart, year := parts[0], parts[1], parts[2]

	months := map[string]string{
		"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
		"Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12",
	}

	// Every ordinal suffix (st/nd/rd/th) is exactly two letters, so
	// dropping the last two characters always leaves the bare digits.
	day := dayPart[:len(dayPart)-2]
	if len(day) == 1 {
		day = "0" + day
	}

	return year + "-" + months[monthPart] + "-" + day
}
