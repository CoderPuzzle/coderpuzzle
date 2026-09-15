func zigZagArrays(n int, l int, r int) int {
	const mod = 1_000_000_007
	m := r - l + 1
	// up[x] / down[x]: length-i arrays ending at value x whose last step
	// rose / fell. Every single value starts both tables at length 1; the
	// zigzag law then forces each next step to flip direction.
	up := make([]int64, m)
	down := make([]int64, m)
	for i := range up {
		up[i], down[i] = 1, 1
	}
	for length := 2; length <= n; length++ {
		// A rising-ending array may only continue onto a smaller value, so
		// new down[y] sums up[x] over x > y -- a running suffix total.
		newDown := make([]int64, m)
		total := int64(0)
		for y := m - 1; y >= 0; y-- {
			newDown[y] = total
			total = (total + up[y]) % mod
		}
		// Mirror image: new up[y] sums down[x] over x < y.
		newUp := make([]int64, m)
		total = 0
		for y := 0; y < m; y++ {
			newUp[y] = total
			total = (total + down[y]) % mod
		}
		up, down = newUp, newDown
	}
	var answer int64
	for x := range up {
		answer += up[x] + down[x]
	}
	return int(answer % mod)
}
