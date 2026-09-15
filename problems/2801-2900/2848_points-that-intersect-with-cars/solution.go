import (
	"sort"
)

func numberOfPoints(nums [][]int) int {
	// Sorted by start point, a car only gains coverage past the rightmost
	// point counted so far — add its uncovered suffix there and extend
	// that reach.
	sort.Slice(nums, func(i, j int) bool { return nums[i][0] < nums[j][0] })
	total := 0
	reach := 0
	for _, car := range nums {
		start := car[0]
		end := car[1]
		if end > reach {
			from := start
			if from < reach+1 {
				from = reach + 1
			}
			total += end - from + 1
			reach = end
		}
	}
	return total
}
