// Two rolling variables instead of a memo table or recursion: the count for
// step i depends only on the counts for the two steps just below it.
func climbStairs(n int) int {
	prev, curr := 1, 1 // ways(0) = 1 (the empty climb), ways(1) = 1
	for i := 1; i < n; i++ {
		prev, curr = curr, prev+curr
	}
	return curr
}
