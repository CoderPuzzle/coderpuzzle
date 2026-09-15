func arraysIntersection(arr1 []int, arr2 []int, arr3 []int) []int {
	// One index per sorted array; the smallest current values can never
	// reappear ahead, so they are safe to step past.
	i, j, k := 0, 0, 0
	out := []int{}
	for i < len(arr1) && j < len(arr2) && k < len(arr3) {
		a, b, c := arr1[i], arr2[j], arr3[k]
		if a == b && b == c {
			out = append(out, a)
			i++
			j++
			k++
			continue
		}
		smallest := a
		if b < smallest {
			smallest = b
		}
		if c < smallest {
			smallest = c
		}
		if a == smallest {
			i++
		}
		if b == smallest {
			j++
		}
		if c == smallest {
			k++
		}
	}
	return out
}
