func maxStudents(seats [][]string) int {
	m := len(seats)
	n := len(seats[0])

	rowMasks := make([][]int, 0, m)
	for _, row := range seats {
		masks := []int{}
		for mask := 0; mask < (1 << uint(n)); mask++ {
			ok := true
			for c := 0; c < n; c++ {
				if (mask>>uint(c))&1 == 1 {
					if row[c] == "#" {
						ok = false
						break
					}
					if c > 0 && ((mask>>uint(c-1))&1 == 1) {
						ok = false
						break
					}
				}
			}
			if ok {
				masks = append(masks, mask)
			}
		}
		rowMasks = append(rowMasks, masks)
	}

	popcount := func(x int) int {
		c := 0
		for x > 0 {
			c += x & 1
			x >>= 1
		}
		return c
	}

	// dp over rows: states maps previous row's mask -> best count so far.
	states := map[int]int{0: 0}
	for i := 0; i < m; i++ {
		newStates := make(map[int]int)
		for _, mask := range rowMasks[i] {
			best := -1
			for prev, val := range states {
				// no student directly above-left or above-right
				if mask&((prev<<1)|(prev>>1)) != 0 {
					continue
				}
				if val > best {
					best = val
				}
			}
			if best >= 0 {
				v := best + popcount(mask)
				cur, exists := newStates[mask]
				if !exists || v > cur {
					newStates[mask] = v
				}
			}
		}
		states = newStates
	}
	ans := 0
	for _, val := range states {
		if val > ans {
			ans = val
		}
	}
	return ans
}
