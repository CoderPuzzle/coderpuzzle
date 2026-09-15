func earliestSecondToMarkIndices(nums []int, changeIndices []int) int {
	n := len(nums)
	canMark := func(t int) bool {
		last := make([]int, n)
		for s := 1; s <= t; s++ {
			last[changeIndices[s-1]-1] = s
		}
		need := int64(0)
		marked := 0
		for s := 1; s <= t; s++ {
			i := changeIndices[s-1] - 1
			if last[i] == s {
				need += int64(nums[i])
				marked++
				if need > int64(s-marked) {
					return false
				}
			}
		}
		return marked == n
	}
	lo, hi := 1, len(changeIndices)
	for lo < hi {
		mid := (lo + hi) / 2
		if canMark(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	if canMark(lo) {
		return lo
	}
	return -1
}
