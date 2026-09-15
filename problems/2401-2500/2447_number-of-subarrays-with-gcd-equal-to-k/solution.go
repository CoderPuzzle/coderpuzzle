func subarrayGCD(nums []int, k int) int {
	// Anchor the left endpoint and sweep right, carrying the running
	// gcd of nums[i..j]: it only ever shrinks (each new element can
	// lower it, never raise it). Once k stops dividing the carried
	// gcd, every later gcd divides it too, so k is unreachable —
	// break. Each j where the gcd equals k is one counted subarray.
	gcd := func(a, b int) int {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	n := len(nums)
	total := 0
	for i := 0; i < n; i++ {
		g := 0
		for j := i; j < n; j++ {
			g = gcd(g, nums[j])
			if g%k != 0 {
				break
			}
			if g == k {
				total++
			}
		}
	}
	return total
}
