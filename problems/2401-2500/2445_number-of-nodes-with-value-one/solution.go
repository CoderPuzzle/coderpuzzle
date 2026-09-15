func numberOfNodes(n int, queries []int) int {
	// Order does not matter -- only how many times each subtree was
	// flipped. A node v's final value is the parity of (flips queried on
	// v) + (flips queried on every ancestor of v), since each such query
	// covers v too. Count queries per label, then sweep labels 1..n
	// passing accumulated flip counts parent -> child; the tree shape
	// guarantees the parent index v / 2 is already finished.
	counts := make([]int, n+1)
	for _, q := range queries {
		counts[q]++
	}
	flips := make([]int, n+1)
	total := 0
	for v := 1; v <= n; v++ {
		flips[v] = counts[v]
		if v >= 2 {
			flips[v] += flips[v/2]
		}
		if flips[v]%2 == 1 {
			total++
		}
	}
	return total
}
