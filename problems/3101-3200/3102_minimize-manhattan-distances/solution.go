import (
	"math"
	"sort"
)

func minimumDistance(points [][]int) int {
	n := len(points)
	// Rotated coordinates u = x + y, v = x - y turn Manhattan distance
	// into max(|du|, |dv|); each axis then only needs its extremes. With
	// coordinates up to 1e8 the widest spread stays below 4e8, safely
	// inside an int.
	u := make([]int, n)
	v := make([]int, n)
	orderU := make([]int, n)
	orderV := make([]int, n)
	for i := 0; i < n; i++ {
		u[i] = points[i][0] + points[i][1]
		v[i] = points[i][0] - points[i][1]
		orderU[i] = i
		orderV[i] = i
	}
	sort.Slice(orderU, func(a, b int) bool { return u[orderU[a]] < u[orderU[b]] })
	sort.Slice(orderV, func(a, b int) bool { return v[orderV[a]] < v[orderV[b]] })
	best := math.MaxInt32
	for removed := 0; removed < n; removed++ {
		loU := orderU[0]
		if loU == removed {
			loU = orderU[1]
		}
		hiU := orderU[n-1]
		if hiU == removed {
			hiU = orderU[n-2]
		}
		loV := orderV[0]
		if loV == removed {
			loV = orderV[1]
		}
		hiV := orderV[n-1]
		if hiV == removed {
			hiV = orderV[n-2]
		}
		candidate := max(u[hiU]-u[loU], v[hiV]-v[loV])
		if candidate < best {
			best = candidate
		}
	}
	return best
}
