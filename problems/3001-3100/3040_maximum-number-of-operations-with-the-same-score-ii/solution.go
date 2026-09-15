func maxOperations(nums []int) int {
	n := len(nums)
	candidates := []int{nums[0] + nums[1], nums[n-1] + nums[n-2], nums[0] + nums[n-1]}
	best := 0
	for _, score := range candidates {
		if v := maxForScore(nums, score); v > best {
			best = v
		}
	}
	return best
}

// dp[l][r] = max deletions inside nums[l..r] achieving `score`
func maxForScore(nums []int, score int) int {
	n := len(nums)
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for length := 2; length <= n; length++ {
		for l := 0; l+length <= n; l++ {
			r := l + length - 1
			best := 0
			if nums[l]+nums[l+1] == score {
				sub := 0
				if l+2 <= r {
					sub = dp[l+2][r]
				}
				if 1+sub > best {
					best = 1 + sub
				}
			}
			if nums[r]+nums[r-1] == score {
				sub := 0
				if l+2 <= r {
					sub = dp[l][r-2]
				}
				if 1+sub > best {
					best = 1 + sub
				}
			}
			if nums[l]+nums[r] == score {
				sub := 0
				if l+2 <= r {
					sub = dp[l+1][r-1]
				}
				if 1+sub > best {
					best = 1 + sub
				}
			}
			dp[l][r] = best
		}
	}
	return dp[0][n-1]
}
