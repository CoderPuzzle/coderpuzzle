package main

// Problem-provided oracle (ArrayReader), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden values as generic values,
// then the query budget.
type ArrayReader struct {
	values []int
	budget int64
}

// NewArrayReader builds the oracle from the case's construction
// values (one generic slice of ints) and the query budget.
func NewArrayReader(construction []any, budget int64) *ArrayReader {
	items, ok := construction[0].([]any)
	if !ok {
		panic("ArrayReader values must be an array")
	}
	values := make([]int, 0, len(items))
	for _, item := range items {
		value, ok := item.(int64)
		if !ok {
			panic("ArrayReader values must be integers")
		}
		values = append(values, int(value))
	}
	return &ArrayReader{values: values, budget: budget}
}

// Get returns the value at index, or the out-of-range sentinel 2^31-1.
func (reader *ArrayReader) Get(index int) int {
	if reader.budget <= 0 {
		panic("ArrayReader query budget exhausted")
	}
	reader.budget--
	if index >= 0 && index < len(reader.values) {
		return reader.values[index]
	}
	return 2147483647
}
