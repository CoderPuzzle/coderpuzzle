func decodeCiphertext(encodedText string, rows int) string {
	if len(encodedText) == 0 {
		return ""
	}
	cols := len(encodedText) / rows
	decoded := make([]byte, 0, len(encodedText))
	for start := 0; start < cols; start++ {
		for row, col := 0, start; row < rows && col < cols; row, col = row+1, col+1 {
			decoded = append(decoded, encodedText[row*cols+col])
		}
	}
	end := len(decoded)
	for end > 0 && decoded[end-1] == ' ' {
		end--
	}
	return string(decoded[:end])
}
