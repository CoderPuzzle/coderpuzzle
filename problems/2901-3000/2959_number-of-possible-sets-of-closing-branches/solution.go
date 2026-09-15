// Enumerate every closing set in a bitmask: seed one matrix with the minimum
// weight per pair (multiple roads are allowed), copy it per mask, and relax
// only through branches that survive — a shortest path between survivors
// never needs a closed intermediate. The set counts when every surviving pair
// is within maxDistance, and leaving zero or one branch alive passes
// vacuously.
func numberOfSets(n int, maxDistance int, roads [][]int) int {
	const inf = 100000000 // above any legal maxDistance; inf + inf fits an int
	weight := make([][]int, n)
	for i := range weight {
		weight[i] = make([]int, n)
		for j := range weight[i] {
			weight[i][j] = inf
		}
		weight[i][i] = 0
	}
	for _, road := range roads {
		if road[2] < weight[road[0]][road[1]] {
			weight[road[0]][road[1]] = road[2]
			weight[road[1]][road[0]] = road[2]
		}
	}
	count := 0
	for closed := 0; closed < 1<<n; closed++ {
		dist := make([][]int, n)
		for i := range dist {
			dist[i] = append([]int(nil), weight[i]...)
		}
		for k := 0; k < n; k++ {
			if closed>>k&1 != 0 {
				continue
			}
			for i := 0; i < n; i++ {
				through := dist[i][k]
				if through >= inf {
					continue
				}
				for j := 0; j < n; j++ {
					if through+dist[k][j] < dist[i][j] {
						dist[i][j] = through + dist[k][j]
					}
				}
			}
		}
		ok := true
		for i := 0; ok && i < n; i++ {
			if closed>>i&1 != 0 {
				continue
			}
			for j := 0; j < n; j++ {
				if closed>>j&1 == 0 && dist[i][j] > maxDistance {
					ok = false
					break
				}
			}
		}
		if ok {
			count++
		}
	}
	return count
}
