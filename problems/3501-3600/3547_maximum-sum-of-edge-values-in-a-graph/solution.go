func maxScore(n int, edges [][]int) int64 {
	// Connected with every degree <= 2, the graph is one path (m == n-1)
	// or one cycle (m == n). Pendulum the values 1..n — 1, 3, 5, ...
	// then ..., 6, 4, 2 — so the largest values sit side by side. Scores
	// reach ~n^3/6 ≈ 2e13, so int64, not int.
	seq := make([]int, 0, n)
	for v := 1; v <= n; v += 2 {
		seq = append(seq, v)
	}
	start := n
	if start%2 != 0 {
		start--
	}
	for v := start; v >= 2; v -= 2 {
		seq = append(seq, v)
	}
	var score int64
	for i := 0; i+1 < n; i++ {
		score += int64(seq[i]) * int64(seq[i+1])
	}
	if len(edges) == n {
		score += int64(seq[0]) * int64(seq[n-1])
	}
	return score
}
