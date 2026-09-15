import "strconv"

// Two indexes share one pass: read scans a group of equal characters to
// its end, write stores the compressed form back into chars itself. A
// group of k characters compresses to 1 + digits(k) slots — never more
// than k — so the write frontier always trails the read frontier and
// overwriting in place is safe. Only the indexes and the run count live
// outside the array, and the final write index is the compressed length.
func compress(chars []string) int {
	write, read := 0, 0
	n := len(chars)
	for read < n {
		ch := chars[read]
		runEnd := read
		for runEnd < n && chars[runEnd] == ch {
			runEnd++
		}
		count := runEnd - read
		chars[write] = ch
		write++
		if count > 1 {
			for _, digit := range strconv.Itoa(count) {
				chars[write] = string(digit)
				write++
			}
		}
		read = runEnd
	}
	return write
}
