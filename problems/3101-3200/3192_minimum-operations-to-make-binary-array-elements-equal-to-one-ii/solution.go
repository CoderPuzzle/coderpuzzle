// Index 0 can only reach 1 via the flip starting at itself, and once
// fixed no further flip may touch it — a left-to-right sweep is forced.
// flipped tracks whether the remaining suffix is currently inverted;
// each effective 0 forces one more flip, which also re-inverts every
// later position at once. At most one operation per index, so the count
// fits comfortably in int for n <= 10^5.
func minOperations(nums []int) int {
	ops := 0
	flipped := false
	for _, bit := range nums {
		if (bit == 1) == flipped {
			ops++
			flipped = !flipped
		}
	}
	return ops
}
