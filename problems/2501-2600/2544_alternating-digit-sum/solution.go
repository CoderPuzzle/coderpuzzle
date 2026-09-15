// Peel digits from the low end, alternating signs as we go: this anchors
// "+" at the LEAST significant digit, while the statement wants it on the
// most significant one. When the digit count is even the accumulated
// total therefore needs a single final negation.
func alternateDigitSum(n int) int {
	total, sign, count := 0, 1, 0
	for rest := n; rest > 0; rest /= 10 {
		total += sign * (rest % 10)
		sign = -sign
		count++
	}
	if count%2 == 0 {
		return -total
	}
	return total
}
