import (
	"sort"
	"strings"
)

func suggestedProducts(products []string, searchWord string) [][]string {
	// lexicographic order makes every shared prefix a contiguous run
	sorted := append([]string(nil), products...)
	sort.Strings(sorted)
	result := [][]string{}
	prefix := ""
	for _, ch := range searchWord {
		// grow the prefix one typed character at a time
		prefix += string(ch)
		// lower bound: where the run of words >= prefix begins
		i := sort.SearchStrings(sorted, prefix)
		suggestions := []string{}
		// first three of the run; stop at the first word not sharing the
		// prefix — cost is independent of run length
		for j := i; j < len(sorted) && len(suggestions) < 3; j++ {
			if strings.HasPrefix(sorted[j], prefix) {
				suggestions = append(suggestions, sorted[j])
			} else {
				break
			}
		}
		result = append(result, suggestions)
	}
	return result
}
