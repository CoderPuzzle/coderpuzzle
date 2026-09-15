func minOperations(nums []int) int {
	// One operation on the whole array replaces every element with their
	// common bitwise AND, so any array equalizes in at most one step;
	// zero steps suffice only when it already is constant.
	for _, x := range nums {
		if x != nums[0] {
			return 1
		}
	}
	return 0
}
