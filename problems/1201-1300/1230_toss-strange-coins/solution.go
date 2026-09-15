// fpAdd adds two float64s without letting the compiler fuse the surrounding
// multiplications into an FMA (which would round differently from the
// two-rounding reference arithmetic).
//
//go:noinline
func fpAdd(a, b float64) float64 { return a + b }

func probabilityOfHeads(prob []float64, target int) float64 {
	// dp[c] = probability of exactly c heads among the coins so far; zero
	// heads is certain before any toss.
	dp := make([]float64, target+1)
	dp[0] = 1.0
	for _, p := range prob {
		// Each coin shifts probability between adjacent counts: the tails
		// branch keeps c, the heads branch arrives from c-1. Descending keeps
		// dp[c-1] at the previous coin's value (upward would let one coin
		// contribute two heads).
		for c := target; c > 0; c-- {
			dp[c] = fpAdd(dp[c]*(1-p), dp[c-1]*p)
		}
		// Zero heads can only be reached by another tail.
		dp[0] *= 1 - p
	}
	// Counts above target are never stored; dp[target] is exact.
	return dp[target]
}
