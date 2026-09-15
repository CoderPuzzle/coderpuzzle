// Row and column swaps preserve the XOR of any rectangle's four corners,
// and that XOR is 0 on every chessboard, so a solvable board must repeat
// one row (or its complement) everywhere.
func movesToChessboard(board [][]int) int {
	n := len(board)
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if board[0][0]^board[0][j]^board[i][0]^board[i][j] != 0 {
				return -1
			}
		}
	}
	// The first row and first column must each be rearrangeable into an
	// alternating pattern, so both need n/2 (or (n+1)/2) ones.
	half, ceilHalf := n/2, (n+1)/2
	rowOnes, colOnes := 0, 0
	for i := 0; i < n; i++ {
		rowOnes += board[0][i]
		colOnes += board[i][0]
	}
	if !fits(rowOnes, half, ceilHalf) || !fits(colOnes, half, ceilHalf) {
		return -1
	}
	// Count rows/columns already sitting where the pattern starting with 0
	// wants them; each swap corrects two misplaced ones.
	rowMatches, colMatches := 0, 0
	for i := 0; i < n; i++ {
		if board[i][0] == i%2 {
			rowMatches++
		}
		if board[0][i] == i%2 {
			colMatches++
		}
	}
	var rowSwaps, colSwaps int
	if n%2 == 0 {
		// Both alternating patterns are available; either way to pair the
		// misplaced entries is fair game, so take the cheaper.
		rowSwaps = rowMatches
		if n-rowMatches < rowSwaps {
			rowSwaps = n - rowMatches
		}
		colSwaps = colMatches
		if n-colMatches < colSwaps {
			colSwaps = n - colMatches
		}
	} else {
		// Odd n pins the pattern by its majority value, and the true
		// mismatch count is the even member of each pair.
		rowSwaps = rowMatches
		if rowMatches%2 != 0 {
			rowSwaps = n - rowMatches
		}
		colSwaps = colMatches
		if colMatches%2 != 0 {
			colSwaps = n - colMatches
		}
	}
	return (rowSwaps + colSwaps) / 2
}

func fits(ones, half, ceilHalf int) bool {
	return ones == half || ones == ceilHalf
}
