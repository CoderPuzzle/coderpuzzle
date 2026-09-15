import "sort"

func numberOfWeakCharacters(properties [][]int) int {
	// Attack descending; defense ASCENDING within equal attack so that
	// same-attack characters (who can never weaken each other) only ever
	// meet a running max from strictly higher-attack groups.
	props := make([][]int, len(properties))
	copy(props, properties)
	sort.Slice(props, func(i, j int) bool {
		if props[i][0] != props[j][0] {
			return props[i][0] > props[j][0]
		}
		return props[i][1] < props[j][1]
	})
	weak := 0
	// Every earlier character has attack >= the current one's, so the
	// current one is weak exactly when some seen defense is strictly
	// greater -- one running maximum is enough.
	maxDefense := 0
	for _, p := range props {
		if p[1] < maxDefense {
			weak++
		} else {
			// Raise the max only when not weak, so later (lower-attack)
			// groups compare against it.
			maxDefense = p[1]
		}
	}
	return weak
}
