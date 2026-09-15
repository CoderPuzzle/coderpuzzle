func countOfPeaks(nums []int, queries [][]int) []int {
	n := len(nums)

	isPeak := func(i int) bool {
		return i > 0 && i < n-1 && nums[i] > nums[i-1] && nums[i] > nums[i+1]
	}

	// Fenwick tree over 1-indexed positions; API is 0-indexed.
	bit := make([]int, n+1)
	add := func(i, delta int) {
		i++
		for i <= n {
			bit[i] += delta
			i += i & -i
		}
	}
	prefix := func(i int) int {
		i++
		total := 0
		for i > 0 {
			total += bit[i]
			i -= i & -i
		}
		return total
	}
	rangeSum := func(l, r int) int {
		if l > r {
			return 0
		}
		return prefix(r) - prefix(l-1)
	}

	for i := 0; i < n; i++ {
		if isPeak(i) {
			add(i, 1)
		}
	}

	answer := []int{}
	for _, q := range queries {
		if q[0] == 1 {
			l, r := q[1], q[2]
			if r-l < 2 {
				answer = append(answer, 0)
			} else {
				answer = append(answer, rangeSum(l+1, r-1))
			}
		} else {
			idx, val := q[1], q[2]
			for j := idx - 1; j <= idx+1; j++ {
				if j >= 0 && j < n && isPeak(j) {
					add(j, -1)
				}
			}
			nums[idx] = val
			for j := idx - 1; j <= idx+1; j++ {
				if j >= 0 && j < n && isPeak(j) {
					add(j, 1)
				}
			}
		}
	}
	return answer
}
