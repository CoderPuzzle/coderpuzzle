func maxRepOpt1(text string) int {
	counts := [256]int{}
	for i := 0; i < len(text); i++ {
		counts[text[i]]++
	}
	// run-length encode
	runChars := []byte{}
	runLens := []int{}
	for i := 0; i < len(text); i++ {
		ch := text[i]
		if len(runChars) > 0 && runChars[len(runChars)-1] == ch {
			runLens[len(runLens)-1]++
		} else {
			runChars = append(runChars, ch)
			runLens = append(runLens, 1)
		}
	}
	best := 0
	for i := range runChars {
		best = max(best, min(runLens[i]+1, counts[runChars[i]]))
	}
	for i := 1; i+1 < len(runChars); i++ {
		if runLens[i] == 1 && runChars[i-1] == runChars[i+1] {
			ch := runChars[i-1]
			combined := runLens[i-1] + runLens[i+1]
			extra := 0
			if counts[ch] > combined {
				extra = 1
			}
			best = max(best, combined+extra)
		}
	}
	return best
}
