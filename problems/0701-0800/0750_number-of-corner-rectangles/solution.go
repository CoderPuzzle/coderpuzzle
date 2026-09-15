// Scan the rows top to bottom. Every pair of 1-columns in the current row
// completes one rectangle with each earlier row that already showed the same
// column pair, so a counter on column pairs charges exactly one unit of work
// per rectangle.
func countCornerRectangles(grid [][]int) int {
	n := len(grid[0])
	pairRows := make(map[int64]int32)
	total := int64(0)
	for _, row := range grid {
		ones := make([]int, 0, len(row))
		for c, v := range row {
			if v == 1 {
				ones = append(ones, c)
			}
		}
		for i := 0; i < len(ones); i++ {
			base := int64(ones[i]) * int64(n)
			for j := i + 1; j < len(ones); j++ {
				key := base + int64(ones[j])
				earlier := pairRows[key]
				total += int64(earlier)
				pairRows[key] = earlier + 1
			}
		}
	}
	return int(total)
}
