// Only the painted cell's two neighbor pairs can flip status in one query:
// score their contribution before the repaint, then after, and slide the
// running total by the difference. Zero stays "uncolored", so a pair only
// counts when both sides are non-zero and equal.
func colorTheArray(n int, queries [][]int) []int {
	colors := make([]int, n)
	same := 0
	answer := make([]int, 0, len(queries))
	score := func(index, color int) int {
		contribution := 0
		for _, j := range [2]int{index - 1, index + 1} {
			if j >= 0 && j < n && colors[j] != 0 && colors[j] == color {
				contribution++
			}
		}
		return contribution
	}
	for _, query := range queries {
		index, color := query[0], query[1]
		same -= score(index, colors[index])
		colors[index] = color
		same += score(index, color)
		answer = append(answer, same)
	}
	return answer
}
