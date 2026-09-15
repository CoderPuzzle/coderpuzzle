// One sweep: cur is the sum of the strictly increasing run ending
// here; extend it while the values strictly rise, restart at the
// bare element otherwise (equal neighbours break the run). Every
// value is positive, so the fullest run ending at each index is
// its best subarray. n * max <= 10^4 and strict ascent forces
// distinct values, capping the true maximum at 5050 - far inside
// int range.
func maxAscendingSum(nums []int) int {
	best, cur := nums[0], nums[0]
	for i := 1; i < len(nums); i++ {
		if nums[i] > nums[i-1] {
			cur += nums[i]
		} else {
			cur = nums[i]
		}
		best = max(best, cur)
	}
	return best
}
