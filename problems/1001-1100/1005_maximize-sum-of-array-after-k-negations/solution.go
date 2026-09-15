import "sort"

// Sort so the most negative values lead, then spend operations on them
// first — flipping the most negative value always raises the sum by the
// most. Any leftover operations only matter by parity: flipping the same
// value twice restores it, and an odd leftover is cheapest to spend on
// the smallest absolute value anywhere in the array, which also covers a
// zero absorbing the flip for free.
func largestSumAfterKNegations(nums []int, k int) int {
	sort.Ints(nums)
	n := len(nums)
	i := 0
	for i < n && nums[i] < 0 && k > 0 {
		nums[i] = -nums[i]
		k--
		i++
	}
	total := 0
	minAbs := 0
	for idx, value := range nums {
		total += value
		abs := value
		if abs < 0 {
			abs = -abs
		}
		if idx == 0 || abs < minAbs {
			minAbs = abs
		}
	}
	if k%2 == 1 {
		total -= 2 * minAbs
	}
	return total
}
