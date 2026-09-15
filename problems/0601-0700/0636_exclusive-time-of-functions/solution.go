import (
	"strconv"
	"strings"
)

func exclusiveTime(n int, logs []string) []int {
	res := make([]int, n)
	stackFid := make([]int, 0, len(logs))
	stackResume := make([]int, 0, len(logs))
	for _, log := range logs {
		c1 := strings.IndexByte(log, ':')
		c2 := c1 + 1 + strings.IndexByte(log[c1+1:], ':')
		fid, _ := strconv.Atoi(log[:c1])
		start := log[c1+1] == 's'
		ts, _ := strconv.Atoi(log[c2+1:])
		if start {
			if len(stackFid) > 0 {
				res[stackFid[len(stackFid)-1]] += ts - stackResume[len(stackResume)-1]
			}
			stackFid = append(stackFid, fid)
			stackResume = append(stackResume, ts)
		} else {
			res[stackFid[len(stackFid)-1]] += ts - stackResume[len(stackResume)-1] + 1
			stackFid = stackFid[:len(stackFid)-1]
			stackResume = stackResume[:len(stackResume)-1]
			if len(stackFid) > 0 {
				stackResume[len(stackResume)-1] = ts + 1
			}
		}
	}
	return res
}
