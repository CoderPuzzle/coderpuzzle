// The best play always re-takes the current maximum: any smaller pick
// leaves a strictly larger value untouched for later, so the taken
// sequence is m, m+1, ..., m+k-1 -- an arithmetic series with step 1
// starting at the array's maximum m.
func maximizeSum(nums []int, k int) int {
	m := nums[0]
	for _, v := range nums {
		if v > m {
			m = v
		}
	}
	return k*m + k*(k-1)/2
}
