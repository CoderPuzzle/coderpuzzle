import (
	"sort"
	"strings"
)

func topStudents(positive_feedback []string, negative_feedback []string,
	report []string, student_id []int, k int) []int {
	// Membership sets make each report token O(1) to classify: +3 for
	// a positive word, -1 for a negative one, everything else free.
	// Sorting the (-points, id) pairs ascending is exactly the asked
	// ranking — highest points first, lower ID breaking ties — so the
	// first k identifiers are the answer.
	positives := make(map[string]bool)
	for _, w := range positive_feedback {
		positives[w] = true
	}
	negatives := make(map[string]bool)
	for _, w := range negative_feedback {
		negatives[w] = true
	}
	type entry struct {
		negPoints int
		id        int
	}
	ranked := make([]entry, 0, len(report))
	for i, text := range report {
		points := 0
		for _, word := range strings.Split(text, " ") {
			if positives[word] {
				points += 3
			} else if negatives[word] {
				points -= 1
			}
		}
		ranked = append(ranked, entry{-points, student_id[i]})
	}
	sort.Slice(ranked, func(a, b int) bool {
		if ranked[a].negPoints != ranked[b].negPoints {
			return ranked[a].negPoints < ranked[b].negPoints
		}
		return ranked[a].id < ranked[b].id
	})
	answer := make([]int, k)
	for i := range answer {
		answer[i] = ranked[i].id
	}
	return answer
}
