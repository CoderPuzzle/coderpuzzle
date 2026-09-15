import (
	"math/bits"
	"sort"
)

// A mask is feasible when m elements can each be raised, total increments
// within k, to a value carrying every mask bit; deciding bits from high to
// low and keeping every feasible bit yields the maximum AND. Values are at
// most 1e9 and k at most 1e9, so every raised value and the answer stay
// below 2^31; one element's cost can still approach 2^31 and the m-cost sum
// 5e4 of them (about 1.1e14), so costs and the sum are int64.
func maximumAND(nums []int, k int, m int) int {
	res := 0
	for b := 30; b >= 0; b-- {
		cand := res | 1<<uint(b)
		costs := make([]int64, len(nums))
		for i, num := range nums {
			missing := cand &^ num
			if missing == 0 {
				continue
			}
			// With h the highest missing bit, the cheapest target >= num
			// covering cand keeps num's bits above h, sets bit h, and
			// fills cand's bits below h.
			h := bits.Len(uint(missing)) - 1
			t := (num &^ ((1 << uint(h+1)) - 1)) | 1<<uint(h) | (cand & ((1 << uint(h)) - 1))
			costs[i] = int64(t - num)
		}
		// Raises on different indices are independent, so the m cheapest
		// per-element costs decide feasibility.
		sort.Slice(costs, func(a, b int) bool { return costs[a] < costs[b] })
		var sum int64
		for i := 0; i < m; i++ {
			sum += costs[i]
		}
		if sum <= int64(k) {
			res = cand
		}
	}
	return res
}
