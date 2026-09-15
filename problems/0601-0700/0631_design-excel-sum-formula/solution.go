package main

import (
	"strconv"
	"strings"
)

// Cell values beside per-cell formula lists, both plain grids: set()
// writes the literal and empties the cell's formula list; sum() installs
// the flattened reference list parsed from numbers; get() resolves on
// demand, recursing through formula cells so a later set() on a source
// cell is picked up by the next get() of anything downstream.
type Excel struct {
	values   [][]int
	formulas [][][][2]int
}

func NewExcelTyped(height int, width string) *Excel {
	columns := int(width[0]-'A') + 1
	excel := &Excel{
		values:   make([][]int, height+1),
		formulas: make([][][][2]int, height+1),
	}
	for row := range excel.values {
		excel.values[row] = make([]int, columns)
		excel.formulas[row] = make([][][2]int, columns)
	}
	return excel
}

func (design *Excel) set(row int, column string, val int) {
	col := int(column[0] - 'A')
	design.values[row][col] = val
	design.formulas[row][col] = nil
}

func (design *Excel) get(row int, column string) int {
	return design.value(row, int(column[0]-'A'))
}

func (design *Excel) sum(row int, column string, numbers []string) int {
	col := int(column[0] - 'A')
	var references [][2]int
	for _, number := range numbers {
		ends := strings.SplitN(number, ":", 2)
		first := excelCell(ends[0])
		if len(ends) == 1 {
			references = append(references, first)
			continue
		}
		last := excelCell(ends[1])
		for r := first[0]; r <= last[0]; r++ {
			for c := first[1]; c <= last[1]; c++ {
				references = append(references, [2]int{r, c})
			}
		}
	}
	design.formulas[row][col] = references
	return design.value(row, col)
}

// excelCell parses one "ColRow" token: a single column letter followed
// by the row number.
func excelCell(token string) [2]int {
	row, _ := strconv.Atoi(token[1:])
	return [2]int{row, int(token[0] - 'A')}
}

func (design *Excel) value(row int, col int) int {
	references := design.formulas[row][col]
	if len(references) == 0 {
		return design.values[row][col]
	}
	total := 0
	// Recursing into each reference is the whole update story: no
	// propagation, no cache, the chain recomputed on every get.
	for _, reference := range references {
		total += design.value(reference[0], reference[1])
	}
	return total
}
