func minimumAverageDifference(nums []int) int {
	n := len(nums)
	total := int64(0)
	for _, x := range nums {
		total += int64(x)
	}
	prefix := int64(0)
	bestIndex := 0
	bestDiff := int64(1)<<62 - 1
	for i, x := range nums {
		prefix += int64(x)
		leftAvg := prefix / int64(i+1)
		rightCount := int64(n - i - 1)
		var rightAvg int64
		if rightCount > 0 {
			rightAvg = (total - prefix) / rightCount
		}
		diff := leftAvg - rightAvg
		if diff < 0 {
			diff = -diff
		}
		if diff < bestDiff {
			bestDiff = diff
			bestIndex = i
		}
	}
	return bestIndex
}
