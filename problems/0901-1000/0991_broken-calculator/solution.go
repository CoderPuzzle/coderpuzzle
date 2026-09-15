// Work backwards from target: reverse double is halve (only legal on an
// even number) and reverse subtract-1 is add-1. While target sits above
// startValue, an odd target must add 1 before it can halve, and an even
// target halves at once — two adds pushed before a halve equal one add
// after it, so deferring every add is optimal. Below startValue only
// plain subtractions remain.
func brokenCalc(startValue int, target int) int {
	start, value, ops := int64(startValue), int64(target), int64(0)
	for value > start {
		if value%2 == 1 {
			value++
		} else {
			value /= 2
		}
		ops++
	}
	return int(ops + start - value)
}
