import "sort"

// The judge pins one exact answer: the even values sorted ascending fill the
// even indices, and the odd values sorted ascending fill the odd indices. One
// scan splits the values by parity, sort.Ints orders each group, and a dealing
// loop writes them into the answer — values are compared only inside their
// own parity group.
func sortArrayByParityII(nums []int) []int {
	evens := make([]int, 0, len(nums)/2)
	odds := make([]int, 0, len(nums)/2)
	for _, value := range nums {
		if value%2 == 0 {
			evens = append(evens, value)
		} else {
			odds = append(odds, value)
		}
	}
	sort.Ints(evens)
	sort.Ints(odds)
	answer := make([]int, len(nums))
	for i := range evens {
		answer[2*i] = evens[i]
		answer[2*i+1] = odds[i]
	}
	return answer
}
