// All-even needs 0 odd elements, or at least 2 so each odd can subtract
// another odd; all-odd needs at least one odd for the even elements to
// subtract. One of the two always holds, so the answer is always true.
func uniformArray(nums1 []int) bool {
	odd := 0
	for _, x := range nums1 {
		if x%2 == 1 {
			odd++
		}
	}
	allEvenOk := odd == 0 || odd >= 2
	allOddOk := odd >= 1
	return allEvenOk || allOddOk
}
