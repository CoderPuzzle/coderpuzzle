import "time"

// The engine owns the calendar: parsing the string into a time.Time and
// stepping it with AddDate renormalizes month lengths, leap years, and the
// year boundary, and Format renders the result already zero-padded as
// "YYYY-MM-DD".
func nextDay(date string) string {
	day, _ := time.Parse("2006-01-02", date)
	return day.AddDate(0, 0, 1).Format("2006-01-02")
}
