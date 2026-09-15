func gridGame(grid [][]int) int64 {
	var topRemaining int64
	for _, points := range grid[0] {
		topRemaining += int64(points)
	}

	var bottomPrefix int64
	answer := int64(^uint64(0) >> 1)
	for column := range grid[0] {
		topRemaining -= int64(grid[0][column])
		secondScore := topRemaining
		if bottomPrefix > secondScore {
			secondScore = bottomPrefix
		}
		if secondScore < answer {
			answer = secondScore
		}
		bottomPrefix += int64(grid[1][column])
	}
	return answer
}
