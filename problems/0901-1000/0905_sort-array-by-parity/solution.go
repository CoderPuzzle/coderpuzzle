// The judge pins one exact answer: the even values in the order they appear,
// then the odd values in the order they appear. One scan routes each value
// into its group as it is read — a value's arrival order inside its group is
// its input order, so the concatenation of the two groups is the answer, with
// no value compared by magnitude.
func sortArrayByParity(nums []int) []int {
	evens := make([]int, 0, len(nums))
	odds := make([]int, 0, len(nums))
	for _, value := range nums {
		if value%2 == 0 {
			evens = append(evens, value)
		} else {
			odds = append(odds, value)
		}
	}
	return append(evens, odds...)
}
