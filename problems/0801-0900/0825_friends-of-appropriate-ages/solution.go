// Counting by age value: ages live in 1..120, so bucket every person by
// age and judge each ordered pair of age values once.
func numFriendRequests(ages []int) int {
	count := make([]int, 121)
	for _, age := range ages {
		count[age]++
	}
	total := 0
	for a := 1; a <= 120; a++ {
		if count[a] == 0 {
			continue
		}
		for b := 1; b <= 120; b++ {
			if count[b] == 0 {
				continue
			}
			// x sends to y iff none of the three blocks holds; the
			// half-age test 2*b <= a+14 is ages[y] <= 0.5*ages[x]+7
			// in exact integer arithmetic.
			if 2*b <= a+14 || b > a || (b > 100 && a < 100) {
				continue
			}
			// Same-age pairs cannot target oneself, so the diagonal
			// counts count*(count-1), not count*count.
			if a == b {
				total += count[a] * (count[b] - 1)
			} else {
				total += count[a] * count[b]
			}
		}
	}
	return total
}
