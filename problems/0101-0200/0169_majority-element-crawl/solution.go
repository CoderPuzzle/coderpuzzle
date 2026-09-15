// Boyer-Moore voting: one candidate, one counter. A match raises the counter,
// a mismatch spends it; at zero the candidate is swapped for the current
// element.
func majorityElement(nums []int) int {
	candidate, count := nums[0], 0
	for _, value := range nums {
		if count == 0 {
			candidate = value
		}
		if value == candidate {
			count++
		} else {
			count--
		}
	}
	// Every cancellation removes one majority and one minority element, and the
	// majority holds more than half the array, so it always survives.
	return candidate
}
