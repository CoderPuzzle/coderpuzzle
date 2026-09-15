import "sort"

// Frequency map plus one scan past the smallest value: if any valid pair
// exists, its x is always the smallest distinct value, so only y is searched.
func minDistinctFreqPair(nums []int) []int {
	// Values and frequencies are at most 100, so int arithmetic carries
	// everything without overflow.
	freq := map[int]int{}
	for _, x := range nums {
		freq[x]++
	}
	values := make([]int, 0, len(freq))
	for v := range freq {
		values = append(values, v)
	}
	sort.Ints(values)
	// If every larger value shared freq[values[0]], all of nums would
	// share one frequency and no pair could differ — so the first value
	// with a different frequency is the smallest qualifying y.
	x := values[0]
	for _, y := range values {
		if y > x && freq[y] != freq[x] {
			return []int{x, y}
		}
	}
	return []int{-1, -1}
}
