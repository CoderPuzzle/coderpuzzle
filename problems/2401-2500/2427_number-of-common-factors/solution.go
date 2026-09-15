func commonFactors(a int, b int) int {
	// A common factor divides both numbers, hence their gcd; every
	// divisor of the gcd divides both. So the answer is the divisor
	// count of g = gcd(a, b): pair each d <= sqrt(g) dividing g with
	// its cofactor g / d (a perfect square pairs only once).
	for b != 0 {
		a, b = b, a%b
	}
	g := a
	count := 0
	for d := 1; d*d <= g; d++ {
		if g%d == 0 {
			if d*d == g {
				count++
			} else {
				count += 2
			}
		}
	}
	return count
}
