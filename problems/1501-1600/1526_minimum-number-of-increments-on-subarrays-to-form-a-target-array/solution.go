func minNumberOperations(target []int) int {
	// Each operation is one horizontal layer of the final profile, and the
	// first target[0] layers must all span index 0.
	ops := int64(target[0])
	for i := 1; i < len(target); i++ {
		// The profile can only rise where a new operation starts, so pay
		// each positive rise; descents are free because earlier layers
		// can simply stop before index i.
		if target[i] > target[i-1] {
			ops += int64(target[i] - target[i-1])
		}
	}
	return int(ops)
}
