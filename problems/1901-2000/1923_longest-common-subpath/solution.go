func longestCommonSubpath(n int, paths [][]int) int {
	// Two independent moduli combined into one key make an accidental
	// collision astronomically unlikely.
	MOD1 := int64(1000000007)
	MOD2 := int64(1000000009)
	BASE := int64(1000003)

	hi := int(^uint(0) >> 1)
	for _, p := range paths {
		if len(p) < hi {
			hi = len(p)
		}
	}
	lo := 0
	// Existence is monotone in L (any prefix of a common subpath is common),
	// so upper-mid binary search converges on the maximum feasible length.
	for lo < hi {
		mid := (lo + hi + 1) / 2
		if existsLen(mid, paths, MOD1, MOD2, BASE) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}

func existsLen(length int, paths [][]int, MOD1, MOD2, BASE int64) bool {
	var common map[int64]struct{}
	haveCommon := false
	for _, path := range paths {
		if len(path) < length {
			return false
		}
		var h1, h2 int64 = 0, 0
		var power1, power2 int64 = 1, 1
		// +1 per city id so a run of city 0 never hashes to the all-zero value.
		for i := 0; i < length; i++ {
			h1 = (h1*BASE + int64(path[i]) + 1) % MOD1
			h2 = (h2*BASE + int64(path[i]) + 1) % MOD2
			power1 = power1 * BASE % MOD1
			power2 = power2 * BASE % MOD2
		}
		hashes := make(map[int64]struct{})
		hashes[h1*MOD2+h2] = struct{}{}
		// Roll the window: multiply by base, drop the outgoing digit
		// weighted by BASE^L, add the incoming digit (constant per step).
		for i := length; i < len(path); i++ {
			out1 := (int64(path[i-length]) + 1) * power1 % MOD1
			out2 := (int64(path[i-length]) + 1) * power2 % MOD2
			h1 = ((h1*BASE-out1)%MOD1 + MOD1) % MOD1
			h2 = ((h2*BASE-out2)%MOD2 + MOD2) % MOD2
			h1 = (h1 + int64(path[i]) + 1) % MOD1
			h2 = (h2 + int64(path[i]) + 1) % MOD2
			hashes[h1*MOD2+h2] = struct{}{}
		}
		// The first path seeds the set; each later path intersects into
		// it, bailing out the moment the intersection empties.
		if !haveCommon {
			common = hashes
			haveCommon = true
		} else {
			next := make(map[int64]struct{})
			for k := range common {
				if _, ok := hashes[k]; ok {
					next[k] = struct{}{}
				}
			}
			common = next
			if len(common) == 0 {
				return false
			}
		}
	}
	return haveCommon && len(common) > 0
}
