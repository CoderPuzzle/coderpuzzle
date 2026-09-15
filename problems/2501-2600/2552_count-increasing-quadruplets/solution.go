func countQuadruplets(nums []int) int64 {
	// For every pair j < k with nums[k] < nums[j], a quadruplet is any i < j
	// with nums[i] < nums[k] plus any l > k with nums[l] > nums[j]. Each j
	// rebuilds the less-than row and sweeps its window right-to-left
	// carrying the suffix-greater count. Answers reach C(4000,4) ~ 1.07e13,
	// beyond int range, so everything widens to int64.
	n := len(nums)
	var ans int64
	less := make([]int64, n+2)
	for j := 1; j <= n-3; j++ {
		for x := nums[j-1] + 1; x <= n; x++ {
			less[x]++
		}
		vj := nums[j]
		var tot int64
		var c int64
		for k := n - 1; k > j; k-- {
			uk := nums[k]
			if uk < vj {
				tot += less[uk] * c
			} else if uk > vj {
				c++
			}
		}
		ans += tot
	}
	return ans
}
