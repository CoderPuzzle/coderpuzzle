import "sort"

// Binary search the answer d and probe feasibility. A probe checks the
// unchangeable adjacent known pairs, then every maximal run of -1s. Order
// the pair as x <= y: a run between lo <= hi accepts x alone, y alone (a
// value within d of both ends), or — with two or more missing cells — a
// straddle (x within d of lo, y within d of hi). "Far" mode stabs every
// run's both-end interval with two free values; "close" mode slides a pair
// with y - x <= d over candidate spots and intersects the one interval
// each run leaves for y. Reach values hit ~4*10^9 which overflows int, so
// the interval math lives in int64; the answer itself is < 10^9.
func minDifference(nums []int) int {
	type runT struct {
		lo, hi   int64
		oneSided bool
		length   int64
	}
	type ivT struct{ a, b int64 }
	var runs []runT
	var knowns []int64
	var prev, run int64
	for _, v := range nums {
		if v == -1 {
			run++
			continue
		}
		knowns = append(knowns, int64(v))
		if run != 0 {
			if prev != 0 {
				lo, hi := prev, int64(v)
				if lo > hi {
					lo, hi = hi, lo
				}
				runs = append(runs, runT{lo, hi, false, run})
			} else {
				runs = append(runs, runT{int64(v), int64(v), true, run})
			}
			run = 0
		}
		prev = int64(v)
	}
	if run != 0 {
		runs = append(runs, runT{prev, prev, true, run})
	}
	if len(knowns) < 2 {
		return 0 // fill everything with the single known value (or 1)
	}
	mn, mx := knowns[0], knowns[0]
	for _, v := range knowns {
		if v < mn {
			mn = v
		}
		if v > mx {
			mx = v
		}
	}
	var knownAdj int64
	for i := 1; i < len(nums); i++ {
		if nums[i-1] != -1 && nums[i] != -1 {
			diff := int64(nums[i]) - int64(nums[i-1])
			if diff < 0 {
				diff = -diff
			}
			if diff > knownAdj {
				knownAdj = diff
			}
		}
	}
	feasible := func(d int64) bool {
		if d < knownAdj {
			return false
		}
		// FAR: two stabbers for every run's both-end interval
		broken := false
		ivs := []ivT{}
		for _, r := range runs {
			a := r.hi - d
			if r.oneSided {
				a = r.lo - d
			}
			if a > r.lo+d {
				broken = true
				break
			}
			ivs = append(ivs, ivT{a, r.lo + d})
		}
		if !broken {
			if len(ivs) == 0 {
				return true // no runs: known pairs were the only bound
			}
			sort.Slice(ivs, func(i, j int) bool { return ivs[i].b < ivs[j].b })
			p := ivs[0].b // classic right-endpoint stab
			rest := []ivT{}
			for _, t := range ivs {
				if t.a > p || p > t.b {
					rest = append(rest, t)
				}
			}
			if len(rest) == 0 {
				return true
			}
			q := rest[0].b
			all := true
			for _, t := range rest {
				if t.a > q || q > t.b {
					all = false
					break
				}
			}
			if all {
				return true
			}
		}
		// CLOSE: y - x <= d; intersect the interval each run leaves for y
		cand := map[int64]bool{1: true}
		for _, r := range runs {
			cand[r.lo-d] = true
			cand[r.lo+d] = true
			cand[r.lo-2*d] = true
			cand[r.hi-d] = true
			cand[r.hi+d] = true
			cand[r.hi-2*d] = true
		}
		xs := make([]int64, 0, len(cand))
		for x := range cand {
			xs = append(xs, x)
		}
		sort.Slice(xs, func(i, j int) bool { return xs[i] < xs[j] })
		for _, x := range xs {
			if x < 1 {
				continue
			}
			glo, ghi := int64(1), int64(4_000_000_000)
			ok := true
			for _, r := range runs {
				jlo := r.hi - d
				if r.oneSided {
					jlo = r.lo - d
				}
				jhi := r.lo + d
				if jlo <= x && x <= jhi {
					continue // x alone covers this run
				}
				alo, ahi := jlo, jhi
				if !r.oneSided && r.length >= 2 && r.lo-d <= x && x <= r.lo+d {
					alo, ahi = r.hi-d, r.hi+d // straddle: y takes the far end
				}
				if alo > ahi {
					ok = false
					break
				}
				if alo > glo {
					glo = alo
				}
				if ahi < ghi {
					ghi = ahi
				}
				if glo > ghi {
					ok = false
					break
				}
			}
			if ok && glo <= x+d && ghi >= x {
				return true
			}
		}
		return false
	}
	lo, hi := int64(0), mx-mn
	for lo < hi {
		mid := (lo + hi) / 2
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo)
}
