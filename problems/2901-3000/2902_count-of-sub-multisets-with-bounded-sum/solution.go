func countSubMultisets(nums []int, l int, r int) int {
	// Group equal values: a sub-multiset takes each distinct value v
	// somewhere in 0..cnt[v] copies, so one pass per distinct value
	// applies the bounded-knapsack factor new[x] = sum(dp[x-k*v] for k in
	// 0..cnt[v]): a forward unbounded pass folds dp[x-v] into dp[x], then
	// subtracting dp[x-(cnt+1)*v] removes every choice that used too many
	// copies. Zeros change no sum and multiply every count by cnt[0]+1;
	// the answer is the range sum dp[l]+...+dp[r].
	const mod = 1000000007
	counts := map[int]int{}
	for _, v := range nums {
		counts[v]++
	}
	dp := make([]int64, r+1)
	dp[0] = 1
	for v, c := range counts {
		if v == 0 {
			for x := 0; x <= r; x++ {
				dp[x] = dp[x] * int64(c+1) % mod
			}
			continue
		}
		if v > r {
			continue
		}
		for x := v; x <= r; x++ {
			dp[x] = (dp[x] + dp[x-v]) % mod
		}
		width := (c + 1) * v
		for x := r; x >= width; x-- {
			dp[x] = (dp[x] - dp[x-width] + mod) % mod
		}
	}
	var ans int64
	for x := l; x <= r; x++ {
		ans += dp[x]
	}
	return int(ans % mod)
}
