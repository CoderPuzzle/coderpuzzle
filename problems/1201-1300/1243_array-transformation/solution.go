func transformArray(arr []int) []int {
	current := append([]int(nil), arr...)
	for {
		// Whole day from a snapshot: neighbors are yesterday's values.
		next := append([]int(nil), current...)
		for i := 1; i+1 < len(current); i++ {
			if current[i] < current[i-1] && current[i] < current[i+1] {
				next[i] = current[i] + 1
			} else if current[i] > current[i-1] && current[i] > current[i+1] {
				next[i] = current[i] - 1
			}
		}
		same := true
		for i := range next {
			if next[i] != current[i] {
				same = false
				break
			}
		}
		if same {
			return current
		}
		current = next
	}
}
