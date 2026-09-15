// Track the most recent 1 and most recent 2 seen so far; the closest
// 1/2 pair is always caught the moment its second element is scanned.
func minAbsoluteDifference(nums []int) int {
	lastOne := -1
	lastTwo := -1
	best := -1
	for index, value := range nums {
		if value == 1 {
			if lastTwo != -1 {
				if distance := index - lastTwo; best == -1 || distance < best {
					best = distance
				}
			}
			lastOne = index
		} else if value == 2 {
			if lastOne != -1 {
				if distance := index - lastOne; best == -1 || distance < best {
					best = distance
				}
			}
			lastTwo = index
		}
	}
	return best
}
