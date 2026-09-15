import "sort"

func largestDivisibleSubset(nums []int) []int {
	// Divisibility is transitive, so in ascending order each element
	// need only be divisible by the previous one — a longest-chain DP.
	arr := make([]int, len(nums))
	copy(arr, nums)
	sort.Ints(arr)
	n := len(arr)
	if n == 0 {
		return []int{}
	}
	// dp[i] = size of the largest divisible subset ending at arr[i];
	// parent links let the subset be rebuilt, not just counted.
	dp := make([]int, n)
	parent := make([]int, n)
	for i := range dp {
		dp[i] = 1
		parent[i] = -1
	}
	best := 0
	for i := 0; i < n; i++ {
		// Every earlier divisor offers the extension dp[j] + 1.
		for j := 0; j < i; j++ {
			if arr[i]%arr[j] == 0 && dp[j]+1 > dp[i] {
				dp[i] = dp[j] + 1
				parent[i] = j
			}
		}
		if dp[i] > dp[best] {
			best = i
		}
	}
	// Trace parent links from the largest chain, reverse to ascending.
	result := []int{}
	for i := best; i != -1; i = parent[i] {
		result = append(result, arr[i])
	}
	for l, r := 0, len(result)-1; l < r; l, r = l+1, r-1 {
		result[l], result[r] = result[r], result[l]
	}
	return result
}
