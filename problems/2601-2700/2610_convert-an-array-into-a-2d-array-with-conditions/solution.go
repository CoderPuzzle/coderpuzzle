func findMatrix(nums []int) [][]int {
	// A value's k-th occurrence (counted from zero) always belongs to row
	// k: each row must hold distinct elements, so earlier copies can only
	// have occupied strictly earlier rows. Appending there therefore never
	// duplicates within a row, the rows stay minimal because one opens only
	// when a repeat forces a deeper level, and scanning in input order
	// keeps the construction fully deterministic.
	seen := map[int]int{}
	rows := [][]int{}
	for _, value := range nums {
		rank := seen[value]
		seen[value] = rank + 1
		if rank == len(rows) {
			rows = append(rows, []int{})
		}
		rows[rank] = append(rows[rank], value)
	}
	return rows
}
