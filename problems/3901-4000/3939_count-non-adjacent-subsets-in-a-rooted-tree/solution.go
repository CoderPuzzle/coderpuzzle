func countValidSubsets(parent []int, nums []int, k int) int {
	const mod int64 = 1000000007
	n := len(parent)
	children := make([][]int, n)
	for i := 1; i < n; i++ {
		children[parent[i]] = append(children[parent[i]], i)
	}

	dp0 := make([][]int64, n)
	dp1 := make([][]int64, n)
	for node := n - 1; node >= 0; node-- {
		dp0[node] = make([]int64, k)
		dp1[node] = make([]int64, k)
		dp0[node][0] = 1
		dp1[node][nums[node]%k] = 1
		for _, child := range children[node] {
			merged0 := make([]int64, k)
			merged1 := make([]int64, k)
			for r0 := 0; r0 < k; r0++ {
				value0 := dp0[node][r0]
				value1 := dp1[node][r0]
				if value0 == 0 && value1 == 0 {
					continue
				}
				for r1 := 0; r1 < k; r1++ {
					childAny := (dp0[child][r1] + dp1[child][r1]) % mod
					residue := (r0 + r1) % k
					merged0[residue] = (merged0[residue] + value0*childAny) % mod
					merged1[residue] = (merged1[residue] + value1*dp0[child][r1]) % mod
				}
			}
			dp0[node] = merged0
			dp1[node] = merged1
		}
	}
	return int((dp0[0][0] + dp1[0][0] - 1 + mod) % mod)
}
