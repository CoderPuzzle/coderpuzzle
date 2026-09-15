import "sort"

func rearrangeBarcodes(barcodes []int) []int {
	n := len(barcodes)
	counts := make(map[int]int)
	for _, b := range barcodes {
		counts[b]++
	}

	order := make([]int, 0, len(counts))
	for value := range counts {
		order = append(order, value)
	}
	sort.Slice(order, func(i, j int) bool {
		a, b := order[i], order[j]
		if counts[a] != counts[b] {
			return counts[a] > counts[b]
		}
		return a < b
	})

	result := make([]int, n)
	pos := 0
	for _, value := range order {
		for i := 0; i < counts[value]; i++ {
			if pos >= n {
				pos = 1
			}
			result[pos] = value
			pos += 2
		}
	}

	return result
}
