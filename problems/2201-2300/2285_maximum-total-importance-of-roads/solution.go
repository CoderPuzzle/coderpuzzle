import "sort"

func maximumImportance(n int, roads [][]int) int64 {
	// Degrees in 64-bit: rank * degree reaches ~2.5e9, past INT32_MAX.
	degrees := make([]int64, n)
	for _, road := range roads {
		degrees[road[0]]++
		degrees[road[1]]++
	}
	sort.Slice(degrees, func(i, j int) bool { return degrees[i] < degrees[j] })
	var total int64
	for rank := int64(1); rank <= int64(n); rank++ {
		total += rank * degrees[rank-1]
	}
	return total
}
