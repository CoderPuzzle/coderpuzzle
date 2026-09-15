func numGoodSubarrays(nums []int, k int) int64 {
	// Positional sweep: window [l, r] is good exactly when the prefixes
	// before l and through r leave the same remainder mod k. Residue plus
	// element can pass 2^31, so the running sum stays in 64 bits.
	residueCounts := make(map[int]int64)
	residueCounts[0] = 1
	var residue, total int64
	for _, value := range nums {
		residue = (residue + int64(value)) % int64(k)
		total += residueCounts[int(residue)]
		residueCounts[int(residue)]++
	}
	// Identical value sequences repeat only inside one run of equal values:
	// a span crossing a strict increase is pinned by where it crosses and
	// how much it takes from each edge. A qualifying length L inside a run
	// of length a occupies a - L + 1 positions but counts once, so subtract
	// the a - L excess of every qualifying length. The qualifying lengths
	// are multiples of k / gcd(v, k).
	gcd := func(a, b int64) int64 {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	i, n := 0, len(nums)
	for i < n {
		j := i
		for j < n && nums[j] == nums[i] {
			j++
		}
		runLength := int64(j - i)
		step := int64(k) / gcd(int64(nums[i]), int64(k))
		repeated := runLength / step
		total -= repeated*runLength - step*repeated*(repeated+1)/2
		i = j
	}
	return total
}
