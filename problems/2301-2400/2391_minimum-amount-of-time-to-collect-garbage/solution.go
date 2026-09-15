func garbageCollection(garbage []string, travel []int) int {
	// Every unit costs one pickup minute; each truck drives exactly to
	// the last house holding its type. Track those last indices, then
	// add prefix travel once per type that appears past house 0.
	minutes := 0
	last := map[byte]int{'M': -1, 'P': -1, 'G': -1}
	for i, g := range garbage {
		minutes += len(g)
		for j := 0; j < len(g); j++ {
			last[g[j]] = i
		}
	}
	prefix := 0
	for i := 1; i < len(garbage); i++ {
		prefix += travel[i-1]
		for _, t := range []byte{'M', 'P', 'G'} {
			if last[t] == i {
				minutes += prefix
				last[t] = -1
			}
		}
	}
	return minutes
}
