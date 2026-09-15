func maxDistance(s string, k int) int {
	// Manhattan distance is the max of sx*x + sy*y over the four quadrant
	// signings, and every step contributes +/-1 to that signing. Flipping
	// a misaligned step to an aligned one buys +2, so the best reachable
	// value at each prefix is cur + 2*min(k, mis).
	best := 0
	for _, sx := range []int{1, -1} {
		for _, sy := range []int{1, -1} {
			cur, mis := 0, 0
			for i := 0; i < len(s); i++ {
				var step int
				switch s[i] {
				case 'N':
					step = sy
				case 'S':
					step = -sy
				case 'E':
					step = sx
				default:
					step = -sx
				}
				cur += step
				if step < 0 {
					mis++
				}
				best = max(best, cur+2*min(k, mis))
			}
		}
	}
	return best
}
