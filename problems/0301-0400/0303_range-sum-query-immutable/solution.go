package main

type NumArray struct {
	prefix []int64
}

func NewNumArrayTyped(nums []int) *NumArray {
	// prefix[i] = sum of the first i elements, with prefix[0] = 0 so
	// no query needs a special case for a left edge of zero. Held in
	// int64: prefix sums of 32-bit values.
	prefix := make([]int64, len(nums)+1)
	// One left-to-right pass; each entry extends the previous by one
	// element. The array is fixed, so summing happens once, not per
	// query.
	for index, value := range nums {
		prefix[index+1] = prefix[index] + int64(value)
	}
	return &NumArray{prefix: prefix}
}

func (design *NumArray) sumRange(left int, right int) int64 {
	// The elements before left cancel, telescoping the range sum
	// into a difference of two prefixes — O(1) per query.
	return design.prefix[right+1] - design.prefix[left]
}
