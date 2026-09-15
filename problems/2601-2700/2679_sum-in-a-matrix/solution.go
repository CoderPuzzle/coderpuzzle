import (
	"math"
	"sort"
)

func matrixSum(nums [][]int) int {
	// Operation k removes the largest remaining number of every row, so
	// after each row is sorted in decreasing order the k-th column holds
	// exactly what that row gives up in operation k — the score is the
	// sum of the column maxima, with already-emptied rows skipped.
	width := 0
	for _, row := range nums {
		sort.Sort(sort.Reverse(sort.IntSlice(row)))
		if len(row) > width {
			width = len(row)
		}
	}
	score := 0
	for column := 0; column < width; column++ {
		best := math.MinInt
		for _, row := range nums {
			if column < len(row) && row[column] > best {
				best = row[column]
			}
		}
		score += best
	}
	return score
}
