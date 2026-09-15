// Union every pair of points sharing an x or a y coordinate; the activation
// closure of any point is its component, and a new point touches at most two
// components, so join the two largest (or all, when there is one component).
func maxActivated(points [][]int) int {
	n := len(points)
	parent := make([]int, n)
	size := make([]int, n)
	for i := 0; i < n; i++ {
		parent[i] = i
		size[i] = 1
	}
	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	var unite func(int, int)
	unite = func(a, b int) {
		ra, rb := find(a), find(b)
		if ra == rb {
			return
		}
		if size[ra] < size[rb] {
			ra, rb = rb, ra
		}
		parent[rb] = ra
		size[ra] += size[rb]
	}
	xmap := map[int]int{}
	ymap := map[int]int{}
	for i, p := range points {
		x, y := p[0], p[1]
		if j, ok := xmap[x]; ok {
			unite(i, j)
		} else {
			xmap[x] = i
		}
		if j, ok := ymap[y]; ok {
			unite(i, j)
		} else {
			ymap[y] = i
		}
	}
	comp := map[int]int{}
	for i := 0; i < n; i++ {
		comp[find(i)]++
	}
	first, second := 0, 0
	for _, value := range comp {
		if value > first {
			second = first
			first = value
		} else if value > second {
			second = value
		}
	}
	if len(comp) == 1 {
		return n + 1
	}
	return first + second + 1
}
