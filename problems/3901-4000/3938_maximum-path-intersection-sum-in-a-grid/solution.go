func maxScore(g [][]int) int {
	ans := -int(^uint(0)>>1) - 1
	scan := func(a []int) {
		e := a[0]
		for i := 1; i < len(a); i++ {
			z := e + a[i]
			if z > ans {
				ans = z
			}
			if a[i] > z {
				e = a[i]
			} else {
				e = z
			}
		}
	}
	for _, r := range g {
		scan(r)
	}
	for j := range g[0] {
		a := make([]int, len(g))
		for i := range g {
			a[i] = g[i][j]
		}
		scan(a)
	}
	for i := 1; i+1 < len(g); i++ {
		for j := 1; j+1 < len(g[0]); j++ {
			if g[i][j] > ans {
				ans = g[i][j]
			}
		}
	}
	return ans
}
