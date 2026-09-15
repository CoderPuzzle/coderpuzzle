import "math"

// Row-by-row simulation. row[j] is the total champagne glass j of the current
// row has received; a full glass splits its excess equally between the two
// glasses below, and rows below query_row never matter.
func champagneTower(poured float64, query_row int, query_glass int) float64 {
	row := []float64{poured}
	for i := 0; i < query_row; i++ {
		next := make([]float64, len(row)+1)
		for j := 0; j < len(row); j++ {
			excess := (row[j] - 1.0) / 2.0
			if excess > 0.0 {
				next[j] += excess
				next[j+1] += excess
			}
		}
		row = next
	}
	return math.Min(1.0, row[query_glass])
}
