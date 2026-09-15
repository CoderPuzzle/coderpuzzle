import "sort"

func earliestAcq(logs [][]int, n int) int {
	// Replay events chronologically; connectivity models acquaintance.
	sortedLogs := make([][]int, len(logs))
	copy(sortedLogs, logs)
	sort.Slice(sortedLogs, func(i, j int) bool { return sortedLogs[i][0] < sortedLogs[j][0] })
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	// Path-halving find keeps the trees shallow across replays.
	var find func(int) int
	find = func(a int) int {
		for parent[a] != a {
			parent[a] = parent[parent[a]]
			a = parent[a]
		}
		return a
	}
	// The component counter tracks the group count so no global scan is
	// ever needed.
	components := n
	for _, log := range sortedLogs {
		rx, ry := find(log[1]), find(log[2])
		// Redundant (already-friends) events merge nothing.
		if rx != ry {
			parent[rx] = ry
			components--
			// This merge closed the last divide: everyone is acquainted.
			if components == 1 {
				return log[0]
			}
		}
	}
	return -1
}
