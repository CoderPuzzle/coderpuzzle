import "strings"

// word is k-repeating exactly when some window of sequence is tiled by
// k back-to-back copies of word — no overlap, no gap. Scan start
// positions right to left: run[i] is the number of copies in the
// longest tiling beginning at i, so a match at i gives
// run[i] = run[i + m] + 1; the answer is the maximum run. A
// self-overlapping word such as "aa" cannot chain through the overlap,
// and scattered matches never tile into one block.
func maxRepeating(sequence string, word string) int {
	n, m := len(sequence), len(word)
	run := make([]int, n+1)
	best := 0
	for i := n - 1; i >= 0; i-- {
		if strings.HasPrefix(sequence[i:], word) {
			run[i] = run[i+m] + 1
			if run[i] > best {
				best = run[i]
			}
		}
	}
	return best
}
