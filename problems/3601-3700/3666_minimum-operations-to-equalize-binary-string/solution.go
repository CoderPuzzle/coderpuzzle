func minOperations(s string, k int) int {
	n := len(s)
	z := 0
	for i := 0; i < n; i++ {
		if s[i] == '0' {
			z++
		}
	}
	// Only the count z of zeros matters: an operation flips i of the
	// current zeros and k - i of the ones, moving z to z + k - 2 * i for
	// any legal i — one contiguous same-parity range per step.
	if z == 0 {
		return 0
	}
	// BFS over zero counts 0..n toward 0. Two skip lists (one per parity)
	// hold the unvisited states, so each state enters the queue exactly
	// once even though edges are whole intervals.
	nextEven := make([]int, n/2+2)
	nextOdd := make([]int, (n+1)/2+1)
	for i := range nextEven {
		nextEven[i] = i
	}
	for i := range nextOdd {
		nextOdd[i] = i
	}
	dist := make([]int, n+1)
	for i := range dist {
		dist[i] = -1
	}
	queue := make([]int, 0, n+1)
	queue = append(queue, z)
	dist[z] = 0
	start := z >> 1
	if z%2 == 0 {
		nextEven[start] = start + 1
	} else {
		nextOdd[start] = start + 1
	}
	for head := 0; head < len(queue); head++ {
		cur := queue[head]
		lo := max(0, k-(n-cur))
		hi := min(k, cur)
		low := cur + k - 2*hi
		high := cur + k - 2*lo
		p := (cur + k) & 1
		nxt := nextEven
		if p != 0 {
			nxt = nextOdd
		}
		d := dist[cur] + 1
		j := findSkip(nxt, low>>1)
		for j < len(nxt)-1 {
			v := 2*j + p
			if v > high {
				break
			}
			dist[v] = d
			if v == 0 {
				return d
			}
			nxt[j] = j + 1
			queue = append(queue, v)
			j = findSkip(nxt, j+1)
		}
	}
	return -1
}

// findSkip returns the next unvisited slot at or after i, path-compressing
// the skipped chain as it walks it.
func findSkip(nxt []int, i int) int {
	root := i
	for nxt[root] != root {
		root = nxt[root]
	}
	for nxt[i] != root {
		up := nxt[i]
		nxt[i] = root
		i = up
	}
	return root
}
