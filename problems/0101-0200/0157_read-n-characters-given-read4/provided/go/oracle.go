// Problem-provided oracle (the read4 wire). The wrapper constructs the
// oracle from its tagged case values plus the query budget; values[0]
// is the generic case array for content.
package main

type File struct {
	content  []string
	budget   int64
	position int
}

func NewFile(values []any, budget int64) *File {
	// values carries one entry per oracle-construction key: values[0] is
	// the content array itself.
	wrapper, ok := values[0].([]any)
	if !ok {
		panic("Oracle content must be an array of strings")
	}
	content := make([]string, 0, len(wrapper))
	for _, value := range wrapper {
		text, ok := value.(string)
		if !ok {
			panic("Oracle content must be strings")
		}
		content = append(content, text)
	}
	return &File{content: content, budget: budget, position: 0}
}

func (file *File) Read4(buf4 []string) int {
	if file.budget <= 0 {
		panic("Oracle query budget exhausted")
	}
	file.budget--
	count := len(file.content) - file.position
	if count > 4 {
		count = 4
	}
	for index := 0; index < count; index++ {
		buf4[index] = file.content[file.position+index]
	}
	file.position += count
	return count
}
