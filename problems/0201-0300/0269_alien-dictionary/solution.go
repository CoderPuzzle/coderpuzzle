import "strings"

func alienOrder(words []string) string {
	const A = 26
	present := make([]bool, A)
	for _, w := range words {
		for i := 0; i < len(w); i++ {
			present[w[i]-'a'] = true
		}
	}
	total := 0
	for c := 0; c < A; c++ {
		if present[c] {
			total++
		}
	}

	adj := make([][]bool, A)
	for i := range adj {
		adj[i] = make([]bool, A)
	}
	indeg := make([]int, A)
	for i := 0; i+1 < len(words); i++ {
		prev, nxt := words[i], words[i+1]
		if len(prev) > len(nxt) && strings.HasPrefix(prev, nxt) {
			return "" // longer word before its own prefix -> invalid
		}
		m := len(prev)
		if len(nxt) < m {
			m = len(nxt)
		}
		for j := 0; j < m; j++ {
			a, b := prev[j]-'a', nxt[j]-'a'
			if a != b {
				if !adj[a][b] {
					adj[a][b] = true
					indeg[b]++
				}
				break
			}
		}
	}

	// Kahn's algorithm always taking the smallest available letter
	// (equivalent to a min-heap of ready characters).
	done := make([]bool, A)
	order := make([]byte, 0, total)
	for count := 0; count < total; count++ {
		ch := -1
		for c := 0; c < A; c++ {
			if present[c] && !done[c] && indeg[c] == 0 {
				ch = c
				break
			}
		}
		if ch < 0 {
			return "" // cycle -> invalid
		}
		done[ch] = true
		order = append(order, byte('a'+ch))
		for nb := 0; nb < A; nb++ {
			if adj[ch][nb] {
				indeg[nb]--
			}
		}
	}
	return string(order)
}
