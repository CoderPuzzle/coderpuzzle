import (
	"math"
	"sort"
)

func internalAngles(sides []int) []float64 {
	ordered := append([]int(nil), sides...)
	sort.Ints(ordered)
	if ordered[0]+ordered[1] <= ordered[2] {
		return []float64{}
	}

	result := make([]float64, 3)
	for i := 0; i < 3; i++ {
		opposite := ordered[i]
		adjacent1 := ordered[(i+1)%3]
		adjacent2 := ordered[(i+2)%3]
		cosine := float64(adjacent1*adjacent1+adjacent2*adjacent2-opposite*opposite) /
			float64(2*adjacent1*adjacent2)
		angle := math.Acos(math.Max(-1, math.Min(1, cosine))) * 180 / math.Pi
		result[i] = math.Round(angle*100000) / 100000
	}
	return result
}
