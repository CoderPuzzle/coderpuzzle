import "sort"

// Sorted, an element never regrets landing on the first free value above its
// predecessor's final value — anything higher wastes moves.
func minIncrementForUnique(nums []int) int64 {
	sort.Ints(nums)
	var moves int64
	prev := nums[0]
	for i := 1; i < len(nums); i++ {
		need := prev + 1 - nums[i]
		if need > 0 {
			moves += int64(need)
			prev = nums[i] + need
		} else {
			prev = nums[i]
		}
	}
	return moves
}
