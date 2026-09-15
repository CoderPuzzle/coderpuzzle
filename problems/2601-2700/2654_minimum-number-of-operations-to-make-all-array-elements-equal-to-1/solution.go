// Ones shortcut: an existing 1 absorbs every other element with exactly
// one operation each. Otherwise locate the shortest window whose overall
// gcd is 1: L - 1 operations fold its L elements into a single 1 (each op
// merges the window's span by at most one element), then the remaining
// n - 1 elements cost one operation apiece.
func minOperations(nums []int) int {
	n := len(nums)
	ones := 0
	for _, v := range nums {
		if v == 1 {
			ones++
		}
	}
	if ones > 0 {
		return n - ones
	}
	best := n + 1
	for i := 0; i < n; i++ {
		g := 0
		for j := i; j < n; j++ {
			g = gcd(g, nums[j])
			if g == 1 {
				// The first j making this window's gcd reach 1 is also
				// its shortest completion for this start index.
				best = min(best, j-i+1)
				break
			}
		}
	}
	if best > n {
		return -1
	}
	return best - 1 + (n - 1)
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
