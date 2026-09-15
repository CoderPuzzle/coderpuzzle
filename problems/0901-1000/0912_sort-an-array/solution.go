// Bottom-up merge sort: no recursion and no library sort. A pass at width w
// merges every pair of adjacent sorted runs of length w from source into
// buffer, doubling the sorted-run length each pass; after ceil(log2 n) passes
// the whole array is one sorted run. The merge takes from the left run on
// ties, so equal values keep their relative order — the sort is stable.
func sortArray(nums []int) []int {
	n := len(nums)
	source := make([]int, n)
	copy(source, nums)
	buffer := make([]int, n)
	for width := 1; width < n; width *= 2 {
		for start := 0; start < n; start += width * 2 {
			middle := start + width
			if middle > n {
				middle = n
			}
			end := start + width*2
			if end > n {
				end = n
			}
			i, j, k := start, middle, start
			for i < middle && j < end {
				if source[j] < source[i] {
					buffer[k] = source[j]
					j++
				} else {
					buffer[k] = source[i]
					i++
				}
				k++
			}
			for i < middle {
				buffer[k] = source[i]
				i++
				k++
			}
			for j < end {
				buffer[k] = source[j]
				j++
				k++
			}
		}
		source, buffer = buffer, source
	}
	return source
}
