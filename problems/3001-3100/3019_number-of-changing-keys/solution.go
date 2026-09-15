func countKeyChanges(s string) int {
	keys := []byte(s)
	for i := range keys {
		if keys[i] >= 'A' && keys[i] <= 'Z' {
			keys[i] += 'a' - 'A'
		}
	}
	changes := 0
	for i := 1; i < len(keys); i++ {
		if keys[i] != keys[i-1] {
			changes++
		}
	}
	return changes
}
