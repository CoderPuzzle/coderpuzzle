import "strconv"

// Numbers shorter than n are composeable by construction and all fall
// below n; for n's own length, walk its digits: a set digit strictly
// below the current one fixes a smaller prefix and frees the remaining
// positions, while the equal path survives only while n's own digit
// stays in the set.
func atMostNGivenDigitSet(digits []string, n int) int {
	s := strconv.Itoa(n)
	length := len(s)
	k := len(digits)
	var has [10]bool
	for _, d := range digits {
		has[d[0]-'0'] = true
	}
	var below [10]int
	for v := 1; v < 10; v++ {
		below[v] = below[v-1]
		if has[v-1] {
			below[v]++
		}
	}
	powers := make([]int64, length+1)
	powers[0] = 1
	for j := 1; j <= length; j++ {
		powers[j] = powers[j-1] * int64(k)
	}
	var total int64
	for l := 1; l < length; l++ {
		total += powers[l]
	}
	alive := true
	for i := 0; i < length; i++ {
		v := s[i] - '0'
		// Set digits below n's digit v leave the tail free.
		total += int64(below[v]) * powers[length-1-i]
		if !has[v] {
			// The equal path dies here: no prefix of n extends past v.
			alive = false
			break
		}
	}
	if alive {
		// Every digit of n is in the set, so n itself counts.
		total++
	}
	return int(total)
}
