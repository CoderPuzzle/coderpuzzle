import "sort"

func kWeakestRows(mat [][]int, k int) []int {
	// Weakness order == lexicographic order of (soldiers, index); rows are
	// all 1's then 0's, so the sum is the first-civilian index too.
	type row struct {
		soldiers, index int
	}
	ranked := make([]row, 0, len(mat))
	for i, r := range mat {
		soldiers := 0
		for _, value := range r {
			soldiers += value
		}
		ranked = append(ranked, row{soldiers, i})
	}
	sort.Slice(ranked, func(a, b int) bool {
		if ranked[a].soldiers != ranked[b].soldiers {
			return ranked[a].soldiers < ranked[b].soldiers
		}
		return ranked[a].index < ranked[b].index
	})
	out := make([]int, 0, k)
	for i := 0; i < k; i++ {
		out = append(out, ranked[i].index)
	}
	return out
}
