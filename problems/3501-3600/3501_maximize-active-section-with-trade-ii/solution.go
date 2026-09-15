import "sort"

func maxActiveSectionsAfterTrade(s string, queries [][]int) []int {
	ones := 0
	// Maximal runs of '0's, as parallel start/length arrays; the optimal
	// trade zeroes the '1' run between two zero runs and flips the merge.
	starts := []int{}
	lens := []int{}
	index := 0
	length := len(s)
	for index < length {
		if s[index] == '0' {
			runStart := index
			for index < length && s[index] == '0' {
				index++
			}
			starts = append(starts, runStart)
			lens = append(lens, index-runStart)
		} else {
			ones++
			index++
		}
	}
	groups := len(starts)
	ends := make([]int, groups)
	for k := range starts {
		ends[k] = starts[k] + lens[k] - 1
	}

	// Sparse table for range maximum over adjacent sums lens[k]+lens[k+1].
	size := groups - 1
	levels := 0
	for (1 << levels) <= size {
		levels++
	}
	table := make([][]int, levels)
	logs := make([]int, size+1)
	if size >= 1 {
		table[0] = make([]int, size)
		for k := 0; k < size; k++ {
			table[0][k] = lens[k] + lens[k+1]
		}
		for level := 1; level < levels; level++ {
			step := 1 << (level - 1)
			table[level] = make([]int, size-(1<<level)+1)
			for q := range table[level] {
				if table[level-1][q] > table[level-1][q+step] {
					table[level][q] = table[level-1][q]
				} else {
					table[level][q] = table[level-1][q+step]
				}
			}
		}
		for q := 2; q <= size; q++ {
			logs[q] = logs[q/2] + 1
		}
	}

	answer := make([]int, len(queries))
	for q, query := range queries {
		left, right := query[0], query[1]
		gain := 0
		if groups >= 2 {
			// Zero runs clipped by the window edges only shrink the two
			// boundary pairs; every fully interior pair is exact.
			first := sort.SearchInts(ends, left)
			last := sort.Search(len(starts), func(i int) bool { return starts[i] > right }) - 2
			if first <= last {
				clipLeft := lens[first]
				if ends[first]-left+1 < clipLeft {
					clipLeft = ends[first] - left + 1
				}
				clipRight := lens[last+1]
				if right-starts[last+1]+1 < clipRight {
					clipRight = right - starts[last+1] + 1
				}
				pairFirst, pairLast := 0, 0
				if first == last {
					pairFirst = clipLeft + clipRight
					pairLast = pairFirst
				} else {
					pairFirst = clipLeft + lens[first+1]
					pairLast = lens[last] + clipRight
				}
				innerLo := first
				if s[left] == '0' {
					innerLo++
				}
				innerHi := last
				if s[right] == '0' {
					innerHi--
				}
				inner := 0
				if innerLo <= innerHi {
					level := logs[innerHi-innerLo+1]
					row := table[level]
					inner = row[innerLo]
					if row[innerHi-(1<<level)+1] > inner {
						inner = row[innerHi-(1<<level)+1]
					}
				}
				gain = pairFirst
				if pairLast > gain {
					gain = pairLast
				}
				if inner > gain {
					gain = inner
				}
			}
		}
		answer[q] = ones + gain
	}
	return answer
}
