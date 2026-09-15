func countXorSubarrays(nums []int, k int) int64 {
	// Prefix XOR turns subarrays into pairs: nums[i..j) has XOR
	// P[i] ^ P[j], so the answer counts prefix pairs i < j whose XOR
	// reaches k. Each prefix is inserted into a binary trie and then
	// queried against everything now in it, counting every pair once at
	// its right endpoint — plus the n+1 self-pairs (XOR 0), which only
	// qualify when k = 0 and are subtracted at the end. At a 0-bit of k
	// every trie prefix taking the flipped branch already exceeds k; at
	// a 1-bit only the flipped branch can still reach k. Falling out of
	// the walk leaves prefixes matching all 30 bits, i.e. XOR == k,
	// which still qualifies. 30 bits cover every prefix: values are <=
	// 10^9 < 2^30. Counts reach ~5e9, hence int64.
	n := len(nums)
	maxNodes := (n+1)*30 + 1
	child0 := make([]int32, maxNodes)
	child1 := make([]int32, maxNodes)
	cnt := make([]int32, maxNodes)
	nodes := 1
	var ans int64
	p := 0
	for j := 0; j <= n; j++ {
		if j > 0 {
			p ^= nums[j-1]
		}
		node := 0
		for t := 29; t >= 0; t-- {
			bit := (p >> t) & 1
			if bit == 0 {
				if child0[node] == 0 {
					child0[node] = int32(nodes)
					nodes++
				}
				node = int(child0[node])
			} else {
				if child1[node] == 0 {
					child1[node] = int32(nodes)
					nodes++
				}
				node = int(child1[node])
			}
			cnt[node]++
		}
		node = 0
		matched := true
		for t := 29; t >= 0; t-- {
			bit := (p >> t) & 1
			flip := child0[node]
			same := child1[node]
			if bit == 0 {
				flip, same = child1[node], child0[node]
			}
			if (k>>t)&1 == 1 {
				if flip == 0 {
					matched = false
					break
				}
				node = int(flip)
			} else {
				if flip != 0 {
					ans += int64(cnt[flip])
				}
				if same == 0 {
					matched = false
					break
				}
				node = int(same)
			}
		}
		if matched {
			ans += int64(cnt[node])
		}
	}
	if k == 0 {
		ans -= int64(n + 1)
	}
	return ans
}
