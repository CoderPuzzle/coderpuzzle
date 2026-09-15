import "sort"

func minimumCost(cost []int) int {
	values := append([]int(nil), cost...)
	sort.Sort(sort.Reverse(sort.IntSlice(values)))
	total := 0
	for index, value := range values {
		if index%3 != 2 {
			total += value
		}
	}
	return total
}
