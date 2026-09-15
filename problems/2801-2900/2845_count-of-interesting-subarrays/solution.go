func countInterestingSubarrays(nums []int, modulo int, k int) int64 {
	// Only whether nums[i] % modulo == k matters, so track pref: the number
	// of hits among the prefix. A subarray is interesting iff its hit count
	// has residue k — prefix-sum counting, applied to residues. Seed residue
	// 0 for the empty prefix so subarrays starting at index 0 are counted.
	count := make(map[int]int64)
	count[0] = 1
	pref := 0
	var ans int64
	for _, x := range nums {
		if x%modulo == k {
			pref++
		}
		// Right endpoint at i pairs with every earlier boundary l where
		// pref[right] - pref[l] = k (mod modulo); the double-mod keeps the
		// residue non-negative for map lookups.
		need := ((pref-k)%modulo + modulo) % modulo
		ans += count[need]
		count[pref%modulo]++
	}
	return ans
}
