func maximumSum(nums []int, m int, l int, r int) int64 {
	n := len(nums)
	prefix := make([]int64, n+1)
	for i, value := range nums {
		prefix[i+1] = prefix[i] + int64(value)
	}

	const impossible int64 = -1 << 60
	previous := make([]int64, n+1)
	answer := impossible
	maxCount := m
	if n/l < maxCount {
		maxCount = n / l
	}

	for count := 1; count <= maxCount; count++ {
		current := make([]int64, n+1)
		for i := range current {
			current[i] = impossible
		}
		indexes := make([]int, 0, n)
		values := make([]int64, 0, n)
		head := 0

		for end := 1; end <= n; end++ {
			start := end - l
			if start >= 0 && previous[start] != impossible {
				value := previous[start] - prefix[start]
				for len(values) > head && values[len(values)-1] <= value {
					indexes = indexes[:len(indexes)-1]
					values = values[:len(values)-1]
				}
				indexes = append(indexes, start)
				values = append(values, value)
			}

			earliest := end - r
			for head < len(indexes) && indexes[head] < earliest {
				head++
			}

			current[end] = current[end-1]
			if head < len(values) {
				candidate := prefix[end] + values[head]
				if candidate > current[end] {
					current[end] = candidate
				}
			}
		}
		if current[n] > answer {
			answer = current[n]
		}
		previous = current
	}
	return answer
}
