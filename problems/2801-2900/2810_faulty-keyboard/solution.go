func finalString(s string) string {
	// Type characters into one growing buffer: letters append, and each
	// 'i' reverses everything typed so far. After the last keystroke the
	// buffer is exactly the laptop screen.
	screen := []byte{}
	for k := 0; k < len(s); k++ {
		if s[k] == 'i' {
			for l, r := 0, len(screen)-1; l < r; l, r = l+1, r-1 {
				screen[l], screen[r] = screen[r], screen[l]
			}
		} else {
			screen = append(screen, s[k])
		}
	}
	return string(screen)
}
