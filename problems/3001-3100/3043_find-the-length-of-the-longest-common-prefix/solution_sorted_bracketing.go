import (
	"sort"
	"strconv"
)

func longestCommonPrefix(arr1 []int, arr2 []int) int {
	// The deepest cross-array agreement is realized by two lexicographically
	// adjacent entries, so merge both arrays as source-tagged digit strings.
	type entry struct {
		digits string
		source int
	}
	entries := make([]entry, 0, len(arr1)+len(arr2))
	for _, x := range arr1 {
		entries = append(entries, entry{strconv.Itoa(x), 0})
	}
	for _, y := range arr2 {
		entries = append(entries, entry{strconv.Itoa(y), 1})
	}
	// Sort as digit strings, never numerically: only lexicographic order
	// keeps a prefix family in one contiguous block.
	sort.Slice(entries, func(a, b int) bool { return entries[a].digits < entries[b].digits })
	best := 0
	for i := 1; i < len(entries); i++ {
		// Same-source neighbors cannot witness a cross pair.
		if entries[i-1].source == entries[i].source {
			continue
		}
		u, v := entries[i-1].digits, entries[i].digits
		shared := 0
		for j := 0; j < len(u) && j < len(v); j++ {
			if u[j] != v[j] {
				// Digits diverge: the run cannot extend past here.
				break
			}
			shared++
		}
		if shared > best {
			best = shared
		}
	}
	return best
}
