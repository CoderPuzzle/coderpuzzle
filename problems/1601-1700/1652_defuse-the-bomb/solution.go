func decrypt(code []int, k int) []int {
	n := len(code)
	result := make([]int, n)
	if k == 0 {
		return result
	}
	for i := 0; i < n; i++ {
		total := 0
		if k > 0 {
			for j := 1; j <= k; j++ {
				total += code[(i+j)%n]
			}
		} else {
			for j := 1; j <= -k; j++ {
				total += code[((i-j)%n+n)%n]
			}
		}
		result[i] = total
	}
	return result
}
