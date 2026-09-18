package main

// Problem-provided oracle (GridMaster), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the grid, the start cell and the
// goal cell as generic values, then the query budget.
type GridMaster struct {
	cost    [][]int
	row     int
	col     int
	goalRow int
	goalCol int
	budget  int64
}

var mazeDeltas = map[string][2]int{"U": {-1, 0}, "D": {1, 0}, "L": {0, -1}, "R": {0, 1}}

// NewGridMaster builds the oracle from the case's construction
// values (grid, start, goal) and the query budget.
func NewGridMaster(construction []any, budget int64) *GridMaster {
	grid, ok := construction[0].([]any)
	if !ok {
		panic("GridMaster grid must be an array")
	}
	cost := make([][]int, len(grid))
	for r, rowValue := range grid {
		row, ok := rowValue.([]any)
		if !ok {
			panic("GridMaster grid rows must be arrays")
		}
		cost[r] = make([]int, len(row))
		for c, cell := range row {
			value, ok := cell.(int64)
			if !ok {
				panic("GridMaster grid cells must be integers")
			}
			cost[r][c] = int(value)
		}
	}
	start, ok := construction[1].([]any)
	if !ok {
		panic("GridMaster start must be [row, col]")
	}
	goal, ok := construction[2].([]any)
	if !ok {
		panic("GridMaster goal must be [row, col]")
	}
	return &GridMaster{
		cost:    cost,
		row:     int(start[0].(int64)),
		col:     int(start[1].(int64)),
		goalRow: int(goal[0].(int64)),
		goalCol: int(goal[1].(int64)),
		budget:  budget,
	}
}

func (maze *GridMaster) spend() {
	if maze.budget <= 0 {
		panic("GridMaster query budget exhausted")
	}
	maze.budget--
}

func (maze *GridMaster) enterable(r, c int) bool {
	return r >= 0 && r < len(maze.cost) && c >= 0 && c < len(maze.cost[r]) && maze.cost[r][c] > 0
}

// CanMove reports whether a step in the direction is possible.
func (maze *GridMaster) CanMove(direction string) bool {
	maze.spend()
	step := mazeDeltas[direction]
	return maze.enterable(maze.row+step[0], maze.col+step[1])
}

// Move takes the step and returns the cost of the entered cell (-1 when
// the step is impossible).
func (maze *GridMaster) Move(direction string) int {
	maze.spend()
	step := mazeDeltas[direction]
	r, c := maze.row+step[0], maze.col+step[1]
	if !maze.enterable(r, c) {
		return -1
	}
	maze.row, maze.col = r, c
	return maze.cost[r][c]
}

// IsTarget reports whether the walker stands on the goal cell.
func (maze *GridMaster) IsTarget() bool {
	maze.spend()
	return maze.row == maze.goalRow && maze.col == maze.goalCol
}
