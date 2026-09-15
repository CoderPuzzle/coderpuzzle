import "math"

// A query (x, y) sums the stride x, x+y, x+2y, ... — O(n/y) per query
// when walked directly, which stays cheap only for large y. Split the
// queries on B ~ sqrt(n): every y <= B gets a residue table pre[y]
// built right-to-left with pre[y][i] = (nums[i] + pre[y][i+y]) % mod,
// making each such query one lookup, while any y > B strides at most
// n/B ~ B indices. A full suffix sums to 5*10^4 * 10^9 = 5*10^13
// before the modulus, so accumulation runs in 64 bits and table rows
// store plain 32-bit mod values.
func solve(nums []int, queries [][]int) []int {
	const mod = 1_000_000_007
	n := len(nums)
	limit := int(math.Sqrt(float64(n)))
	// pre[y][i] = (nums[i] + pre[y][i+y]) % mod — the answer of query (i, y)
	pre := make([][]int32, limit+1)
	for y := 1; y <= limit; y++ {
		row := make([]int32, n)
		for i := n - 1; i >= 0; i-- {
			tail := int64(0)
			if i+y < n {
				tail = int64(row[i+y])
			}
			row[i] = int32((int64(nums[i]) + tail) % mod)
		}
		pre[y] = row
	}
	answer := make([]int, len(queries))
	for q, query := range queries {
		x, y := query[0], query[1]
		if y <= limit {
			answer[q] = int(pre[y][x])
		} else {
			total := int64(0)
			for j := x; j < n; j += y {
				total += int64(nums[j])
			}
			answer[q] = int(total % mod)
		}
	}
	return answer
}
