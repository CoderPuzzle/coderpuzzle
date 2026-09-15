// eq[i] = 1 iff i >= 1 and s[i] == s[i - 1]. Deleting one character per
// equal adjacent pair is optimal, so the type-2 answer over s[l..r] is
// exactly sum(eq[l+1..r]). A Fenwick tree over eq answers each query in
// O(log n), and flipping s[j] only ever changes eq[j] and eq[j + 1],
// because every other adjacency is untouched.
func minDeletions(s string, queries [][]int) []int {
	n := len(s)
	cur := make([]int, n)
	bits := make([]int, n)
	add := func(i, delta int) {
		for ; i < n; i += i & -i {
			bits[i] += delta
		}
	}
	pref := func(i int) int {
		total := 0
		for ; i > 0; i -= i & -i {
			total += bits[i]
		}
		return total
	}
	setEq := func(i, value int) {
		if i >= 1 && i < n && cur[i] != value {
			add(i, value-cur[i])
			cur[i] = value
		}
	}
	for i := 1; i < n; i++ {
		if s[i] == s[i-1] {
			cur[i] = 1
			add(i, 1)
		}
	}
	chars := []byte(s)
	answer := make([]int, 0, len(queries))
	for _, query := range queries {
		if query[0] == 1 {
			j := query[1]
			if chars[j] == 'A' {
				chars[j] = 'B'
			} else {
				chars[j] = 'A'
			}
			if j+1 < n {
				if chars[j+1] == chars[j] {
					setEq(j+1, 1)
				} else {
					setEq(j+1, 0)
				}
			}
			if j >= 1 && chars[j] == chars[j-1] {
				setEq(j, 1)
			} else {
				setEq(j, 0)
			}
		} else {
			answer = append(answer, pref(query[2])-pref(query[1]))
		}
	}
	return answer
}
