// Zero's representation "0" is a palindrome by definition. A binary
// palindrome is otherwise fixed by its first ceil(l / 2) bits (the root): the
// rest mirrors them, sharing the middle bit when l is odd. Every root starts
// with a 1, so length l carries exactly 2^floor((l - 1) / 2) palindromes, all
// of them below n; palindromes of n's own length ascend with their root, so
// those below n's root also land under it, leaving only the palindrome built
// from n's own root to compare against n.
func countBinaryPalindromes(n int64) int {
	if n == 0 {
		return 1
	}
	length := 0
	for t := n; t != 0; t >>= 1 {
		length++
	}
	count := int64(1) // zero itself
	for l := 1; l < length; l++ {
		count += 1 << ((l - 1) / 2)
	}
	h := (length + 1) / 2
	root := n >> (length - h)
	count += root - 1<<(h-1)
	half := length / 2
	var rev int64
	x := root >> (length % 2)
	for i := 0; i < half; i++ {
		rev = rev<<1 | x&1
		x >>= 1
	}
	if ((root << half) | rev) <= n {
		count++
	}
	return int(count)
}
