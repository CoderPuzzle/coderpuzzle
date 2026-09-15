func minMovesToMakePalindrome(s string) int {
	a := []byte(s)
	moves := 0
	left, right := 0, len(a)-1
	for left < right {
		if a[left] == a[right] {
			left++
			right--
			continue
		}
		// find rightmost occurrence of a[left] in (left, right]
		k := right
		for k > left && a[k] != a[left] {
			k--
		}
		if k == left {
			// a[left] is the lone middle character: nudge it one step inward
			a[left], a[left+1] = a[left+1], a[left]
			moves++
		} else {
			// bubble a[k] rightward to position right
			for k < right {
				a[k], a[k+1] = a[k+1], a[k]
				k++
				moves++
			}
			left++
			right--
		}
	}
	return moves
}
