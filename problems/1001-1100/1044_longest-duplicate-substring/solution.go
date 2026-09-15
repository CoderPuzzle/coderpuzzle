func longestDupSubstring(s string) string {
	n := len(s)
	a := make([]int64, n)
	for i := 0; i < n; i++ {
		a[i] = int64(s[i] - 'a')
	}
	const MOD1 = 1000000007
	const MOD2 = 1000000009
	const BASE = 26

	// Precomputed base powers so each rolling-hash slide costs O(1).
	pow1 := make([]int64, n+1)
	pow2 := make([]int64, n+1)
	pow1[0] = 1
	pow2[0] = 1
	for i := 1; i <= n; i++ {
		pow1[i] = pow1[i-1] * BASE % MOD1
		pow2[i] = pow2[i-1] * BASE % MOD2
	}

	keyOf := func(x, y int64) int64 { return x*(MOD2+7) + y }

	// Returns a start index of some length-`length` duplicate, else -1.
	check := func(length int) int {
		if length == 0 {
			return -1
		}
		var h1, h2 int64
		for i := 0; i < length; i++ {
			h1 = (h1*BASE + a[i]) % MOD1
			h2 = (h2*BASE + a[i]) % MOD2
		}
		seen := make(map[int64][]int)
		seen[keyOf(h1, h2)] = []int{0}
		for i := 1; i+length <= n; i++ {
			// Roll: drop the leftmost character's contribution, append the
			// incoming one.
			t1 := (h1 - a[i-1]*pow1[length-1]) % MOD1
			if t1 < 0 {
				t1 += MOD1
			}
			h1 = (t1*BASE + a[i+length-1]) % MOD1
			t2 := (h2 - a[i-1]*pow2[length-1]) % MOD2
			if t2 < 0 {
				t2 += MOD2
			}
			h2 = (t2*BASE + a[i+length-1]) % MOD2
			// Two independent polynomial hashes form the key; a repeat is
			// still verified character by character so collisions can never
			// produce a wrong answer.
			key := keyOf(h1, h2)
			if starts, ok := seen[key]; ok {
				matched := false
				for _, st := range starts {
					eq := true
					for t := 0; t < length; t++ {
						if a[st+t] != a[i+t] {
							eq = false
							break
						}
					}
					if eq {
						matched = true
						break
					}
				}
				if matched {
					return i
				}
				seen[key] = append(starts, i)
			} else {
				seen[key] = []int{i}
			}
		}
		return -1
	}

	// Monotonicity: a duplicate of length L implies duplicates at every
	// shorter length, so feasible lengths form a prefix — binary search
	// the largest one.
	lo, hi := 1, n
	bestLength := 0
	bestStart := -1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		idx := check(mid)
		if idx != -1 {
			bestLength = mid
			bestStart = idx
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}

	if bestLength == 0 {
		return ""
	}
	return s[bestStart : bestStart+bestLength]
}
