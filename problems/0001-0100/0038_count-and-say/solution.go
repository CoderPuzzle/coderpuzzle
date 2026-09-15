import (
	"strconv"
	"strings"
)

func countAndSay(n int) string {
	// The first term is fixed; each later term is the run-length encoding of
	// the one before it, so n-1 encoding passes reach the nth term.
	term := "1"
	for step := 1; step < n; step++ {
		var next strings.Builder
		index := 0
		for index < len(term) {
			// Measure the maximal run starting at index: the group the
			// encoder must emit as <count><digit>, then skip past it.
			run := 1
			for index+run < len(term) && term[index+run] == term[index] {
				run++
			}
			next.WriteString(strconv.Itoa(run))
			next.WriteByte(term[index])
			index += run
		}
		term = next.String()
	}
	return term
}
