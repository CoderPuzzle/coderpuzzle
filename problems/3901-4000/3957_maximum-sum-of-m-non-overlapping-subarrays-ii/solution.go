func maximumSum(nums []int, m int, l int, r int) int64 {
	n := len(nums)
	prefix := make([]int64, n+1)
	for i, value := range nums {
		prefix[i+1] = prefix[i] + int64(value)
	}

	values := make([]int64, n+1)
	counts := make([]int, n+1)
	queue := make([]int, n+1)
	evaluate := func(penalty int64) (int64, int) {
		head, tail := 0, 0
		values[0], counts[0] = 0, 0
		for end := 1; end <= n; end++ {
			start := end - l
			if start >= 0 {
				key := values[start] - prefix[start]
				for tail > head {
					back := queue[tail-1]
					backKey := values[back] - prefix[back]
					if backKey > key || backKey == key && counts[back] > counts[start] {
						break
					}
					tail--
				}
				queue[tail] = start
				tail++
			}
			for head < tail && queue[head] < end-r {
				head++
			}

			values[end], counts[end] = values[end-1], counts[end-1]
			if head < tail {
				start = queue[head]
				takeValue := prefix[end] - penalty + values[start] - prefix[start]
				takeCount := counts[start] + 1
				if takeValue > values[end] || takeValue == values[end] && takeCount > counts[end] {
					values[end], counts[end] = takeValue, takeCount
				}
			}
		}
		return values[n], counts[n]
	}

	value, count := evaluate(0)
	if count == 0 {
		head, tail := 0, 0
		best := int64(-1 << 62)
		for end := 1; end <= n; end++ {
			start := end - l
			if start >= 0 {
				for tail > head && prefix[queue[tail-1]] >= prefix[start] {
					tail--
				}
				queue[tail] = start
				tail++
			}
			for head < tail && queue[head] < end-r {
				head++
			}
			if head < tail && prefix[end]-prefix[queue[head]] > best {
				best = prefix[end] - prefix[queue[head]]
			}
		}
		return best
	}
	if count <= m {
		return value
	}

	var maxAbs int64
	for _, number := range nums {
		absolute := int64(number)
		if absolute < 0 {
			absolute = -absolute
		}
		if absolute > maxAbs {
			maxAbs = absolute
		}
	}
	lowPenalty, highPenalty := int64(0), maxAbs*int64(n)+1
	for lowPenalty < highPenalty {
		penalty := (lowPenalty + highPenalty + 1) / 2
		_, selected := evaluate(penalty)
		if selected >= m {
			lowPenalty = penalty
		} else {
			highPenalty = penalty - 1
		}
	}
	adjusted, _ := evaluate(lowPenalty)
	return adjusted + lowPenalty*int64(m)
}
