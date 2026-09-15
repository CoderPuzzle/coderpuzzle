// The rules ask for the longest stretch of trees holding at most two fruit
// types: two baskets, one type each, one fruit from every tree picked while
// moving right. A sliding window over a type->count map maintains exactly
// that — extend the right edge tree by tree, and whenever a third type
// enters, retire trees from the left until one type's count reaches zero and
// drops out. The window then always spans the longest legal picking trip
// ending at the current tree, so its length contests the answer at every step.
func totalFruit(fruits []int) int {
	count := map[int]int{}
	best := 0
	left := 0
	for right, tree := range fruits {
		count[tree]++
		for len(count) > 2 {
			fruit := fruits[left]
			count[fruit]--
			if count[fruit] == 0 {
				delete(count, fruit)
			}
			left++
		}
		best = max(best, right-left+1)
	}
	return best
}
