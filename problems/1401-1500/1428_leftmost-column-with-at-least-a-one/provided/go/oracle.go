package main

// Problem-provided oracle (BinaryMatrix), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the hidden grid rows as generic values, then the
// query budget.
type BinaryMatrix struct {
	rows   [][]int
	budget int64
}

// NewBinaryMatrix builds the oracle from the case's construction values
// (the grid rows as one generic slice of row slices) and the query
// budget.
func NewBinaryMatrix(construction []any, budget int64) *BinaryMatrix {
	grid, ok := construction[0].([]any)
	if !ok {
		panic("BinaryMatrix rows must be an array")
	}
	rows := make([][]int, 0, len(grid))
	for _, raw := range grid {
		entries, ok := raw.([]any)
		if !ok {
			panic("BinaryMatrix rows must be arrays")
		}
		values := make([]int, 0, len(entries))
		for _, entry := range entries {
			value, ok := entry.(int64)
			if !ok {
				panic("BinaryMatrix entries must be integers")
			}
			values = append(values, int(value))
		}
		rows = append(rows, values)
	}
	return &BinaryMatrix{rows: rows, budget: budget}
}

// Get returns the entry at (row, col).
func (matrix *BinaryMatrix) Get(row int, col int) int {
	if matrix.budget <= 0 {
		panic("BinaryMatrix query budget exhausted")
	}
	matrix.budget--
	return matrix.rows[row][col]
}

// Dimensions returns the shape as [rows, cols].
func (matrix *BinaryMatrix) Dimensions() []int {
	cols := 0
	if len(matrix.rows) > 0 {
		cols = len(matrix.rows[0])
	}
	return []int{len(matrix.rows), cols}
}
