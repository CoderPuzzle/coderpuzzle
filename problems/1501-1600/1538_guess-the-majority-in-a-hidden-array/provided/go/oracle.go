package main

// Problem-provided oracle (ArrayReader), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the hidden binary array as a generic slice. The
// oracle enforces the problem's own 2n query budget itself, independent
// of whatever budget the harness supplies.
type ArrayReader struct {
	nums   []int
	budget int64
}

// NewArrayReader builds the oracle from the case's construction values
// (one generic slice of ints); the harness-supplied budget is ignored
// in favor of the problem's own 2n rule.
func NewArrayReader(construction []any, budget int64) *ArrayReader {
	items, ok := construction[0].([]any)
	if !ok {
		panic("ArrayReader values must be an array")
	}
	nums := make([]int, 0, len(items))
	for _, item := range items {
		value, ok := item.(int64)
		if !ok {
			panic("ArrayReader values must be integers")
		}
		nums = append(nums, int(value))
	}
	return &ArrayReader{nums: nums, budget: 2 * int64(len(nums))}
}

// Query reports how the four entries at a, b, c, d split: 4 when all
// four match, 2 for a 3-1 split, 0 for a 2-2 split.
func (reader *ArrayReader) Query(a, b, c, d int) int {
	if reader.budget <= 0 {
		panic("ArrayReader query budget exhausted")
	}
	reader.budget--
	ones := reader.nums[a] + reader.nums[b] + reader.nums[c] + reader.nums[d]
	if ones == 0 || ones == 4 {
		return 4
	}
	if ones == 1 || ones == 3 {
		return 2
	}
	return 0
}

// Length returns the size of the hidden array; it costs nothing.
func (reader *ArrayReader) Length() int {
	return len(reader.nums)
}
