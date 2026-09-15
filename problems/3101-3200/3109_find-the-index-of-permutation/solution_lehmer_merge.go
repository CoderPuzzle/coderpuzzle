func getPermutationIndex(perm []int) int {
	const MOD = 1000000007
	n := len(perm)
	// fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
	fact := make([]int64, n)
	fact[0] = 1
	for i := 1; i < n; i++ {
		fact[i] = fact[i-1] * int64(i) % MOD
	}

	// Lehmer digit re-read: the values still unused at slot i are exactly
	// the values in later slots, so digit i counts later slots holding
	// smaller values -- a per-position smaller-to-the-right inversion count.
	smallerAfter := make([]int64, n)
	// merge-sort workspace of {value, original index} pairs, sorted by value
	order := make([][2]int, n)
	for i, value := range perm {
		order[i] = [2]int{value, i}
	}

	// mergeSort sorts order[lo:hi) by value while tallying, into smallerAfter,
	// how many later slots hold smaller values than each slot's own.
	var mergeSort func(lo, hi int)
	mergeSort = func(lo, hi int) {
		if hi-lo < 2 {
			return
		}
		mid := (lo + hi) / 2
		mergeSort(lo, mid)
		mergeSort(mid, hi)
		left := make([][2]int, mid-lo)
		copy(left, order[lo:mid])
		i, j, k := 0, mid, lo
		for i < len(left) && j < hi {
			if left[i][0] < order[j][0] {
				smallerAfter[left[i][1]] += int64(j - mid) // right-half values already placed below it
				order[k] = left[i]
				i++
			} else {
				order[k] = order[j]
				j++
			}
			k++
		}
		for i < len(left) {
			smallerAfter[left[i][1]] += int64(j - mid) // the whole right half sits below it
			order[k] = left[i]
			i++
			k++
		}
	}
	mergeSort(0, n)

	var ans int64
	for i := range smallerAfter {
		// each later smaller value placed at slot i leads (n - 1 - i)! earlier permutations
		ans = (ans + smallerAfter[i]%MOD*fact[n-1-i]) % MOD
	}
	return int(ans)
}
