// Each block holds m = n / k elements. A two-pointer sweep swaps the ends
// of a block inward, mirroring the "Two Pointers" tag, and the blocks are
// visited left to right; the copy keeps the input array untouched.
func reverseSubarrays(nums []int, k int) []int {
	m := len(nums) / k
	result := make([]int, len(nums))
	copy(result, nums)
	for start := 0; start < len(nums); start += m {
		i, j := start, start+m-1
		for i < j {
			result[i], result[j] = result[j], result[i]
			i++
			j--
		}
	}
	return result
}
