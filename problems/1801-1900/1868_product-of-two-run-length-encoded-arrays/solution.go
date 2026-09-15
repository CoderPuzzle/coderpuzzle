// Walk both encodings with running remainders; each step consumes
// min(remaining1, remaining2) positions and emits one product run, merging
// into the previous run when the product repeats.
func findRLEArray(encoded1 [][]int, encoded2 [][]int) [][]int64 {
	out := make([][]int64, 0)
	i, j := 0, 0
	var rem1, rem2 int64
	rem1 = int64(encoded1[0][1])
	rem2 = int64(encoded2[0][1])
	for {
		take := rem1
		if rem2 < take {
			take = rem2
		}
		val := int64(encoded1[i][0]) * int64(encoded2[j][0])
		if n := len(out); n > 0 && out[n-1][0] == val {
			out[n-1][1] += take
		} else {
			out = append(out, []int64{val, take})
		}
		rem1 -= take
		rem2 -= take
		if rem1 == 0 {
			i++
			if i == len(encoded1) {
				break
			}
			rem1 = int64(encoded1[i][1])
		}
		if rem2 == 0 {
			j++
			if j == len(encoded2) {
				break
			}
			rem2 = int64(encoded2[j][1])
		}
	}
	return out
}
