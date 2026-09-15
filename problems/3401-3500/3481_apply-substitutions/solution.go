import "strings"

// The replacements form a DAG on keys: expand(key) renders its raw value,
// recursing into each %X% reference exactly once via the memo.
func applySubstitutions(replacements [][]string, text string) string {
	raw := make(map[string]string, len(replacements))
	for _, pair := range replacements {
		raw[pair[0]] = pair[1]
	}
	done := make(map[string]string, len(replacements))

	var expand func(key string) string
	expand = func(key string) string {
		if finished, ok := done[key]; ok {
			return finished
		}
		// %K% placeholders are three characters wide (single-letter
		// keys), so one linear scan splits value into literals and refs.
		value := raw[key]
		out := strings.Builder{}
		for i := 0; i < len(value); {
			if value[i] == '%' {
				out.WriteString(expand(value[i+1 : i+2]))
				i += 3
			} else {
				out.WriteByte(value[i])
				i += 1
			}
		}
		done[key] = out.String()
		return out.String()
	}

	out := strings.Builder{}
	for i := 0; i < len(text); {
		if text[i] == '%' {
			out.WriteString(expand(text[i+1 : i+2]))
			i += 3
		} else {
			out.WriteByte(text[i])
			i += 1
		}
	}
	return out.String()
}
