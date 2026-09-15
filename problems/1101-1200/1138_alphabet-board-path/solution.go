import "strings"

func alphabetBoardPath(target string) string {
	var out strings.Builder
	row, col := 0, 0
	for _, ch := range target {
		index := int(ch - 'a')
		// U then L then D then R: horizontal runs never happen inside the
		// truncated row 5, because L precedes the descent to 'z' and U
		// climbs away from 'z' before any R.
		nrow, ncol := index/5, index%5
		out.WriteString(strings.Repeat("U", max(0, row-nrow)))
		out.WriteString(strings.Repeat("L", max(0, col-ncol)))
		out.WriteString(strings.Repeat("D", max(0, nrow-row)))
		out.WriteString(strings.Repeat("R", max(0, ncol-col)))
		out.WriteByte('!')
		row, col = nrow, ncol
	}
	return out.String()
}
