// Ball x is filed into box digit_sum(x), and with highLimit <= 10^5 no
// digit sum exceeds 45 (99999 -> 45), so a 46-slot counter indexed by
// digit sum covers every box the range can reach. Sweep once, strip digits
// with % 10 and / 10 (an inner copy keeps the loop variable intact), bump
// the named slot, and answer with the fullest slot.
func countBalls(lowLimit int, highLimit int) int {
	counts := [46]int{}
	for x := lowLimit; x <= highLimit; x++ {
		s := 0
		for v := x; v > 0; v /= 10 {
			s += v % 10
		}
		counts[s]++
	}
	best := 0
	for _, c := range counts {
		if c > best {
			best = c
		}
	}
	return best
}
