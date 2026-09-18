package main

// Problem-provided oracle (MountainArray), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the sequence's values as generic
// values, then the query budget.
type MountainArray struct {
	values []int
	budget int64
}

// NewMountainArray builds the oracle from the case's construction
// values (one generic slice of ints) and the query budget.
func NewMountainArray(construction []any, budget int64) *MountainArray {
	items, ok := construction[0].([]any)
	if !ok {
		panic("MountainArray values must be an array")
	}
	values := make([]int, 0, len(items))
	for _, item := range items {
		value, ok := item.(int64)
		if !ok {
			panic("MountainArray values must be integers")
		}
		values = append(values, int(value))
	}
	return &MountainArray{values: values, budget: budget}
}

// Get returns the value at index, spending one unit of query budget.
func (reader *MountainArray) Get(index int) int {
	if reader.budget <= 0 {
		panic("MountainArray query budget exhausted")
	}
	reader.budget--
	if index < 0 || index >= len(reader.values) {
		panic("MountainArray index out of range")
	}
	return reader.values[index]
}

// Length returns the sequence's length, free of charge.
func (reader *MountainArray) Length() int {
	return len(reader.values)
}
