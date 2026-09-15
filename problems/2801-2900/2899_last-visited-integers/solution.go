func lastVisitedIntegers(nums []int) []int {
	// seen holds the positives with the most recent one at the front; k
	// counts consecutive -1s and every positive resets it, so each -1
	// either reads the k-th element from the front of seen — the k-th
	// most recent positive — or appends -1 when seen is too short.
	seen := []int{}
	ans := []int{}
	k := 0
	for _, num := range nums {
		if num != -1 {
			seen = append([]int{num}, seen...)
			k = 0
		} else {
			k += 1
			if k <= len(seen) {
				ans = append(ans, seen[k-1])
			} else {
				ans = append(ans, -1)
			}
		}
	}
	return ans
}
