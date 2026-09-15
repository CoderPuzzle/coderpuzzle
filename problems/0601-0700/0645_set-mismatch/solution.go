func findErrorNums(nums []int) []int {
	// The values in nums are the numbers 1..n with one value doubled and
	// one lost, so counting occurrences settles both questions at once:
	// slot v of a count array indexed by value holds 2 for the duplicated
	// value and 0 for the missing one.
	counts := make([]int, len(nums)+1)
	for _, value := range nums {
		counts[value]++
	}
	// One sweep over the value range 1..n reads the counts back; every
	// other slot holds 1 and carries no information, so exactly one
	// duplicate and one gap are found.
	duplicate, missing := 0, 0
	for value := 1; value <= len(nums); value++ {
		if counts[value] == 2 {
			duplicate = value
		} else if counts[value] == 0 {
			missing = value
		}
	}
	return []int{duplicate, missing}
}
