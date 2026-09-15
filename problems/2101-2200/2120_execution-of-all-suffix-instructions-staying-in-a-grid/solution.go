func executeInstructions(n int, startPos []int, s string) []int {
	answer := make([]int, len(s))
	for start := 0; start < len(s); start++ {
		row, col := startPos[0], startPos[1]
		for index := start; index < len(s); index++ {
			nextRow, nextCol := row, col
			switch s[index] {
			case 'L':
				nextCol--
			case 'R':
				nextCol++
			case 'U':
				nextRow--
			default:
				nextRow++
			}
			if nextRow < 0 || nextRow >= n || nextCol < 0 || nextCol >= n {
				break
			}
			row, col = nextRow, nextCol
			answer[start]++
		}
	}
	return answer
}
