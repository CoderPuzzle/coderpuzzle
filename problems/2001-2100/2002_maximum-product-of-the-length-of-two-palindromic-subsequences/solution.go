func maxProduct(s string) int {
	size := 1 << len(s)
	palindromeLength := make([]int, size)

	for mask := 1; mask < size; mask++ {
		subsequence := make([]byte, 0, len(s))
		for index := 0; index < len(s); index++ {
			if mask&(1<<index) != 0 {
				subsequence = append(subsequence, s[index])
			}
		}
		palindrome := true
		for left, right := 0, len(subsequence)-1; left < right; left, right = left+1, right-1 {
			if subsequence[left] != subsequence[right] {
				palindrome = false
				break
			}
		}
		if palindrome {
			palindromeLength[mask] = len(subsequence)
		}
	}

	answer, full := 0, size-1
	for first := 1; first < size; first++ {
		if palindromeLength[first] == 0 {
			continue
		}
		remaining := full ^ first
		for second := remaining; second != 0; second = (second - 1) & remaining {
			product := palindromeLength[first] * palindromeLength[second]
			if product > answer {
				answer = product
			}
		}
	}
	return answer
}
