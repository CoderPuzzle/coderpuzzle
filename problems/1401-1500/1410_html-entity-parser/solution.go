import "strings"

func entityParser(text string) string {
	entities := map[string]string{
		"&quot;":  "\"",
		"&apos;":  "'",
		"&amp;":   "&",
		"&gt;":    ">",
		"&lt;":    "<",
		"&frasl;": "/",
	}
	var sb strings.Builder
	sb.Grow(len(text))
	i, n := 0, len(text)
	for i < n {
		if text[i] == '&' {
			matched := false
			for entity, symbol := range entities {
				if strings.HasPrefix(text[i:], entity) {
					sb.WriteString(symbol)
					i += len(entity)
					matched = true
					break
				}
			}
			if !matched {
				sb.WriteByte(text[i])
				i++
			}
		} else {
			sb.WriteByte(text[i])
			i++
		}
	}
	return sb.String()
}
