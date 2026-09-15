type SubrectangleQueries struct {
	rect [][]int64
}

func NewSubrectangleQueriesTyped(rectangle [][]int64) *SubrectangleQueries {
	rect := make([][]int64, len(rectangle))
	for r, row := range rectangle {
		rowCopy := make([]int64, len(row))
		copy(rowCopy, row)
		rect[r] = rowCopy
	}
	return &SubrectangleQueries{rect: rect}
}

func (design *SubrectangleQueries) updateSubrectangle(row1 int, col1 int, row2 int, col2 int, newValue int64) {
	for r := row1; r <= row2; r++ {
		for c := col1; c <= col2; c++ {
			design.rect[r][c] = newValue
		}
	}
}

func (design *SubrectangleQueries) getValue(row int, col int) int64 {
	return design.rect[row][col]
}
