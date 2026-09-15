import "sort"

type swapBIT struct {
	n int
	c []int
	s []int64
}

func (b *swapBIT) add(p, x int, y int64) {
	for p++; p <= b.n; p += p & -p {
		b.c[p] += x
		b.s[p] += y
	}
}
func (b *swapBIT) pref(p int) (int, int64) {
	x := 0
	var y int64
	for ; p > 0; p -= p & -p {
		x += b.c[p]
		y += b.s[p]
	}
	return x, y
}
func (b *swapBIT) kth(k int) int {
	p := 0
	z := 1
	for z<<1 <= b.n {
		z <<= 1
	}
	for ; z > 0; z >>= 1 {
		if p+z <= b.n && b.c[p+z] < k {
			k -= b.c[p+z]
			p += z
		}
	}
	return p
}
func (b *swapBIT) small(k int, v []int) int64 {
	if k == 0 {
		return 0
	}
	p := b.kth(k)
	c, s := b.pref(p)
	return s + int64(k-c)*int64(v[p])
}
func maxSum(a []int, k int) int64 {
	n := len(a)
	v := append([]int{}, a...)
	sort.Ints(v)
	u := v[:0]
	for _, x := range v {
		if len(u) == 0 || u[len(u)-1] != x {
			u = append(u, x)
		}
	}
	v = u
	p := make([]int, n)
	for i, x := range a {
		p[i] = sort.SearchInts(v, x)
	}
	best := int64(-1 << 62)
	for l := 0; l < n; l++ {
		in := swapBIT{len(v), make([]int, len(v)+1), make([]int64, len(v)+1)}
		out := swapBIT{len(v), make([]int, len(v)+1), make([]int64, len(v)+1)}
		for i, x := range a {
			out.add(p[i], 1, int64(x))
		}
		var sum int64
		for r := l; r < n; r++ {
			out.add(p[r], -1, -int64(a[r]))
			in.add(p[r], 1, int64(a[r]))
			sum += int64(a[r])
			oc := n - (r - l + 1)
			hi := k
			if r-l+1 < hi {
				hi = r - l + 1
			}
			if oc < hi {
				hi = oc
			}
			lo := 0
			for lo < hi {
				t := (lo + hi + 1) / 2
				if v[out.kth(oc-t+1)] > v[in.kth(t)] {
					lo = t
				} else {
					hi = t - 1
				}
			}
			gain := out.small(oc, v) - out.small(oc-lo, v) - in.small(lo, v)
			if sum+gain > best {
				best = sum + gain
			}
		}
	}
	return best
}
