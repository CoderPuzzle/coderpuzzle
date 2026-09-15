import (
	"sort"
	"strings"
)

func phonePrefix(numbers []string) bool {
	// In sorted order a prefix relationship must surface between
	// neighbors: the shorter prefix sorts first, and anything
	// landing between them shares that prefix as well.
	sorted := append([]string(nil), numbers...)
	sort.Strings(sorted)
	for i := 0; i+1 < len(sorted); i++ {
		if strings.HasPrefix(sorted[i+1], sorted[i]) {
			return false
		}
	}
	return true
}
