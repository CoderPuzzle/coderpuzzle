func maxTotal(a []int, s string) int64 {
	var ans int64
	for i := 0; i < len(a); {
		if s[i] == '0' {
			i++
			continue
		}
		l, m, z := i, int(^uint(0)>>1), int64(0)
		for i < len(a) && s[i] == '1' {
			z += int64(a[i])
			if a[i] < m {
				m = a[i]
			}
			i++
		}
		ans += z
		if l > 0 {
			ans += int64(a[l-1])
			if m < a[l-1] {
				ans -= int64(m)
			} else {
				ans -= int64(a[l-1])
			}
		}
	}
	return ans
}
