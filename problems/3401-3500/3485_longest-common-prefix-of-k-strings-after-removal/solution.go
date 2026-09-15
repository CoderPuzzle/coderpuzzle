func longestCommonPrefix(words []string, k int) []int {
	n := len(words)
	// With one word gone there are fewer than k words, so no prefix survives.
	if n-1 < k {
		return make([]int, n)
	}

	total := 0
	maxLen := 0
	for _, w := range words {
		total += len(w)
		if len(w) > maxLen {
			maxLen = len(w)
		}
	}
	capNodes := total + 1
	children := make([]int, capNodes*26)
	for i := range children {
		children[i] = -1
	}
	cnt := make([]int, capNodes)
	depth := make([]int, capNodes)
	nodes := 1
	// A trie node at depth d is a prefix of length d shared by cnt words.
	for _, w := range words {
		cur := 0
		cnt[0]++
		for i := 0; i < len(w); i++ {
			idx := cur*26 + int(w[i]-'a')
			if children[idx] == -1 {
				children[idx] = nodes
				depth[nodes] = depth[cur] + 1
				nodes++
			}
			cur = children[idx]
			cnt[cur]++
		}
	}

	top1 := make([]int, maxLen+1)
	top2 := make([]int, maxLen+1)
	for i := range top1 {
		top1[i] = -1
		top2[i] = -1
	}
	// Keep the two distinct nodes per depth with cnt >= k: if the removed
	// word's path covers the best one, the second is still off that path.
	for node := 0; node < nodes; node++ {
		if cnt[node] >= k {
			d := depth[node]
			if top1[d] == -1 {
				top1[d] = node
			} else if top2[d] == -1 {
				top2[d] = node
			}
		}
	}
	var depths []int
	for d := maxLen; d >= 0; d-- {
		if top1[d] != -1 {
			depths = append(depths, d)
		}
	}

	stamp := make([]int, nodes)
	ans := make([]int, n)
	for wi := 0; wi < n; wi++ {
		w := words[wi]
		tag := wi + 1
		// A unique timestamp marks this word's trie path; old marks never match.
		stamp[0] = tag
		cur := 0
		big := 0
		// On-path node survives the removal only with cnt >= k + 1.
		for i := 0; i < len(w); i++ {
			cur = children[cur*26+int(w[i]-'a')]
			stamp[cur] = tag
			if cnt[cur] >= k+1 && depth[cur] > big {
				big = depth[cur]
			}
		}
		fb := 0
		// Deepest off-path depth: top2 exists there, or top1 is off the path.
		for _, d := range depths {
			if top2[d] != -1 {
				fb = d
				break
			}
			if stamp[top1[d]] != tag {
				fb = d
				break
			}
		}
		if big > fb {
			ans[wi] = big
		} else {
			ans[wi] = fb
		}
	}
	return ans
}
