func minimumOperations(grid [][]int) int {
	rows, columns := len(grid), len(grid[0])
	total := rows * columns
	adjacency := make([][]int, total)
	leftVertices := make([]int, 0)
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	for row := 0; row < rows; row++ {
		for column := 0; column < columns; column++ {
			if grid[row][column] == 0 || (row+column)%2 == 1 {
				continue
			}
			vertex := row*columns + column
			leftVertices = append(leftVertices, vertex)
			for _, direction := range directions {
				nr, nc := row+direction[0], column+direction[1]
				if nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] == 1 {
					adjacency[vertex] = append(adjacency[vertex], nr*columns+nc)
				}
			}
		}
	}

	pairLeft := make([]int, total)
	pairRight := make([]int, total)
	distance := make([]int, total)
	for index := 0; index < total; index++ {
		pairLeft[index] = -1
		pairRight[index] = -1
	}
	infinity := total + 1
	stack := make([]int, total)
	pathEdges := make([]int, total)

	layer := func() int {
		queue := make([]int, 0, len(leftVertices))
		for _, vertex := range leftVertices {
			if pairLeft[vertex] == -1 {
				distance[vertex] = 0
				queue = append(queue, vertex)
			} else {
				distance[vertex] = infinity
			}
		}
		shortest := infinity
		for head := 0; head < len(queue); head++ {
			vertex := queue[head]
			if distance[vertex] >= shortest {
				continue
			}
			for _, neighbor := range adjacency[vertex] {
				mate := pairRight[neighbor]
				if mate == -1 {
					shortest = distance[vertex] + 1
				} else if distance[mate] == infinity {
					distance[mate] = distance[vertex] + 1
					queue = append(queue, mate)
				}
			}
		}
		return shortest
	}

	augment := func(root int, shortest int, nextEdge []int) bool {
		size := 1
		stack[0] = root
		for size > 0 {
			vertex := stack[size-1]
			if nextEdge[vertex] == len(adjacency[vertex]) {
				distance[vertex] = infinity
				size--
				continue
			}
			neighbor := adjacency[vertex][nextEdge[vertex]]
			nextEdge[vertex]++
			mate := pairRight[neighbor]
			if mate == -1 {
				if distance[vertex]+1 != shortest {
					continue
				}
				pairLeft[vertex] = neighbor
				pairRight[neighbor] = vertex
				for level := size - 2; level >= 0; level-- {
					parent := stack[level]
					edge := pathEdges[level]
					pairLeft[parent] = edge
					pairRight[edge] = parent
				}
				return true
			}
			if distance[mate] == distance[vertex]+1 {
				pathEdges[size-1] = neighbor
				stack[size] = mate
				size++
			}
		}
		return false
	}

	matching := 0
	for {
		shortest := layer()
		if shortest == infinity {
			break
		}
		nextEdge := make([]int, total)
		for _, vertex := range leftVertices {
			if pairLeft[vertex] == -1 && augment(vertex, shortest, nextEdge) {
				matching++
			}
		}
	}
	return matching
}
