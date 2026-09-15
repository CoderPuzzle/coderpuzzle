func lexSmallest(s string) string {
	n := len(s)
	b := []byte(s)
	r := make([]byte, n)
	for i := 0; i < n; i++ {
		r[i] = b[n-1-i]
	}
	// Double rolling hashes over s and over its reverse: each candidate
	// glues at most two slices of these two strings, so any candidate
	// prefix hashes in O(1) from the tables below. reverse(s[:k]) is the
	// slice of the reversed string at offset n-k; reverse(s[n-k:]) sits
	// at offset 0.
	const (
		m1 = int64(1000000007)
		m2 = int64(998244353)
		b1 = int64(131)
		b2 = int64(137)
	)
	pw1 := make([]int64, n+1)
	pw2 := make([]int64, n+1)
	hs1 := make([]int64, n+1)
	hs2 := make([]int64, n+1)
	ht1 := make([]int64, n+1)
	ht2 := make([]int64, n+1)
	pw1[0], pw2[0] = 1, 1
	for i := 0; i < n; i++ {
		v, w := int64(b[i]-'a'+1), int64(r[i]-'a'+1)
		pw1[i+1] = pw1[i] * b1 % m1
		pw2[i+1] = pw2[i] * b2 % m2
		hs1[i+1] = (hs1[i]*b1 + v) % m1
		hs2[i+1] = (hs2[i]*b2 + v) % m2
		ht1[i+1] = (ht1[i]*b1 + w) % m1
		ht2[i+1] = (ht2[i]*b2 + w) % m2
	}
	subS := func(l, length int) (int64, int64) {
		return (hs1[l+length] - hs1[l]*pw1[length]%m1 + m1) % m1,
			(hs2[l+length] - hs2[l]*pw2[length]%m2 + m2) % m2
	}
	subT := func(l, length int) (int64, int64) {
		return (ht1[l+length] - ht1[l]*pw1[length]%m1 + m1) % m1,
			(ht2[l+length] - ht2[l]*pw2[length]%m2 + m2) % m2
	}
	// Hash pair of a candidate's first `length` characters: kind 0 is
	// reverse(s[:k]) + s[k:] (slices t[:k] then s[k:]), kind 1 is
	// s[:n-k] + reverse(s[n-k:]) (slices s[:head] then t[:head]).
	pref := func(kind, k, length int) (int64, int64) {
		if kind == 0 {
			if length <= k {
				return subT(n-k, length)
			}
			a1, a2 := subT(n-k, k)
			c1, c2 := subS(k, length-k)
			return (a1*pw1[length-k] + c1) % m1, (a2*pw2[length-k] + c2) % m2
		}
		head := n - k
		if length <= head {
			return subS(0, length)
		}
		a1, a2 := subS(0, head)
		c1, c2 := subT(0, length-head)
		return (a1*pw1[length-head] + c1) % m1, (a2*pw2[length-head] + c2) % m2
	}
	charAt := func(kind, k, i int) byte {
		// Kind 0 walks the reversed prefix backwards through s; past the
		// boundary both kinds continue with s at the same index.
		if kind == 0 {
			if i < k {
				return b[k-1-i]
			}
			return b[i]
		}
		head := n - k
		if i < head {
			return b[i]
		}
		return r[i-head]
	}
	probe := n
	if probe > 16 {
		probe = 16
	}
	bestKind, bestK := 0, -1
	beats := func(kind, k int) bool {
		// True when this candidate sorts strictly before the champion.
		// Exact probe first: most contenders differ within a few chars.
		for i := 0; i < probe; i++ {
			a, c := charAt(kind, k, i), charAt(bestKind, bestK, i)
			if a != c {
				return a < c
			}
		}
		// Indistinguishable near the front: settle the rest by hashed
		// longest-common-prefix binary search (probe chars already tie).
		lo, hi := probe, n
		for lo < hi {
			mid := (lo + hi + 1) / 2
			a1, a2 := pref(kind, k, mid)
			c1, c2 := pref(bestKind, bestK, mid)
			if a1 == c1 && a2 == c2 {
				lo = mid
			} else {
				hi = mid - 1
			}
		}
		if lo == n {
			return false
		}
		return charAt(kind, k, lo) < charAt(bestKind, bestK, lo)
	}
	// Only candidates starting with the smallest letter can win.
	smallest := b[0]
	for _, ch := range b {
		if ch < smallest {
			smallest = ch
		}
	}
	for i := 0; i < n; i++ {
		if b[i] == smallest && (bestK < 0 || beats(0, i+1)) {
			bestKind, bestK = 0, i+1
		}
	}
	if b[0] == smallest {
		for k := 2; k <= n; k++ {
			if beats(1, k) {
				bestKind, bestK = 1, k
			}
		}
	}
	// Materialize only the winning candidate.
	if bestKind == 0 {
		pre := make([]byte, bestK)
		for i := 0; i < bestK; i++ {
			pre[i] = b[bestK-1-i]
		}
		return string(pre) + string(b[bestK:])
	}
	tail := make([]byte, bestK)
	for i := 0; i < bestK; i++ {
		tail[i] = b[n-1-i]
	}
	return string(b[:n-bestK]) + string(tail)
}
