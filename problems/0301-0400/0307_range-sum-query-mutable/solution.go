package main

type NumArray struct {
	n    int
	nums []int
	tree []int64
}

func NewNumArrayTyped(nums []int) *NumArray {
	n := len(nums)
	// Fenwick tree, 1-based: slot i holds the sum of the block of
	// length i & -i ending at i. Slot 0 stays unused so low-bit walks
	// terminate. Held in int64: prefix sums of 32-bit values.
	tree := make([]int64, n+1)
	design := &NumArray{n: n, nums: append([]int(nil), nums...), tree: tree}
	// O(n) build: once a block sum is finished, push it straight into
	// its parent's slot — one pass instead of n updates.
	for index := 1; index <= n; index++ {
		tree[index] += int64(design.nums[index-1])
		parent := index + (index & -index)
		if parent <= n {
			tree[parent] += tree[index]
		}
	}
	return design
}

func (design *NumArray) update(index int, value int) {
	// Only the delta is applied; nums keeps current values so the next
	// delta is computed correctly.
	delta := int64(value - design.nums[index])
	design.nums[index] = value
	// Climb by the low bit to visit every block containing this cell.
	for position := index + 1; position <= design.n; position += position & -position {
		design.tree[position] += delta
	}
}

func (design *NumArray) sumRange(left int, right int) int64 {
	// A range sum is the difference of two prefix sums.
	return design.prefix(right+1) - design.prefix(left)
}

func (design *NumArray) prefix(count int) int64 {
	var total int64
	// Each step lands on a disjoint block whose union is exactly the
	// first `count` elements — O(log n) of them.
	for count > 0 {
		total += design.tree[count]
		count -= count & -count
	}
	return total
}
