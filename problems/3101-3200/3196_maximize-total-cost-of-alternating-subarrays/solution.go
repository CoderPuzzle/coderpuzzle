// Splitting is only ever worth it to make a negative element flip sign,
// and a subarray forces alternating signs from its head — so per element
// there are two states: it keeps its phase-plus sign (free to continue or
// restart after a worst-so-far prefix) or it rides in as negated, which
// requires the previous element to have kept its sign. The seeds are
// exactly hint dp[1][*]; two rolling variables carry the table.
func maximumTotalCost(nums []int) int64 {
	if len(nums) == 1 {
		return int64(nums[0])
	}
	keep := int64(nums[0]) + int64(nums[1])
	flip := int64(nums[0]) - int64(nums[1])
	for _, x := range nums[2:] {
		nextKeep := max(keep, flip) + int64(x)
		flip = keep - int64(x)
		keep = nextKeep
	}
	return max(keep, flip)
}
