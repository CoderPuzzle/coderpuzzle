func countPairs(nums []int, low int, high int) int {
	total := pairsLe(nums, high)
	if low > 0 {
		total -= pairsLe(nums, low-1)
	}
	return total
}

func pairsLe(nums []int, k int) int {
	const bits = 16
	maxNodes := len(nums)*bits + 2
	child := make([][2]int, maxNodes) // 0 = none, root = 1
	count := make([]int, maxNodes)
	nodes := 1
	total := 0
	for _, x := range nums {
		// Query the trie of previously inserted numbers.
		node := 1
		for b := bits - 1; b >= 0 && node != 0; b-- {
			xb := (x >> b) & 1
			if (k>>b)&1 == 1 {
				c := child[node][xb]
				if c != 0 {
					total += count[c]
				}
				node = child[node][1-xb]
			} else {
				node = child[node][xb]
			}
		}
		if node != 0 {
			total += count[node]
		}
		// Insert x.
		count[1]++
		node = 1
		for b := bits - 1; b >= 0; b-- {
			d := (x >> b) & 1
			nxt := child[node][d]
			if nxt == 0 {
				nodes++
				nxt = nodes
				child[node][d] = nxt
			}
			node = nxt
			count[node]++
		}
	}
	return total
}
