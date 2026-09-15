func gameResult(head *ListNode) string {
	// The two values of a pair can never be equal: every even-indexed
	// value is even and every odd-indexed value is odd. One strict
	// comparison therefore always awards exactly one point per pair.
	evenWins, oddWins := 0, 0
	for node := head; node != nil; node = node.Next.Next {
		if node.Val > node.Next.Val {
			evenWins++
		} else {
			oddWins++
		}
	}
	if evenWins > oddWins {
		return "Even"
	}
	if oddWins > evenWins {
		return "Odd"
	}
	return "Tie"
}
