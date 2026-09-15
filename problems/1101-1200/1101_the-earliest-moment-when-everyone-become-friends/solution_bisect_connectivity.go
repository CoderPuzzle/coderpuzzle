import "sort"

func earliestAcq(logs [][]int, n int) int {
	// Replay order first: the bisection asks prefix questions of the
	// chronologically sorted logs.
	sortedLogs := make([][]int, len(logs))
	copy(sortedLogs, logs)
	sort.Slice(sortedLogs, func(i, j int) bool { return sortedLogs[i][0] < sortedLogs[j][0] })
	// Predicate for the bisection: does the prefix of the k soonest logs
	// already hold all n elements in one group? A fresh union-find per probe.
	connected := func(k int) bool {
		parent := make([]int, n)
		for i := range parent {
			parent[i] = i
		}
		// Path-halving find keeps the trees shallow within one probe.
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
		for _, log := range sortedLogs[:k] {
			rx, ry := find(log[1]), find(log[2])
			// Redundant (already-connected) logs merge nothing.
			if rx != ry {
				parent[rx] = ry
				components--
			}
		}
		return components == 1
	}
	// Links never disappear, so once connected always connected: the
	// predicate is monotone in k and the smallest true k can be bisected.
	m := len(sortedLogs)
	if !connected(m) {
		return -1
	}
	lo, hi := 1, m
	for lo < hi {
		mid := lo + (hi-lo)/2
		if connected(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	// The last event of the surviving prefix carries the answer's moment.
	return sortedLogs[lo-1][0]
}
