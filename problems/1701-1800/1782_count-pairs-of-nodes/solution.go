import "sort"

// Degrees count every parallel edge separately, so for a pair (a, b) the
// degree sum counts an edge shared by both endpoints twice: incident(a, b)
// = deg[a] + deg[b] - mult(a, b). For each pair joined by at least one
// edge, s is the degree sum and t the true incident count; a query k
// overcounts exactly the pairs with t <= k < s, so the fix adds #{s <= k}
// - #{t <= k}.
func countPairs(n int, edges [][]int, queries []int) []int {
	deg := make([]int, n+1)
	mult := make(map[[2]int]int)
	for _, e := range edges {
		u, v := e[0], e[1]
		deg[u]++
		deg[v]++
		if u > v {
			u, v = v, u
		}
		mult[[2]int{u, v}]++
	}
	d := append([]int(nil), deg[1:]...)
	sort.Ints(d)
	sVals := make([]int, 0, len(mult))
	tVals := make([]int, 0, len(mult))
	for pr, m := range mult {
		s := deg[pr[0]] + deg[pr[1]]
		sVals = append(sVals, s)
		tVals = append(tVals, s-m)
	}
	sort.Ints(sVals)
	sort.Ints(tVals)
	answer := make([]int, len(queries))
	for j, k := range queries {
		// Two pointers over the sorted degrees count every unordered pair
		// whose degree sum is strictly above k.
		lo, hi, total := 0, n-1, 0
		for lo < hi {
			if d[lo]+d[hi] > k {
				total += hi - lo
				hi--
			} else {
				lo++
			}
		}
		total += upperBound(sVals, k) - upperBound(tVals, k)
		answer[j] = total
	}
	return answer
}

// Index of the first element strictly greater than key.
func upperBound(a []int, key int) int {
	return sort.Search(len(a), func(i int) bool { return a[i] > key })
}
