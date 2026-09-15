func maxDistance(colors []int) int {
	last := len(colors) - 1
	answer := 0
	for index, color := range colors {
		if color != colors[0] && index > answer {
			answer = index
		}
		if color != colors[last] && last-index > answer {
			answer = last - index
		}
	}
	return answer
}
