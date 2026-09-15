func minimumBuckets(hamsters string) int {
	street := []byte(hamsters)
	buckets := 0
	for index := range street {
		if street[index] != 'H' {
			continue
		}
		if index > 0 && street[index-1] == 'B' {
			continue
		}
		if index+1 < len(street) && street[index+1] == '.' {
			street[index+1] = 'B'
			buckets++
		} else if index > 0 && street[index-1] == '.' {
			street[index-1] = 'B'
			buckets++
		} else {
			return -1
		}
	}
	return buckets
}
