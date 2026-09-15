import (
	"sort"
	"strings"
)

func removeSubfolders(folder []string) []string {
	sorted := append([]string(nil), folder...)
	sort.Strings(sorted)
	out := []string{}
	for _, path := range sorted {
		// The slash separates a true child ("/a" + "/") from a longer
		// sibling sharing the name prefix ("/ab" vs "/a/").
		if len(out) == 0 || !strings.HasPrefix(path, out[len(out)-1]+"/") {
			out = append(out, path)
		}
	}
	return out
}
