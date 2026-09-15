import (
	"strings"
)

func minimumString(a string, b string, c string) string {
	merge := func(x, y string) string {
		// Largest k whose x-suffix equals y's prefix; k = 0 (plain
		// concatenation) always works as the fallback.
		limit := len(x)
		if len(y) < limit {
			limit = len(y)
		}
		for k := limit; k > 0; k-- {
			if x[len(x)-k:] == y[:k] {
				return x + y[k:]
			}
		}
		return x + y
	}

	seen := func(list []string, w string) bool {
		for _, s := range list {
			if s == w {
				return true
			}
		}
		return false
	}

	// A word already contained in another never extends a superstring, so
	// it is dropped (duplicates collapse with it).
	var unique []string
	for _, w := range []string{a, b, c} {
		if !seen(unique, w) {
			unique = append(unique, w)
		}
	}
	var words []string
	for _, w := range unique {
		contained := false
		for _, t := range unique {
			if t != w && strings.Contains(t, w) {
				contained = true
			}
		}
		if !contained {
			words = append(words, w)
		}
	}
	if len(words) == 1 {
		return words[0]
	}

	best := ""
	for i := 0; i < len(words); i++ {
		for j := 0; j < len(words); j++ {
			if j == i {
				continue
			}
			// Chain the words in the order i -> j -> (the remaining one);
			// every optimal superstring lines up its words in some such
			// order with each pair joined on their full overlap.
			cur := merge(words[i], words[j])
			for k := 0; k < len(words); k++ {
				if k != i && k != j {
					cur = merge(cur, words[k])
				}
			}
			if best == "" || len(cur) < len(best) || (len(cur) == len(best) && cur < best) {
				best = cur
			}
		}
	}
	return best
}
