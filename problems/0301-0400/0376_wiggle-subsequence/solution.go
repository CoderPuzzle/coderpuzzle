// Only direction changes matter: start the count at the first element
// and increment it once per strict flip of travel.
func wiggleMaxLength(nums []int) int {
	count := 1
	// 1 while rising, -1 while falling, 0 before any move.
	direction := 0
	for i := 1; i < len(nums); i++ {
		// A fresh rise counts only after a fall (or at the start); an
		// equal or same-direction step changes nothing.
		if direction <= 0 && nums[i] > nums[i-1] {
			count++
			direction = 1
		} else if direction >= 0 && nums[i] < nums[i-1] {
			count++
			direction = -1
		}
	}
	return count
}
