import "strconv"

// Keep the non-decreasing prefix, then repair at the first position where a
// digit exceeds its right neighbor: slide left across the plateau of equals
// around that digit, decrement its first member, and fill the rest with
// nines. No break means n already qualifies.
func monotoneIncreasingDigits(n int) int {
	s := []byte(strconv.Itoa(n))
	d := len(s)
	i := 0
	for i+1 < d && s[i] <= s[i+1] {
		i++
	}
	if i+1 == d {
		return n
	}
	for i > 0 && s[i-1] == s[i] {
		i--
	}
	s[i]--
	for k := i + 1; k < d; k++ {
		s[k] = '9'
	}
	v, _ := strconv.Atoi(string(s))
	return v
}
