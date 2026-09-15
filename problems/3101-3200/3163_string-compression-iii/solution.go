import "strconv"

func compressedString(word string) string {
	// One sweep over the runs of equal characters, slicing each run
	// into chunks of at most nine because that is all one operation may
	// remove -- a length-14 run therefore encodes as "9c5c".
	comp := make([]byte, 0, 2*len(word))
	i := 0
	n := len(word)
	for i < n {
		c := word[i]
		j := i
		for j < n && word[j] == c && j-i < 9 {
			j++
		}
		comp = strconv.AppendInt(comp, int64(j-i), 10)
		comp = append(comp, c)
		i = j
	}
	return string(comp)
}
