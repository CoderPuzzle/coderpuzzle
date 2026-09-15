import (
	"sort"
)

// Sort the rows by their column-k entry, largest first: extracting a
// comparison key is O(1) row indexing. Scores are pairwise distinct
// across the whole matrix, so ties never occur and sort.Slice's
// non-stability cannot affect the outcome.
func sortTheStudents(score [][]int, k int) [][]int {
	rows := make([][]int, len(score))
	copy(rows, score)
	sort.Slice(rows, func(i, j int) bool {
		return rows[i][k] > rows[j][k]
	})
	return rows
}
