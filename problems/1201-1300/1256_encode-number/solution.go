func encode(num int) string {
	// num + 1 in binary, minus its leading 1.
	v := uint(num) + 1
	bits := []byte{}
	high := 31
	for high >= 0 && v&(1<<uint(high)) == 0 {
		high--
	}
	for i := high - 1; i >= 0; i-- {
		if v&(1<<uint(i)) != 0 {
			bits = append(bits, '1')
		} else {
			bits = append(bits, '0')
		}
	}
	return string(bits)
}
