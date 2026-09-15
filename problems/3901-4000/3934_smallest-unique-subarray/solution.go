func smallestUniqueSubarray(nums []int) int {
	valueCounts := make(map[int]int)
	for _, value := range nums {
		valueCounts[value]++
	}
	for _, count := range valueCounts {
		if count == 1 {
			return 1
		}
	}
	if len(valueCounts) == 1 {
		return len(nums)
	}

	const base int64 = 100003
	const mod1 int64 = 10000019
	const mod2 int64 = 10000079
	n := len(nums)
	power1, power2 := make([]int64, n+1), make([]int64, n+1)
	prefix1, prefix2 := make([]int64, n+1), make([]int64, n+1)
	power1[0], power2[0] = 1, 1
	for i, value := range nums {
		power1[i+1] = power1[i] * base % mod1
		power2[i+1] = power2[i] * base % mod2
		prefix1[i+1] = (prefix1[i]*base + int64(value)) % mod1
		prefix2[i+1] = (prefix2[i]*base + int64(value)) % mod2
	}
	type hashPair struct{ first, second int64 }
	works := func(length int) bool {
		frequencies := make(map[hashPair]int, n-length+1)
		for start := 0; start+length <= n; start++ {
			end := start + length
			first := (prefix1[end] - prefix1[start]*power1[length]%mod1 + mod1) % mod1
			second := (prefix2[end] - prefix2[start]*power2[length]%mod2 + mod2) % mod2
			frequencies[hashPair{first, second}]++
		}
		for _, count := range frequencies {
			if count == 1 {
				return true
			}
		}
		return false
	}
	low, high := 1, n
	for low < high {
		middle := (low + high) / 2
		if works(middle) {
			high = middle
		} else {
			low = middle + 1
		}
	}
	return low
}
