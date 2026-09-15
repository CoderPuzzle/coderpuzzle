// left/right: longest run of equal consecutive differences ending at i /
// starting at i (a pair always counts as a run of 2). Every value is
// bounded by n <= 10^5, so int arithmetic is safe.
func longestArithmetic(nums []int) int {
	n := len(nums)
	left := make([]int, n)
	right := make([]int, n)
	for i := range left {
		left[i] = 1
		right[i] = 1
	}
	for i := 1; i < n; i++ {
		if i >= 2 && nums[i]-nums[i-1] == nums[i-1]-nums[i-2] {
			left[i] = left[i-1] + 1
		} else {
			left[i] = 2
		}
	}
	for i := n - 2; i >= 0; i-- {
		if i <= n-3 && nums[i+1]-nums[i] == nums[i+2]-nums[i+1] {
			right[i] = right[i+1] + 1
		} else {
			right[i] = 2
		}
	}
	best := 0
	for _, value := range left {
		if value > best {
			best = value
		}
	}
	// Replacing nums[p] either stops the subarray at p (extending the run
	// on one side) or spans p, gluing a left run to a right run whose
	// common difference is forced to (nums[p+1]-nums[p-1])/2.
	for p := 0; p < n; p++ {
		if p >= 1 {
			if cand := left[p-1] + 1; cand > best {
				best = cand
			}
		}
		if p <= n-2 {
			if cand := right[p+1] + 1; cand > best {
				best = cand
			}
		}
		if p >= 1 && p <= n-2 {
			diff := nums[p+1] - nums[p-1]
			if diff%2 == 0 {
				d := diff / 2
				leftLen := 1
				if p >= 2 && nums[p-1]-nums[p-2] == d {
					leftLen = left[p-1]
				}
				rightLen := 1
				if p <= n-3 && nums[p+2]-nums[p+1] == d {
					rightLen = right[p+1]
				}
				if cand := leftLen + rightLen + 1; cand > best {
					best = cand
				}
			}
		}
	}
	return best
}
