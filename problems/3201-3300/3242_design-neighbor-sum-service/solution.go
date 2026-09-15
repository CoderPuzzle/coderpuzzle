package main

// Construction indexes where every value lives; each query looks the value
// up once and adds its four in-bounds neighbors straight off the grid.
// Distinct values make the index exact, and edge cells simply find fewer
// in-bounds neighbors — no corner or border special cases.
type NeighborSum struct {
	grid  [][]int
	n     int
	rowOf []int
	colOf []int
}

func NewNeighborSumTyped(grid [][]int) *NeighborSum {
	// One walk builds the whole index: values are distinct and run
	// 0..n*n-1, so each value's cell can be stored at its own slot.
	design := &NeighborSum{
		grid:  grid,
		n:     len(grid),
		rowOf: make([]int, len(grid)*len(grid)),
		colOf: make([]int, len(grid)*len(grid)),
	}
	for r := 0; r < design.n; r++ {
		for c := 0; c < design.n; c++ {
			design.rowOf[grid[r][c]] = r
			design.colOf[grid[r][c]] = c
		}
	}
	return design
}

func (design *NeighborSum) adjacentSum(value int) int {
	return design.sumAround(design.rowOf[value], design.colOf[value],
		[4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}})
}

func (design *NeighborSum) diagonalSum(value int) int {
	return design.sumAround(design.rowOf[value], design.colOf[value],
		[4][2]int{{-1, -1}, {-1, 1}, {1, -1}, {1, 1}})
}

func (design *NeighborSum) sumAround(r int, c int, offsets [4][2]int) int {
	total := 0
	for _, offset := range offsets {
		nr := r + offset[0]
		nc := c + offset[1]
		if nr >= 0 && nr < design.n && nc >= 0 && nc < design.n {
			total += design.grid[nr][nc]
		}
	}
	return total
}
