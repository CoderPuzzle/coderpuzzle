// A remap rewrites every copy of one chosen digit, and the notes allow
// leading zeroes plus mapping a digit to itself. That forces the two
// greedy plays: promote every copy of the first digit that is not
// already 9 up to 9 (a no-op when there is none), and demote every copy
// of the leading digit down to 0. Both rewrites only ever touch
// leftmost-first repeats, so any other choice keeps some earlier
// position lower or higher than necessary.
func minMaxDifference(num int) int {
	var buf [10]byte
	n := len(buf)
	for v := num; ; v /= 10 {
		n--
		buf[n] = byte('0' + v%10)
		if v < 10 {
			break
		}
	}
	digits := buf[n:]
	big := make([]byte, len(digits))
	copy(big, digits)
	for _, ch := range digits {
		if ch != '9' {
			for i := range big {
				if big[i] == ch {
					big[i] = '9'
				}
			}
			break
		}
	}
	small := append([]byte(nil), digits...)
	for i := range small {
		if small[i] == digits[0] {
			small[i] = '0'
		}
	}
	atoi := func(b []byte) int {
		v := 0
		for _, c := range b {
			v = v*10 + int(c-'0')
		}
		return v
	}
	return atoi(big) - atoi(small)
}
