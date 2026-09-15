import "sort"

func beautifulPair(nums1 []int, nums2 []int) []int {
	n := len(nums1)
	absInt := func(x int) int {
		if x < 0 {
			return -x
		}
		return x
	}
	// Identical points sit at distance 0, the instant global minimum,
	// so a duplicate is answered directly from earliest occurrences.
	firstSeen := make(map[int64]int)
	bestJ, bestK := int64(n), int64(n)
	for i := 0; i < n; i++ {
		key := int64(nums1[i])*100001 + int64(nums2[i])
		j, ok := firstSeen[key]
		if !ok {
			firstSeen[key] = i
		} else if int64(j)*int64(n)+int64(i) < bestJ*int64(n)+bestK {
			bestJ, bestK = int64(j), int64(i)
		}
	}
	if bestJ < int64(n) {
		return []int{int(bestJ), int(bestK)}
	}

	idx := make([]int, n)
	tmp := make([]int, n)
	for i := range idx {
		idx[i] = i
	}
	sort.Slice(idx, func(a, b int) bool {
		p, q := idx[a], idx[b]
		if nums1[p] != nums1[q] {
			return nums1[p] < nums1[q]
		}
		return nums2[p] < nums2[q]
	})
	// Closest pair under Manhattan distance via divide and conquer: the
	// conquer scan walks each strip point forward while the y-gap is under
	// the running bound, so every shorter cross pair is seen.
	var solve func(left, right int) int
	solve = func(left, right int) int {
		if right-left <= 3 {
			delta := 1 << 30
			for a := left; a < right; a++ {
				for b := a + 1; b < right; b++ {
					gap := absInt(nums1[idx[a]]-nums1[idx[b]]) + absInt(nums2[idx[a]]-nums2[idx[b]])
					delta = min(delta, gap)
				}
			}
			sub := idx[left:right]
			sort.Slice(sub, func(a, b int) bool { return nums2[sub[a]] < nums2[sub[b]] })
			return delta
		}
		mid := left + (right-left)/2
		middle := nums1[idx[mid]]
		delta := min(solve(left, mid), solve(mid, right))
		sub := append([]int{}, idx[left:right]...)
		sort.Slice(sub, func(a, b int) bool { return nums2[sub[a]] < nums2[sub[b]] })
		copy(idx[left:right], sub)
		length := 0
		for pos := left; pos < right; pos++ {
			if absInt(nums1[idx[pos]]-middle) < delta {
				tmp[length] = idx[pos]
				length++
			}
		}
		for pos := 0; pos < length; pos++ {
			for follow := pos + 1; follow < length && nums2[tmp[follow]]-nums2[tmp[pos]] < delta; follow++ {
				gap := absInt(nums1[tmp[pos]]-nums1[tmp[follow]]) + absInt(nums2[tmp[pos]]-nums2[tmp[follow]])
				delta = min(delta, gap)
			}
		}
		return delta
	}
	dist := solve(0, n)

	// With minimum distance d the points are pairwise >= d apart, so a
	// d-sided hash grid holds a bounded handful of points per cell and
	// each distance-d edge surfaces exactly once from earlier indices.
	cells := make(map[int64][]int)
	for i := 0; i < n; i++ {
		cx, cy := int64(nums1[i]/dist), int64(nums2[i]/dist)
		for gx := cx - 1; gx <= cx+1; gx++ {
			for gy := cy - 1; gy <= cy+1; gy++ {
				bucket, ok := cells[gx*200003+gy]
				if !ok {
					continue
				}
				for _, j := range bucket {
					gap := absInt(nums1[i]-nums1[j]) + absInt(nums2[i]-nums2[j])
					if gap == dist && int64(j) < bestJ {
						bestJ, bestK = int64(j), int64(i)
					}
				}
			}
		}
		cells[cx*200003+cy] = append(cells[cx*200003+cy], i)
	}
	return []int{int(bestJ), int(bestK)}
}
