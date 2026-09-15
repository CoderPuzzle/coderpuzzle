// Each character contributes its reversed-alphabet value (26 - letter rank)
// times its 1-indexed string position; sum over the whole string.
func reverseDegree(s string) int {
	total := 0
	for i := 0; i < len(s); i++ {
		total += (26 - int(s[i]-'a')) * (i + 1)
	}
	return total
}
