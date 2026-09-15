import "sort"

type candidate struct {
	distance int
	price    int
	row      int
	column   int
}

func highestRankedKItems(grid [][]int, pricing []int, start []int, k int) [][]int {
	rows, columns := len(grid), len(grid[0])
	distance := make([][]int, rows)
	for row := range distance {
		distance[row] = make([]int, columns)
		for column := range distance[row] {
			distance[row][column] = -1
		}
	}

	queue := make([][2]int, 1, rows*columns)
	queue[0] = [2]int{start[0], start[1]}
	distance[start[0]][start[1]] = 0
	items := make([]candidate, 0)
	directions := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for front := 0; front < len(queue); front++ {
		row, column := queue[front][0], queue[front][1]
		price := grid[row][column]
		if pricing[0] <= price && price <= pricing[1] {
			items = append(items, candidate{distance[row][column], price, row, column})
		}

		for _, direction := range directions {
			nextRow, nextColumn := row+direction[0], column+direction[1]
			if nextRow >= 0 && nextRow < rows && nextColumn >= 0 && nextColumn < columns &&
				grid[nextRow][nextColumn] != 0 && distance[nextRow][nextColumn] == -1 {
				distance[nextRow][nextColumn] = distance[row][column] + 1
				queue = append(queue, [2]int{nextRow, nextColumn})
			}
		}
	}

	sort.Slice(items, func(i, j int) bool {
		left, right := items[i], items[j]
		if left.distance != right.distance {
			return left.distance < right.distance
		}
		if left.price != right.price {
			return left.price < right.price
		}
		if left.row != right.row {
			return left.row < right.row
		}
		return left.column < right.column
	})

	if k > len(items) {
		k = len(items)
	}
	answer := make([][]int, k)
	for index := 0; index < k; index++ {
		answer[index] = []int{items[index].row, items[index].column}
	}
	return answer
}
