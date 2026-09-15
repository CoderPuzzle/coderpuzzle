func subarrayLCM(nums []int, k int) int {
	// Anchor the left endpoint and sweep right, carrying the running
	// lcm of nums[i..j]: it only ever grows (each new element can
	// raise it, never lower it). Once it exceeds k, every later lcm
	// in this sweep is larger still, so k is unreachable — break.
	// Each j where the lcm equals k is one counted subarray.
	gcd := func(a, b int) int {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	n := len(nums)
	total := 0
	for i := 0; i < n; i++ {
		l := 1
		for j := i; j < n; j++ {
			l = l / gcd(l, nums[j]) * nums[j]
			if l > k {
				break
			}
			if l == k {
				total++
			}
		}
	}
	return total
}
