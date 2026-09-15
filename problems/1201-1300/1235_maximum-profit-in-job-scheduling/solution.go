import "sort"

func jobScheduling(startTime []int, endTime []int, profit []int) int {
	n := len(startTime)
	type job struct {
		end, start, p int
	}
	// Weighted interval scheduling: pack as (end, start, profit) so jobs
	// come out in end-time order and best[i] is final before it is read.
	jobs := make([]job, n)
	for i := 0; i < n; i++ {
		jobs[i] = job{endTime[i], startTime[i], profit[i]}
	}
	sort.Slice(jobs, func(a, b int) bool {
		if jobs[a].end != jobs[b].end {
			return jobs[a].end < jobs[b].end
		}
		if jobs[a].start != jobs[b].start {
			return jobs[a].start < jobs[b].start
		}
		return jobs[a].p < jobs[b].p
	})
	ends := make([]int, n)
	for i := 0; i < n; i++ {
		ends[i] = jobs[i].end
	}

	// best[i] = max profit using only the first i jobs; best[0] = 0 anchors it.
	best := make([]int64, n+1)
	for i := 1; i <= n; i++ {
		// First index whose end exceeds this start: a job starting exactly
		// when another ends does not overlap, and limiting the search to the
		// first i-1 entries keeps predecessors inside the processed prefix.
		j := sort.Search(i-1, func(m int) bool { return ends[m] > jobs[i-1].start })
		// Skip job i (inherit best[i-1]) or take it on top of best[j].
		cand := best[j] + int64(jobs[i-1].p)
		if cand > best[i-1] {
			best[i] = cand
		} else {
			best[i] = best[i-1]
		}
	}
	return int(best[n])
}
