func minimumOR(grid [][]int) int {
	forbidden := 0
	answer := 0

	for bit := 16; bit >= 0; bit-- {
		candidate := forbidden | (1 << bit)
		feasible := true
		for _, row := range grid {
			rowHasChoice := false
			for _, value := range row {
				if value&candidate == 0 {
					rowHasChoice = true
					break
				}
			}
			if !rowHasChoice {
				feasible = false
				break
			}
		}

		if feasible {
			forbidden = candidate
		} else {
			answer |= 1 << bit
		}
	}

	return answer
}
