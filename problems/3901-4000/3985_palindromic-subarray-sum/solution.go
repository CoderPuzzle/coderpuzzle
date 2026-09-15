func getSum(a []int) int64 {
	n := len(a)
	d1 := make([]int, n)
	d2 := make([]int, n)
	l, r := 0, -1
	for i := 0; i < n; i++ {
		k := 1
		if i <= r {
			k = d1[l+r-i]
			if r-i+1 < k {
				k = r - i + 1
			}
		}
		for i-k >= 0 && i+k < n && a[i-k] == a[i+k] {
			k++
		}
		d1[i] = k
		if i+k-1 > r {
			l = i - k + 1
			r = i + k - 1
		}
	}
	l, r = 0, -1
	for i := 0; i < n; i++ {
		k := 0
		if i <= r {
			k = d2[l+r-i+1]
			if r-i+1 < k {
				k = r - i + 1
			}
		}
		for i-k-1 >= 0 && i+k < n && a[i-k-1] == a[i+k] {
			k++
		}
		d2[i] = k
		if i+k-1 > r {
			l = i - k
			r = i + k - 1
		}
	}
	p := make([]int64, n+1)
	for i, v := range a {
		p[i+1] = p[i] + int64(v)
	}
	var ans int64
	for i := 0; i < n; i++ {
		x := p[i+d1[i]] - p[i-d1[i]+1]
		if x > ans {
			ans = x
		}
		x = p[i+d2[i]] - p[i-d2[i]]
		if x > ans {
			ans = x
		}
	}
	return ans
}
