import "sort"

func minOperations(grid [][]int, x int) int {
	values := make([]int, 0, len(grid)*len(grid[0]))
	remainder := grid[0][0] % x
	for _, row := range grid {
		for _, value := range row {
			if value%x != remainder {
				return -1
			}
			values = append(values, value)
		}
	}

	sort.Ints(values)
	median := values[len(values)/2]
	var operations int64
	for _, value := range values {
		difference := int64(value) - int64(median)
		if difference < 0 {
			difference = -difference
		}
		operations += difference / int64(x)
	}
	return int(operations)
}
