import (
	"math"
	"sort"
)

func visiblePoints(points [][]int, angle int, location []int) int {
	posx, posy := location[0], location[1]
	same := 0
	degrees := make([]float64, 0, len(points))
	for _, p := range points {
		x, y := p[0], p[1]
		if x == posx && y == posy {
			same++
			continue
		}
		deg := math.Atan2(float64(y-posy), float64(x-posx)) * 180.0 / math.Pi
		if deg < 0 {
			deg += 360.0
		}
		degrees = append(degrees, deg)
	}

	sort.Float64s(degrees)
	n := len(degrees)
	doubled := make([]float64, 0, 2*n)
	doubled = append(doubled, degrees...)
	for _, d := range degrees {
		doubled = append(doubled, d+360.0)
	}

	const eps = 1e-9
	best := 0
	left := 0
	for right := 0; right < len(doubled); right++ {
		for doubled[right]-doubled[left] > float64(angle)+eps {
			left++
		}
		window := right - left + 1
		if window > n {
			window = n
		}
		if window > best {
			best = window
		}
	}

	return same + best
}
