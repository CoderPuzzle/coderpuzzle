func longestDecomposition(text string) int {
	n := len(text)
	count := 0
	left := 0
	right := n
	for left < right {
		size := 1
		matched := false
		// prefix and suffix of equal size must not overlap
		for left+size <= right-size {
			if text[left:left+size] == text[right-size:right] {
				// shortest matching pair first: an exchange argument shows
				// splitting a longer pair here never lowers the count
				count += 2
				left += size
				right -= size
				matched = true
				break
			}
			size++
		}
		if !matched {
			// no size pairs: the entire remainder is one final chunk
			count++
			break
		}
	}
	return count
}
