import "sort"

func minDifference(n int, k int) []int {
	// Trial division up to sqrt(n) gathers each divisor pair (d, n/d);
	// sorted ascending, they are the only values a decomposition can use.
	var divs []int
	for d := 1; d*d <= n; d++ {
		if n%d == 0 {
			divs = append(divs, d)
			if d*d != n {
				divs = append(divs, n/d)
			}
		}
	}
	sort.Ints(divs)

	// Building factors in nondecreasing order makes the search visit
	// complete splits in lexicographic order, so replacing the best only on
	// a strictly smaller spread pins the lexicographically smallest optimal
	// split.
	best := []int{}
	path := make([]int, 0, k)

	var dfs func(start, slots, prod int)
	dfs = func(start, slots, prod int) {
		if slots == 1 {
			// The last factor is forced to carry the product up to n; it
			// completes a nondecreasing split exactly when it reaches the
			// last pick. Both ends of the spread then sit on the path.
			last := n / prod
			if prod*last == n && (len(path) == 0 || last >= path[len(path)-1]) {
				spread := 0
				if len(path) > 0 {
					spread = last - path[0]
				}
				if len(best) == 0 || spread < best[len(best)-1]-best[0] {
					best = append(append([]int{}, path...), last)
				}
			}
			return
		}
		for i := start; i < len(divs); i++ {
			if divs[i]*prod > n {
				break
			}
			path = append(path, divs[i])
			dfs(i, slots-1, prod*divs[i])
			path = path[:len(path)-1]
		}
	}
	dfs(0, k, 1)
	return best
}
