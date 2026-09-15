import "sort"

func mostVisitedPattern(username []string, timestamp []int, website []string) []string {
	type visit struct {
		time int
		site string
	}
	perUser := map[string][]visit{}
	for i, user := range username {
		perUser[user] = append(perUser[user], visit{timestamp[i], website[i]})
	}
	patternUsers := map[[3]string]map[string]bool{}
	for user, visits := range perUser {
		sort.Slice(visits, func(a, b int) bool { return visits[a].time < visits[b].time })
		sites := make([]string, len(visits))
		for i, v := range visits {
			sites[i] = v.site
		}
		for i := 0; i < len(sites); i++ {
			for j := i + 1; j < len(sites); j++ {
				for k := j + 1; k < len(sites); k++ {
					key := [3]string{sites[i], sites[j], sites[k]}
					if patternUsers[key] == nil {
						patternUsers[key] = map[string]bool{}
					}
					patternUsers[key][user] = true
				}
			}
		}
	}
	var best []string
	bestScore := -1
	for pattern, users := range patternUsers {
		score := len(users)
		better := score > bestScore
		if score == bestScore && best != nil {
			for i := 0; i < 3; i++ {
				if pattern[i] != best[i] {
					better = pattern[i] < best[i]
					break
				}
			}
		}
		if better {
			bestScore = score
			best = []string{pattern[0], pattern[1], pattern[2]}
		}
	}
	return best
}
