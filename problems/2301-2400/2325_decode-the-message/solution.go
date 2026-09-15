import (
	"strings"
)

// First appearances in key fill the substitution table in order, each
// new letter taking the next alphabet letter; spaces map to spaces,
// then message is translated through the table.
func decodeMessage(key string, message string) string {
	var out strings.Builder
	out.Grow(len(message))
	var table [26]byte
	next := byte('a')
	for i := 0; i < len(key); i++ {
		ch := key[i]
		if ch != ' ' && table[ch-'a'] == 0 {
			table[ch-'a'] = next
			next++
		}
	}
	for i := 0; i < len(message); i++ {
		ch := message[i]
		if ch == ' ' {
			out.WriteByte(' ')
		} else {
			out.WriteByte(table[ch-'a'])
		}
	}
	return out.String()
}
