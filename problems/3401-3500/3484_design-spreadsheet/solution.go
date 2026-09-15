package main

import (
	"strconv"
	"strings"
)

// A hash map from cell reference to its current value. Unset cells simply
// read as 0 through a defaulting lookup, and resetCell writes 0 rather
// than deleting, so every cell state lives in one place. getValue drops
// the leading '=', splits on '+', and classifies each operand by its
// first character: a capital letter means a cell reference, anything else
// is a non-negative integer literal.
type Spreadsheet struct {
	values map[string]int
}

func NewSpreadsheetTyped(rows int) *Spreadsheet {
	return &Spreadsheet{values: make(map[string]int)}
}

func (design *Spreadsheet) setCell(cell string, value int) {
	design.values[cell] = value
}

func (design *Spreadsheet) resetCell(cell string) {
	design.values[cell] = 0
}

func (design *Spreadsheet) getValue(formula string) int {
	total := 0
	for _, operand := range strings.Split(formula[1:], "+") {
		if operand[0] >= 'A' && operand[0] <= 'Z' {
			total += design.values[operand]
		} else {
			n, _ := strconv.Atoi(operand)
			total += n
		}
	}
	return total
}
