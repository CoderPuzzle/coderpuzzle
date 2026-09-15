func maxAlternatingSum(nums []int) int64 {
	// Two running optima over subsequences of the prefix: `even` is the best
	// alternating sum whose last picked element sits at an even reindexed
	// position, `odd` the best with one extra odd-position element, so each
	// new element costs two O(1) transitions.
	even, odd := int64(0), int64(0)
	for _, x := range nums {
		nextEven := max(even, odd+int64(x))
		nextOdd := max(odd, even-int64(x))
		even, odd = nextEven, nextOdd
	}
	return even
}
