import "sort"

func rankTeams(votes []string) string {
	seen := [26]bool{}
	for _, c := range votes[0] {
		seen[c-'A'] = true
	}
	p := len(votes[0])
	counts := make([][]int, 26)
	for i := range counts {
		counts[i] = make([]int, p)
	}
	for _, vote := range votes {
		for i, c := range vote {
			counts[c-'A'][i]++
		}
	}
	var teams []rune
	for c := 'A'; c <= 'Z'; c++ {
		if seen[c-'A'] {
			teams = append(teams, c)
		}
	}
	sort.Slice(teams, func(x, y int) bool {
		a, b := teams[x], teams[y]
		for i := 0; i < p; i++ {
			if counts[a-'A'][i] != counts[b-'A'][i] {
				return counts[a-'A'][i] > counts[b-'A'][i]
			}
		}
		return a < b
	})
	return string(teams)
}
