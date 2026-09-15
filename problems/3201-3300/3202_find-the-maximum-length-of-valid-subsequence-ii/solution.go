func maximumLength(nums []int, k int) int {
	// A valid subsequence's adjacent sums share one unknown residue, so
	// try each candidate val in [0, k). While streaming nums under a
	// fixed val, dp[r] is the best chain whose last element is r mod k;
	// appending an element of residue r needs a previous element at
	// residue (val - r) % k, and a lone element always restarts a chain.
	// The double % keeps the remainder non-negative; n and k stay at
	// 10^3, well inside int everywhere.
	residues := make([]int, len(nums))
	for i, value := range nums {
		residues[i] = ((value % k) + k) % k
	}
	best := 0
	for val := 0; val < k; val++ {
		dp := make([]int, k)
		for _, r := range residues {
			prev := dp[((val-r)%k+k)%k]
			length := prev + 1
			if prev < 1 {
				length = 1
			}
			if length > dp[r] {
				dp[r] = length
				if length > best {
					best = length
				}
			}
		}
	}
	return best
}
