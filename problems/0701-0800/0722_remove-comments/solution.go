import "strings"

// Each comment is decided by reading order — line by line, left to right,
// first marker wins — so one pass with a single flag (inside a block comment)
// and one buffer for the line under construction is the whole computation.
// Entering or leaving a comment skips two characters, so the closer of "/*/"
// never overlaps its opener. The buffer flushes only when a line ends outside
// a block: an emptied line is dropped, code before an opener joins code after
// its closer. Non-nil so an all-comment source serializes as [].
func removeComments(source []string) []string {
	result := []string{}
	var buffer strings.Builder
	inBlock := false
	for _, line := range source {
		i := 0
		for i < len(line) {
			if inBlock {
				if i+1 < len(line) && line[i] == '*' && line[i+1] == '/' {
					inBlock = false
					i += 2
				} else {
					i++
				}
			} else if i+1 < len(line) && line[i] == '/' && line[i+1] == '/' {
				break
			} else if i+1 < len(line) && line[i] == '/' && line[i+1] == '*' {
				inBlock = true
				i += 2
			} else {
				buffer.WriteByte(line[i])
				i++
			}
		}
		if !inBlock {
			if buffer.Len() > 0 {
				result = append(result, buffer.String())
			}
			buffer.Reset()
		}
	}
	return result
}
