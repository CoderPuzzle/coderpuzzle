import (
	"strconv"
	"strings"
)

func betterCompression(compressed string) string {
	var counts [26]int
	i := 0
	n := len(compressed)
	for i < n {
		letter := compressed[i] - 'a'
		i++
		freq := 0
		for i < n && compressed[i] >= '0' && compressed[i] <= '9' {
			freq = freq*10 + int(compressed[i]-'0')
			i++
		}
		counts[letter] += freq
	}
	var result strings.Builder
	for letter := 0; letter < 26; letter++ {
		if counts[letter] > 0 {
			result.WriteByte(byte('a' + letter))
			result.WriteString(strconv.Itoa(counts[letter]))
		}
	}
	return result.String()
}
