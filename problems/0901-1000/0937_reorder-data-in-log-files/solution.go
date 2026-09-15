import (
	"sort"
	"strings"
)

// splitLog divides a log into its identifier and its content.
func splitLog(log string) (string, string) {
	space := strings.IndexByte(log, ' ')
	return log[:space], log[space+1:]
}

func reorderLogFiles(logs []string) []string {
	// Letter logs are set aside for the sort; digit logs keep their input
	// positions untouched.
	letter := make([]string, 0, len(logs))
	digit := make([]string, 0, len(logs))
	for _, log := range logs {
		_, content := splitLog(log)
		// The content's first character classifies the log: a digit
		// makes it a digit-log, which the sort never touches.
		if content[0] >= '0' && content[0] <= '9' {
			digit = append(digit, log)
		} else {
			letter = append(letter, log)
		}
	}
	// Letter-logs order by (content, identifier) — a total order, since
	// equal keys mean identical logs — then every digit-log follows in
	// its input position.
	sort.SliceStable(letter, func(i, j int) bool {
		identI, contentI := splitLog(letter[i])
		identJ, contentJ := splitLog(letter[j])
		if contentI != contentJ {
			return contentI < contentJ
		}
		return identI < identJ
	})
	return append(letter, digit...)
}
