// Division is unavailable: 12345 = 3 * 5 * 823 is composite and grid values
// routinely share factors with it, so there is no modular inverse to divide
// by. Flatten the matrix in row-major order — excluding grid[i][j] is
// excluding one position of that sequence — and multiply the prefix
// (everything before the position) by the suffix (everything after it).
// Every factor is reduced below 12345 first, so each intermediate product
// stays below 12345^2 and fits in an int.
func constructProductMatrix(grid [][]int) [][]int {
	const mod = 12345
	n, m := len(grid), len(grid[0])
	flat := make([]int, 0, n*m)
	for _, row := range grid {
		for _, v := range row {
			flat = append(flat, v%mod)
		}
	}
	total := len(flat)
	prefix := make([]int, total+1)
	suffix := make([]int, total+1)
	prefix[0], suffix[total] = 1, 1
	for t := 0; t < total; t++ {
		prefix[t+1] = prefix[t] * flat[t] % mod
		suffix[total-1-t] = suffix[total-t] * flat[total-1-t] % mod
	}
	result := make([][]int, n)
	k := 0
	for i := range result {
		result[i] = make([]int, m)
		for j := range result[i] {
			result[i][j] = prefix[k] * suffix[k+1] % mod
			k++
		}
	}
	return result
}
