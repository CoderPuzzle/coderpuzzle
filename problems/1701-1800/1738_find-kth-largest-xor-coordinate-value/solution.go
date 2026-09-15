import "sort"

// A coordinate value is the XOR of the upper-left submatrix ending there,
// and XOR cancels itself: prefix[a][b] = matrix[a][b] ^ prefix[a-1][b]
// ^ prefix[a][b-1] ^ prefix[a-1][b-1]. Sweeping row by row, the running XOR
// of the current row folded with the previous prefix row yields the new row
// in O(n) space; collect all m * n values, sort, and the kth largest sits k
// from the end.
func kthLargestValue(matrix [][]int, k int) int {
	n := len(matrix[0])
	above := make([]int, n)
	values := make([]int, 0, len(matrix)*n)
	for _, row := range matrix {
		left := 0
		current := make([]int, n)
		for j, value := range row {
			left ^= value
			current[j] = left ^ above[j]
			values = append(values, current[j])
		}
		above = current
	}

	sort.Ints(values)
	return values[len(values)-k]
}
