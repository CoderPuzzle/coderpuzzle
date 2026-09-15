import "sort"

func minimumCost(nums []int, k int, dist int) int64 {
	n := len(nums)
	target := k - 2
	vals := make([]int64, n)
	for i := 0; i < n; i++ {
		vals[i] = int64(nums[i])
	}
	sort.Slice(vals, func(a, b int) bool { return vals[a] < vals[b] })
	m := 0
	for i := 0; i < n; i++ {
		if i == 0 || vals[i] != vals[i-1] {
			vals[m] = vals[i]
			m++
		}
	}
	vals = vals[:m]

	posOf := func(v int64) int {
		return sort.Search(len(vals), func(a int) bool { return vals[a] >= v })
	}

	countBit := make([]int64, m+1)
	sumBit := make([]int64, m+1)

	fenAdd := func(bit []int64, index int, delta int64) {
		i := index + 1
		for i <= m {
			bit[i] += delta
			i += i & (-i)
		}
	}
	fenPrefix := func(bit []int64, index int) int64 {
		// sum over [0, index]; index may be < 0
		if index < 0 {
			return 0
		}
		if index >= m {
			index = m - 1
		}
		i := index + 1
		var total int64
		for i > 0 {
			total += bit[i]
			i -= i & (-i)
		}
		return total
	}
	// 0-based index of the targetK-th smallest element (targetK >= 1)
	kth := func(targetK int) int {
		idx := 0
		bitmask := 1
		for bitmask*2 <= m {
			bitmask *= 2
		}
		remaining := int64(targetK)
		for bitmask > 0 {
			nxt := idx + bitmask
			if nxt <= m && countBit[nxt] < remaining {
				idx = nxt
				remaining -= countBit[nxt]
			}
			bitmask /= 2
		}
		return idx
	}
	sumKSmallest := func(count int) int64 {
		if count == 0 {
			return 0
		}
		idx := kth(count)
		before := fenPrefix(countBit, idx-1)
		sumBefore := fenPrefix(sumBit, idx-1)
		return sumBefore + int64(count-int(before))*vals[idx]
	}
	addValue := func(v int) {
		j := posOf(int64(v))
		fenAdd(countBit, j, 1)
		fenAdd(sumBit, j, int64(v))
	}
	removeValue := func(v int) {
		j := posOf(int64(v))
		fenAdd(countBit, j, -1)
		fenAdd(sumBit, j, -int64(v))
	}

	var ans int64 = 1 << 62
	right0 := min3013(1+dist, n-1)
	for p := 2; p <= right0; p++ {
		addValue(nums[p])
	}

	for i1 := 1; i1 < n; i1++ {
		left := i1 + 1
		right := min3013(i1+dist, n-1)
		if right-left+1 >= target {
			cost := int64(nums[0]) + int64(nums[i1]) + sumKSmallest(target)
			if cost < ans {
				ans = cost
			}
		}
		if left <= n-1 {
			removeValue(nums[left])
		}
		newRight := i1 + 1 + dist
		if newRight <= n-1 {
			addValue(nums[newRight])
		}
	}
	return ans
}

func min3013(a, b int) int {
	if a < b {
		return a
	}
	return b
}
