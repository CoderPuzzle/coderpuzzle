func numberOfSubstrings(s string) int64 {
	n := len(s)
	zerosAt := make([]int, 0, n)
	for index := 0; index < n; index++ {
		if s[index] == '0' {
			zerosAt = append(zerosAt, index)
		}
	}
	totalZeros := len(zerosAt)
	var answer int64
	firstZero := 0
	for left := 0; left < n; left++ {
		for firstZero < totalZeros && zerosAt[firstZero] < left {
			firstZero++
		}
		if firstZero < totalZeros {
			answer += int64(zerosAt[firstZero] - left)
		} else {
			answer += int64(n - left)
		}
		need := 1
		j := 1
		for need <= n-left && firstZero+j-1 < totalZeros {
			low := zerosAt[firstZero+j-1]
			required := left + need
			if required > low {
				low = required
			}
			high := n
			if firstZero+j < totalZeros {
				high = zerosAt[firstZero+j]
			}
			if high > low {
				answer += int64(high - low)
			}
			j++
			need += 2 * j
		}
	}
	return answer
}
