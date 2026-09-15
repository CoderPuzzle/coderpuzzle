import "strings"

// Find the first occurrence of ch; if it is absent the word is returned
// unchanged. Otherwise flip word[0..i] with a byte swap loop and keep the
// rest of the string in order. word is lowercase ASCII, so bytes == runes.
func reversePrefix(word string, ch string) string {
	i := strings.Index(word, ch)
	if i == -1 {
		return word
	}
	bytes := []byte(word)
	for lo, hi := 0, i; lo < hi; lo, hi = lo+1, hi-1 {
		bytes[lo], bytes[hi] = bytes[hi], bytes[lo]
	}
	return string(bytes)
}
