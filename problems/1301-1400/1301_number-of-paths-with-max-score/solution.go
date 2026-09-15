func pathsWithMaxScore(board []string) []int {
	const mod = 1000000007
	n := len(board)
	// score[i][j] is the best sum reachable at (i, j) from 'S', and
	// ways[i][j] counts the paths achieving it; -1 marks unreachable.
	score := make([][]int, n)
	ways := make([][]int, n)
	for i := range score {
		score[i] = make([]int, n)
		ways[i] = make([]int, n)
		for j := range score[i] {
			score[i][j] = -1
		}
	}
	score[n-1][n-1] = 0
	ways[n-1][n-1] = 1
	dirs := [][2]int{{1, 0}, {0, 1}, {1, 1}}
	// Sweep bottom-up so every incoming cell (below, right, below-right) is
	// already resolved when a cell is visited. The start square is seeded
	// above and skipped here.
	for i := n - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if board[i][j] == 'X' || (i == n-1 && j == n-1) {
				continue
			}
			best, total := -1, 0
			for _, d := range dirs {
				ni, nj := i+d[0], j+d[1]
				if ni >= n || nj >= n || score[ni][nj] < 0 {
					continue
				}
				if score[ni][nj] > best {
					best = score[ni][nj]
					total = ways[ni][nj]
				} else if score[ni][nj] == best {
					total = (total + ways[ni][nj]) % mod
				}
			}
			if best >= 0 {
				digit := 0
				if board[i][j] >= '1' && board[i][j] <= '9' {
					digit = int(board[i][j] - '0')
				}
				score[i][j] = best + digit
				ways[i][j] = total % mod
			}
		}
	}
	if ways[0][0] == 0 {
		return []int{0, 0}
	}
	return []int{score[0][0], ways[0][0]}
}
