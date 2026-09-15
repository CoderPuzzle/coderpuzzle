import "sort"

func minCost(nums []int, cost []int) int64 {
	n := len(nums)
	type pair struct {
		num  int64
		cost int64
	}
	pairs := make([]pair, n)
	for i := 0; i < n; i++ {
		pairs[i] = pair{int64(nums[i]), int64(cost[i])}
	}
	sort.Slice(pairs, func(a, b int) bool {
		return pairs[a].num < pairs[b].num
	})
	// The cost sum(|nums[i]-t|*cost[i]) is convex piecewise-linear in t;
	// its slope flips where cumulative cost crosses half the total, so
	// the optimum is the weighted median.
	total := int64(0)
	for _, p := range pairs {
		total += p.cost
	}
	target := (total + 1) / 2
	prefix := int64(0)
	median := pairs[n-1].num
	// Walk sorted values until the prefix weight reaches ceil(total/2);
	// >= with the +1 picks the lower median on an even split (same cost).
	for _, p := range pairs {
		prefix += p.cost
		if prefix >= target {
			median = p.num
			break
		}
	}
	// Evaluate the convex cost at the median; it lies at a breakpoint (an
	// existing value), so restricting to nums values loses nothing.
	ans := int64(0)
	for _, p := range pairs {
		d := p.num - median
		if d < 0 {
			d = -d
		}
		ans += d * p.cost
	}
	return ans
}
