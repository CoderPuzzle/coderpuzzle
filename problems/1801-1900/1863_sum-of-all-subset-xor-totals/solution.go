// Every bit set in any element appears in exactly half of the 2^n subsets,
// so the answer is (OR of all elements) * 2^(n-1).
func subsetXORSum(nums []int) int {
	orAll := 0
	for _, v := range nums {
		orAll |= v
	}
	return orAll << (len(nums) - 1)
}
