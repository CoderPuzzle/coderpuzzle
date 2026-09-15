// Prefix sums over both road sets. Forward distance a -> b walks forward[a..],
// backward distance a -> b walks backward[a], backward[a-1], ..., i.e. the
// descending edge weights. Each move takes the cheaper of the two directions.
// Totals reach 1e5 moves x 1e10 meters, far past 32 bits.
func minTotalTime(forward []int, backward []int, queries []int) int64 {
	n := len(forward)
	f := make([]int64, n+1)
	b := make([]int64, n+1)
	for i := 0; i < n; i++ {
		f[i+1] = f[i] + int64(forward[i])
		b[i+1] = b[i] + int64(backward[i])
	}
	tf, tb := f[n], b[n]
	var ans int64
	prev := 0
	for _, q := range queries {
		var fwd, bwd int64
		if prev < q {
			fwd = f[q] - f[prev]
		} else {
			fwd = tf - f[prev] + f[q]
		}
		if prev > q {
			// spends backward[prev], ..., backward[q+1]
			bwd = b[prev+1] - b[q+1]
		} else {
			bwd = b[prev+1] + tb - b[q+1]
		}
		if bwd < fwd {
			fwd = bwd
		}
		ans += fwd
		prev = q
	}
	return ans
}
