func maxTrailingZeros(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])

	count2 := make([][]int, m)
	count5 := make([][]int, m)
	for i := 0; i < m; i++ {
		count2[i] = make([]int, n)
		count5[i] = make([]int, n)
		for j := 0; j < n; j++ {
			x := grid[i][j]
			c2 := 0
			for x%2 == 0 {
				x /= 2
				c2++
			}
			c5 := 0
			for x%5 == 0 {
				x /= 5
				c5++
			}
			count2[i][j] = c2
			count5[i][j] = c5
		}
	}

	// row2[i][j+1] = sum count2[i][0..j]; row5 analogous.
	row2 := make([][]int, m)
	row5 := make([][]int, m)
	for i := 0; i < m; i++ {
		row2[i] = make([]int, n+1)
		row5[i] = make([]int, n+1)
		for j := 0; j < n; j++ {
			row2[i][j+1] = row2[i][j] + count2[i][j]
			row5[i][j+1] = row5[i][j] + count5[i][j]
		}
	}

	// col2[j][i+1] = sum count2[0..i][j]; col5 analogous.
	col2 := make([][]int, n)
	col5 := make([][]int, n)
	for j := 0; j < n; j++ {
		col2[j] = make([]int, m+1)
		col5[j] = make([]int, m+1)
		for i := 0; i < m; i++ {
			col2[j][i+1] = col2[j][i] + count2[i][j]
			col5[j][i+1] = col5[j][i] + count5[i][j]
		}
	}

	maxInt := func(a, b int) int {
		if a > b {
			return a
		}
		return b
	}
	minInt := func(a, b int) int {
		if a < b {
			return a
		}
		return b
	}

	answer := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			cell2 := count2[i][j]
			cell5 := count5[i][j]
			// horizontal sum over full row segment, vertical over full column segment
			horiz2Left := row2[i][j+1]             // cols [0, j]
			horiz2Right := row2[i][n] - row2[i][j] // cols [j, n-1]
			vert2Top := col2[j][i+1]               // rows [0, i]
			vert2Bottom := col2[j][m] - col2[j][i] // rows [i, m-1]
			horiz5Left := row5[i][j+1]
			horiz5Right := row5[i][n] - row5[i][j]
			vert5Top := col5[j][i+1]
			vert5Bottom := col5[j][m] - col5[j][i]

			answer = maxInt(answer, maxInt(
				minInt(horiz2Left+vert2Top-cell2, horiz5Left+vert5Top-cell5),
				maxInt(
					minInt(horiz2Right+vert2Top-cell2, horiz5Right+vert5Top-cell5),
					maxInt(
						minInt(horiz2Left+vert2Bottom-cell2, horiz5Left+vert5Bottom-cell5),
						minInt(horiz2Right+vert2Bottom-cell2, horiz5Right+vert5Bottom-cell5),
					),
				),
			))
		}
	}
	return answer
}
