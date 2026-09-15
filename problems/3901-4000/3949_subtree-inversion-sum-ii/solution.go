func subtreeInversionSum(e [][]int, nums []int, k int) int64 {
	n, w := len(nums), k+1
	g := make([][]int, n)
	for _, x := range e {
		g[x[0]] = append(g[x[0]], x[1])
		g[x[1]] = append(g[x[1]], x[0])
	}
	p := make([]int, n)
	for i := range p {
		p[i] = -1
	}
	ord := []int{0}
	for z := 0; z < len(ord); z++ {
		u := ord[z]
		for _, v := range g[u] {
			if v != p[u] {
				p[v] = u
				ord = append(ord, v)
			}
		}
	}
	const I int64 = 1 << 60
	mx := make([]int64, n*w)
	mn := make([]int64, n*w)
	for i := range mx {
		mx[i] = -I
		mn[i] = I
	}
	max := func(a, b int64) int64 {
		if a > b {
			return a
		}
		return b
	}
	min := func(a, b int64) int64 {
		if a < b {
			return a
		}
		return b
	}
	for z := n - 1; z >= 0; z-- {
		u := ord[z]
		a := make([]int64, w)
		b := make([]int64, w)
		for i := range a {
			a[i] = -I
			b[i] = I
		}
		a[k] = int64(nums[u])
		b[k] = a[k]
		sm, sn := -int64(nums[u]), -int64(nums[u])
		for _, v := range g[u] {
			if p[v] != u {
				continue
			}
			o := v * w
			sm -= min(mn[o+k-1], mn[o+k])
			sn -= max(mx[o+k-1], mx[o+k])
			x := make([]int64, w)
			y := make([]int64, w)
			for i := range x {
				x[i] = -I
				y[i] = I
			}
			for d := 0; d < k; d++ {
				x[d+1] = mx[o+d]
				y[d+1] = mn[o+d]
			}
			x[k] = max(x[k], mx[o+k])
			y[k] = min(y[k], mn[o+k])
			ax := append([]int64(nil), a...)
			ay := append([]int64(nil), b...)
			xx := append([]int64(nil), x...)
			xy := append([]int64(nil), y...)
			for d := k - 1; d >= 0; d-- {
				ax[d] = max(ax[d], ax[d+1])
				ay[d] = min(ay[d], ay[d+1])
				xx[d] = max(xx[d], xx[d+1])
				xy[d] = min(xy[d], xy[d+1])
			}
			na := make([]int64, w)
			nb := make([]int64, w)
			for i := range na {
				na[i] = -I
				nb[i] = I
			}
			na[k] = a[k] + x[k]
			nb[k] = b[k] + y[k]
			for d := 1; d < k; d++ {
				t := d
				if k-d > t {
					t = k - d
				}
				na[d] = max(a[d]+xx[t], x[d]+ax[t])
				nb[d] = min(b[d]+xy[t], y[d]+ay[t])
			}
			a, b = na, nb
		}
		a[0] = sm
		b[0] = sn
		copy(mx[u*w:(u+1)*w], a)
		copy(mn[u*w:(u+1)*w], b)
	}
	ans := -I
	for d := 0; d < w; d++ {
		ans = max(ans, mx[d])
	}
	return ans
}
