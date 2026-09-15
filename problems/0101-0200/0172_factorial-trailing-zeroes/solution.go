// Twos outnumber fives in n!, so each trailing zero costs exactly one factor
// 5: the answer is Legendre's sum n/5 + n/25 + n/125 + ..., computed without
// ever forming the factorial.
func trailingZeroes(n int) int {
	// int is 64-bit here, so the power accumulator cannot wrap past a large n.
	count := 0
	for power := 5; power <= n; power *= 5 {
		count += n / power
	}
	return count
}
