func earliestSecondToMarkIndices(nums []int, changeIndices []int) int {
	n := len(nums)
	m := len(changeIndices)

	// first occurrence (0-indexed second) of each index whose nums value is > 0
	first := make([]int, n)
	for i := range first {
		first[i] = -1
	}
	for i := m - 1; i >= 0; i-- {
		idx := changeIndices[i] - 1
		if nums[idx] != 0 {
			first[idx] = i
		}
	}

	total := int64(n)
	low := int64(n)
	for i := 0; i < n; i++ {
		c := int64(nums[i])
		total += c
		if first[i] != -1 {
			low++
		} else {
			low += c
		}
	}

	var check func(t int) bool
	check = func(t int) bool {
		// array-based binary min-heap
		h := make([]int64, 0, t)
		var cnt, sum int64
		for i := t - 1; i >= 0; i-- {
			idx := changeIndices[i] - 1
			if i != first[idx] {
				cnt++
				continue
			}
			v := int64(nums[idx])
			h = append(h, v)
			sum += v
			c := len(h) - 1
			for c > 0 {
				p := (c - 1) / 2
				if h[p] <= h[c] {
					break
				}
				h[p], h[c] = h[c], h[p]
				c = p
			}
			if cnt > 0 {
				cnt--
			} else {
				cnt++
				top := h[0]
				sum -= top
				last := h[len(h)-1]
				h = h[:len(h)-1]
				if len(h) > 0 {
					h[0] = last
					c2 := 0
					for {
						l := 2*c2 + 1
						r := l + 1
						s := c2
						if l < len(h) && h[l] < h[s] {
							s = l
						}
						if r < len(h) && h[r] < h[s] {
							s = r
						}
						if s == c2 {
							break
						}
						h[s], h[c2] = h[c2], h[s]
						c2 = s
					}
				}
			}
		}
		return total-(sum+int64(len(h))) <= cnt
	}

	high := int64(m)
	for low <= high {
		mid := low + (high-low)/2
		if check(int(mid)) {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	if low <= int64(m) {
		return int(low)
	}
	return -1
}
