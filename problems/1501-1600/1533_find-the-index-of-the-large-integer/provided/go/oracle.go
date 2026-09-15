package main

// Problem-provided oracle (ArrayReader), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the hidden array as generic values, then the
// query budget.
type ArrayReader struct {
	values []int64
	budget int64
}

// NewArrayReader builds the oracle from the case's construction values
// (the array as one generic slice) and the query budget.
func NewArrayReader(construction []any, budget int64) *ArrayReader {
	raw, ok := construction[0].([]any)
	if !ok {
		panic("ArrayReader arr must be an array")
	}
	values := make([]int64, 0, len(raw))
	for _, entry := range raw {
		value, ok := entry.(int64)
		if !ok {
			panic("ArrayReader entries must be integers")
		}
		values = append(values, value)
	}
	return &ArrayReader{values: values, budget: budget}
}

// CompareSub compares the sum of values[l..r] with the sum of
// values[x..y]: 1 if the first is larger, -1 if smaller, 0 if equal.
func (reader *ArrayReader) CompareSub(l int, r int, x int, y int) int {
	if reader.budget <= 0 {
		panic("ArrayReader query budget exhausted")
	}
	reader.budget--
	var left int64
	for i := l; i <= r; i++ {
		left += reader.values[i]
	}
	var right int64
	for i := x; i <= y; i++ {
		right += reader.values[i]
	}
	if left > right {
		return 1
	}
	if left < right {
		return -1
	}
	return 0
}

// Length returns the size of the array.
func (reader *ArrayReader) Length() int {
	return len(reader.values)
}
