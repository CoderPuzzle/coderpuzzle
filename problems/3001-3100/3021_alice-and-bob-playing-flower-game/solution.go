func flowerGame(n int, m int) int64 {
	// Each turn removes exactly one flower, so a game started with x + y
	// flowers always lasts exactly x + y turns, and the mover of that
	// final turn empties the field and captures the opponent. Alice moves
	// on odd-numbered turns, so she wins exactly when x + y is odd.
	// Counting odd-sum pairs: odd x against even y plus even x against
	// odd y, where [1, k] holds ceil(k / 2) odds and floor(k / 2) evens.
	// Widen to 64 bits before multiplying: the answer reaches 5e9 at the
	// bounds, past what an int32 can hold.
	oddN := int64(n+1) / 2
	evenN := int64(n) / 2
	oddM := int64(m+1) / 2
	evenM := int64(m) / 2
	return oddN*evenM + evenN*oddM
}
