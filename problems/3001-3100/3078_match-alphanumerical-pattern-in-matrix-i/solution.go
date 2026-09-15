// Corners are scanned row-major, so the first hit already carries the
// lowest row and then the lowest column. Each candidate is validated by
// one pass that grows a letter->digit bijection: a letter must repeat its
// own digit, and a digit already claimed by one letter is refused for
// every other letter.
func findPattern(board [][]int, pattern []string) []int {
	rows, cols := len(board), len(board[0])
	pRows, pCols := len(pattern), len(pattern[0])
	for r := 0; r+pRows <= rows; r++ {
		for c := 0; c+pCols <= cols; c++ {
			if matches(board, pattern, r, c) {
				return []int{r, c}
			}
		}
	}
	return []int{-1, -1}
}

func matches(board [][]int, pattern []string, r, c int) bool {
	toDigit := make(map[byte]int)
	toLetter := make(map[int]byte)
	for i := 0; i < len(pattern); i++ {
		for j := 0; j < len(pattern[i]); j++ {
			value := board[r+i][c+j]
			ch := pattern[i][j]
			switch {
			case ch >= '0' && ch <= '9':
				if value != int(ch-'0') {
					return false
				}
			default:
				if digit, ok := toDigit[ch]; ok {
					if digit != value {
						return false
					}
				} else if _, ok := toLetter[value]; ok {
					return false
				} else {
					toDigit[ch] = value
					toLetter[value] = ch
				}
			}
		}
	}
	return true
}
