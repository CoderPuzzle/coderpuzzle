func countTriplets(arr []int) int {
	// per prefix value: occurrence count and sum of (index+1); seeded
	// with the empty prefix so segments starting at index 0 count too
	count := map[int]int{0: 1}
	indexSum := map[int]int{0: 0}
	prefix := 0
	answer := 0
	for j, value := range arr {
		prefix ^= value
		// equal prefixes at p < j => arr[p+1..j] XORs to 0 and every
		// internal split works: sum over such p of (j - p - 1)
		// telescopes to j * count - indexSum
		if c, ok := count[prefix]; ok {
			answer += j*c - indexSum[prefix]
			count[prefix] = c + 1
			indexSum[prefix] += j + 1
		} else {
			count[prefix] = 1
			indexSum[prefix] = j + 1
		}
	}
	return answer
}
