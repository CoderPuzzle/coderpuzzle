// Max segment tree over basket indices: each node holds the largest capacity
// still free in its range, so "any basket here fits?" is one comparison and
// the leftmost such basket is a root-to-leaf walk that keeps left whenever
// the left subtree can still fit the fruit.
func numOfUnplacedFruits(fruits []int, baskets []int) int {
	n := len(baskets)
	size := 1
	for size < n {
		size *= 2
	}
	tree := make([]int, 2*size)
	for j, capacity := range baskets {
		tree[size+j] = capacity
	}
	for i := size - 1; i > 0; i-- {
		tree[i] = max(tree[2*i], tree[2*i+1])
	}
	unplaced := 0
	for _, quantity := range fruits {
		if tree[1] < quantity {
			// even the global maximum is too small: nothing fits anywhere
			unplaced++
			continue
		}
		node := 1
		for node < size {
			node *= 2
			if tree[node] < quantity {
				node++
			}
		}
		// retire the basket: 0 sits below every legal capacity
		tree[node] = 0
		node /= 2
		for node > 0 {
			tree[node] = max(tree[2*node], tree[2*node+1])
			node /= 2
		}
	}
	return unplaced
}
