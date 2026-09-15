package main

type Solution struct{}

func (solution *Solution) guessMajority(arrayReader *ArrayReader) int {
	n := arrayReader.Length()
	// Compare the fixed trio {0, 1, 2} against every later index. The
	// answer depends only on nums[i], so it takes exactly one of two
	// values across the whole array — every i lands in one of two
	// buckets, though which bucket means what is still unknown.
	type entry struct {
		index  int
		result int
	}
	results := make([]entry, 0, n-3)
	seen4 := false
	seen0 := false
	for i := 3; i < n; i++ {
		r := arrayReader.Query(0, 1, 2, i)
		results = append(results, entry{i, r})
		if r == 4 {
			seen4 = true
		} else if r == 0 {
			seen0 = true
		}
	}

	if seen4 || seen0 {
		// A 4 means the trio is unanimous: it contributes 3 to the
		// bucket matching its own value and 0 to the other. A 0 (with
		// no 4 seen) means the trio is a genuine 2-1 split: the
		// bucket answered 2 matches the trio's majority value
		// (contributing 2), the bucket answered 0 is the minority
		// (contributing 1).
		matchResult := 2
		anchorMatch := 2
		anchorDiff := 1
		haveMatchIndex := false
		if seen4 {
			matchResult = 4
			anchorMatch = 3
			anchorDiff = 0
			haveMatchIndex = true
		}
		diffResult := 0
		if seen4 {
			diffResult = 2
		}

		countMatch := 0
		for _, e := range results {
			if e.result == matchResult {
				countMatch++
			}
		}
		countDiff := len(results) - countMatch
		totalMatch := countMatch + anchorMatch
		totalDiff := countDiff + anchorDiff

		if totalMatch == totalDiff {
			return -1
		}
		if totalMatch > totalDiff {
			if haveMatchIndex {
				return 0
			}
			for _, e := range results {
				if e.result == matchResult {
					return e.index
				}
			}
		} else {
			for _, e := range results {
				if e.result == diffResult {
					return e.index
				}
			}
		}
		panic("unreachable")
	}

	// Every query answered 2: the per-index answer is injective, so a
	// constant answer forces a constant hidden value v for every index
	// from 3 onward (n >= 5 guarantees indices 3 and 4 both exist). One
	// more call pits the trio's first two entries against that
	// known-equal pair; combined with the 3-1 split already seen at
	// index 3, it pins down how many of the trio equal v.
	vIndex := 3
	r2 := arrayReader.Query(0, 1, 3, 4)
	tail := n - 3
	var trioMatchesV, otherIndex int
	switch r2 {
	case 4:
		// nums[0] == nums[1] == v, and the earlier 3-1 split forces
		// nums[2] to be the lone entry different from v.
		trioMatchesV = 2
		otherIndex = 2
	case 0:
		// nums[0] == nums[1] == the value other than v; the 3-1 split
		// then forces nums[2] to match them, not v.
		trioMatchesV = 0
		otherIndex = 0
	default:
		// Exactly one of nums[0], nums[1] equals v; the 3-1 split
		// forces nums[2] == v to reach a total of two trio members
		// matching v. The other value never wins this branch (its
		// count never exceeds 1 while v's count is at least n - 4),
		// so no index for it is ever needed.
		trioMatchesV = 2
		otherIndex = -1
	}

	countV := tail + trioMatchesV
	countOther := 3 - trioMatchesV
	if countV == countOther {
		return -1
	}
	if countV > countOther {
		return vIndex
	}
	return otherIndex
}
