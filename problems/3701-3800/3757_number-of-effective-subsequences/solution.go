// A removal strictly decreases the OR exactly when it takes away every
// element carrying at least one set bit of the total. For a non-empty bit
// set S, the subsequences removing all occurrences of every bit in S are
// counted by 2^free(S), where free(S) is the number of elements carrying no
// bit of S (they alone are optional). Inclusion-exclusion over S turns
// those counts into the number of subsequences killing at least one bit.
func countEffective(nums []int) int {
	const mod = 1_000_000_007
	n := len(nums)
	total := 0
	for _, x := range nums {
		total |= x
	}
	// At most 20 bits live under 1e6; compress them to low positions.
	var bits []int
	for b := 0; b < 20; b++ {
		if total>>b&1 != 0 {
			bits = append(bits, b)
		}
	}
	k := len(bits)
	full := (1 << k) - 1
	// g[m] = how many elements compress to mask m; then h[m] = how many
	// compress to a SUBSET of m, so h[full ^ S] = free(S). Standard
	// sum-over-subsets: push each count down to its submasks. All values
	// stay inside int64 range under the modulus.
	h := make([]int64, 1<<k)
	for _, x := range nums {
		m := 0
		for i, b := range bits {
			if x>>b&1 != 0 {
				m |= 1 << i
			}
		}
		h[m]++
	}
	for b := 0; b < k; b++ {
		bit := 1 << b
		step := bit << 1
		for base := 0; base < 1<<k; base += step {
			for i := base; i < base+bit; i++ {
				h[i+bit] = (h[i+bit] + h[i]) % mod
			}
		}
	}
	pw := make([]int64, n+1)
	pw[0] = 1
	for i := 1; i <= n; i++ {
		pw[i] = pw[i-1] * 2 % mod
	}
	ans := int64(0)
	for S := 1; S < 1<<k; S++ {
		term := pw[h[full^S]]
		if popcount(S)%2 == 0 {
			term = mod - term
		}
		ans = (ans + term) % mod
	}
	return int(ans % mod)
}

func popcount(x int) int {
	count := 0
	for x != 0 {
		x &= x - 1
		count++
	}
	return count
}
