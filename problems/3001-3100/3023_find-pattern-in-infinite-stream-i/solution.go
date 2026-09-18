package main

type Solution struct{}

func (solution *Solution) findPattern(stream *InfiniteStream, pattern []int) int {
	length := len(pattern)
	// Circular buffer of the last `length` bits: the newest bit overwrites
	// the oldest, and a full window is compared with the pattern.
	window := make([]int, length)
	head := 0
	read := 0
	for {
		window[head] = stream.Next()
		head = (head + 1) % length
		read++
		if read >= length {
			matches := true
			for i := 0; i < length; i++ {
				if window[(head+i)%length] != pattern[i] {
					matches = false
					break
				}
			}
			if matches {
				return read - length
			}
		}
	}
}
