import "strings"

// Splitting on "/" turns repeated and edge slashes into empty segments and
// hands each directory to the loop as one candidate, so only the dot rules
// remain to apply.
func simplifyPath(path string) string {
	var stack []string
	for _, segment := range strings.Split(path, "/") {
		switch segment {
		case "..":
			// One level up: drop the last name pushed. An empty stack is
			// the root, where going up is not possible, so it stays empty.
			if len(stack) > 0 {
				stack = stack[:len(stack)-1]
			}
		case ".", "":
			// "." is the current directory, "" a repeated or edge slash.
		default:
			// Every other segment, "..." and "...." included, is a name.
			stack = append(stack, segment)
		}
	}
	// A leading slash plus exactly one slash between the survivors; joining
	// an empty stack leaves the leading slash alone as the root.
	return "/" + strings.Join(stack, "/")
}
