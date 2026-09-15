import "strconv"

// The calendar pads month and day to two digits, but the binary form drops
// that padding: each dash-separated component is parsed as its plain decimal
// value and rendered in base 2 with no leading zeroes, then the pieces are
// rejoined with dashes in year-month-day order. Repeated division collects
// bits least-significant first, so each fragment is reversed before it is
// appended.
func convertDateToBinary(date string) string {
	result := ""
	start := 0
	for i := 0; i <= len(date); i++ {
		if i < len(date) && date[i] != '-' {
			continue
		}
		if result != "" {
			result += "-"
		}
		value, _ := strconv.Atoi(date[start:i])
		digits := []byte{}
		for {
			digits = append(digits, byte('0'+value%2))
			value /= 2
			if value == 0 {
				break
			}
		}
		for lo, hi := 0, len(digits)-1; lo < hi; lo, hi = lo+1, hi-1 {
			digits[lo], digits[hi] = digits[hi], digits[lo]
		}
		result += string(digits)
		start = i + 1
	}
	return result
}
