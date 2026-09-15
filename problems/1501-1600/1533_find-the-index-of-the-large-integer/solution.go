package main

type Solution struct{}

func (solution *Solution) getIndex(reader *ArrayReader) int {
	// Divide and conquer: compare two equal-length halves of the current
	// range and recurse into whichever sums higher — the large entry
	// inflates exactly one side. An odd-length range peels off its
	// middle element first; a tied comparison of the remaining
	// equal-length halves means that peeled element is the large one.
	return solveGetIndex(reader, 0, reader.Length()-1)
}

func solveGetIndex(reader *ArrayReader, l int, r int) int {
	if l == r {
		return l
	}
	length := r - l + 1
	mid := (l + r) / 2
	if length%2 == 0 {
		cmp := reader.CompareSub(l, mid, mid+1, r)
		if cmp > 0 {
			return solveGetIndex(reader, l, mid)
		}
		return solveGetIndex(reader, mid+1, r)
	}
	cmp := reader.CompareSub(l, mid-1, mid+1, r)
	if cmp == 0 {
		return mid
	}
	if cmp > 0 {
		return solveGetIndex(reader, l, mid-1)
	}
	return solveGetIndex(reader, mid+1, r)
}
