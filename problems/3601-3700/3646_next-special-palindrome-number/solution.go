func specialPalindrome(n int64) int64 {
	// A palindrome carries at most one digit an odd number of times, so a
	// digit set works only with at most one odd member; any set whose digits
	// sum past 16 makes palindromes of 17+ digits, beyond every answer
	// reachable from n <= 10^15.
	const limit = int64(4000000000000000)
	answer := limit
	for mask := 1; mask < 512; mask++ {
		digits := []int{}
		odds, total := 0, 0
		for d := 1; d <= 9; d++ {
			if mask>>(d-1)&1 == 1 {
				digits = append(digits, d)
				odds += d & 1
				total += d
			}
		}
		if odds > 1 || total > 16 {
			continue
		}
		// Each member k lays k / 2 copies into each half (built ascending,
		// since digits are); a lone odd member also takes the middle.
		mid := 0
		half := []int{}
		for _, d := range digits {
			if d&1 == 1 {
				mid = d
			}
			for c := d / 2; c > 0; c-- {
				half = append(half, d)
			}
		}
		// Mirroring preserves order, so lexicographic halves enumerate this
		// set's palindromes in increasing numeric order.
		for {
			pal := int64(0)
			for _, d := range half {
				pal = pal*10 + int64(d)
			}
			if mid > 0 {
				pal = pal*10 + int64(mid)
			}
			for i := len(half) - 1; i >= 0; i-- {
				pal = pal*10 + int64(half[i])
			}
			if pal > limit {
				break // later halves only mirror to larger numbers
			}
			if pal > n {
				if pal < answer {
					answer = pal
				}
				break // first past n is this set's best
			}
			if !nextPermutation(half) {
				break
			}
		}
	}
	return answer
}

func nextPermutation(a []int) bool {
	// Advance a multiset to its next distinct permutation in place; false
	// once it has reached the last (descending) arrangement.
	i := len(a) - 2
	for i >= 0 && a[i] >= a[i+1] {
		i--
	}
	if i < 0 {
		return false
	}
	j := len(a) - 1
	for a[j] <= a[i] {
		j--
	}
	a[i], a[j] = a[j], a[i]
	for lo, hi := i+1, len(a)-1; lo < hi; lo, hi = lo+1, hi-1 {
		a[lo], a[hi] = a[hi], a[lo]
	}
	return true
}
