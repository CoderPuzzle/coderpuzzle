func maxCoins(nums []int) int {
	// Pad with virtual 1s so bursts at the boundary need no special casing.
	padded := make([]int64, len(nums)+2)
	padded[0] = 1
	for i, v := range nums {
		padded[i+1] = int64(v)
	}
	padded[len(padded)-1] = 1
	m := len(padded)
	dp := make([][]int64, m)
	for i := range dp {
		dp[i] = make([]int64, m)
	}
	// Fill by increasing interval length so both subintervals of a cell
	// are already solved when it is needed.
	for length := 1; length < m-1; length++ {
		for left := 1; left < m-length; left++ {
			right := left + length - 1
			// Try each k as the LAST burst in the open interval (left, right):
			// at that moment its neighbors are the fixed boundaries.
			for k := left; k <= right; k++ {
				coins := padded[left-1]*padded[k]*padded[right+1] +
					dp[left][k-1] + dp[k+1][right]
				if coins > dp[left][right] {
					dp[left][right] = coins
				}
			}
		}
	}
	// Everything strictly between the two padding 1s.
	return int(dp[1][m-2])
}
