import "math/bits"

// Per-window number theory: only the 2-adic tier t = v2(value) and the
// odd part of each element matter — doubling bumps one element's tier by
// 1 and never touches odd parts, so a window's gcd is 2^M * g where
// g = gcd of odd parts and M is the promoted minimum tier.
func maxGCDScore(nums []int, k int) int64 {
	n := len(nums)
	odd := make([]int, n)
	tier := make([]int, n)
	for i, v := range nums {
		low := v & (-v)
		odd[i] = v / low
		tier[i] = bits.TrailingZeros(uint(low))
	}
	var p2 [34]int64
	p2[0] = 1
	for i := 1; i < 34; i++ {
		p2[i] = p2[i-1] * 2
	}
	var best int64
	for l := 0; l < n; l++ {
		g := 0
		var cnt [32]int
		m := 32
		for r := l; r < n; r++ {
			g = gcdOf(g, odd[r])
			t := tier[r]
			cnt[t]++
			if t < m {
				m = t
			}
			// Each element doubles at most once, so every element sits
			// at tier t or t+1: raising the minimum past m would need
			// the tier-m elements promoted twice — impossible. M is
			// m + 1 only when the budget covers every tier-m element.
			M := m
			if cnt[m] <= k {
				M = m + 1
			}
			score := int64(r-l+1) * p2[M] * int64(g)
			if score > best {
				best = score
			}
			// Windows further right from l: len <= n - l, g only drops,
			// M <= m + 1; stop once that bound can't beat best.
			if p2[m+1]*int64(g)*int64(n-l) <= best {
				break
			}
		}
	}
	return best
}

func gcdOf(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
