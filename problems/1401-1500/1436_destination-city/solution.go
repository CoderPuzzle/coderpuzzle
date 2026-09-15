func destCity(paths [][]string) string {
	sources := make(map[string]bool, len(paths))
	for _, path := range paths {
		sources[path[0]] = true
	}
	for _, path := range paths {
		if !sources[path[1]] {
			return path[1]
		}
	}
	return ""
}
