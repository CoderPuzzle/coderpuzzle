// Each group must land in a disjoint, in-order window of nums, and the
// earliest window always dominates: shifting a group onto its first
// still-legal occurrence never causes an overlap and only lengthens the
// suffix left for the groups behind it. So walk the groups in order with a
// cursor pos into nums, take the first start >= pos whose window compares
// equal element by element, advance the cursor past it, and fail as soon
// as a group has no window left.
func canChoose(groups [][]int, nums []int) bool {
	pos := 0
	for _, group := range groups {
		size := len(group)
		start := pos
		found := false
		for start+size <= len(nums) {
			i := 0
			for i < size && nums[start+i] == group[i] {
				i++
			}
			if i == size {
				found = true
				break
			}
			start++
		}
		if !found {
			return false
		}
		pos = start + size
	}
	return true
}
