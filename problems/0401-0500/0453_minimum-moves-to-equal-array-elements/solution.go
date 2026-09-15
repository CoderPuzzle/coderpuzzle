// Incrementing n - 1 elements is, in relative terms, decrementing the one
// element left out: every pairwise gap moves exactly as it would if that
// single element had dropped by 1. So the question becomes how many unit
// decrements make all elements equal, and since decrements never lift
// anything, the common target is the current minimum.
//
// The total spans n * |nums[i]|, up to 10^14, but Go's int is 64-bit on every
// judge platform, so the accumulation is exact.
func minMoves(nums []int) int {
	total := 0
	minimum := nums[0]
	for _, value := range nums {
		total += value
		if value < minimum {
			minimum = value
		}
	}
	return total - minimum*len(nums)
}
