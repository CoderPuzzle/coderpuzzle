func mergeTriplets(triplets [][]int, target []int) bool {
	// Drop overshooters; the survivors' componentwise max is the
	// best-reachable triplet.
	var best [3]int
	for _, t := range triplets {
		if t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2] {
			for i := 0; i < 3; i++ {
				best[i] = max(best[i], t[i])
			}
		}
	}
	return best[0] == target[0] && best[1] == target[1] && best[2] == target[2]
}
