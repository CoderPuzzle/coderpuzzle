// Adding k to a prefix touches exactly one adjacent difference: the one
// straddling the prefix's end. A whole-array prefix shifts every element
// equally and a difference can be zeroed by picking k as that difference,
// so each operation removes at most one nonzero adjacent difference - and
// every nonzero one is removable.
func minOperations(nums []int) int {
	count := 0
	for i := 1; i < len(nums); i++ {
		if nums[i] != nums[i-1] {
			count++
		}
	}
	return count
}
