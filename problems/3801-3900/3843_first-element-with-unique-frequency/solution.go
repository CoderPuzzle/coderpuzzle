func firstUniqueFreq(nums []int) int {
	// Values, frequencies, and counts of frequencies are all at most 1e5,
	// so int arithmetic carries everything without overflow.
	freq := map[int]int{}
	for _, x := range nums {
		freq[x]++
	}
	// freqCount maps each frequency to how many distinct values share it;
	// a value's frequency is unique exactly when freqCount[freq[x]] == 1.
	freqCount := map[int]int{}
	for _, f := range freq {
		freqCount[f]++
	}
	// Scan in index order: the first element whose value has a unique
	// frequency wins, even if a "smaller" qualifying value appears later.
	for _, x := range nums {
		if freqCount[freq[x]] == 1 {
			return x
		}
	}
	return -1
}
