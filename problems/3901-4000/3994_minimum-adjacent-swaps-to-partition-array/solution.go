func minAdjacentSwaps(nums []int, a int, b int) int {
	const mod int64 = 1000000007
	counts := [3]int64{}
	var answer int64
	for _, value := range nums {
		group := 0
		if value >= a {
			group = 1
		}
		if value > b {
			group = 2
		}
		if group == 0 {
			answer += counts[1] + counts[2]
		} else if group == 1 {
			answer += counts[2]
		}
		counts[group]++
	}
	return int(answer % mod)
}
