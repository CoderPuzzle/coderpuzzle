import (
	"sort"
	"strings"
)

func expand(s string) []string {
	// Parse into option groups: a bare letter is a one-element group, and
	// "{a,b,c}" becomes ["a","b","c"]. Backtrack over the choices, then
	// sort the finished words.
	tokens := [][]string{}
	i := 0
	for i < len(s) {
		if s[i] == '{' {
			j := i
			for s[j] != '}' {
				j++
			}
			tokens = append(tokens, strings.Split(s[i+1:j], ","))
			i = j + 1
		} else {
			tokens = append(tokens, []string{string(s[i])})
			i++
		}
	}
	var result []string
	var dfs func(int, string)
	dfs = func(idx int, cur string) {
		if idx == len(tokens) {
			result = append(result, cur)
			return
		}
		for _, opt := range tokens[idx] {
			dfs(idx+1, cur+opt)
		}
	}
	dfs(0, "")
	sort.Strings(result)
	return result
}
