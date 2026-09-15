import "sort"

func maximumBeauty(flowers []int, newFlowers int64, target int, full int, partial int) int64 {
	sort.Ints(flowers)
	n := len(flowers)
	prefix := make([]int64, n+1)
	for i, count := range flowers {
		prefix[i+1] = prefix[i] + int64(count)
	}

	// Cost to raise every garden among the first m (sorted ascending) up
	// to `level`: only those below `level` need planting.
	costToLevel := func(m int, level int64) int64 {
		pos := sort.Search(m, func(i int) bool { return int64(flowers[i]) >= level })
		return level*int64(pos) - prefix[pos]
	}

	var best int64
	budget := newFlowers
	target64 := int64(target)
	for complete := 0; complete <= n; complete++ {
		if complete > 0 {
			need := target64 - int64(flowers[n-complete])
			if need < 0 {
				need = 0
			}
			if budget < need {
				break
			}
			budget -= need
		}
		rest := n - complete
		if rest == 0 {
			value := int64(complete) * int64(full)
			if value > best {
				best = value
			}
			break
		}
		if int64(flowers[rest-1]) >= target64 {
			// every remaining garden is already complete; that split is
			// dominated by completing all of them for free.
			continue
		}
		low, high := int64(flowers[0]), target64-1
		bestMin := low
		for low <= high {
			mid := (low + high) / 2
			if costToLevel(rest, mid) <= budget {
				bestMin = mid
				low = mid + 1
			} else {
				high = mid - 1
			}
		}
		value := int64(complete)*int64(full) + bestMin*int64(partial)
		if value > best {
			best = value
		}
	}
	return best
}
