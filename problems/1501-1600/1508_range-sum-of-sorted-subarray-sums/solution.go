import "sort"

const mod = 1_000_000_007

// Every subarray sum, generated with a running total per start index so
// each end index adds O(1) work instead of re-summing nums[i..j].
func rangeSum(nums []int, n int, left int, right int) int {
	sums := make([]int, 0, n*(n+1)/2)
	for i := 0; i < n; i++ {
		running := 0
		for j := i; j < n; j++ {
			running += nums[j]
			sums = append(sums, running)
		}
	}
	sort.Ints(sums)
	// 1-indexed [left, right] window, accumulated in a 64-bit total and
	// reduced modulo 1e9 + 7 — the raw sum can exceed a 32-bit accumulator
	// even though no single subarray sum does.
	var answer int64 = 0
	for k := left - 1; k < right; k++ {
		answer = (answer + int64(sums[k])) % mod
	}
	return int(answer)
}
