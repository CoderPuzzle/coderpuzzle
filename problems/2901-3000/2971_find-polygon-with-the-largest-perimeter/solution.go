import "sort"

func largestPerimeter(nums []int) int64 {
	sort.Ints(nums)
	total := int64(0)
	for _, x := range nums {
		total += int64(x)
	}
	// Try candidate longest sides from the largest down; stop at i == 2 so
	// at least three sides remain. The first prefix that closes wins.
	for i := len(nums) - 1; i > 1; i-- {
		// A multiset forms a polygon iff the largest side is smaller than
		// the sum of all the others.
		if total-int64(nums[i]) > int64(nums[i]) {
			return total
		}
		// This largest side is hopeless: the smaller sides can never
		// outweigh it, so discard it and try the next candidate.
		total -= int64(nums[i])
	}
	return -1
}
