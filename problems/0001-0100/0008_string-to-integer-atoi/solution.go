// One left-to-right scan over s implements the statement's four steps
// in order: whitespace, signedness, conversion, rounding.
func myAtoi(s string) int {
	i := 0
	for i < len(s) && s[i] == ' ' {
		i++
	}
	sign := int64(1)
	if i < len(s) && (s[i] == '+' || s[i] == '-') {
		if s[i] == '-' {
			sign = -1
		}
		i++
	}
	// 64-bit accumulator: the early clamp below keeps it within 2^31 - 1,
	// so even a 200-digit run can never overflow it.
	total := int64(0)
	for i < len(s) && s[i] >= '0' && s[i] <= '9' {
		digit := int64(s[i] - '0')
		// Clamp on the fly: if appending this digit would pass 2^31 - 1,
		// the value is out of range and the answer is the boundary in the
		// sign's direction.
		if total > (2147483647-digit)/10 {
			if sign == 1 {
				return 2147483647
			}
			return -2147483648
		}
		total = total*10 + digit
		i++
	}
	return int(sign * total)
}
