// lengths[i] / counts[i]: the longest strictly increasing subsequence
// ending at i, and how many of that length end there. A longer predecessor
// (nums[j] < nums[i]) resets the count to counts[j], an equally long one
// adds to it, so each i finishes with the total over its best arrivals.
// Only the returned answer is promised to fit 32 bits - counts below the
// maximum can stand far higher - so the counts are int64.
func findNumberOfLIS(nums []int) int {
	n := len(nums)
	lengths := make([]int, n)
	counts := make([]int64, n)
	best, answer := 0, int64(0)
	for i := range nums {
		x := nums[i]
		lengths[i], counts[i] = 1, 1
		for j := 0; j < i; j++ {
			if nums[j] < x {
				candidate := lengths[j] + 1
				if candidate > lengths[i] {
					lengths[i] = candidate
					counts[i] = counts[j]
				} else if candidate == lengths[i] {
					counts[i] += counts[j]
				}
			}
		}
		if lengths[i] > best {
			best, answer = lengths[i], counts[i]
		} else if lengths[i] == best {
			answer += counts[i]
		}
	}
	return int(answer)
}
