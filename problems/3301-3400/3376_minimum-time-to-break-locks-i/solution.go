import (
	"math"
	"math/bits"
)

// Breaking lock i as the j-th lock (0-based) takes ceil(strength[i] /
// (1 + j*k)) minutes, because the sword banks 1 + j*k energy per minute.
// Which locks are already broken is all that matters, so a bitmask DP
// works: best[mask] is the minimum minutes to break exactly the locks in
// mask, and each unbroken lock i extends mask at the cost of one ceil
// division by the next slot's factor 1 + popcount*k. Every mask is finite
// before it is processed (its submasks come first), so MaxInt never
// overflows. n <= 8 keeps this at a few thousand moves.
func findMinimumTime(strength []int, k int) int {
	n := len(strength)
	best := make([]int, 1<<n)
	for i := range best {
		best[i] = math.MaxInt
	}
	best[0] = 0
	for mask := 0; mask < 1<<n; mask++ {
		factor := 1 + bits.OnesCount(uint(mask))*k
		for i := 0; i < n; i++ {
			if mask>>i&1 == 0 {
				if cost := best[mask] + (strength[i]+factor-1)/factor; cost < best[mask|1<<i] {
					best[mask|1<<i] = cost
				}
			}
		}
	}
	return best[len(best)-1]
}
