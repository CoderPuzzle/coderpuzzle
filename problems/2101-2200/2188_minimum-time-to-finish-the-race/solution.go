// Precompute best[x]: the cheapest time for x consecutive laps on a
// single tire. A run never helps once its next lap costs more than
// resetting to the fastest first lap; ratios are >= 2 so the useful run
// length is tiny.
func minimumFinishTime(tires [][]int, changeTime int, numLaps int) int64 {
	const INF = int64(1) << 62
	fastestFirst := tires[0][0]
	for _, tire := range tires {
		if tire[0] < fastestFirst {
			fastestFirst = tire[0]
		}
	}
	best := make([]int64, numLaps+1)
	for i := range best {
		best[i] = INF
	}
	for _, tire := range tires {
		fi := int64(tire[0])
		ri := int64(tire[1])
		total := int64(0)
		lap := fi
		for x := 1; x <= numLaps; x++ {
			total += lap
			if total < best[x] {
				best[x] = total
			}
			if lap >= int64(changeTime)+fi || total > INF/ri {
				break
			}
			lap *= ri
		}
	}
	dp := make([]int64, numLaps+1)
	for i := range dp {
		dp[i] = INF
	}
	dp[0] = 0
	for i := 1; i <= numLaps; i++ {
		for x := 1; x <= i; x++ {
			if best[x] == INF {
				continue
			}
			candidate := dp[i-x] + best[x]
			if i != x {
				candidate += int64(changeTime)
			}
			if candidate < dp[i] {
				dp[i] = candidate
			}
		}
	}
	return dp[numLaps]
}
