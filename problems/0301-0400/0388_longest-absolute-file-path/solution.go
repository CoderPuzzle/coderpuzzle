import "strings"

// depths[d] is the absolute-path length of the most recent entry seen at
// depth d; a name at depth d extends the entry at depth d - 1.
func lengthLongestPath(input string) int {
	depths := []int{0}
	longest := 0
	for _, token := range strings.Split(input, "\n") {
		name := strings.TrimLeft(token, "\t")
		depth := len(token) - len(name)
		// The path to this entry is its parent's path, one '/' separator,
		// then the name itself (the root level has no separator).
		path := len(name)
		if depth > 0 {
			path += depths[depth-1] + 1
		}
		if depth < len(depths) {
			depths[depth] = path
		} else {
			depths = append(depths, path)
		}
		// Files are exactly the names that contain a dot.
		if strings.Contains(name, ".") {
			longest = max(longest, path)
		}
	}
	return longest
}
