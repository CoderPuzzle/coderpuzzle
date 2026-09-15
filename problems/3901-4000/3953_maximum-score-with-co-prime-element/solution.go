func maxScore(a []int, M int) int {
	N := M
	for _, x := range a {
		if x > N {
			N = x
		}
	}
	f := make([]int, N+1)
	d := make([]int, N+1)
	sp := make([]int, N+1)
	for _, x := range a {
		f[x]++
	}
	for z := 1; z <= N; z++ {
		for x := z; x <= N; x += z {
			d[z] += f[x]
		}
	}
	for i := range sp {
		sp[i] = i
	}
	for p := 2; p*p <= N; p++ {
		if sp[p] == p {
			for x := p * p; x <= N; x += p {
				if sp[x] == x {
					sp[x] = p
				}
			}
		}
	}
	ans := -int(^uint(0)>>1) - 1
	for x := 1; x <= N; x++ {
		if f[x] == 0 && x > M {
			continue
		}
		ps := []int{}
		for v := x; v > 1; {
			p := sp[v]
			ps = append(ps, p)
			for v%p == 0 {
				v /= p
			}
		}
		bad := 0
		for mask := 1; mask < (1 << len(ps)); mask++ {
			q, b := 1, 0
			for i, p := range ps {
				if mask>>i&1 != 0 {
					q *= p
					b++
				}
			}
			if b&1 != 0 {
				bad += d[q]
			} else {
				bad -= d[q]
			}
		}
		cost := bad
		if f[x] > 0 {
			if x > 1 {
				cost--
			}
		} else if cost < 1 {
			cost = 1
		}
		if x-cost > ans {
			ans = x - cost
		}
	}
	return ans
}
