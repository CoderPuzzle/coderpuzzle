func interleaveCharacters(a, b, t string) int {
	const M = 1000000007
	n, m := len(a), len(b)
	d := make([][]int, n+1)
	for i := range d {
		d[i] = make([]int, m+1)
	}
	d[0][0] = 1
	for _, ch := range []byte(t) {
		e := make([][]int, n+1)
		for i := range e {
			e[i] = make([]int, m+1)
		}
		for j := 0; j <= m; j++ {
			run := 0
			for i := 0; i <= n; i++ {
				run = (run + d[i][j]) % M
				if i < n && a[i] == ch {
					e[i+1][j] = (e[i+1][j] + run) % M
				}
			}
		}
		for i := 0; i <= n; i++ {
			run := 0
			for j := 0; j <= m; j++ {
				run = (run + d[i][j]) % M
				if j < m && b[j] == ch {
					e[i][j+1] = (e[i][j+1] + run) % M
				}
			}
		}
		d = e
	}
	z := 0
	for _, r := range d {
		for _, x := range r {
			z = (z + x) % M
		}
	}
	sub := func(w string) int {
		x := make([]int, len(t)+1)
		x[0] = 1
		for i := range w {
			for j := len(t) - 1; j >= 0; j-- {
				if t[j] == w[i] {
					x[j+1] = (x[j+1] + x[j]) % M
				}
			}
		}
		return x[len(t)]
	}
	return (z - sub(a) - sub(b) + 2*M) % M
}
