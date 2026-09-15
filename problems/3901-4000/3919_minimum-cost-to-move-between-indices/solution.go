func minCost(nums []int, queries [][]int) []int {
	n := len(nums)
	forward := make([]int, max(n-1, 0))
	backward := make([]int, max(n-1, 0))

	for i := 0; i < n; i++ {
		closest := 0
		if i == 0 {
			closest = 1
		} else if i == n-1 {
			closest = n - 2
		} else {
			left := nums[i] - nums[i-1]
			right := nums[i+1] - nums[i]
			if left <= right {
				closest = i - 1
			} else {
				closest = i + 1
			}
		}
		if i > 0 {
			if closest == i-1 {
				backward[i-1] = 1
			} else {
				backward[i-1] = nums[i] - nums[i-1]
			}
		}
		if i < n-1 {
			if closest == i+1 {
				forward[i] = 1
			} else {
				forward[i] = nums[i+1] - nums[i]
			}
		}
	}

	prefixForward := make([]int64, n)
	prefixBackward := make([]int64, n)
	for i := 1; i < n; i++ {
		prefixForward[i] = prefixForward[i-1] + int64(forward[i-1])
		prefixBackward[i] = prefixBackward[i-1] + int64(backward[i-1])
	}

	answer := make([]int, len(queries))
	for i, query := range queries {
		left, right := query[0], query[1]
		if left <= right {
			answer[i] = int(prefixForward[right] - prefixForward[left])
		} else {
			answer[i] = int(prefixBackward[left] - prefixBackward[right])
		}
	}
	return answer
}
