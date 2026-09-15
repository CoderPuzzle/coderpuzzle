import "sort"

func findAllRecipes(recipes []string, ingredients [][]string, supplies []string) []string {
	have := make(map[string]bool, len(supplies))
	for _, s := range supplies {
		have[s] = true
	}
	index := make(map[string]int, len(recipes))
	for i, name := range recipes {
		index[name] = i
	}
	n := len(recipes)
	dependents := make([][]int, n)
	indegree := make([]int, n)
	impossible := make([]bool, n)
	for i := 0; i < n; i++ {
		seen := make(map[int]bool)
		for _, item := range ingredients[i] {
			// An initial supply satisfies the requirement outright.
			if have[item] {
				continue
			}
			j, ok := index[item]
			if !ok {
				// Neither supply nor recipe: never makeable.
				impossible[i] = true
			} else if !seen[j] {
				// seen dedupes repeated ingredients so the indegree counts
				// each recipe dependency once.
				seen[j] = true
				indegree[i]++
				dependents[j] = append(dependents[j], i)
			}
		}
	}

	// Kahn's algorithm: recipes needing nothing beyond the supplies start
	// made; cycles never reach indegree zero and drop out automatically.
	queue := make([]int, 0, n)
	for i := 0; i < n; i++ {
		if indegree[i] == 0 && !impossible[i] {
			queue = append(queue, i)
		}
	}
	made := make([]string, 0, len(queue))
	for head := 0; head < len(queue); head++ {
		i := queue[head]
		made = append(made, recipes[i])
		for _, j := range dependents[i] {
			// Skip impossible recipes so their failure never blocks or
			// corrupts the rest.
			if impossible[j] {
				continue
			}
			indegree[j]--
			if indegree[j] == 0 {
				queue = append(queue, j)
			}
		}
	}
	sort.Strings(made)
	return made
}
