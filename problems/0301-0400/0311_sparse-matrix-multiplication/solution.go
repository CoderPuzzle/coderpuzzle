// For each row of mat2, record only the columns where it is nonzero, then let
// each nonzero cell of mat1 scatter its products through those lists — no
// multiplication by zero is ever performed.
func multiply(mat1 [][]int, mat2 [][]int) [][]int {
	m, k, n := len(mat1), len(mat2), len(mat2[0])
	nonzero2 := make([][][2]int, k)
	for p := 0; p < k; p++ {
		for j, value := range mat2[p] {
			if value != 0 {
				nonzero2[p] = append(nonzero2[p], [2]int{j, value})
			}
		}
	}
	result := make([][]int, m)
	for i := range result {
		result[i] = make([]int, n)
	}
	// A zero in mat1 wipes a whole row of products; skip it instead of
	// multiplying every mat2 entry by zero.
	for i, row := range mat1 {
		for p, value := range row {
			if value == 0 {
				continue
			}
			for _, pair := range nonzero2[p] {
				result[i][pair[0]] += value * pair[1]
			}
		}
	}
	return result
}
