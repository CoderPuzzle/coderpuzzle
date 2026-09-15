func minOperations(a []int, k int) int64 {
	cost := func(p int) []int64 {
		c := make([]int64, k)
		for i := p; i < len(a); i += 2 {
			c[a[i]%k]++
		}
		pc := make([]int64, 3*k+1)
		ps := make([]int64, 3*k+1)
		for i := 0; i < 3*k; i++ {
			pc[i+1] = pc[i] + c[i%k]
			ps[i+1] = ps[i] + c[i%k]*int64(i)
		}
		o := make([]int64, k)
		h := k / 2
		for x := 0; x < k; x++ {
			m := x + k
			l, r := m-h, m+k-1-h
			lc, ls := pc[m+1]-pc[l], ps[m+1]-ps[l]
			rc, rs := pc[r+1]-pc[m+1], ps[r+1]-ps[m+1]
			o[x] = int64(m)*lc - ls + rs - int64(m)*rc
		}
		return o
	}
	e, o := cost(0), cost(1)
	p, q := 0, 1
	if o[q] < o[p] {
		p, q = q, p
	}
	for i := 2; i < k; i++ {
		if o[i] < o[p] {
			q = p
			p = i
		} else if o[i] < o[q] {
			q = i
		}
	}
	ans := int64(^uint64(0) >> 1)
	for x := 0; x < k; x++ {
		j := p
		if j == x {
			j = q
		}
		if e[x]+o[j] < ans {
			ans = e[x] + o[j]
		}
	}
	return ans
}
