// Removing index i leaves every earlier element on its own index and
// slides every later one down a slot, flipping the suffix's parity: the
// after-removal even sum is the prefix's even sum plus the suffix's odd
// sum, and vice versa for odd. Four running totals (even/odd sums of the
// visited prefix and of the untouched suffix) test each candidate
// removal in O(1).
func waysToMakeFair(nums []int) int {
	var leftEven, leftOdd, rightEven, rightOdd int64
	for i, value := range nums {
		if i%2 == 0 {
			rightEven += int64(value)
		} else {
			rightOdd += int64(value)
		}
	}
	count := 0
	for i, value := range nums {
		if i%2 == 0 {
			rightEven -= int64(value)
		} else {
			rightOdd -= int64(value)
		}
		if leftEven+rightOdd == leftOdd+rightEven {
			count++
		}
		if i%2 == 0 {
			leftEven += int64(value)
		} else {
			leftOdd += int64(value)
		}
	}
	return count
}
