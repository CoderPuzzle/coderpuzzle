// Greedy: the leftmost digit change strictly improves is where the mutation
// must start -- an earlier digit is more significant, so improving it
// dominates any later start. Extend through every non-hurting digit
// (change[d] >= d) and stop at the first hurting one, since the mutated
// substring must stay contiguous.
func maximumNumber(num string, change []int) string {
	digits := []byte(num)
	started := false
	for i := 0; i < len(num); i++ {
		d := int(num[i] - '0')
		if change[d] > d {
			started = true
			digits[i] = byte('0' + change[d])
		} else if change[d] < d && started {
			break
		}
	}
	return string(digits)
}
