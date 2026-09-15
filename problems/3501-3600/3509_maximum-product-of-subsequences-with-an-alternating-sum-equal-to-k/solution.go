func maxProduct(nums []int, k int, limit int) int {
	// Per (parity, sum) we keep every reachable product <= limit, not just
	// the maximum: a larger product can blow past limit on a later multiply
	// while a smaller one survives. Product-0 reachability is tracked
	// separately, since a 0 can only be reached through a subsequence
	// containing a zero, even via products above the limit.
	total := 0
	for _, v := range nums {
		total += v
	}
	if k > total || k < -total {
		return -1
	}
	width := 2*total + 1
	products := make([][]map[int]struct{}, 2)
	zero := make([][]bool, 2)
	reach := make([][]bool, 2)
	for p := 0; p < 2; p++ {
		products[p] = make([]map[int]struct{}, width)
		zero[p] = make([]bool, width)
		reach[p] = make([]bool, width)
		for i := range products[p] {
			products[p][i] = make(map[int]struct{})
		}
	}
	for _, x := range nums {
		np := make([][]map[int]struct{}, 2)
		nz := make([][]bool, 2)
		nr := make([][]bool, 2)
		for p := 0; p < 2; p++ {
			np[p] = make([]map[int]struct{}, width)
			nz[p] = make([]bool, width)
			nr[p] = make([]bool, width)
			// Skipping x keeps every current state.
			for i := range np[p] {
				m := make(map[int]struct{}, len(products[p][i]))
				for v := range products[p][i] {
					m[v] = struct{}{}
				}
				np[p][i] = m
				nz[p][i] = zero[p][i]
				nr[p][i] = reach[p][i]
			}
		}
		for p := 0; p < 2; p++ {
			sign := 1
			if p == 1 {
				sign = -1
			}
			q := 1 - p
			for i := 0; i < width; i++ {
				s := i - total
				ns := s + sign*x
				if ns < -total || ns > total {
					continue
				}
				j := ns + total
				if reach[p][i] {
					nr[q][j] = true
					if x == 0 {
						nz[q][i] = true
					} else {
						for prod := range products[p][i] {
							newp := prod * x
							if newp <= limit {
								np[q][j][newp] = struct{}{}
							}
						}
					}
				}
				if zero[p][i] {
					nz[q][j] = true
				}
			}
		}
		// A fresh subsequence with x as its single (even-index) element.
		if x == 0 {
			nz[1][total] = true
			nr[1][total] = true
		} else {
			nr[1][x+total] = true
			if x <= limit {
				np[1][x+total][x] = struct{}{}
			}
		}
		products = np
		zero = nz
		reach = nr
	}
	ans := -1
	idx := k + total
	if idx >= 0 && idx < width {
		for p := 0; p < 2; p++ {
			for prod := range products[p][idx] {
				if prod > ans {
					ans = prod
				}
			}
			if zero[p][idx] && ans < 0 {
				ans = 0
			}
		}
	}
	return ans
}
