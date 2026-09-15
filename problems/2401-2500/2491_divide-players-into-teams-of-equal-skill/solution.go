import "sort"

// The team total is fixed: the sum of all skills split evenly over n/2
// teams. If the sum does not divide, no pairing can be even. Otherwise
// the sorted array forces the weakest and strongest into a team, which
// the two pointers check and price in one pass.
func dividePlayers(skill []int) int64 {
	n := len(skill)
	teams := n / 2
	total := 0
	for _, s := range skill {
		total += s
	}
	if total%teams != 0 {
		return -1
	}
	target := total / teams

	sort.Ints(skill)
	var chemistry int64 = 0
	i, j := 0, n-1
	for i < j {
		if skill[i]+skill[j] != target {
			return -1
		}
		chemistry += int64(skill[i]) * int64(skill[j])
		i++
		j--
	}
	return chemistry
}
