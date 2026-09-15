import "sort"

// Give every distinct conversion string an id and run Floyd-Warshall on the
// minimum operation cost between any two of them; repeated operations on one
// window then collapse to a shortest path.
func minimumCost(source string, target string, original []string, changed []string, cost []int) int64 {
	ids := make(map[string]int)
	addID := func(s string) {
		if _, ok := ids[s]; !ok {
			ids[s] = len(ids)
		}
	}
	for _, s := range original {
		addID(s)
	}
	for _, s := range changed {
		addID(s)
	}
	m := len(ids)
	const inf = int64(1) << 50
	dist := make([][]int64, m)
	for i := range dist {
		dist[i] = make([]int64, m)
		for j := range dist[i] {
			dist[i][j] = inf
		}
		dist[i][i] = 0
	}
	for i, c := range cost {
		x := ids[original[i]]
		y := ids[changed[i]]
		if int64(c) < dist[x][y] {
			dist[x][y] = int64(c)
		}
	}
	for k := 0; k < m; k++ {
		for i := 0; i < m; i++ {
			if dist[i][k] >= inf {
				continue
			}
			for j := 0; j < m; j++ {
				if v := dist[i][k] + dist[k][j]; v < dist[i][j] {
					dist[i][j] = v
				}
			}
		}
	}

	// A trie over the distinct strings lets one lockstep walk over
	// source/target from each position find every usable segment length.
	trie := make([][26]int32, 1)
	for i := range trie[0] {
		trie[0][i] = -1
	}
	idAt := make([]int32, 1)
	idAt[0] = -1
	// Deterministic insertion order: sort the keys.
	keys := make([]string, 0, len(ids))
	for s := range ids {
		keys = append(keys, s)
	}
	sort.Strings(keys)
	for _, s := range keys {
		cur := int32(0)
		for i := 0; i < len(s); i++ {
			b := s[i] - 'a'
			if trie[cur][b] < 0 {
				node := [26]int32{}
				for j := range node {
					node[j] = -1
				}
				trie = append(trie, node)
				idAt = append(idAt, -1)
				trie[cur][b] = int32(len(trie) - 1)
			}
			cur = trie[cur][b]
		}
		idAt[cur] = int32(ids[s])
	}

	n := len(source)
	dp := make([]int64, n+1)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	sb := []byte(source)
	tb := []byte(target)
	for j := 0; j < n; j++ {
		if dp[j] >= inf {
			continue
		}
		if sb[j] == tb[j] && dp[j] < dp[j+1] {
			dp[j+1] = dp[j]
		}
		sn := int32(0)
		tn := int32(0)
		for k := j; k < n; k++ {
			sn = trie[sn][sb[k]-'a']
			tn = trie[tn][tb[k]-'a']
			if sn < 0 || tn < 0 {
				break
			}
			x := idAt[sn]
			y := idAt[tn]
			if x >= 0 && y >= 0 && dist[x][y] < inf && dp[j]+dist[x][y] < dp[k+1] {
				dp[k+1] = dp[j] + dist[x][y]
			}
		}
	}
	if dp[n] >= inf {
		return -1
	}
	return dp[n]
}
