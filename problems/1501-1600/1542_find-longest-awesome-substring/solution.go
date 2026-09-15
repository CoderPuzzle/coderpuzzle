// mask is a 10-bit number: bit d is 1 when digit d has appeared an odd
// number of times in the prefix s[0:i+1]. firstSeen maps a prefix mask to
// the smallest index that produced it (mask 0 maps to -1, the empty prefix
// before the string starts). Two prefixes sharing a mask cancel out to
// all-even digit counts between them (already rearrangeable into a
// palindrome); two prefixes whose masks differ in exactly one bit cancel to
// a single odd count (the lone middle character of an odd-length
// palindrome).
func longestAwesome(s string) int {
	firstSeen := map[int]int{0: -1}
	mask := 0
	best := 0
	for i := 0; i < len(s); i++ {
		mask ^= 1 << (s[i] - '0')
		if idx, ok := firstSeen[mask]; ok {
			if i-idx > best {
				best = i - idx
			}
		} else {
			firstSeen[mask] = i
		}
		for digit := 0; digit < 10; digit++ {
			candidate := mask ^ (1 << digit)
			if idx, ok := firstSeen[candidate]; ok {
				if i-idx > best {
					best = i - idx
				}
			}
		}
	}
	return best
}
