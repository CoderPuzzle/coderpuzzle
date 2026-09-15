func getConcatenation(nums []int) []int {
	// ans is nums followed by a second copy of nums: each value lands at
	// index i and again at index i + n.
	ans := make([]int, 2*len(nums))
	for i, x := range nums {
		ans[i] = x
		ans[i+len(nums)] = x
	}
	return ans
}
