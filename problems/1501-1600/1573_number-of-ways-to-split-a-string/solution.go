func numWays(s string) int {
	// A split into three equal-ones parts only exists when the total
	// number of '1's is a multiple of 3. With `total == 0` every
	// character is '0', so any pair of the n - 1 gaps between characters
	// is a valid pair of cut points: C(n - 1, 2) ways (accumulated as
	// int64 since n can reach 1e5). Otherwise, record the positions of
	// every '1'; the first cut may land anywhere between the k-th and
	// (k + 1)-th one (a run of trailing zeros widens that window), and
	// likewise the second cut between the 2k-th and (2k + 1)-th one. The
	// two windows never overlap, so the answer is the product of their
	// widths.
	const mod = 1_000_000_007
	n := len(s)
	onesIdx := make([]int, 0, n)
	for i := 0; i < n; i++ {
		if s[i] == '1' {
			onesIdx = append(onesIdx, i)
		}
	}
	total := len(onesIdx)
	if total%3 != 0 {
		return 0
	}
	if total == 0 {
		ways := int64(n-1) * int64(n-2) / 2
		return int(ways % mod)
	}
	k := total / 3
	left := int64(onesIdx[k] - onesIdx[k-1])
	right := int64(onesIdx[2*k] - onesIdx[2*k-1])
	return int((left * right) % mod)
}
