// Pull off one digit at a time: the least-significant digit is n reduced
// modulo 2, forced into {0, 1} since Go's % truncates toward zero and can
// report -1 for a negative n. What's left is divided by -2 to expose the
// next digit. n = 0 is handled directly since the loop body never runs
// for it.
func baseNeg2(n int) string {
	if n == 0 {
		return "0"
	}
	digits := []byte{}
	for n != 0 {
		remainder := n % 2
		if remainder < 0 {
			remainder += 2
		}
		digits = append(digits, byte('0'+remainder))
		n = (n - remainder) / -2
	}
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}
	return string(digits)
}
