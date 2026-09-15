import "math/bits"

func maximumRows(matrix [][]int, numSelect int) int {
	// Encode rows as bitmasks; a set of selected columns covers a row
	// exactly when the row's mask is a subset of it. Enumerate every
	// mask with popcount == numSelect and keep the best count.
	m, n := len(matrix), len(matrix[0])
	masks := make([]int, m)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if matrix[i][j] == 1 {
				masks[i] |= 1 << j
			}
		}
	}
	best := 0
	for sel := 0; sel < 1<<n; sel++ {
		if bits.OnesCount(uint(sel)) != numSelect {
			continue
		}
		covered := 0
		for _, row := range masks {
			if row & ^sel == 0 {
				covered++
			}
		}
		if covered > best {
			best = covered
		}
	}
	return best
}
