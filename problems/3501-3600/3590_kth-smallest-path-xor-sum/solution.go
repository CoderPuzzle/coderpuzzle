import "sort"

// Path XOR root -> node, then bottom-up small-to-large merging of sorted
// distinct XOR lists: a subtree's list is its largest child's list
// (reused) grown by the node's own value and every other child's distinct
// values, so each element only moves into lists that keep doubling. A
// small child (under 64 values) splices element-by-element — binary
// search plus one contiguous insert — while a large child folds in with a
// single two-pointer pass that dedupes as it goes. Queries are grouped by
// node and answered by indexing the final list at k - 1, or -1 past the
// end. The tree can be a 5 * 10^4-node chain, so the DFS is an explicit
// stack.
func kthSmallest(par []int, vals []int, queries [][]int) []int {
	n := len(vals)
	children := make([][]int, n)
	for node := 1; node < n; node++ {
		children[par[node]] = append(children[par[node]], node)
	}
	order := make([]int, 0, n) // preorder: every parent precedes its children
	path := make([]int, n)
	stack := []int{0}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, node)
		if node > 0 {
			path[node] = vals[node] ^ path[par[node]]
		} else {
			path[node] = vals[node]
		}
		stack = append(stack, children[node]...)
	}
	byNode := make([][][2]int, n) // node -> {k, query index}
	for j, query := range queries {
		u, k := query[0], query[1]
		byNode[u] = append(byNode[u], [2]int{k, j})
	}
	answers := make([]int, len(queries))
	lists := make([][]int, n)
	for t := n - 1; t >= 0; t-- {
		node := order[t]
		kids := children[node]
		base := -1
		for _, child := range kids {
			if base < 0 || len(lists[child]) > len(lists[base]) {
				base = child
			}
		}
		var acc []int
		if base >= 0 {
			acc = lists[base]
		}
		own := path[node]
		pos := sort.SearchInts(acc, own)
		if pos == len(acc) || acc[pos] != own {
			acc = append(acc, 0)
			copy(acc[pos+1:], acc[pos:])
			acc[pos] = own
		}
		for _, child := range kids {
			if child == base {
				continue
			}
			small := lists[child]
			if len(small) >= 64 {
				merged := make([]int, 0, len(acc)+len(small)) // two-pointer pass
				i, j := 0, 0
				for i < len(acc) && j < len(small) {
					if acc[i] < small[j] {
						merged = append(merged, acc[i])
						i++
					} else if small[j] < acc[i] {
						merged = append(merged, small[j])
						j++
					} else {
						merged = append(merged, acc[i])
						i++
						j++
					}
				}
				merged = append(merged, acc[i:]...)
				merged = append(merged, small[j:]...)
				acc = merged
			} else {
				for _, value := range small {
					pos := sort.SearchInts(acc, value)
					if pos == len(acc) || acc[pos] != value {
						acc = append(acc, 0)
						copy(acc[pos+1:], acc[pos:])
						acc[pos] = value
					}
				}
			}
		}
		lists[node] = acc
		for _, q := range byNode[node] {
			if q[0] <= len(acc) {
				answers[q[1]] = acc[q[0]-1]
			} else {
				answers[q[1]] = -1
			}
		}
	}
	return answers
}
