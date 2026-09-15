// Anyone stronger than team a must end with an edge into a — either
// directly or through a last hop that is itself an incoming edge — so "no
// team is stronger than a" is exactly "a has no incoming edge". Count
// incoming edges, walk the teams in order, and accept only the case where
// exactly one of them has no incoming edge.
func findChampion(n int, edges [][]int) int {
	incoming := make([]int, n)
	for _, edge := range edges {
		incoming[edge[1]]++
	}
	champion := -1
	for team := 0; team < n; team++ {
		if incoming[team] == 0 {
			if champion != -1 {
				return -1
			}
			champion = team
		}
	}
	return champion
}
