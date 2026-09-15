package main

// Two stacks split at the cursor: left holds the text before the cursor
// bottom-to-top, right the text after it nearest-char-on-top, so the
// characters adjacent to the cursor are always the two ends.
type TextEditor struct {
	left  []byte
	right []byte
}

func NewTextEditorTyped() *TextEditor {
	return &TextEditor{}
}

func (design *TextEditor) addText(text string) {
	design.left = append(design.left, text...)
}

func (design *TextEditor) deleteText(k int) int {
	if k > len(design.left) {
		k = len(design.left)
	}
	design.left = design.left[:len(design.left)-k]
	return k
}

func (design *TextEditor) cursorLeft(k int) string {
	shift(&design.left, &design.right, k)
	return design.tail()
}

func (design *TextEditor) cursorRight(k int) string {
	shift(&design.right, &design.left, k)
	return design.tail()
}

// shift moves min(k, len) characters from the end of `from` onto the end
// of `to` — exactly the cursor sliding k positions.
func shift(from *[]byte, to *[]byte, k int) {
	if k > len(*from) {
		k = len(*from)
	}
	for ; k > 0; k-- {
		*to = append(*to, (*from)[len(*from)-1])
		*from = (*from)[:len(*from)-1]
	}
}

func (design *TextEditor) tail() string {
	start := len(design.left) - 10
	if start < 0 {
		start = 0
	}
	return string(design.left[start:])
}
