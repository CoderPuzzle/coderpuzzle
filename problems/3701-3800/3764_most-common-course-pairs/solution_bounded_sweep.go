import (
	"sort"
	"strconv"
)

func mostCommonCoursePair(completions [][]string) []string {
	// Group rows per student; every student is judged and sorted
	// independently of the rest.
	type record struct {
		date   string
		course string
		rating int
	}
	byStudent := map[string][]record{}
	for _, row := range completions {
		rating, _ := strconv.Atoi(row[3])
		byStudent[row[0]] = append(byStudent[row[0]],
			record{date: row[2], course: row[1], rating: rating})
	}
	counts := map[[2]string]int{}
	for _, records := range byStudent {
		// Qualification without floats: sum >= 4 * n is exactly
		// "average >= 4" over integer ratings.
		n := len(records)
		if n < 5 {
			continue
		}
		total := 0
		for _, record := range records {
			total += record.rating
		}
		if total < 4*n {
			continue
		}
		// (date, course) sorts chronologically, name-breaking ties.
		sort.Slice(records, func(i, j int) bool {
			if records[i].date != records[j].date {
				return records[i].date < records[j].date
			}
			return records[i].course < records[j].course
		})
		for i := 1; i < n; i++ {
			counts[[2]string{records[i-1].course, records[i].course}]++
		}
	}
	// The tuple (-count, first, second) totally orders distinct keys, so the
	// running champion is the same pair no matter how the hash table yields
	// its entries.
	bestPair := [2]string{}
	bestCount := -1
	found := false
	for pair, count := range counts {
		better := count > bestCount ||
			(count == bestCount && found && lessPair(pair, bestPair))
		if better {
			bestCount = count
			bestPair = pair
			found = true
		}
	}
	if !found {
		return []string{}
	}
	return []string{bestPair[0], bestPair[1], strconv.Itoa(bestCount)}
}

func lessPair(a, b [2]string) bool {
	if a[0] != b[0] {
		return a[0] < b[0]
	}
	return a[1] < b[1]
}
