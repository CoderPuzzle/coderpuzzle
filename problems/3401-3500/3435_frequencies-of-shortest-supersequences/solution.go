import "sort"

func supersequences(words []string) [][]int {
	charSet := map[byte]bool{}
	for _, w := range words {
		charSet[w[0]] = true
		charSet[w[1]] = true
	}
	chars := make([]byte, 0, len(charSet))
	for c := range charSet {
		chars = append(chars, c)
	}
	sort.Slice(chars, func(i, j int) bool { return chars[i] < chars[j] })
	m := len(chars)

	idx := make([]int, 26)
	for i, c := range chars {
		idx[c-'a'] = i
	}

	forced := 0
	type epair struct{ a, b int }
	var nonSelf []epair
	for _, w := range words {
		a := idx[w[0]-'a']
		b := idx[w[1]-'a']
		if w[0] == w[1] {
			forced |= 1 << a
		} else {
			nonSelf = append(nonSelf, epair{a, b})
		}
	}

	adj := make([][]int, m)
	state := make([]int, m) // 0 unvisited, 1 visiting, 2 done
	var dfs func(c int) bool
	dfs = func(c int) bool {
		state[c] = 1
		for _, nxt := range adj[c] {
			if state[nxt] == 1 {
				return true
			}
			if state[nxt] == 0 && dfs(nxt) {
				return true
			}
		}
		state[c] = 2
		return false
	}
	// Induced subgraph on chars not in t must be acyclic.
	isDag := func(t int) bool {
		for i := 0; i < m; i++ {
			adj[i] = adj[i][:0]
			state[i] = 0
		}
		for _, e := range nonSelf {
			if (t>>e.a)&1 == 0 && (t>>e.b)&1 == 0 {
				adj[e.a] = append(adj[e.a], e.b)
			}
		}
		for c := 0; c < m; c++ {
			if (t>>c)&1 != 0 {
				continue
			}
			if state[c] == 0 && dfs(c) {
				return false
			}
		}
		return true
	}

	bestLen := -1
	var results [][]int
	for mask := 0; mask < 1<<m; mask++ {
		if forced&mask != forced {
			continue
		}
		if !isDag(mask) {
			continue
		}
		length := m
		t := mask
		for t != 0 {
			length += t & 1
			t >>= 1
		}
		freq := make([]int, 26)
		for i, c := range chars {
			if (mask>>i)&1 != 0 {
				freq[c-'a'] = 2
			} else {
				freq[c-'a'] = 1
			}
		}
		if bestLen == -1 || length < bestLen {
			bestLen = length
			results = results[:0]
			results = append(results, freq)
		} else if length == bestLen {
			results = append(results, freq)
		}
	}

	sort.Slice(results, func(i, j int) bool {
		for x := 0; x < 26; x++ {
			if results[i][x] != results[j][x] {
				return results[i][x] < results[j][x]
			}
		}
		return false
	})
	out := [][]int{}
	for _, f := range results {
		if len(out) == 0 {
			out = append(out, f)
			continue
		}
		last := out[len(out)-1]
		same := true
		for x := 0; x < 26; x++ {
			if last[x] != f[x] {
				same = false
				break
			}
		}
		if !same {
			out = append(out, f)
		}
	}
	return out
}
