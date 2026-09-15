import "sort"

func recoverArray(nums []int) []int {
	values := append([]int(nil), nums...)
	sort.Ints(values)
	targetLength := len(values) / 2
	for candidateIndex := 1; candidateIndex < len(values); candidateIndex++ {
		difference := values[candidateIndex] - values[0]
		if difference <= 0 || difference%2 != 0 {
			continue
		}

		counts := make(map[int]int)
		for _, value := range values {
			counts[value]++
		}
		recovered := make([]int, 0, targetLength)
		for _, lower := range values {
			if counts[lower] == 0 {
				continue
			}
			higher := lower + difference
			if counts[higher] == 0 {
				break
			}
			counts[lower]--
			counts[higher]--
			recovered = append(recovered, lower+difference/2)
		}
		if len(recovered) == targetLength {
			return recovered
		}
	}
	return []int{}
}
