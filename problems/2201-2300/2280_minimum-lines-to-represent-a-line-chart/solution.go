import (
	"sort"
)

func minimumLines(stockPrices [][]int) int {
	sort.Slice(stockPrices, func(i, j int) bool { return stockPrices[i][0] < stockPrices[j][0] })
	n := len(stockPrices)
	if n <= 2 {
		return n - 1
	}
	lines := 1
	for i := 2; i < n; i++ {
		x1, y1 := stockPrices[i-2][0], stockPrices[i-2][1]
		x2, y2 := stockPrices[i-1][0], stockPrices[i-1][1]
		x3, y3 := stockPrices[i][0], stockPrices[i][1]
		// Differences stay under 1e9, but their products approach 1e18,
		// so widen to int64 before the cross-multiplied slope test.
		if int64(x2-x1)*int64(y3-y2) != int64(x3-x2)*int64(y2-y1) {
			lines++
		}
	}
	return lines
}
