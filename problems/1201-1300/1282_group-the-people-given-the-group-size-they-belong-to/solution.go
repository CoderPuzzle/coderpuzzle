// Bucket ids by required size, then slice each bucket into chunks of
// exactly that size — the input guarantees each bucket divides evenly.
func groupThePeople(groupSizes []int) [][]int {
	buckets := map[int][]int{}
	for person, size := range groupSizes {
		buckets[size] = append(buckets[size], person)
	}
	groups := [][]int{}
	// A valid grouping exists, so every bucket length is a multiple of
	// its size and the slices come out even.
	for size, members := range buckets {
		for start := 0; start < len(members); start += size {
			groups = append(groups, append([]int(nil), members[start:start+size]...))
		}
	}
	return groups
}
