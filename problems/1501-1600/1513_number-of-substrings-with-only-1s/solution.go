func numSub(s string) int {
	// `run` tracks the length of the run of 1s ending at the current
	// position; adding it after each step accumulates n * (n + 1) / 2
	// for every completed run, one unit at a time. `total` is int64 so
	// the running sum never overflows before the mod is applied.
	const mod = 1_000_000_007
	var total int64
	var run int64
	for _, c := range s {
		if c == '1' {
			run++
		} else {
			run = 0
		}
		total = (total + run) % mod
	}
	return int(total)
}
