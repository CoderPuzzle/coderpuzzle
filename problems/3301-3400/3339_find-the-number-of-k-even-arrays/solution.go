func countOfArrays(n int, m int, k int) int {
	// (arr[i] * arr[i+1]) - arr[i] - arr[i+1] = (arr[i]-1) *
	// (arr[i+1]-1) - 1, which is even exactly when BOTH neighbors are
	// even — so k-even means exactly k adjacent pairs have both elements
	// even. With E = m/2 (floor) even values and O = m - E odd values,
	// track per length i, for each pair count j, how many arrays end in
	// an even value and how many end in an odd one. Extending by an even
	// value (E choices) lifts an even-ending j-1-pair state to j pairs
	// and leaves odd-ending states in place; extending by an odd value
	// (O choices) never changes the count. Entries stay below MOD, so
	// every join multiplies a value below 2 * MOD by at most 500 — about
	// 10^12, kept in int64.
	const MOD = 1000000007
	even := int64(m / 2)
	odd := int64(m - m/2)
	endEven := make([]int64, n)
	endOdd := make([]int64, n)
	endEven[0] = even
	endOdd[0] = odd
	for length := 1; length < n; length++ {
		nextEven := make([]int64, n)
		nextOdd := make([]int64, n)
		for j := 0; j < n; j++ {
			prev := int64(0)
			if j > 0 {
				prev = endEven[j-1]
			}
			nextEven[j] = (prev + endOdd[j]) * even % MOD
			nextOdd[j] = (endEven[j] + endOdd[j]) * odd % MOD
		}
		endEven = nextEven
		endOdd = nextOdd
	}
	return int((endEven[k] + endOdd[k]) % MOD)
}
