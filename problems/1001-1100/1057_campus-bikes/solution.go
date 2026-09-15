import "sort"

// Build one (distance, worker index, bike index) triple per pair and sort
// ascending by distance, then worker index, then bike index — exactly the
// tie-break the statement specifies. Walking the sorted triples and
// assigning the first time both sides are still free reproduces the
// statement's own greedy process.
func assignBikes(workers [][]int, bikes [][]int) []int {
	abs := func(x int) int {
		if x < 0 {
			return -x
		}
		return x
	}
	n := len(workers)
	m := len(bikes)
	type triple struct {
		distance, worker, bike int
	}
	triples := make([]triple, 0, n*m)
	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			distance := abs(workers[i][0]-bikes[j][0]) + abs(workers[i][1]-bikes[j][1])
			triples = append(triples, triple{distance, i, j})
		}
	}
	sort.Slice(triples, func(a, b int) bool {
		if triples[a].distance != triples[b].distance {
			return triples[a].distance < triples[b].distance
		}
		if triples[a].worker != triples[b].worker {
			return triples[a].worker < triples[b].worker
		}
		return triples[a].bike < triples[b].bike
	})

	result := make([]int, n)
	for i := range result {
		result[i] = -1
	}
	usedBike := make([]bool, m)
	assigned := 0
	for _, t := range triples {
		if result[t.worker] != -1 || usedBike[t.bike] {
			continue
		}
		result[t.worker] = t.bike
		usedBike[t.bike] = true
		assigned++
		if assigned == n {
			break
		}
	}
	return result
}
