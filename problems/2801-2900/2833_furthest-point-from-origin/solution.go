// Only the split between the fixed moves matters: each 'L' steps -1
// and each 'R' +1, so together they settle at the offset left - right.
// Every '_' is free to become either character, and spending all of
// them on one side dominates any mixed assignment — a mixture only
// lets some of them cancel out against the rest. The furthest point
// is therefore |left - right| + wilds, reached by rewriting every '_'
// as whichever fixed character already leads; ties choose either side
// at no cost.
func furthestDistanceFromOrigin(moves string) int {
	left := 0
	right := 0
	wilds := 0
	for _, ch := range moves {
		switch ch {
		case 'L':
			left++
		case 'R':
			right++
		default:
			wilds++
		}
	}
	diff := left - right
	if diff < 0 {
		diff = -diff
	}
	return diff + wilds
}
