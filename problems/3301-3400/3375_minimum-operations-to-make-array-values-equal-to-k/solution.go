// Values can only ever be lowered, so any element below k makes the goal
// impossible. Otherwise each operation flattens every level above some h
// down to h, which removes exactly one value level: the current maximum,
// using h = the next level down (hint 3). The minimum count is therefore
// the number of distinct values strictly above k (hint 4), found in one
// pass with a set.
func minOperations(nums []int, k int) int {
	above := make(map[int]bool)
	for _, value := range nums {
		if value < k {
			return -1
		}
		if value > k {
			above[value] = true
		}
	}
	return len(above)
}
