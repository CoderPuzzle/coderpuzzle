func isThereAPath(grid [][]int) bool {
	// Monotone moves give cell (i, j) exactly i + j + 1 visited cells,
	// so every balance (#1s - #0s) reachable there lies inside
	// [-(m+n-1), m+n-1] — a window of up to 399 values, one bit per
	// balance packed into uint64 words. Each column carries such a
	// word-set for the current row; a cell unions its top and left
	// neighbour sets and shifts the whole set by its own value. Balance
	// 0 surviving at the bottom-right corner is the answer.
	m := len(grid)
	n := len(grid[0])
	half := m + n - 1
	words := (2*half + 64) / 64
	cols := make([][]uint64, n)
	for j := range cols {
		cols[j] = make([]uint64, words)
	}
	setBit(cols[0], half+firstStep(grid[0][0]))
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 && j == 0 {
				continue
			}
			merged := make([]uint64, words)
			if i > 0 {
				for w := 0; w < words; w++ {
					merged[w] |= cols[j][w]
				}
			}
			if j > 0 {
				for w := 0; w < words; w++ {
					merged[w] |= cols[j-1][w]
				}
			}
			out := make([]uint64, words)
			shift(merged, grid[i][j], out)
			cols[j] = out
		}
	}
	return getBit(cols[n-1], half)
}

func firstStep(value int) int {
	if value == 1 {
		return 1
	}
	return -1
}

func setBit(bits []uint64, index int) {
	bits[index>>6] |= 1 << (index & 63)
}

func getBit(bits []uint64, index int) bool {
	return bits[index>>6]>>(index&63)&1 != 0
}

func shift(bits []uint64, value int, out []uint64) {
	if value == 1 { // every balance rises by one: shift toward MSB
		var carry uint64
		for w := range bits {
			out[w] = bits[w]<<1 | carry
			carry = bits[w] >> 63
		}
	} else { // every balance falls by one: shift toward LSB
		var rem uint64
		for w := len(bits) - 1; w >= 0; w-- {
			out[w] = bits[w]>>1 | rem<<63
			rem = bits[w] & 1
		}
	}
}
