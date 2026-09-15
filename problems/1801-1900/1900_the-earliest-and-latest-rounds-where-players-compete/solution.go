import "sort"

func earliestAndLatest(n int, firstPlayer int, secondPlayer int) []int {
	// State: ranks i, j of the two stars in a row of m survivors.
	memo := map[[3]int][2]int{}
	var dp func(i, j, m int) [2]int
	dp = func(i, j, m int) [2]int {
		if i+j == m+1 {
			return [2]int{1, 1}
		}
		if i > m-j+1 {
			return dp(m-j+1, m-i+1, m)
		}
		if v, ok := memo[[3]int{i, j, m}]; ok {
			return v
		}
		half := (m + 1) / 2
		type pair struct{ f, b int }
		var free []pair
		for k := 1; k <= half; k++ {
			back := m + 1 - k
			if k < back && i != k && i != back && j != k && j != back {
				free = append(free, pair{k, back})
			}
		}
		lo, hi := n, 0
		for mask := 0; mask < 1<<len(free); mask++ {
			survivors := []int{}
			for k := 1; k <= half; k++ {
				back := m + 1 - k
				if k == back {
					survivors = append(survivors, k)
				} else if i == k || i == back {
					survivors = append(survivors, i)
				} else if j == k || j == back {
					survivors = append(survivors, j)
				} else {
					pick := back
					for t, p := range free {
						if p.f == k && mask>>t&1 == 1 {
							pick = k
						}
					}
					survivors = append(survivors, pick)
				}
			}
			sort.Ints(survivors)
			nf, ns := 0, 0
			for t, p := range survivors {
				if p == i {
					nf = t + 1
				}
				if p == j {
					ns = t + 1
				}
			}
			sub := dp(nf, ns, len(survivors))
			lo = min(lo, sub[0])
			hi = max(hi, sub[1])
		}
		res := [2]int{lo + 1, hi + 1}
		memo[[3]int{i, j, m}] = res
		return res
	}
	res := dp(firstPlayer, secondPlayer, n)
	return []int{res[0], res[1]}
}
