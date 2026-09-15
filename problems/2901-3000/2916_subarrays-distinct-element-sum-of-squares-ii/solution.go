func sumCounts(nums []int) int {
	// Fenwick pair over the per-start distinct counts d[j] of the windows
	// ending at the current index: range-add and range-sum of exact counts.
	// Range sums reach n(n+1)/2 ~ 5*10^9, past 32 bits, so every accumulator
	// stays in int64.
	const MOD = 1_000_000_007
	n := len(nums)
	b1 := make([]int64, n+2)
	b2 := make([]int64, n+2)
	add := func(l, r int, v int64) {
		for x := l; x <= n+1; x += x & -x {
			b1[x] += v
			b2[x] += v * int64(l-1)
		}
		for x := r + 1; x <= n+1; x += x & -x {
			b1[x] -= v
			b2[x] -= v * int64(r)
		}
	}
	prefix := func(x int) int64 {
		x0 := x
		var s1, s2 int64
		for ; x > 0; x -= x & -x {
			s1 += b1[x]
			s2 += b2[x]
		}
		return s1*int64(x0) - s2
	}
	last := make([]int, 100001)
	for v := range last {
		last[v] = -1
	}
	var answer, running int64
	for i, num := range nums {
		lo := last[num] + 2
		// Windows opened in (last, i-1] each gain one distinct value, so
		// their squares grow by 2*d + 1; the fresh window contributes 1^2.
		// T is the exact pre-increment sum over the gaining range.
		var t int64
		if lo <= i {
			t = prefix(i) - prefix(lo-1)
		}
		running = (running + 2*t + int64(i-lo+2)) % MOD
		answer = (answer + running) % MOD
		if lo <= i {
			add(lo, i, 1)
		}
		add(i+1, i+1, 1)
		last[num] = i
	}
	return int(answer)
}
