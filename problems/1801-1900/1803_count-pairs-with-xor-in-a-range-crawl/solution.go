// The range condition splits into two "at most" counts: the answer is
// f(high) - f(low - 1), where f(K) counts earlier values y with x XOR y <= K.
// Every value fits in 15 bits (2 * 10^4 < 2^15), so the trie walks 15 levels,
// top bit first. Children of node live at 2*node and 2*node+1 in next; each
// element is counted against the trie before it is inserted, so every
// unordered pair is counted exactly once.
func countPairs(nums []int, low int, high int) int {
	next := []int{-1, -1}
	cnt := []int{0}
	answer := 0
	for _, x := range nums {
		answer += countAtMost(next, cnt, x, high)
		answer -= countAtMost(next, cnt, x, low-1)
		node := 0
		for b := 14; b >= 0; b-- {
			d := (x >> b) & 1
			if next[2*node+d] == -1 {
				next[2*node+d] = len(cnt)
				next = append(next, -1, -1)
				cnt = append(cnt, 0)
			}
			node = next[2*node+d]
			cnt[node]++
		}
	}
	return answer
}

// countAtMost returns the number of trie values y with x XOR y <= k: a 1 bit
// of k counts the whole subtree that keeps the xor prefix equal so far (the
// remaining suffix is then strictly smaller) and descends the other child,
// while a 0 bit only lets the matching child continue.
func countAtMost(next []int, cnt []int, x int, k int) int {
	node, total := 0, 0
	for b := 14; b >= 0; b-- {
		xb := (x >> b) & 1
		if (k>>b)&1 == 1 {
			if next[2*node+xb] != -1 {
				total += cnt[next[2*node+xb]]
			}
			node = next[2*node+1-xb]
		} else {
			node = next[2*node+xb]
		}
		if node == -1 {
			return total
		}
	}
	return total + cnt[node]
}
