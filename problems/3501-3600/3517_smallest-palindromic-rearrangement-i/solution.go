// A palindrome is (half) + (odd char, at most one) + reverse(half), and the
// half's multiset is forced: exactly count[c] // 2 of each letter. So the
// smallest palindrome is the sorted half, mirrored.
func smallestPalindrome(s string) string {
	var counts [26]int
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	half := make([]byte, 0, len(s)/2)
	middle := byte(0)
	for i, c := range counts {
		for rep := 0; rep < c/2; rep++ {
			half = append(half, byte('a'+i))
		}
		if c%2 == 1 {
			middle = byte('a' + i)
		}
	}
	tail := make([]byte, len(half))
	for i, ch := range half {
		tail[len(half)-1-i] = ch
	}
	if middle != 0 {
		return string(half) + string(middle) + string(tail)
	}
	return string(half) + string(tail)
}
