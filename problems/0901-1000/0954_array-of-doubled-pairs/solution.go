import "sort"

// A pair is (x, 2x), so the value of smallest absolute value has no
// choice: its half is smaller in magnitude and cannot be waiting for it,
// so every copy must claim a double. Walk the distinct values in ascending
// absolute value, carrying each value's unclaimed copies forward as a
// demand on its double; a demand that outruns the supply, or aims at a
// value the array never held, makes the pairing impossible. Zero is its
// own double, so its count must be even.
func canReorderDoubled(arr []int) bool {
	count := map[int]int{}
	for _, value := range arr {
		count[value]++
	}
	values := make([]int, 0, len(count))
	for value := range count {
		values = append(values, value)
	}
	sort.Slice(values, func(i, j int) bool {
		return abs(values[i]) < abs(values[j])
	})
	need := map[int]int{}
	for _, value := range values {
		if value == 0 {
			if count[0]%2 != 0 {
				return false
			}
			continue
		}
		if need[value] > count[value] {
			return false
		}
		extra := count[value] - need[value]
		if extra > 0 && count[2*value] == 0 {
			return false
		}
		need[2*value] += extra
	}
	return true
}

// Distance from zero, the only helper the walk needs.
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
