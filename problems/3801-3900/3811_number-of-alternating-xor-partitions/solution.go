// nums[i] and both targets are at most 1e5 < 2^17, and XOR never widens a
// value, so every prefix XOR and every bucket key p ^ target stays below
// 2^17. Counts are reduced modulo 1e9 + 7 at every bucket write, so each
// stored count is below 1e9 + 7 and any pre-reduction sum below 2^31; the
// buckets are int64 anyway.
func alternatingXor(nums []int, target1 int, target2 int) int {
	const mod = 1_000_000_007
	// endsT1[v] / endsT2[v]: counts of valid partitions of a processed
	// prefix whose last block XORs to target1 / target2, over positions with
	// prefix XOR v. Position 0 pre-loads the empty start on the target2
	// side, ready to open a target1 block.
	endsT1 := make([]int64, 1<<17)
	endsT2 := make([]int64, 1<<17)
	endsT2[0] = 1
	p := 0
	var curT1, curT2 int64
	for _, x := range nums {
		// A target1 block ending here opens after a position whose prefix
		// XOR is p ^ target1, carrying a partition that ended on target2
		// (or the empty start); symmetrically for target2.
		p ^= x
		curT1 = endsT2[p^target1]
		curT2 = endsT1[p^target2]
		endsT1[p] = (endsT1[p] + curT1) % mod
		endsT2[p] = (endsT2[p] + curT2) % mod
	}
	// The alternation may stop after a target1 or a target2 block.
	return int((curT1 + curT2) % mod)
}
