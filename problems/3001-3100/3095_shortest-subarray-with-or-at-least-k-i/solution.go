// Fix the right endpoint and extend left with a running OR of nums[l..r];
// the first l reaching k is the shortest special subarray ending at r.
// With values <= 50 the OR stays below 64, so ints are roomy throughout.
func minimumSubarrayLength(nums []int, k int) int {
	best := -1
	for r := range nums {
		current := 0
		for l := r; l >= 0; l-- {
			current |= nums[l]
			if current >= k {
				if length := r - l + 1; best == -1 || length < best {
					best = length
				}
				break
			}
		}
	}
	return best
}
