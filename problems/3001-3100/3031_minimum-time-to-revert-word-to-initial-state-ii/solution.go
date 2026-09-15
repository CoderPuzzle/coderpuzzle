func minimumTimeToInitialState(word string, k int) int {
	n := len(word)
	fail := make([]int, n)
	length := 0
	for i := 1; i < n; i++ {
		c := word[i]
		for length > 0 && word[length] != c {
			length = fail[length-1]
		}
		if word[length] == c {
			length++
		}
		fail[i] = length
	}
	isBorder := make([]bool, n+1)
	for cut := fail[n-1]; cut > 0; cut = fail[cut-1] {
		isBorder[cut] = true
	}
	t := 1
	for t*k < n && !isBorder[n-t*k] {
		t++
	}
	return t
}
