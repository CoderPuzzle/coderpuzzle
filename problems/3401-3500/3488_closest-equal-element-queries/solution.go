import (
	"sort"
)

func solveQueries(nums []int, queries []int) []int {
	// Group indices by value; each occurrence list is sorted. Per
	// query, binary-search the list and take the nearer of the two
	// circular neighbors.
	pos := make(map[int][]int)
	for i, v := range nums {
		pos[v] = append(pos[v], i)
	}
	n := len(nums)
	ans := make([]int, 0, len(queries))
	for _, q := range queries {
		p := pos[nums[q]]
		if len(p) == 1 {
			ans = append(ans, -1)
			continue
		}
		k := sort.SearchInts(p, q)
		prev := p[len(p)-1]
		if k > 0 {
			prev = p[k-1]
		}
		nxt := p[0]
		if k+1 < len(p) {
			nxt = p[k+1]
		}
		dprev := (q - prev + n) % n
		dnxt := (nxt - q + n) % n
		if dprev < dnxt {
			ans = append(ans, dprev)
		} else {
			ans = append(ans, dnxt)
		}
	}
	return ans
}
