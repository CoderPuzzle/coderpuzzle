func kthCharacter(k int64, operations []int) string {
	// The final word can span 2^100 characters, so it is never built.
	// Replay backwards from k: operation i (which doubles the length from
	// 2^i to 2^(i+1)) only touches the position when k sits in its appended
	// half (k > 2^i), in which case the character is a copy of the one at
	// k - 2^i -- shifted once more if the type is 1. Every qualifying
	// type-1 operation advances the letter cyclically by one past 'z', and
	// starting from "a" the answer is that accumulated shift mod 26. Only
	// indices below k's bit width can qualify, so the walk starts there --
	// 2^i is then far below 2^63, and shifting by >= 64 (which masks the
	// shift count in Go) never happens.
	rest := k - 1
	top := -1
	for rest > 0 {
		rest >>= 1
		top++
	}
	last := len(operations) - 1
	if top < last {
		last = top
	}
	position := k
	shifts := 0
	for index := last; index >= 0; index-- {
		half := int64(1) << uint(index)
		if position > half {
			position -= half
			if operations[index] == 1 {
				shifts++
			}
		}
	}
	return string(rune('a' + shifts%26))
}
