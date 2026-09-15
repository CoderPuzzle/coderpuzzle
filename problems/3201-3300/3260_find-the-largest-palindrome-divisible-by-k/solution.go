// A palindrome of length n is pinned down by its first ceil(n/2) digits,
// and its remainder mod k is a digit-weight sum: half-position j carries its
// own place value plus its mirror's (the odd-length middle has no separate
// mirror), so everything runs on residues mod k, never on the full number.
// For each suffix of the half, track which residues the still-free digits
// can add; then scan the half left to right, taking the largest digit whose
// leftover residue stays reachable — the last free digit closes it exactly
// to zero.
func largestPalindrome(n int, k int) string {
	m := (n + 1) / 2
	powSmall := make([]int, m)
	for j := range powSmall {
		powSmall[j] = 1 % k
	}
	for j := 1; j < m; j++ {
		powSmall[j] = powSmall[j-1] * 10 % k
	}
	base := 1 % k
	for i := 0; i < n-m; i++ {
		base = base * 10 % k
	}
	weights := make([]int, m)
	for j := 0; j < m; j++ {
		mirror := 0
		if 2*j != n-1 {
			mirror = powSmall[j]
		}
		weights[j] = (base*powSmall[m-1-j] + mirror) % k
	}
	full := (1 << uint(k)) - 1

	cache := make([]int, 512*10)
	for i := range cache {
		cache[i] = -1
	}
	reachable := make([]int, m+1)
	reachable[m] = 1
	for j := m - 1; j >= 0; j-- {
		mask := reachable[j+1]
		w := weights[j]
		key := mask*10 + w
		if cache[key] < 0 {
			out := mask
			shift := 0
			for t := 0; t < 9; t++ {
				shift = (shift + w) % k
				if shift == 0 {
					out |= mask
				} else {
					out |= (mask<<uint(shift) | mask>>uint(k-shift)) & full
				}
			}
			cache[key] = out
		}
		reachable[j] = cache[key]
	}

	half := make([]byte, m)
	need := 0
	for j := 0; j < m; j++ {
		low := 0
		if j == 0 {
			low = 1
		}
		for d := 9; d >= low; d-- {
			rest := ((need-d*weights[j])%k + k) % k
			if reachable[j+1]>>uint(rest)&1 == 1 {
				need = rest
				half[j] = byte('0' + d)
				break
			}
		}
	}
	bodyLen := m
	if n%2 == 1 {
		bodyLen = m - 1
	}
	result := make([]byte, 0, n)
	result = append(result, half...)
	for j := bodyLen - 1; j >= 0; j-- {
		result = append(result, half[j])
	}
	return string(result)
}
