func numberOfGoodSubarraySplits(nums []int) int {
	const MOD = 1000000007
	var answer int64
	prev := -1 // index of the previous 1; -1 means none seen yet
	for i, value := range nums {
		if value == 1 {
			if prev == -1 {
				// First 1 found: the array is splittable, empty product = 1.
				answer = 1
			} else {
				// residue * factor < (1e9+7) * 1e5 < 2^63 — exact in int64.
				answer = answer * int64(i-prev) % MOD
			}
			prev = i
		}
	}
	return int(answer)
}
