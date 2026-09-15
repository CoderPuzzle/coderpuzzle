// Only the array's total matters: one added element moves the sum by at
// most +/-limit, so closing a gap g takes ceil(g / limit). The sum
// reaches 1e11, so the accumulation and gap are 64-bit; the answer
// itself stays below 1.1e9 and fits in an int.
func minElements(nums []int, limit int, goal int) int {
	var sum int64
	for _, x := range nums {
		sum += int64(x)
	}
	gap := int64(goal) - sum
	if gap < 0 {
		gap = -gap
	}
	return int((gap + int64(limit) - 1) / int64(limit))
}
