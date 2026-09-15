import "sort"

func findOriginalArray(changed []int) []int {
	if len(changed)%2 == 1 {
		return []int{}
	}

	sort.Ints(changed)
	counts := make(map[int]int, len(changed))
	for _, value := range changed {
		counts[value]++
	}

	original := make([]int, 0, len(changed)/2)
	for _, value := range changed {
		if counts[value] == 0 {
			continue
		}
		counts[value]--
		doubled := value * 2
		if counts[doubled] == 0 {
			return []int{}
		}
		counts[doubled]--
		original = append(original, value)
	}
	return original
}
