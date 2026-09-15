import "math"

func minmaxGasDist(stations []int, k int) float64 {
	m := len(stations) - 1
	gaps := make([]float64, m)
	for i := 0; i < m; i++ {
		gaps[i] = float64(stations[i+1] - stations[i])
	}
	lo := 0.0
	hi := gaps[0]
	for i := 1; i < m; i++ {
		hi = math.Max(hi, gaps[i])
	}
	// Binary search the smallest feasible maximum distance.
	for it := 0; it < 60; it++ {
		mid := (lo + hi) / 2.0
		if mid <= 0.0 {
			hi = 0.0
			break
		}
		var needed int64
		for _, g := range gaps {
			needed += int64(math.Ceil(g/mid)) - 1
		}
		if needed <= int64(k) {
			hi = mid
		} else {
			lo = mid
		}
	}
	return hi
}
