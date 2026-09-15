// Maximum bipartite matching: each boy in turn looks for a girl, and when
// his only choices are taken, an augmenting path asks an earlier boy to
// reroute — the matched count grows by one exactly when such a path exists.
func maximumInvitations(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])
	invitations := make([]int, n) // girl j is invited by boy invitations[j]
	for j := range invitations {
		invitations[j] = -1
	}
	var invite func(boy int, seen []bool) bool
	invite = func(boy int, seen []bool) bool {
		for girl := 0; girl < n; girl++ {
			if grid[boy][girl] == 1 && !seen[girl] {
				seen[girl] = true
				if invitations[girl] == -1 || invite(invitations[girl], seen) {
					invitations[girl] = boy
					return true
				}
			}
		}
		return false
	}
	accepted := 0
	for boy := 0; boy < m; boy++ {
		if invite(boy, make([]bool, n)) {
			accepted++
		}
	}
	return accepted
}
