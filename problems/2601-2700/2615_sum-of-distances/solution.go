func distance(nums []int) []int64 {
	// Only equal values interact, so bucket indices by value; each bucket is
	// an independent 1-D problem over its sorted occurrence list.
	pos := make(map[int][]int)
	for i, x := range nums {
		pos[x] = append(pos[x], i)
	}
	arr := make([]int64, len(nums))
	for _, idxs := range pos {
		m := len(idxs)
		// Prefix sums of the occurrence indices turn every distance total
		// into O(1) arithmetic — vital since one value may dominate.
		prefix := make([]int64, m+1)
		for j, i := range idxs {
			prefix[j+1] = prefix[j] + int64(i)
		}
		for j, i := range idxs {
			// j earlier occurrences each at distance i - idx, then m - 1 - j
			// later ones each at distance idx - i:
			left := int64(i)*int64(j) - prefix[j]
			right := (prefix[m] - prefix[j+1]) - int64(i)*int64(m-1-j)
			arr[i] = left + right
		}
	}
	return arr
}
