// Two passes over s. Forward, each cell records its distance to the nearest
// c at or before it; backward, the mirrored sweep offers the distance to the
// nearest c at or after it, kept only where it beats what the forward pass
// wrote. A cell that is itself c lands on 0 in both sweeps, and the
// sentinels (-n, 2n) stand in for "no c seen yet" with a distance no real
// neighbour can lose to.
func shortestToChar(s string, c string) []int {
	n := len(s)
	target := c[0]
	answer := make([]int, n)
	last := -n
	for i := 0; i < n; i++ {
		if s[i] == target {
			last = i
		}
		answer[i] = i - last
	}
	last = 2 * n
	for i := n - 1; i >= 0; i-- {
		if s[i] == target {
			last = i
		}
		if last-i < answer[i] {
			answer[i] = last - i
		}
	}
	return answer
}
