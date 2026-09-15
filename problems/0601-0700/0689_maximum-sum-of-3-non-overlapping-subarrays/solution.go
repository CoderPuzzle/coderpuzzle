// Fixed length k reduces the search to picking starts: window[s] is the sum
// of nums[s..s+k), and an answer is a triple (i, j, l) with i+k <= j and
// j+k <= l maximizing window[i]+window[j]+window[l]. left[s] tracks the
// largest window over starts [0..s], kept at the SMALLEST index on ties, and
// right[s] the same over [s..m-1] — each middle j therefore pairs with the
// lexicographically best flanks available to it.
func maxSumOfThreeSubarrays(nums []int, k int) []int {
	n := len(nums)
	m := n - k + 1
	window := make([]int, m)
	total := 0
	for _, v := range nums[:k] {
		total += v
	}
	window[0] = total
	for s := 1; s < m; s++ {
		total += nums[s+k-1] - nums[s-1]
		window[s] = total
	}
	left := make([]int, m)
	for s := 1; s < m; s++ {
		if window[left[s-1]] >= window[s] {
			left[s] = left[s-1]
		} else {
			left[s] = s
		}
	}
	right := make([]int, m)
	right[m-1] = m - 1
	for s := m - 2; s >= 0; s-- {
		if window[s] >= window[right[s+1]] {
			right[s] = s
		} else {
			right[s] = right[s+1]
		}
	}
	// Strict improvement only, so the FIRST middle achieving the maximum
	// survives the sweep — which is the lexicographic rule: with j fixed the
	// flanks are independent, and mixing a smaller flank into a smaller
	// middle only ever produces a lexicographically smaller optimum, so the
	// global answer sits at the minimal middle. Every window sum is at least
	// k, so -1 sits below any real total.
	bestTotal := -1
	best := make([]int, 3)
	for j := k; j <= n-2*k; j++ {
		i, l := left[j-k], right[j+k]
		total := window[i] + window[j] + window[l]
		if total > bestTotal {
			bestTotal = total
			best[0], best[1], best[2] = i, j, l
		}
	}
	return best
}
