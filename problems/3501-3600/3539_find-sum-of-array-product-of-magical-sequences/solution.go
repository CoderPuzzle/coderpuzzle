import "math/bits"

// Forward DP over the indices of nums. State (j, b, mask) after a prefix of
// indices: j sequence slots filled, b set bits of the sum already finalized
// (every bit below the current index is fixed, since later terms only add
// multiples of 2^i), and mask = partial sum >> i, the carry window of
// not-yet-settled high bits (< 2^5).
func magicalSum(m int, k int, nums []int) int {
	const MOD = int64(1000000007)
	n := len(nums)
	// comb[a][c]: ways to scatter c copies of index i into the a = m - j
	// sequence slots still unassigned.
	comb := make([][]int64, m+1)
	for a := 0; a <= m; a++ {
		comb[a] = make([]int64, m+1)
		comb[a][0] = 1
		for c := 1; c <= a; c++ {
			comb[a][c] = (comb[a-1][c-1] + comb[a-1][c]) % MOD
		}
	}
	// pw[i][c] = nums[i]^c mod MOD (64-bit: the raw powers reach 1e16).
	pw := make([][]int64, n)
	for i := 0; i < n; i++ {
		pw[i] = make([]int64, m+1)
		pw[i][0] = 1
		for c := 1; c <= m; c++ {
			pw[i][c] = pw[i][c-1] * int64(nums[i]) % MOD
		}
	}
	pc := make([]int, 64)
	for x := 0; x < 64; x++ {
		pc[x] = bits.OnesCount(uint(x))
	}
	dp := make([][][]int64, m+1)
	for j := 0; j <= m; j++ {
		dp[j] = make([][]int64, m+1)
		for b := 0; b <= m; b++ {
			dp[j][b] = make([]int64, 32)
		}
	}
	dp[0][0][0] = 1
	for i := 0; i < n; i++ {
		ndp := make([][][]int64, m+1)
		for j := 0; j <= m; j++ {
			ndp[j] = make([][]int64, m+1)
			for b := 0; b <= m; b++ {
				ndp[j][b] = make([]int64, 32)
			}
		}
		for j := 0; j <= m; j++ {
			for b := 0; b <= m; b++ {
				for mask := 0; mask < 32; mask++ {
					v := dp[j][b][mask]
					if v == 0 {
						continue
					}
					for c := 0; c <= m-j; c++ {
						t := mask + c
						nb := b + t&1
						// Set bits of a sum of j+c powers never exceed
						// j+c: prune lanes that can no longer reach k.
						if nb+pc[t>>1] > j+c {
							continue
						}
						add := v * comb[m-j][c] % MOD * pw[i][c] % MOD
						ndp[j+c][nb][t>>1] = (ndp[j+c][nb][t>>1] + add) % MOD
					}
				}
			}
		}
		dp = ndp
	}
	// After the last index, mask holds every remaining high bit: the total
	// set-bit count of the sum is b + popcount(mask).
	var ans int64
	for b := 0; b <= m; b++ {
		for mask := 0; mask < 32; mask++ {
			if b+pc[mask] == k {
				ans = (ans + dp[m][b][mask]) % MOD
			}
		}
	}
	return int(ans)
}
