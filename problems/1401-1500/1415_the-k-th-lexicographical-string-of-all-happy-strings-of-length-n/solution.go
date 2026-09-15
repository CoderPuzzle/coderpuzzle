func getHappyString(n int, k int) string {
	total := 3 * (1 << (n - 1))
	if k > total {
		return ""
	}
	letters := []byte{'a', 'b', 'c'}
	result := make([]byte, 0, n)
	block := total / 3
	rank := k - 1
	for i := 0; i < n; i++ {
		var candidates []byte
		if i == 0 {
			candidates = letters
		} else {
			previous := result[len(result)-1]
			for _, c := range letters {
				if c != previous {
					candidates = append(candidates, c)
				}
			}
		}
		index := rank / block
		rank %= block
		result = append(result, candidates[index])
		block /= 2
	}
	return string(result)
}
