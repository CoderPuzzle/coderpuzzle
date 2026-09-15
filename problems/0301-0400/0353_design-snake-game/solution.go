// The body as a slice (tail at index 0, head at the end) plus a set of
// the covered cells: move appends the new head and — unless food is
// eaten — drops the tail in the same step, so the snake slides forward
// exactly one cell and the set answers the body-collision question in
// O(1).
type SnakeGame struct {
	width    int
	height   int
	food     [][2]int
	nextFood int
	score    int
	body     [][2]int // body[0] is the tail; the last cell is the head
	occupied map[[2]int]bool
}

func NewSnakeGameTyped(width int, height int, food [][]int) *SnakeGame {
	pieces := make([][2]int, len(food))
	for index, piece := range food {
		pieces[index] = [2]int{piece[0], piece[1]}
	}
	return &SnakeGame{
		width:    width,
		height:   height,
		food:     pieces,
		body:     [][2]int{{0, 0}},
		occupied: map[[2]int]bool{{0, 0}: true},
	}
}

func (design *SnakeGame) move(direction string) int {
	head := design.body[len(design.body)-1]
	row, col := head[0], head[1]
	switch direction {
	case "U":
		row--
	case "D":
		row++
	case "L":
		col--
	default:
		col++
	}
	if row < 0 || row >= design.height || col < 0 || col >= design.width {
		return -1
	}
	newHead := [2]int{row, col}
	eating := design.nextFood < len(design.food) && design.food[design.nextFood] == newHead
	if !eating {
		// The tail vacates its cell in this very step, so a head
		// landing on the CURRENT tail position is legal.
		delete(design.occupied, design.body[0])
		design.body = design.body[1:]
	}
	if design.occupied[newHead] {
		return -1
	}
	design.body = append(design.body, newHead)
	design.occupied[newHead] = true
	if eating {
		design.nextFood++
		design.score++
	}
	return design.score
}
