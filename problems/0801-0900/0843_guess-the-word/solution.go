package main

type Solution struct{}

func (solution *Solution) findSecretWord(interrogator *Master, wordlist []string) {
	matches := func(a, b string) int {
		count := 0
		n := len(a)
		if len(b) < n {
			n = len(b)
		}
		for i := 0; i < n; i++ {
			if a[i] == b[i] {
				count++
			}
		}
		return count
	}
	candidates := append([]string(nil), wordlist...)
	for len(candidates) > 0 {
		// Pick the word whose worst-case surviving group is smallest:
		// bucket every candidate by its agreement with the candidate
		// under review, and keep the candidate with the smallest largest
		// bucket (minimax elimination).
		best, bestWorst := candidates[0], len(candidates)+1
		for _, word := range candidates {
			groups := [7]int{}
			for _, other := range candidates {
				groups[matches(word, other)]++
			}
			worst := 0
			for _, group := range groups {
				if group > worst {
					worst = group
				}
			}
			if worst < bestWorst {
				best, bestWorst = word, worst
			}
		}
		score := interrogator.Guess(best)
		if score == len(best) {
			return
		}
		survivors := make([]string, 0, len(candidates))
		for _, word := range candidates {
			if matches(word, best) == score {
				survivors = append(survivors, word)
			}
		}
		candidates = survivors
	}
}
