func getPermutationIndex(perm []int) int {
	const MOD = 1000000007
	n := len(perm)
	// fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
	fact := make([]int64, n)
	fact[0] = 1
	for i := 1; i < n; i++ {
		fact[i] = fact[i-1] * int64(i) % MOD
	}

	tree := make([]int64, n+1)
	add := func(i, delta int) {
		for ; i <= n; i += i & -i {
			tree[i] += int64(delta)
		}
	}
	query := func(i int) int64 {
		var s int64
		for ; i > 0; i -= i & -i {
			s += tree[i]
		}
		return s
	}

	// Fenwick tree over values 1..n tracks which values are still unused
	for v := 1; v <= n; v++ {
		add(v, 1)
	}

	var ans int64
	for i, x := range perm {
		// Lehmer digit: how many unused values are smaller than perm[i]
		smaller := query(x - 1)
		// each such value placed here leads (n - 1 - i)! earlier permutations
		ans = (ans + smaller%MOD*fact[n-1-i]) % MOD
		// perm[i] is spent; later positions see only the remaining values
		add(x, -1)
	}
	return int(ans)
}
