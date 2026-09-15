func maxEqualFreq(nums []int) int {
	count := map[int]int{} // value -> occurrences
	freq := map[int]int{}  // occurrence count -> how many values have it
	best := 0
	for n := 1; n <= len(nums); n++ {
		value := nums[n-1]
		before := count[value]
		if before > 0 {
			freq[before]--
			if freq[before] == 0 {
				delete(freq, before)
			}
		}
		count[value] = before + 1
		freq[before+1]++

		// At most two frequency classes can ever be fixable.
		a, b, classes := -1, -1, 0
		for f, c := range freq {
			if c == 0 {
				continue
			}
			if classes == 0 {
				a = f
			} else {
				b = f
			}
			classes++
			if classes > 2 {
				break
			}
		}
		switch {
		case classes == 1:
			if a == 1 || freq[a] == 1 {
				best = n
			}
		case classes == 2:
			if a > b {
				a, b = b, a
			}
			if b == a+1 && freq[b] == 1 {
				best = n
			} else if a == 1 && freq[a] == 1 && 1+b*freq[b] == n {
				best = n
			}
		}
	}
	return best
}
