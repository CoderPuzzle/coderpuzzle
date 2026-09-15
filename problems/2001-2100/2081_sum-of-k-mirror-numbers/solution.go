func kMirror(k int, n int) int64 {
	powerOfTen := func(exponent int) int64 {
		value := int64(1)
		for exponent > 0 {
			value *= 10
			exponent--
		}
		return value
	}
	makePalindrome := func(prefix int64, oddLength bool) int64 {
		palindrome := prefix
		remaining := prefix
		if oddLength {
			remaining /= 10
		}
		for remaining > 0 {
			palindrome = palindrome*10 + remaining%10
			remaining /= 10
		}
		return palindrome
	}
	isBasePalindrome := func(value int64) bool {
		original := value
		reversed := int64(0)
		for value > 0 {
			reversed = reversed*int64(k) + value%int64(k)
			value /= int64(k)
		}
		return reversed == original
	}

	total := int64(0)
	found := 0
	for length := 1; found < n; length++ {
		halfLength := (length + 1) / 2
		start := powerOfTen(halfLength - 1)
		end := powerOfTen(halfLength)
		for prefix := start; prefix < end; prefix++ {
			candidate := makePalindrome(prefix, length%2 == 1)
			if isBasePalindrome(candidate) {
				total += candidate
				found++
				if found == n {
					return total
				}
			}
		}
	}
	return total
}
