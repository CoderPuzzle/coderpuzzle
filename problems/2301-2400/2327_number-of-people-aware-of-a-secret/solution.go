func peopleAwareOfSecret(n int, delay int, forget int) int {
	const MOD = 1000000007
	// know[d] = number of people who first learn the secret on day d;
	// day 1 seeds the whole cascade
	know := make([]int64, n+1)
	know[1] = 1
	for day := 2; day <= n; day++ {
		var total int64
		// sharers still active on `day` are those who learned on some d
		// with d + delay <= day <= d + forget - 1; both window endpoints
		// advance by one per day, a sliding window clamped at day 1
		lo := day - forget + 1
		if lo < 1 {
			lo = 1
		}
		hi := day - delay
		for d := lo; d <= hi; d++ {
			total += know[d]
		}
		know[day] = total % MOD
	}
	// aware at the end of day n = learned within the last forget - 1
	// days; earlier learners have forgotten
	var answer int64
	for d := n - forget + 1; d <= n; d++ {
		answer += know[d]
	}
	return int(answer % MOD)
}
