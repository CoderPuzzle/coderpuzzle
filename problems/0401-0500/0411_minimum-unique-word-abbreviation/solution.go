import (
	"math/bits"
	"sort"
	"strconv"
	"strings"
)

func minAbbreviation(target string, dictionary []string) string {
	// One integer per same-length word: bit i is set where the word's
	// letter differs from target's. An abbreviation keeping exactly the
	// positions in K collides with that word precisely when K & diff == 0,
	// so a valid K must hit every diff mask. Words of other lengths can
	// never match an abbreviation of target and are skipped outright.
	m := len(target)
	diffs := map[int]bool{}
	for _, word := range dictionary {
		if len(word) != m {
			continue
		}
		mask := 0
		for i := 0; i < m; i++ {
			if word[i] != target[i] {
				mask |= 1 << i
			}
		}
		if mask != 0 {
			diffs[mask] = true
		}
	}
	// Only minimal masks matter: a superset of another mask is hit by
	// anything that hits its subset, so it adds no constraint.
	byWeight := make([]int, 0, len(diffs))
	for mask := range diffs {
		byWeight = append(byWeight, mask)
	}
	sort.Slice(byWeight, func(i, j int) bool {
		return bits.OnesCount(uint(byWeight[i])) < bits.OnesCount(uint(byWeight[j]))
	})
	minimal := make([]int, 0, len(byWeight))
	for _, mask := range byWeight {
		redundant := false
		for _, kept := range minimal {
			if kept&^mask == 0 {
				redundant = true
				break
			}
		}
		if !redundant {
			minimal = append(minimal, mask)
		}
	}

	full := 1<<m - 1
	bestLen := m
	bestAbbr := target // The bare word itself is always a valid answer.

	var build func(mask int) string
	build = func(mask int) string {
		var parts strings.Builder
		run := 0
		for i := 0; i < m; i++ {
			if mask>>i&1 != 0 {
				if run > 0 {
					parts.WriteString(strconv.Itoa(run))
					run = 0
				}
				parts.WriteByte(target[i])
			} else {
				run++
			}
		}
		if run > 0 {
			parts.WriteString(strconv.Itoa(run))
		}
		return parts.String()
	}

	// walk visits kept-position sets in abbreviation-cost order; the best
	// (length, string) pair over all valid leaves is order-independent.
	var walk func(pos, mask, kept, runs int, openRun bool, pending []int)
	walk = func(pos, mask, kept, runs int, openRun bool, pending []int) {
		// Cost floor: letters kept, runs closed, the run still open, and the
		// one extra letter a still-unhit word will eventually force.
		floor := kept + runs
		if openRun {
			floor++
		}
		if len(pending) > 0 {
			floor++
		}
		if floor > bestLen {
			return
		}
		if pos == m {
			if len(pending) == 0 {
				cost := kept + runs
				if openRun {
					cost++
				}
				abbr := build(mask)
				if cost < bestLen || (cost == bestLen && abbr < bestAbbr) {
					bestLen = cost
					bestAbbr = abbr
				}
			}
			return
		}
		// Abbreviate this position: a pending mask with no set bit here or
		// later can never be hit again, so the branch survives only if every
		// mask still has a bit left to aim at.
		future := full ^ (1<<pos - 1)
		alive := true
		for _, d := range pending {
			if d&future == 0 {
				alive = false
				break
			}
		}
		if alive {
			walk(pos+1, mask, kept, runs, true, pending)
		}
		// Keep this letter: masks hit here are satisfied from now on.
		still := make([]int, 0, len(pending))
		for _, d := range pending {
			if d>>pos&1 == 0 {
				still = append(still, d)
			}
		}
		nextRuns := runs
		if openRun {
			nextRuns++
		}
		walk(pos+1, mask|1<<pos, kept+1, nextRuns, false, still)
	}

	walk(0, 0, 0, 0, false, minimal)
	return bestAbbr
}
