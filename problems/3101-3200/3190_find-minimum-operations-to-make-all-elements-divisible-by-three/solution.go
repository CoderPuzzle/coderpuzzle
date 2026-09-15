// Elements are independent: each operation touches exactly one element,
// so every element needs only the distance from its nearest multiple of
// 3 — a remainder of 1 or 2 costs exactly one +/- 1, remainder 0 costs
// nothing.
func minimumOperations(nums []int) int {
	ops := 0
	for _, v := range nums {
		r := v % 3
		if r == 2 {
			r = 1
		}
		ops += r
	}
	return ops
}
