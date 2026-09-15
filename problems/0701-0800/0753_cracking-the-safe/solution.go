import "strings"

func crackSafe(n int, k int) string {
	// Iterative Hierholzer over the de Bruijn graph: nodes are (n-1)-digit
	// strings (as base-k integers), edges are the k^n passwords. Digits are
	// tried in ascending order, matching the reference's deterministic walk.
	total := 1
	for i := 0; i < n; i++ {
		total *= k
	}
	shift := 1
	for i := 0; i < n-1; i++ {
		shift *= k
	}
	seen := make([]bool, total)
	var out strings.Builder
	nodeStack := []int{0}
	digitStack := []int{0} // digit used to enter each stacked node
	for len(nodeStack) > 0 {
		node := nodeStack[len(nodeStack)-1]
		nxt := -1
		for x := 0; x < k; x++ {
			e := node*k + x
			if !seen[e] {
				seen[e] = true
				nxt = x
				break
			}
		}
		if nxt >= 0 {
			nodeStack = append(nodeStack, (node*k+nxt)%shift)
			digitStack = append(digitStack, nxt)
		} else {
			nodeStack = nodeStack[:len(nodeStack)-1]
			d := digitStack[len(digitStack)-1]
			digitStack = digitStack[:len(digitStack)-1]
			if len(nodeStack) > 0 {
				out.WriteByte(byte('0' + d))
			}
		}
	}
	out.WriteString(strings.Repeat("0", n-1))
	return out.String()
}
