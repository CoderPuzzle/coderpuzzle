func aggregateTimeSeries(series1 [][]int, series2 [][]int) [][]int64 {
	merged := make([][]int64, len(series1)+len(series2))
	i, j := len(series1)-1, len(series2)-1
	k := len(merged)
	var value1, value2 int64
	// Sweep the union of timestamps from right to left. Each running
	// value is the last value its series contributed, which for every
	// timestamp still ahead of the cursor is exactly that series' next
	// available value; a series not yet reached contributes 0. Sums
	// reach 2e9, so values and results are held in int64.
	for i >= 0 || j >= 0 {
		var ts int64
		if j < 0 || (i >= 0 && series1[i][0] >= series2[j][0]) {
			ts = int64(series1[i][0])
			value1 = int64(series1[i][1])
			i--
			if j >= 0 && int64(series2[j][0]) == ts {
				value2 = int64(series2[j][1])
				j--
			}
		} else {
			ts = int64(series2[j][0])
			value2 = int64(series2[j][1])
			j--
		}
		k--
		merged[k] = []int64{ts, value1 + value2}
	}
	// Shared timestamps emit one pair, not two — trim the unused head.
	return merged[k:]
}
