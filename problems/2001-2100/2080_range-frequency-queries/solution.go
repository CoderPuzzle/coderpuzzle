import "sort"

type RangeFreqQuery struct {
	positions map[int][]int
}

func NewRangeFreqQueryTyped(arr []int) *RangeFreqQuery {
	positions := make(map[int][]int)
	for index, value := range arr {
		positions[value] = append(positions[value], index)
	}
	return &RangeFreqQuery{positions: positions}
}

func (design *RangeFreqQuery) query(left int, right int, value int) int {
	indices := design.positions[value]
	return sort.SearchInts(indices, right+1) - sort.SearchInts(indices, left)
}
