func countCompleteSubstrings(word string, k int) int {
	n := len(word)
	vals := make([]int, n)
	for i := 0; i < n; i++ {
		vals[i] = int(word[i] - 'a')
	}
	total := 0
	start := 0
	for start < n {
		end := start + 1
		for end < n {
			diff := vals[end] - vals[end-1]
			if diff < 0 {
				diff = -diff
			}
			if diff > 2 {
				break
			}
			end++
		}
		segLen := end - start
		for m := 1; m <= 26; m++ {
			length := m * k
			if length > segLen {
				break
			}
			cnt := make([]int, 26)
			bad := 0
			for i := start; i < start+length; i++ {
				old := cnt[vals[i]]
				if old+1 == k {
					if old != 0 {
						bad--
					}
				} else if old == 0 || old == k {
					bad++
				}
				cnt[vals[i]] = old + 1
			}
			if bad == 0 {
				total++
			}
			left := start
			for right := start + length; right < end; right++ {
				old := cnt[vals[right]]
				if old+1 == k {
					if old != 0 {
						bad--
					}
				} else if old == 0 || old == k {
					bad++
				}
				cnt[vals[right]] = old + 1
				old = cnt[vals[left]]
				cnt[vals[left]] = old - 1
				if old-1 == k {
					bad--
				} else if old-1 == 0 {
					if k > 1 {
						bad--
					}
				} else if old == k {
					bad++
				}
				left++
				if bad == 0 {
					total++
				}
			}
		}
		start = end
	}
	return total
}
