// Values only reach 50, so track ancestors per value: on the current root
// path, stacks[v] holds the nodes carrying value v, deepest last. A node's
// answer is the deepest stack top among the values coprime with its own.
func getCoprimes(nums []int, edges [][]int) []int {
	n := len(nums)
	adj := make([][]int, n)
	for _, edge := range edges {
		adj[edge[0]] = append(adj[edge[0]], edge[1])
		adj[edge[1]] = append(adj[edge[1]], edge[0])
	}
	coprimes := make([][]int, 51)
	for v := 1; v <= 50; v++ {
		for w := 1; w <= 50; w++ {
			if gcd(v, w) == 1 {
				coprimes[v] = append(coprimes[v], w)
			}
		}
	}

	ans := make([]int, n)
	depth := make([]int, n)
	stacks := make([][]int, 51)
	// The tree can be one 1e5-deep chain, so the traversal is iterative:
	// enter frames answer a node against the current stacks and push it
	// onto its value's stack, exit frames pop it again.
	type frame struct {
		node, parent int
		leaving      bool
	}
	frames := []frame{{node: 0, parent: -1}}
	for len(frames) > 0 {
		f := frames[len(frames)-1]
		frames = frames[:len(frames)-1]
		if f.leaving {
			value := stacks[nums[f.node]]
			stacks[nums[f.node]] = value[:len(value)-1]
			continue
		}
		best, bestDepth := -1, -1
		for _, w := range coprimes[nums[f.node]] {
			candidates := stacks[w]
			if len(candidates) > 0 {
				top := candidates[len(candidates)-1]
				if depth[top] > bestDepth {
					best, bestDepth = top, depth[top]
				}
			}
		}
		ans[f.node] = best
		stacks[nums[f.node]] = append(stacks[nums[f.node]], f.node)
		frames = append(frames, frame{node: f.node, parent: f.parent, leaving: true})
		for _, y := range adj[f.node] {
			if y != f.parent {
				depth[y] = depth[f.node] + 1
				frames = append(frames, frame{node: y, parent: f.node})
			}
		}
	}
	return ans
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
