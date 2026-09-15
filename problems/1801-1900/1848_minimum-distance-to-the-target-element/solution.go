// One scan: the closest occurrence of target is whichever index minimizes
// abs(i - start).
func getMinDistance(nums []int, target int, start int) int {
	best := len(nums)
	for i, v := range nums {
		if v == target {
			d := i - start
			if d < 0 {
				d = -d
			}
			if d < best {
				best = d
			}
		}
	}
	return best
}
