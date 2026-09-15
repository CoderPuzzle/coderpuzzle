// countKSubsequencesWithMaxBeauty walks the equal-frequency groups of s
// after an in-place sort: whole groups are taken until one gets split, then
// C(group, take) * freq^take closes the count.
func countKSubsequencesWithMaxBeauty(s string, k int) int {
	const mod = 1000000007

	// f(c) per letter; letters absent from s drop out of the pool.
	var freq [26]int
	for _, ch := range s {
		freq[ch-'a']++
	}
	counts := make([]int, 0, 26)
	for f := 0; f < 26; f++ {
		if freq[f] > 0 {
			counts = append(counts, freq[f])
		}
	}
	for a := range counts {
		for b := a + 1; b < len(counts); b++ {
			if counts[b] > counts[a] {
				counts[a], counts[b] = counts[b], counts[a]
			}
		}
	}
	// Fewer than k distinct characters: no k-subsequence exists at all.
	if k > len(counts) {
		return 0
	}

	ans, rem := 1, k
	i := 0
	for rem > 0 {
		j := i
		for j < len(counts) && counts[j] == counts[i] {
			j++
		}
		take := rem
		if j-i < take {
			take = j - i
		}
		ans = ans * comb(j-i, take) % mod
		ans = ans * powMod(counts[i], take, mod) % mod
		rem -= take
		i = j
	}
	return ans
}

// Exact: groups hold at most the 26 letters, so n <= 26 and the running
// value never exceeds C(26, 13) = 10400600.
func comb(n, r int) int {
	if r > n-r {
		r = n - r
	}
	out := 1
	for t := 1; t <= r; t++ {
		out = out * (n - r + t) / t
	}
	return out
}

func powMod(x, e, m int) int {
	out := 1
	for e > 0 {
		if e&1 == 1 {
			out = out * x % m
		}
		x = x * x % m
		e >>= 1
	}
	return out
}
