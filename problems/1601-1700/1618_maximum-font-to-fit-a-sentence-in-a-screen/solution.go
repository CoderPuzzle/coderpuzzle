func maxFont(text string, w int, h int, fonts []int, widths [][]int, heights []int) int {
	// Fit is monotonic in the font index (widths/heights only grow), so
	// binary search the boundary between fitting and not fitting.
	fits := func(index int) bool {
		if heights[index] > h {
			return false
		}
		row := widths[index]
		total := 0
		for i := 0; i < len(text); i++ {
			total += row[text[i]-'a']
			if total > w {
				return false
			}
		}
		return true
	}

	lo, hi := 0, len(fonts)-1
	answer := -1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if fits(mid) {
			answer = fonts[mid]
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return answer
}
