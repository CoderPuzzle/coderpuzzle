func sumFourDivisors(nums []int) int {
	// Divisors pair up around the square root, so one scan to isqrt(n)
	// sees them all: each hit contributes d and n/d (collapsed to one
	// when d*d == n). Track count and sum together and add the sum only
	// for numbers landing on exactly four divisors.
	total := 0
	for _, n := range nums {
		count := 0
		divisorSum := 0
		for d := 1; d*d <= n; d++ {
			if n%d == 0 {
				if d*d == n {
					count++
					divisorSum += d
				} else {
					count += 2
					divisorSum += d + n/d
				}
			}
		}
		if count == 4 {
			total += divisorSum
		}
	}
	return total
}
