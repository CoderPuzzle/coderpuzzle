func numberOfDays(year int, month int) int {
	if month == 2 {
		// Gregorian leap rule: div by 4, except centuries, except 400s.
		leap := year%4 == 0 && (year%100 != 0 || year%400 == 0)
		if leap {
			return 29
		}
		return 28
	}
	// April, June, September, November are the short months; the rest, apart
	// from February handled above, are all 31 days.
	switch month {
	case 4, 6, 9, 11:
		return 30
	default:
		return 31
	}
}
