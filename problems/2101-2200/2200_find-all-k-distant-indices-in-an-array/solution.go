func findKDistantIndices(nums []int, key int, k int) []int {
	out := []int{}
	nextFree := 0
	n := len(nums)
	// each key occurrence contributes the window [j-k, j+k]; windows
	// are naturally ordered, so clip against what's already emitted
	// instead of deduplicating through a set
	for j := 0; j < n; j++ {
		if nums[j] != key {
			continue
		}
		lo := nextFree
		if j-k > lo {
			lo = j - k
		}
		hi := n - 1
		if j+k < hi {
			hi = j + k
		}
		for i := lo; i <= hi; i++ {
			out = append(out, i)
		}
		nextFree = hi + 1
	}
	return out
}
