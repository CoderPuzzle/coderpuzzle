func maximumMEX(a []int) []int {
	n := len(a)
	f := make([]int, n+1)
	for _, x := range a {
		if x <= n {
			f[x]++
		}
	}
	mex := 0
	for f[mex] > 0 {
		mex++
	}
	out := []int{}
	for i := 0; i < n; {
		out = append(out, mex)
		if mex == 0 {
			if a[i] <= n {
				f[a[i]]--
			}
			i++
			continue
		}
		seen := make([]bool, mex)
		miss, next := mex, mex
		for miss > 0 {
			x := a[i]
			i++
			if x <= n {
				f[x]--
				if f[x] == 0 && x < next {
					next = x
				}
			}
			if x < mex && !seen[x] {
				seen[x] = true
				miss--
			}
		}
		mex = next
	}
	return out
}
