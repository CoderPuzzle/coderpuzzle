// Array copy instead of an in-place walk: lift the values into a slice,
// then compare front-to-back against back-to-front with two indices.
func isPalindrome(head *ListNode) bool {
	// Copy the values out; the list itself only needs one forward walk.
	var values []int
	for node := head; node != nil; node = node.Next {
		values = append(values, node.Val)
	}
	// Two-ended compare: i walks forward, j backward, and every mirror
	// pair must agree before the indices meet in the middle.
	i, j := 0, len(values)-1
	for i < j {
		if values[i] != values[j] {
			return false
		}
		i++
		j--
	}
	return true
}
