import "sort"

func maxDistance(side int, points [][]int, k int) int {
	L := int64(4) * int64(side)

	perimeter := func(x, y int) int64 {
		if y == 0 {
			return int64(x)
		}
		if x == side {
			return int64(side) + int64(y)
		}
		if y == side {
			return int64(2)*int64(side) + int64(side-x)
		}
		// x == 0
		return int64(3)*int64(side) + int64(side-y)
	}

	n := len(points)
	coords := make([]int64, n)
	for i, p := range points {
		coords[i] = perimeter(p[0], p[1])
	}
	sort.Slice(coords, func(a, b int) bool { return coords[a] < coords[b] })
	arr := make([]int64, 2*n)
	for i := 0; i < n; i++ {
		arr[i] = coords[i]
		arr[i+n] = coords[i] + L
	}

	feasible := func(d int64) bool {
		if d == 0 {
			return true
		}
		total := 2 * n
		nxt := make([]int, total)
		for j := 0; j < total; j++ {
			target := arr[j] + d
			lo, hi := j+1, total
			for lo < hi {
				mid := (lo + hi) / 2
				if arr[mid] < target {
					lo = mid + 1
				} else {
					hi = mid
				}
			}
			nxt[j] = lo
		}
		for i := 0; i < n; i++ {
			cnt := 1
			cur := i
			ok := true
			for t := 0; t < k-1; t++ {
				j := nxt[cur]
				if j >= i+n {
					ok = false
					break
				}
				cur = j
				cnt++
			}
			if ok && cnt == k {
				if arr[cur]+d <= arr[i]+L {
					return true
				}
			}
		}
		return false
	}

	lo, hi := int64(0), int64(2)*int64(side)
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return int(lo)
}
