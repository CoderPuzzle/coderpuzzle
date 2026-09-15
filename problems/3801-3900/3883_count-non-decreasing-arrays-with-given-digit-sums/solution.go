import "sort"

// Group every value 0..5000 by the sum of its digits; the groups are
// sorted, so a prefix sum plus a binary search counts every predecessor
// whose value is at most a candidate's value in O(log).
func countArrays(digitSum []int) int {
	const mod = 1000000007
	groups := make([][]int, 51)
	for value := 0; value <= 5000; value++ {
		total := 0
		for rest := value; rest > 0; rest /= 10 {
			total += rest % 10
		}
		groups[total] = append(groups[total], value)
	}
	previous := groups[digitSum[0]]
	if len(previous) == 0 {
		return 0
	}
	dp := make([]int64, len(previous))
	for i := range dp {
		dp[i] = 1
	}
	for position := 1; position < len(digitSum); position++ {
		current := groups[digitSum[position]]
		if len(current) == 0 {
			return 0
		}
		prefix := make([]int64, len(dp)+1)
		for i, ways := range dp {
			prefix[i+1] = (prefix[i] + ways) % mod
		}
		next := make([]int64, len(current))
		for k, value := range current {
			// sort.Search returns the first index whose value exceeds
			// value, i.e. the number of predecessors <= value.
			next[k] = prefix[sort.Search(len(previous), func(i int) bool { return previous[i] > value })]
		}
		dp = next
		previous = current
	}
	var answer int64
	for _, ways := range dp {
		answer = (answer + ways) % mod
	}
	return int(answer)
}
