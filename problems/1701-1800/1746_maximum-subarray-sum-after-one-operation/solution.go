// dp0: best subarray sum ending here with no square; dp1: best with
// exactly one square. The answer is the largest dp1 over all ending
// positions. Sums stay below 2^31 - 1 (a subarray of at most 1e5
// elements with one square tops out near 1.1e9).
func maxSumAfterOperation(nums []int) int {
	dp0 := nums[0]
	dp1 := nums[0] * nums[0]
	answer := dp1
	for i := 1; i < len(nums); i++ {
		v := nums[i]
		nxt0 := v
		if dp0+v > nxt0 {
			nxt0 = dp0 + v
		}
		nxt1 := v * v
		if dp0+v*v > nxt1 {
			nxt1 = dp0 + v*v
		}
		if dp1+v > nxt1 {
			nxt1 = dp1 + v
		}
		dp0, dp1 = nxt0, nxt1
		if dp1 > answer {
			answer = dp1
		}
	}
	return answer
}
