import "sort"

func maxIncreasingCells(mat [][]int) int {
	// Chains only ever move to strictly greater values, so sweeping the
	// distinct values in ascending order lets every cell inherit the best
	// chain that already ends in its row or column among smaller values.
	// Cells sharing one value form a read-then-write batch: their answers
	// come from the row/column state before the batch, and the maxima
	// absorb the whole batch afterwards, since an equal-value cell can
	// never continue a chain.
	rows := len(mat)
	cols := len(mat[0])
	type cell struct{ v, r, c int }
	cells := make([]cell, 0, rows*cols)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			cells = append(cells, cell{mat[r][c], r, c})
		}
	}
	sort.Slice(cells, func(i, j int) bool { return cells[i].v < cells[j].v })
	rowMax := make([]int, rows)
	colMax := make([]int, cols)
	best := 0
	for i := 0; i < len(cells); {
		j := i // run-length batch equal values: equal cells never chain
		for j < len(cells) && cells[j].v == cells[i].v {
			j++
		}
		type update struct{ length, r, c int }
		var batch []update
		for k := i; k < j; k++ {
			length := rowMax[cells[k].r]
			if colMax[cells[k].c] > length {
				length = colMax[cells[k].c]
			}
			length++ // one more than the best chain at a smaller value
			batch = append(batch, update{length, cells[k].r, cells[k].c})
			if best < length {
				best = length
			}
		}
		for _, u := range batch {
			if rowMax[u.r] < u.length {
				rowMax[u.r] = u.length
			}
			if colMax[u.c] < u.length {
				colMax[u.c] = u.length
			}
		}
		i = j
	}
	return best
}
