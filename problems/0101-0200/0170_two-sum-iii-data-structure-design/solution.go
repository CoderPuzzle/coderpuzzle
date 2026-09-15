// Hash multiset: value -> occurrence count. add bumps a counter in O(1);
// find lazily scans the distinct values once, asking for each complement.
type TwoSum struct {
	counts map[int]int
}

func NewTwoSumTyped() *TwoSum {
	return &TwoSum{counts: make(map[int]int)}
}

func (design *TwoSum) add(number int) {
	design.counts[number]++
}

func (design *TwoSum) find(value int) bool {
	for number, count := range design.counts {
		complement := value - number
		_, ok := design.counts[complement]
		// A value that is its own complement needs two stored copies.
		if ok && (complement != number || count > 1) {
			return true
		}
	}
	return false
}
