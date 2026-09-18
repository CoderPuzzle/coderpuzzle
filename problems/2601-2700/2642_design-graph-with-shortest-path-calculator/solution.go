package main

type Graph struct {
	adjacency [][][2]int
}

func NewGraphTyped(n int, edges [][]int) *Graph {
	// Edges are only appended, never removed or reweighted, so a
	// plain adjacency list never needs invalidating or rebuilding.
	graph := &Graph{adjacency: make([][][2]int, n)}
	for _, edge := range edges {
		graph.addEdge(edge)
	}
	return graph
}

func (design *Graph) addEdge(edge []int) {
	source, target, cost := edge[0], edge[1], edge[2]
	design.adjacency[source] = append(design.adjacency[source], [2]int{target, cost})
}

// minHeap orders (distance, node) pairs by distance. Sift up on push,
// sift down on pop — the classic array-backed binary heap.
type minHeap [][2]int

func (heap *minHeap) push(item [2]int) {
	*heap = append(*heap, item)
	for child := len(*heap) - 1; child > 0; {
		parent := (child - 1) / 2
		if (*heap)[parent][0] <= (*heap)[child][0] {
			break
		}
		(*heap)[parent], (*heap)[child] = (*heap)[child], (*heap)[parent]
		child = parent
	}
}

func (heap *minHeap) pop() [2]int {
	top := (*heap)[0]
	size := len(*heap) - 1
	(*heap)[0] = (*heap)[size]
	*heap = (*heap)[:size]
	for parent := 0; ; {
		left := 2*parent + 1
		if left >= size {
			break
		}
		smallest := left
		if right := left + 1; right < size && (*heap)[right][0] < (*heap)[left][0] {
			smallest = right
		}
		if (*heap)[parent][0] <= (*heap)[smallest][0] {
			break
		}
		(*heap)[parent], (*heap)[smallest] = (*heap)[smallest], (*heap)[parent]
		parent = smallest
	}
	return top
}

func (design *Graph) shortestPath(node1 int, node2 int) int {
	if node1 == node2 {
		return 0
	}
	// Every cost is positive, so Dijkstra applies: the min-heap
	// hands out nodes in settle order by tentative distance.
	const unreachable = int(^uint(0) >> 1)
	distance := make([]int, len(design.adjacency))
	for i := range distance {
		distance[i] = unreachable
	}
	distance[node1] = 0
	queue := &minHeap{{0, node1}}
	for len(*queue) > 0 {
		item := queue.pop()
		// Stale entry: the node was already settled through a
		// cheaper route, so skip it.
		if item[0] > distance[item[1]] {
			continue
		}
		// Popping node2 settles it, so its distance is final here.
		if item[1] == node2 {
			return item[0]
		}
		for _, edge := range design.adjacency[item[1]] {
			candidate := item[0] + edge[1]
			// Only improving relaxations push a fresh entry, so any
			// entry goes stale at most once.
			if candidate < distance[edge[0]] {
				distance[edge[0]] = candidate
				queue.push([2]int{candidate, edge[0]})
			}
		}
	}
	return -1
}
