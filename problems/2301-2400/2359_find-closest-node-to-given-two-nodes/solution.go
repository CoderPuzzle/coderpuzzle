import "math"

// One outgoing edge per node means the walk is forced; a node already
// seen marks the cycle, so stop there. math.MaxInt32 is the INF marker.
func distances(edges []int, start int) []int {
	distance := make([]int, len(edges))
	for i := range distance {
		distance[i] = math.MaxInt32
	}
	steps, current := 0, start
	for current != -1 && distance[current] == math.MaxInt32 {
		distance[current] = steps
		current = edges[current]
		steps++
	}
	return distance
}

func closestMeetingNode(edges []int, node1 int, node2 int) int {
	from1 := distances(edges, node1)
	from2 := distances(edges, node2)
	bestNode, bestMax := -1, -1                // bestMax only meaningful once bestNode != -1
	for node := 0; node < len(edges); node++ { // ascending: ties keep the smaller
		if from1[node] == math.MaxInt32 || from2[node] == math.MaxInt32 {
			continue
		}
		reachMax := max(from1[node], from2[node])
		if bestNode == -1 || reachMax < bestMax {
			bestNode, bestMax = node, reachMax
		}
	}
	return bestNode
}
