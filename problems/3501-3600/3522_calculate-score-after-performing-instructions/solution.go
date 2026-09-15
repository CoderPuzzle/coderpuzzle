// Each index executes at most once, so a linear walk with a visited flag
// per index suffices: "add" contributes values[i] and steps to i + 1,
// "jump" moves to i + values[i], and the process ends on any out-of-bounds
// target or on an already-executed target (which is not executed again).
// The score is 64-bit: with n up to 1e5 adds of magnitude up to 1e5,
// |score| can reach 1e10.
func calculateScore(instructions []string, values []int) int64 {
	n := len(instructions)
	executed := make([]bool, n)
	var score int64
	i := 0
	for 0 <= i && i < n && !executed[i] {
		executed[i] = true
		if instructions[i] == "add" {
			score += int64(values[i])
			i++
		} else {
			i += values[i]
		}
	}
	return score
}
