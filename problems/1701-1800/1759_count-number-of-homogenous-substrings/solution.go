// Each position is charged with the number of homogenous substrings
// ending there — the current run length — so the running total
// realizes the per-run triangle sums directly.
func countHomogenous(s string) int {
	const MOD = 1_000_000_007
	total, run := 0, 0
	var prev byte
	for i := 0; i < len(s); i++ {
		if s[i] == prev && i > 0 {
			run++
		} else {
			run = 1
		}
		prev = s[i]
		total = (total + run) % MOD
	}
	return total
}
