import "sort"

// Count each value's frequency, then sort a copy by a composite key:
// frequency ascending, value descending on ties.
func frequencySort(nums []int) []int {
	freq := make(map[int]int, len(nums))
	for _, value := range nums {
		freq[value]++
	}

	result := make([]int, len(nums))
	copy(result, nums)
	sort.Slice(result, func(i, j int) bool {
		fi, fj := freq[result[i]], freq[result[j]]
		if fi != fj {
			return fi < fj
		}
		return result[i] > result[j]
	})
	return result
}
