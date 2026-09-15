func maximumSaleItems(a [][]int, B int) int {
	M := 0
	for _, x := range a {
		if x[0] > M {
			M = x[0]
		}
	}
	f := make([]int, M+1)
	d := make([]int, M+1)
	for _, x := range a {
		f[x[0]]++
	}
	for z := 1; z <= M; z++ {
		for x := z; x <= M; x += z {
			d[z] += f[x]
		}
	}
	const N = -1000000000
	dp := make([]int, B+1)
	for i := range dp {
		dp[i] = N
	}
	dp[0] = 0
	for _, x := range a {
		p, g := x[1], d[x[0]]
		old := dp
		nw := append([]int(nil), dp...)
		limit := p
		if B+1 < limit {
			limit = B + 1
		}
		for r := 0; r < limit; r++ {
			best, q := N, 0
			for c := r; c <= B; c += p {
				if q > 0 && old[c-p] > N && old[c-p]-q+1 > best {
					best = old[c-p] - q + 1
				}
				if best > N && q+g-1+best > nw[c] {
					nw[c] = q + g - 1 + best
				}
				q++
			}
		}
		dp = nw
	}
	ans := N
	for _, x := range dp {
		if x > ans {
			ans = x
		}
	}
	return ans
}
