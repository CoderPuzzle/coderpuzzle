// Only two numbers matter while the letters are written in order: how wide
// the line being filled already is, and how many lines have been started. A
// letter joins the current line when it keeps the total within 100 pixels
// and opens the next line when it would push past it, so a single
// left-to-right sweep over s ends holding both answers: the line count and
// the last line's width.
func numberOfLines(widths []int, s string) []int {
	lines := 1
	current := 0
	for i := 0; i < len(s); i++ {
		width := widths[s[i]-'a']
		if current+width > 100 {
			lines++
			current = width
		} else {
			current += width
		}
	}
	return []int{lines, current}
}
