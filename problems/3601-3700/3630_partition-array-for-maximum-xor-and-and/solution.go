import "math/bits"

// Enumerate the AND-subset B over all 2^n masks. Two subset tables give
// AND(B) (all-ones identity, read as 0 for the empty subset per the
// statement) and XOR(B). With s = XOR of the pool (indices outside B),
// the best A/C split maximizes x + (s ^ x) over subset XORs x of the
// pool, and x + (s ^ x) = s + 2 * (x & ~s), so a linear basis over the
// pool values masked with ~s answers it greedily from the top bit. The
// bound and(B) + s + 2 * (~s & MASK) prunes most subsets once the
// incumbent is strong. Sums reach ~3.2e9, so int64 accumulation.
func maximizeXorAndXor(nums []int) int64 {
	n := len(nums)
	size := 1 << n
	full := (1 << 30) - 1
	andDp := make([]int, size)
	andDp[0] = full // AND identity; the empty subset reads as 0 below
	xorDp := make([]int, size)
	for subset := 1; subset < size; subset++ {
		low := subset & -subset
		j := bits.TrailingZeros(uint(low))
		andDp[subset] = andDp[subset^low] & nums[j]
		xorDp[subset] = xorDp[subset^low] ^ nums[j]
	}
	var best int64
	var basis [30]int
	for b := 0; b < size; b++ {
		s := xorDp[size-1] ^ xorDp[b]
		t := ^s & full
		var andB int64
		if b != 0 {
			andB = int64(andDp[b])
		}
		if andB+int64(s)+2*int64(t) <= best {
			continue
		}
		inv := ^s
		for i := range basis {
			basis[i] = 0
		}
		for j := 0; j < n; j++ {
			if b>>j&1 != 0 {
				continue
			}
			w := nums[j] & inv
			for w != 0 {
				p := bits.Len(uint(w)) - 1
				top := basis[p]
				if top != 0 {
					w ^= top
				} else {
					basis[p] = w
					break
				}
			}
		}
		var x int
		for p := 29; p >= 0; p-- {
			if basis[p] != 0 && x>>p&1 == 0 {
				x ^= basis[p]
			}
		}
		if val := andB + int64(s) + 2*int64(x); val > best {
			best = val
		}
	}
	return best
}
