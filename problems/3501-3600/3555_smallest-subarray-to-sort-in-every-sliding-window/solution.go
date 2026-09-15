import "math"

func minSubarraySort(nums []int, k int) []int {
	// Per window (hint 2): the segment to sort ends at the last element
	// smaller than the running max before it, and starts at the first
	// element larger than the running min after it. A sorted window sets
	// neither boundary, so its answer is 0.
	n := len(nums)
	res := make([]int, n-k+1)
	for s := 0; s+k <= n; s++ {
		e := s + k
		right, mx := -1, 0
		for i := s; i < e; i++ {
			if nums[i] < mx {
				right = i
			} else {
				mx = nums[i]
			}
		}
		if right == -1 {
			res[s] = 0
			continue
		}
		left, mn := 0, math.MaxInt
		for i := e - 1; i >= s; i-- {
			if nums[i] > mn {
				left = i
			} else {
				mn = nums[i]
			}
		}
		res[s] = right - left + 1
	}
	return res
}
