// Straight simulation: at most ~93k seconds for 2^31 inputs because the
// consumed total grows quadratically.
func memLeak(memory1 int64, memory2 int64) []int64 {
	var t int64 = 1
	for {
		if memory1 >= memory2 {
			if memory1 < t {
				break
			}
			memory1 -= t
		} else {
			if memory2 < t {
				break
			}
			memory2 -= t
		}
		t++
	}
	return []int64{t, memory1, memory2}
}
