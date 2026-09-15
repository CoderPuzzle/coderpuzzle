import "sort"

func numFactoredBinaryTrees(arr []int) int {
	const MOD = 1000000007
	sort.Ints(arr)
	index := make(map[int]int)
	for i, v := range arr {
		index[v] = i
	}
	dp := make([]int64, len(arr)) // dp[i] = trees rooted at arr[i]
	for i := range dp {
		dp[i] = 1
	}
	for i := 0; i < len(arr); i++ {
		v := arr[i]
		total := int64(1)
		for j := 0; j < i; j++ {
			if v%arr[j] == 0 {
				if other, ok := index[v/arr[j]]; ok {
					total += dp[j] * dp[other]
				}
			}
		}
		dp[i] = total % MOD
	}
	sum := int64(0)
	for _, value := range dp {
		sum += value
	}
	return int(sum % MOD)
}
