func singleDivisorTriplet(nums []int) int64 {
	freq := [101]int{}
	for _, num := range nums {
		freq[num]++
	}
	values := []int{}
	for v := 1; v <= 100; v++ {
		if freq[v] > 0 {
			values = append(values, v)
		}
	}
	var total int64
	for i, a := range values {
		for j := i; j < len(values); j++ {
			b := values[j]
			for k := j; k < len(values); k++ {
				c := values[k]
				s := a + b + c
				// divisibility is checked per index, so repeated
				// values contribute one hit per copy
				hits := 0
				if s%a == 0 {
					hits++
				}
				if s%b == 0 {
					hits++
				}
				if s%c == 0 {
					hits++
				}
				if hits != 1 {
					continue
				}
				switch {
				case a == b && b == c:
					f := int64(freq[a])
					total += f * (f - 1) * (f - 2)
				case a == b || b == c:
					twice, once := b, a
					if a == b {
						twice, once = a, c
					}
					f := int64(freq[twice])
					total += f * (f - 1) / 2 * int64(freq[once]) * 6
				default:
					total += int64(freq[a]) * int64(freq[b]) *
						int64(freq[c]) * 6
				}
			}
		}
	}
	return total
}
