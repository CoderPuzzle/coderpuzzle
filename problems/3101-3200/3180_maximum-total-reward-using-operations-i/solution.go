import "sort"

func maxTotalReward(rewardValues []int) int {
	// Every legal play takes its rewards in strictly increasing value
	// order — the next value must exceed a running total that already
	// contains everything taken before it — and two copies of the same
	// value can never both be used. So after sorting, reachable[t]
	// tracks achievable totals: value v extends exactly from totals
	// t < v, scanned descending so each copy is used at most once.
	// Totals stay below 2 * max <= 4000 because the last pick exceeds
	// everything collected before it.
	vals := append([]int(nil), rewardValues...)
	sort.Ints(vals)
	cap := 2 * vals[len(vals)-1]
	reachable := make([]bool, cap+1)
	reachable[0] = true
	best := 0
	for _, v := range vals {
		top := min(best, v-1)
		for t := top; t >= 0; t-- {
			if !reachable[t] {
				continue
			}
			reachable[t+v] = true
			best = max(best, t+v)
		}
	}
	return best
}
