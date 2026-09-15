package main

// Problem-provided oracle (BigArray), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the maximal blocks of the hidden array as one
// generic slice of [value, count] pairs, then the query budget.
// Positions are 64-bit throughout.
type BigArray struct {
	values []int64
	starts []int64
	total  int64
	budget int64
}

// NewBigArray builds the oracle from the case's construction values (the
// maximal blocks as one generic slice) and the query budget.
func NewBigArray(construction []any, budget int64) *BigArray {
	raw, ok := construction[0].([]any)
	if !ok {
		panic("BigArray blocks must be an array")
	}
	array := &BigArray{budget: budget}
	var offset int64
	var previous int64
	for position, entry := range raw {
		pair, ok := entry.([]any)
		if !ok || len(pair) != 2 {
			panic("BigArray blocks must be [value, count] pairs")
		}
		value, ok1 := pair[0].(int64)
		count, ok2 := pair[1].(int64)
		if !ok1 || !ok2 {
			panic("BigArray block entries must be integers")
		}
		if position > 0 && value == previous {
			panic("BigArray blocks must alternate values")
		}
		array.values = append(array.values, value)
		array.starts = append(array.starts, offset)
		offset += count
		previous = value
	}
	array.total = offset
	return array
}

// At returns the value at the given 64-bit position.
func (array *BigArray) At(index int64) int {
	if array.budget <= 0 {
		panic("BigArray query budget exhausted")
	}
	array.budget--
	lo, hi := 0, len(array.starts)-1
	run := 0
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if array.starts[mid] <= index {
			run = mid
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return int(array.values[run])
}

// Size returns the 64-bit array length.
func (array *BigArray) Size() int64 {
	return array.total
}
