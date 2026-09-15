import (
	"sort"
	"strings"
)

func findDuplicate(paths []string) [][]string {
	// One scan groups every file by what it contains. Inside a directory
	// info string the directory path comes first, then its files; a file
	// token keeps its name before the first '(' and its content between
	// that '(' and the token's last ')'. Contents hold no space — the
	// space-separated tokenization could not carry one — so every file
	// lands in exactly one bucket, its path appended in scan order.
	groups := make(map[string][]string)
	for _, info := range paths {
		tokens := strings.Split(info, " ")
		directory := tokens[0]
		for _, token := range tokens[1:] {
			openAt := strings.IndexByte(token, '(')
			closeAt := strings.LastIndexByte(token, ')')
			name := token[:openAt]
			content := token[openAt+1 : closeAt]
			groups[content] = append(groups[content], directory+"/"+name)
		}
	}
	contents := make([]string, 0, len(groups))
	for content := range groups {
		contents = append(contents, content)
	}
	// A bucket answers the question only once a second file joins it; the
	// pinned order lists the survivors by content, descending.
	sort.Sort(sort.Reverse(sort.StringSlice(contents)))
	results := [][]string{}
	for _, content := range contents {
		if group := groups[content]; len(group) >= 2 {
			results = append(results, group)
		}
	}
	return results
}
