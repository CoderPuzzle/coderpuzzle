// Track only the current depth: "../" backs up (never below the main
// folder), "./" is a no-op, and any other entry descends into a named
// child folder. The final depth is exactly the number of "../" moves
// needed to return to the main folder.
func minOperations(logs []string) int {
	depth := 0
	for _, log := range logs {
		if log == "../" {
			if depth > 0 {
				depth--
			}
		} else if log == "./" {
			continue
		} else {
			depth++
		}
	}
	return depth
}
