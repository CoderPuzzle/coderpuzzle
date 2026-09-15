func numberOfPairs(a []int, b []int, qs [][]int) []int {
	const S = 225
	B := (len(b) + S - 1) / S
	v := make([]int64, len(b))
	for i, x := range b {
		v[i] = int64(x)
	}
	lazy := make([]int64, B)
	fs := make([]map[int64]int, B)
	rebuild := func(z int) {}
	rebuild = func(z int) {
		l := z * S
		r := l + S
		if r > len(v) {
			r = len(v)
		}
		if lazy[z] != 0 {
			for i := l; i < r; i++ {
				v[i] += lazy[z]
			}
			lazy[z] = 0
		}
		m := map[int64]int{}
		for i := l; i < r; i++ {
			m[v[i]]++
		}
		fs[z] = m
	}
	for z := 0; z < B; z++ {
		rebuild(z)
	}
	af := map[int]int{}
	for _, x := range a {
		af[x]++
	}
	out := []int{}
	for _, q := range qs {
		if q[0] == 1 {
			l, r := q[1], q[2]
			L, R := l/S, r/S
			if L == R {
				rebuild(L)
				for i := l; i <= r; i++ {
					v[i] += int64(q[3])
				}
				rebuild(L)
			} else {
				rebuild(L)
				for i := l; i < (L+1)*S; i++ {
					v[i] += int64(q[3])
				}
				rebuild(L)
				rebuild(R)
				for i := R * S; i <= r; i++ {
					v[i] += int64(q[3])
				}
				rebuild(R)
				for z := L + 1; z < R; z++ {
					lazy[z] += int64(q[3])
				}
			}
		} else {
			z := 0
			for x, c := range af {
				for j := 0; j < B; j++ {
					z += c * fs[j][int64(q[1]-x)-lazy[j]]
				}
			}
			out = append(out, z)
		}
	}
	return out
}
