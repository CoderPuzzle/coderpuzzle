func countBlackBlocks(m int, n int, coordinates [][]int) []int64 {
	answer := make([]int64, 5)
	counts := make(map[int64]int)
	for _, coordinate := range coordinates {
		x := coordinate[0]
		y := coordinate[1]
		for dx := -1; dx <= 0; dx++ {
			for dy := -1; dy <= 0; dy++ {
				bx := x + dx
				by := y + dy
				if bx >= 0 && bx < m-1 && by >= 0 && by < n-1 {
					counts[int64(bx)*int64(n)+int64(by)]++
				}
			}
		}
	}
	answer[0] = int64(m-1)*int64(n-1) - int64(len(counts))
	for _, count := range counts {
		answer[count]++
	}
	return answer
}
