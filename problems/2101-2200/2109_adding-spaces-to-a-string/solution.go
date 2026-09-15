import "strings"

func addSpaces(s string, spaces []int) string {
	var result strings.Builder
	result.Grow(len(s) + len(spaces))
	spaceIndex := 0
	for index := 0; index < len(s); index++ {
		if spaceIndex < len(spaces) && spaces[spaceIndex] == index {
			result.WriteByte(' ')
			spaceIndex++
		}
		result.WriteByte(s[index])
	}
	return result.String()
}
