import "math"

func finishTime(n int, edges [][]int, baseTime []int) int64 {
	// Rerooting DP: down[] finishes each side with the parent direction
	// excluded, up[] mirrors the value flowing back from the parent side.
	// Answers reach n * max(baseTime) = 10^10, so all values stay int64.
	graph := make([][]int, n)
	for _, edge := range edges {
		u, v := edge[0], edge[1]
		graph[u] = append(graph[u], v)
		graph[v] = append(graph[v], u)
	}
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	parent[0] = -2
	order := make([]int, 0, n)
	order = append(order, 0)
	for head := 0; head < len(order); head++ {
		node := order[head]
		for _, next := range graph[node] {
			if parent[next] == -1 {
				parent[next] = node
				order = append(order, next)
			}
		}
	}
	down := make([]int64, n)
	for idx := n - 1; idx >= 0; idx-- {
		v := order[idx]
		low, high := int64(0), int64(0) // smallest / largest finish among children
		found := false
		for _, w := range graph[v] {
			if w == parent[v] {
				continue
			}
			value := down[w]
			if !found {
				low, high, found = value, value, true
				continue
			}
			if value < low {
				low = value
			}
			if value > high {
				high = value
			}
		}
		// A leaf role stops at the task's own duration.
		if !found {
			down[v] = int64(baseTime[v])
		} else {
			down[v] = high + (high - low) + int64(baseTime[v])
		}
	}
	up := make([]int64, n)
	best := int64(math.MaxInt64)
	for step := 0; step < n; step++ {
		v := order[step]
		type childSlot struct {
			child int
			slot  int
		}
		incoming := make([]int64, 0, len(graph[v])+1)
		pairs := make([]childSlot, 0, len(graph[v]))
		for _, w := range graph[v] {
			if w != parent[v] {
				pairs = append(pairs, childSlot{w, len(incoming)})
				incoming = append(incoming, down[w])
			}
		}
		if v != 0 {
			incoming = append(incoming, up[v])
		}
		if len(incoming) == 0 {
			return int64(baseTime[v]) // n == 1: lone task as root
		}
		// Two smallest / two largest entries, positions kept apart so one
		// branch can be excluded without losing a duplicated extreme.
		const inf = int64(math.MaxInt64)
		low1, low2, high1, high2 := inf, inf, -inf, -inf
		lowSlot, highSlot := -1, -1
		for i, value := range incoming {
			if value < low1 {
				low2 = low1
				low1 = value
				lowSlot = i
			} else if value < low2 {
				low2 = value
			}
			if value > high1 {
				high2 = high1
				high1 = value
				highSlot = i
			} else if value > high2 {
				high2 = value
			}
		}
		if candidate := high1 + (high1 - low1) + int64(baseTime[v]); candidate < best {
			best = candidate
		}
		for _, pair := range pairs {
			restLow := low1
			if pair.slot == lowSlot {
				restLow = low2
			}
			restHigh := high1
			if pair.slot == highSlot {
				restHigh = high2
			}
			if len(incoming) == 1 {
				// Without this branch the neighbour plays a leaf role.
				up[pair.child] = int64(baseTime[v])
			} else {
				up[pair.child] = restHigh + (restHigh - restLow) + int64(baseTime[v])
			}
		}
	}
	return best
}
