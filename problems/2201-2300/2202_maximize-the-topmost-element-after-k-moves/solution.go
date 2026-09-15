// Which tops are reachable in exactly k moves is pure move-budget casework;
// each branch is answered without simulating k moves.
func maximumTop(nums []int, k int) int {
	n := len(nums)
	if k == 0 {
		return nums[0]
	}
	if n == 1 {
		// The lone element alternates removed/back, so odd k empties it.
		if k%2 == 0 {
			return nums[0]
		}
		return -1
	}
	if k == 1 {
		// No removed elements exist yet, so the single move is a pop.
		return nums[1]
	}
	if k > n {
		// Remove everything, burn all but the last move in pop/push
		// pairs, then push the maximum back on.
		best := nums[0]
		for _, value := range nums[1:] {
			if value > best {
				best = value
			}
		}
		return best
	}
	// 2 <= k <= n: either k pure removals expose nums[k], or removals
	// plus one push-back land any nums[i] with i <= k-2 on top.
	best := -1
	if k < n {
		best = nums[k]
	}
	for i := 0; i < k-1; i++ {
		if nums[i] > best {
			best = nums[i]
		}
	}
	return best
}
