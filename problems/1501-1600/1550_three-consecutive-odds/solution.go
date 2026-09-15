// Track a running streak of consecutive odd values; any even value resets
// it. Three in a row settles the answer immediately.
func threeConsecutiveOdds(arr []int) bool {
	streak := 0
	for _, value := range arr {
		if value%2 != 0 {
			streak++
			if streak >= 3 {
				return true
			}
		} else {
			streak = 0
		}
	}
	return false
}
