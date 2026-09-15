func sumOfFlooredPairs(nums []int) int {
	const mod = 1000000007
	if len(nums) == 0 {
		return 0
	}
	maxVal := 0
	for _, v := range nums {
		if v > maxVal {
			maxVal = v
		}
	}
	count := make([]int64, maxVal+1)
	for _, v := range nums {
		count[v]++
	}
	prefix := make([]int64, maxVal+1)
	var running int64
	for v := 0; v <= maxVal; v++ {
		running += count[v]
		prefix[v] = running
	}
	var total int64
	for y := 1; y <= maxVal; y++ {
		if count[y] == 0 {
			continue
		}
		// sum over x of floor(x / y) * count[x]
		// = sum over m >= 1 of #{x : x >= m * y}
		var c int64
		for m := y; m <= maxVal; m += y {
			c += prefix[maxVal] - prefix[m-1]
		}
		total = (total + count[y]*c) % mod
	}
	return int(total)
}
