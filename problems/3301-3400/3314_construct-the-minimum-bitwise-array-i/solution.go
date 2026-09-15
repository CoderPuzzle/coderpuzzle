// a OR (a + 1) >= a + 1, so any solution for x satisfies a <= x - 1; scanning
// candidates from 0 up, the first hit is the minimum. The value a OR (a + 1)
// always ends in a 1 bit, hence odd, and the only even prime is 2 — that
// entry scans to no candidate and reports -1.
func minBitwiseArray(nums []int) []int {
	ans := make([]int, len(nums))
	for i, x := range nums {
		found := -1
		for a := 0; a < x; a++ {
			if a|(a+1) == x {
				found = a
				break
			}
		}
		ans[i] = found
	}
	return ans
}
