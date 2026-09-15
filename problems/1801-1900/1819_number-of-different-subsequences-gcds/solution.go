func countDifferentSubsequenceGCDs(nums []int) int {
	maxVal := 0
	for _, v := range nums {
		if v > maxVal {
			maxVal = v
		}
	}
	present := make([]bool, maxVal+1)
	for _, v := range nums {
		present[v] = true
	}
	gcd := func(a, b int) int {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	count := 0
	// g is achievable iff the gcd of ALL present multiples of g is exactly g:
	// taking every divisible element minimizes the gcd, so no other subset can do better.
	for g := 1; g <= maxVal; g++ {
		running := 0 // gcd(0, x) = x, so 0 is the identity seed
		for multiple := g; multiple <= maxVal; multiple += g {
			if present[multiple] {
				running = gcd(running, multiple)
				if running == g {
					// Folding more multiples can only shrink the gcd — confirmed, stop early.
					count++
					break
				}
			}
		}
	}
	return count
}
