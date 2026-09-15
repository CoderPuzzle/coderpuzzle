// The k-th palindrome is the k-th arrangement of the forced half multiset
// (count[c] / 2 of each letter), mirrored around the lone odd letter. Walk
// the half's positions picking, smallest letter first, the letter whose
// block still contains rank k. Multinomials are capped at k; every
// intermediate stays below k * n <= 10^6 * 5000, well inside 64-bit.
func smallestPalindrome(s string, k int) string {
	counts := make([]int, 26)
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	half := make([]int, 26)
	m := len(s) / 2
	middle := byte(0)
	for i, c := range counts {
		half[i] = c / 2
		if c%2 == 1 {
			middle = byte('a' + i)
		}
	}
	remaining := int64(k)
	// min(multinomial of the half counts over r slots, remaining): a product
	// of binomials abandoned the moment it reaches remaining.
	arrangements := func(h []int, r int) int64 {
		acc := int64(1)
		rem := int64(r)
		for _, c := range h {
			if c == 0 {
				continue
			}
			cv := int64(c)
			small := cv
			if rem-cv < small {
				small = rem - cv
			}
			binom := int64(1)
			for j := int64(1); j <= small; j++ {
				binom = binom * (rem - small + j) / j
				if binom >= remaining {
					binom = remaining
					break
				}
			}
			acc *= binom
			if acc >= remaining {
				return remaining
			}
			rem -= cv
		}
		return acc
	}
	if arrangements(half, m) < remaining {
		return ""
	}
	picked := make([]byte, 0, m)
	r := m
	for r > 0 {
		for c := 0; c < 26; c++ {
			if half[c] == 0 {
				continue
			}
			half[c]--
			ways := arrangements(half, r-1)
			if remaining <= ways {
				picked = append(picked, byte('a'+c))
				r--
				break
			}
			remaining -= ways
			half[c]++
		}
	}
	tail := make([]byte, len(picked))
	for i, ch := range picked {
		tail[len(picked)-1-i] = ch
	}
	front := string(picked)
	if middle != 0 {
		return front + string(middle) + string(tail)
	}
	return front + string(tail)
}
