// Total damage must be survived with health to spare, and the one armor use
// erases min(armor, worst level) of it.
func minimumHealth(damage []int, armor int) int64 {
	var total int64
	worst := 0
	for _, hit := range damage {
		total += int64(hit)
		if hit > worst {
			worst = hit
		}
	}
	// total reaches 1e10, so the answer is accumulated in 64 bits.
	return total + 1 - int64(min(armor, worst))
}
