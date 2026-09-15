func findDegrees(matrix [][]int) []int {
	degrees := make([]int, len(matrix))
	for vertex, row := range matrix {
		for _, edge := range row {
			degrees[vertex] += edge
		}
	}
	return degrees
}
