func minimumSum(n int, k int) int {
	below := n
	if k/2 < below {
		below = k / 2
	}
	above := n - below
	return below*(below+1)/2 + above*k + above*(above-1)/2
}
