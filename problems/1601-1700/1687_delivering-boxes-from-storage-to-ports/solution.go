// Boxes are delivered in order, so every voyage carries a contiguous
// stretch boxes l+1..i and costs 2 + runs[i] - runs[l+1]: one trip per
// port change inside the stretch, plus the first port and the return to
// storage (runs counts port changes before each index). Pulling the
// i-dependent part out of dp[i]'s window minimum leaves key[l] =
// dp[l] - runs[l+1], so a monotonic queue of l values keyed by key
// answers each DP step in constant time while the weight and box limits
// slide the window forward.
func boxDelivering(boxes [][]int, portsCount int, maxBoxes int, maxWeight int) int {
	n := len(boxes)
	// running loaded weight reaches 10^5 * 10^5 = 10^10 — 64 bits
	weightPrefix := make([]int64, n+1)
	runs := make([]int, n+1)
	for i, box := range boxes {
		weightPrefix[i+1] = weightPrefix[i] + int64(box[1])
		if i > 0 && boxes[i-1][0] != box[0] {
			runs[i+1] = runs[i] + 1
		} else {
			runs[i+1] = runs[i]
		}
	}
	dp := make([]int, n+1)
	key := make([]int, n)       // key[l] = dp[l] - runs[l+1], the part of the cost l alone decides
	window := make([]int, 0, n) // candidate l values with strictly increasing keys
	head := 0
	lightest := 0 // smallest l whose loaded weight still fits maxWeight
	for i := 1; i <= n; i++ {
		fresh := i - 1
		key[fresh] = dp[fresh] - runs[i]
		for len(window) > head && key[window[len(window)-1]] >= key[fresh] {
			window = window[:len(window)-1]
		}
		window = append(window, fresh)
		// weights are positive, so this floor only moves forward
		for weightPrefix[i]-weightPrefix[lightest] > int64(maxWeight) {
			lightest++
		}
		low := lightest
		if i-maxBoxes > low {
			low = i - maxBoxes
		}
		for window[head] < low {
			head++
		}
		dp[i] = 2 + runs[i] + key[window[head]]
	}
	return dp[n]
}
