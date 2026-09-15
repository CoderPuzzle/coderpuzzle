func maxTotalValue(value, decay []int, m int) int {
	const M int64 = 1000000007
	mm := int64(m)
	count := func(g int64) int64 {
		var z int64
		for i, a := range value {
			if int64(a) >= g {
				z += (int64(a)-g)/int64(decay[i]) + 1
				if z > mm {
					return mm + 1
				}
			}
		}
		return z
	}
	total := func(g int64) int64 {
		var z int64
		for i, a := range value {
			if int64(a) >= g {
				c := (int64(a)-g)/int64(decay[i]) + 1
				z = (z + c%M*int64(a)%M - int64(decay[i])%M*(c%M)%M*((c-1)%M)%M*500000004) % M
			}
		}
		if z < 0 {
			z += M
		}
		return z
	}
	if count(1) <= mm {
		return int(total(1))
	}
	l, r := int64(1), int64(0)
	for _, a := range value {
		if int64(a) > r {
			r = int64(a)
		}
	}
	for l < r {
		x := (l + r + 1) / 2
		if count(x) >= mm {
			l = x
		} else {
			r = x - 1
		}
	}
	c := count(l + 1)
	return int((total(l+1) + (mm-c)%M*(l%M)) % M)
}
