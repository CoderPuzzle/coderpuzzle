import (
	"sort"
	"strconv"
	"strings"
)

func subdomainVisits(cpdomains []string) []string {
	// One pass: each entry fans its count out over every dot-suffix of
	// its domain — the domain itself and each subdomain cut at a dot.
	counts := make(map[string]int)
	for _, cpdomain := range cpdomains {
		space := strings.IndexByte(cpdomain, ' ')
		rep, _ := strconv.Atoi(cpdomain[:space])
		domain := cpdomain[space+1:]
		from := 0
		for {
			counts[domain[from:]] += rep
			dot := strings.IndexByte(domain[from:], '.')
			if dot == -1 {
				break
			}
			from += dot + 1
		}
	}
	names := make([]string, 0, len(counts))
	for name := range counts {
		names = append(names, name)
	}
	// Pinned output order: ascending lexicographic by domain name —
	// an explicit comparator, never map iteration order.
	sort.Slice(names, func(i, j int) bool { return names[i] < names[j] })
	result := make([]string, 0, len(names))
	for _, name := range names {
		result = append(result, strconv.Itoa(counts[name])+" "+name)
	}
	return result
}
