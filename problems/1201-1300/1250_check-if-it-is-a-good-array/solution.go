func isGoodArray(nums []int) bool {
	// Bézout: the reachable sums are exactly the multiples of the gcd, so a
	// sum of 1 exists iff the overall gcd is 1.
	overall := 0
	for _, value := range nums {
		overall = gcdInt(overall, value)
		if overall == 1 {
			return true
		}
	}
	return overall == 1
}

func gcdInt(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
