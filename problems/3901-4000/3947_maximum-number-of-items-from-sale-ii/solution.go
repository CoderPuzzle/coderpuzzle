import "sort"

func maximumSaleItems(a [][]int, B int) int64 {
	n := len(a)
	f := make([]int, n+1)
	d := make([]int, n+1)
	for _, x := range a {
		f[x[0]]++
	}
	for z := 1; z <= n; z++ {
		for x := z; x <= n; x += z {
			d[z] += f[x]
		}
	}
	q := make([][2]int, n)
	cheap := int(^uint(0) >> 1)
	for i, x := range a {
		q[i] = [2]int{x[1], d[x[0]] - 1}
		if x[1] < cheap {
			cheap = x[1]
		}
	}
	sort.Slice(q, func(i, j int) bool { return q[i][0] < q[j][0] })
	best := int64(B / cheap)
	spent, boost := int64(0), int64(0)
	for _, x := range q {
		p, cap := int64(x[0]), int64(x[1])
		if p > 2*int64(cheap) || cap == 0 {
			continue
		}
		take := (int64(B) - spent) / p
		if cap < take {
			take = cap
		}
		spent += take * p
		boost += take
		z := 2*boost + (int64(B)-spent)/int64(cheap)
		if z > best {
			best = z
		}
		if take < cap {
			break
		}
	}
	return best
}
