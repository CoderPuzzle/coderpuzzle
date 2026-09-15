// Suffix automaton: each state v other than the root owns exactly the
// len[v] - len[link[v]] substrings in its endpos equivalence class, and
// every distinct substring belongs to exactly one class, so the answer is
// the sum of those class sizes. Clones created while splitting a transition
// are ordinary states and count the same way.
func countDistinct(s string) int {
	n := len(s)
	states := 2 * n
	length := make([]int, states)
	link := make([]int, states)
	for i := range link {
		link[i] = -1
	}
	// 0 doubles as "no transition": no edge ever points at the root.
	trans := make([][26]int, states)
	size := 1
	last := 0
	for i := 0; i < n; i++ {
		c := int(s[i] - 'a')
		cur := size
		size++
		length[cur] = length[last] + 1
		p := last
		for p != -1 && trans[p][c] == 0 {
			trans[p][c] = cur
			p = link[p]
		}
		if p == -1 {
			link[cur] = 0
		} else {
			q := trans[p][c]
			if length[p]+1 == length[q] {
				link[cur] = q
			} else {
				// q is too deep to be cur's suffix link: copy it as a
				// shallower clone, redirect the family's transitions,
				// then hang both q and cur under the clone.
				clone := size
				size++
				length[clone] = length[p] + 1
				link[clone] = link[q]
				trans[clone] = trans[q]
				for p != -1 && trans[p][c] == q {
					trans[p][c] = clone
					p = link[p]
				}
				link[q] = clone
				link[cur] = clone
			}
		}
		last = cur
	}
	answer := 0
	for v := 1; v < size; v++ {
		answer += length[v] - length[link[v]]
	}
	return answer
}
