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
	bestPair := [2]string{}
	bestCount := -1
	// Sorted keys + strict > pin count-descending, then both names
	// ascending — no dependence on hash-map iteration order.
	pairs := make([][2]string, 0, len(counts))
	for pair := range counts {
		pairs = append(pairs, pair)
	}
	sort.Slice(pairs, func(i, j int) bool {
		return pairs[i][0] < pairs[j][0] ||
			(pairs[i][0] == pairs[j][0] && pairs[i][1] < pairs[j][1])
	})
	for _, pair := range pairs {
		if counts[pair] > bestCount {
			bestCount = counts[pair]
			bestPair = pair
		}
	}
	if bestCount == -1 {
		return []string{}
	}
	return []string{bestPair[0], bestPair[1], strconv.Itoa(bestCount)}
}
