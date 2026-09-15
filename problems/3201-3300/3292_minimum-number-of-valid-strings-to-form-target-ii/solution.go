// dp[p] is the minimum number of valid strings forming target[:p]; dp[0] is 0
// and every other cell starts out unreachable. An Aho-Corasick automaton over
// words turns one left-to-right scan of target into, at each index j, the
// length of the longest suffix of target[:j+1] that is a prefix of some word:
// every automaton state lies on a trie path, so that length is simply the
// state's depth. A piece ending at j + 1 therefore starts somewhere inside its
// last r positions, and a min segment tree over finalized dp cells answers
// each such window in O(log n): point-update dp[j + 1], then move on. The
// scan stops dead the moment a character extends no word prefix at all -
// nothing beyond that position is reachable, so the answer is -1 unless the
// full length was formed. All values fit an int.
func minValidStrings(words []string, target string) int {
	children := []map[byte]int{{}}
	fail := []int{0}
	for _, word := range words {
		cur := 0
		for k := 0; k < len(word); k++ {
			ch := word[k]
			nxt, ok := children[cur][ch]
			if !ok {
				children = append(children, map[byte]int{})
				fail = append(fail, 0)
				nxt = len(children) - 1
				children[cur][ch] = nxt
			}
			cur = nxt
		}
	}
	bfs := make([]int, 0, len(children))
	for _, v := range children[0] {
		bfs = append(bfs, v)
	}
	for head := 0; head < len(bfs); head++ {
		u := bfs[head]
		for ch, v := range children[u] {
			f := fail[u]
			for f > 0 {
				if _, ok := children[f][ch]; ok {
					break
				}
				f = fail[f]
			}
			nf, ok := children[f][ch]
			if !ok {
				nf = 0
			}
			if nf == v {
				nf = 0
			}
			fail[v] = nf
			bfs = append(bfs, v)
		}
	}
	depth := make([]int, len(children))
	for u := range children {
		for _, v := range children[u] {
			depth[v] = depth[u] + 1
		}
	}
	const inf = 1 << 30
	n := len(target)
	size := 1
	for size < n+2 {
		size <<= 1
	}
	tree := make([]int, 2*size)
	for i := range tree {
		tree[i] = inf
	}
	update := func(i, value int) {
		i += size
		tree[i] = value
		for i >>= 1; i > 0; i >>= 1 {
			tree[i] = min(tree[2*i], tree[2*i+1])
		}
	}
	query := func(lo, hi int) int {
		res := inf
		lo += size
		hi += size
		for ; lo < hi; lo, hi = lo>>1, hi>>1 {
			if lo&1 != 0 {
				if tree[lo] < res {
					res = tree[lo]
				}
				lo++
			}
			if hi&1 != 0 {
				hi--
				if tree[hi] < res {
					res = tree[hi]
				}
			}
		}
		return res
	}
	update(0, 0)
	cur := 0
	for j := 0; j < n; j++ {
		ch := target[j]
		for cur > 0 {
			if _, ok := children[cur][ch]; ok {
				break
			}
			cur = fail[cur]
		}
		nxt, ok := children[cur][ch]
		if !ok {
			cur = 0
		} else {
			cur = nxt
		}
		if cur == 0 {
			return -1
		}
		lo := j + 1 - depth[cur]
		if lo < 0 {
			lo = 0
		}
		best := query(lo, j+1)
		if best != inf {
			update(j+1, best+1)
		}
	}
	ans := query(n, n+1)
	if ans >= inf {
		return -1
	}
	return ans
}
