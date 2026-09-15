func maxSubarrayLength(nums []int, k int) int {
	// Expand the window rightward; only the entering value can break
	// goodness (its own count crosses k), so shrink from the left until
	// one copy of it falls out. Every index enters and leaves the window
	// once, making the whole scan linear.
	counts := make(map[int]int)
	best := 0
	left := 0
	for r, v := range nums {
		counts[v]++
		for counts[v] > k {
			w := nums[left]
			counts[w]--
			if counts[w] == 0 {
				delete(counts, w)
			}
			left++
		}
		if d := r - left + 1; d > best {
			best = d
		}
	}
	return best
}
