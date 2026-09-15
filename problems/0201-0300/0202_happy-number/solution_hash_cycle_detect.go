func isHappy(n int) bool {
	// Sum of the squares of the digits, one digit per iteration.
	step := func(m int) int {
		total := 0
		for m != 0 {
			digit := m % 10
			total += digit * digit
			m /= 10
		}
		return total
	}
	// The digit-square map is deterministic, so iterating it must reach 1
	// (a fixed point) or cycle; a revisit means it will never reach 1.
	seen := make(map[int]bool)
	for n != 1 && !seen[n] {
		seen[n] = true
		n = step(n)
	}
	return n == 1
}
