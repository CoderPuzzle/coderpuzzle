// A palindrome is fully determined by its first half (the middle digit of
// an odd-length palindrome is fixed by the multiset). The smallest larger
// palindrome rearranging the same digits is the next permutation of the
// first floor(n/2) digits, mirrored.
func nextPalindrome(num string) string {
	n := len(num)
	if n == 1 {
		return ""
	}
	half := []byte(num[:n/2])
	i := len(half) - 2
	for i >= 0 && half[i] >= half[i+1] {
		i--
	}
	if i < 0 {
		return ""
	}
	j := len(half) - 1
	for half[j] <= half[i] {
		j--
	}
	half[i], half[j] = half[j], half[i]
	for lo, hi := i+1, len(half)-1; lo < hi; lo, hi = lo+1, hi-1 {
		half[lo], half[hi] = half[hi], half[lo]
	}
	h := string(half)
	reversed := []byte(h)
	for lo, hi := 0, len(reversed)-1; lo < hi; lo, hi = lo+1, hi-1 {
		reversed[lo], reversed[hi] = reversed[hi], reversed[lo]
	}
	if n%2 == 0 {
		return h + string(reversed)
	}
	return h + string(num[n/2]) + string(reversed)
}
