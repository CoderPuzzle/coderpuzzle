func maxDivScore(nums []int, divisors []int) int {
	// Brute-force scoring straight from the statement: for every divisor
	// walk all of nums once. At most 1000 * 1000 = 10^6 modulo checks,
	// which fits the limits with room to spare.
	bestScore := -1
	bestDivisor := 0
	for _, divisor := range divisors {
		score := 0
		for _, value := range nums {
			if value%divisor == 0 {
				score++
			}
		}
		// Strictly larger wins outright; equal scores go to the smaller
		// divisor, which is exactly what `<` checks here.
		if score > bestScore || (score == bestScore && divisor < bestDivisor) {
			bestScore = score
			bestDivisor = divisor
		}
	}
	return bestDivisor
}
