func kthSmallestPath(destination []int, k int) string {
	row, col := destination[0], destination[1]
	n := row + col
	// binom[i][j] = C(i, j), built as Pascal's triangle up to n so every
	// count is available without computing a factorial; row, col <= 15
	// keeps every entry well under the range of int.
	binom := make([][]int, n+1)
	for i := range binom {
		binom[i] = make([]int, n+1)
	}
	for i := 0; i <= n; i++ {
		binom[i][0] = 1
		binom[i][i] = 1
		for j := 1; j < i; j++ {
			binom[i][j] = binom[i-1][j-1] + binom[i-1][j]
		}
	}

	remainingH, remainingV := col, row
	path := make([]byte, 0, n)
	for step := 0; step < n; step++ {
		if remainingH == 0 {
			path = append(path, 'V')
			remainingV--
		} else if remainingV == 0 {
			path = append(path, 'H')
			remainingH--
		} else {
			// Completions starting with 'H': the remaining (remainingH -
			// 1) H's and remainingV V's fill the rest of the string in
			// any order, so this count is C(remainingH - 1 + remainingV,
			// remainingV).
			countIfH := binom[remainingH-1+remainingV][remainingV]
			if k <= countIfH {
				path = append(path, 'H')
				remainingH--
			} else {
				k -= countIfH
				path = append(path, 'V')
				remainingV--
			}
		}
	}
	return string(path)
}
