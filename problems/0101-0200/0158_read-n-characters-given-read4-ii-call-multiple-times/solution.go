package main

type Solution struct {
	buf4      []string
	buf4Count int
	buf4Index int
}

func (solution *Solution) read(file *File, queries []int, buf []string) int {
	if solution.buf4 == nil {
		solution.buf4 = make([]string, 4)
	}
	total := 0
	for _, n := range queries {
		total += solution.transfer(file, n, buf, total)
	}
	return total
}

func (solution *Solution) transfer(file *File, n int, buf []string, offset int) int {
	transferred := 0
	for transferred < n {
		if solution.buf4Index == solution.buf4Count {
			solution.buf4Count = file.Read4(solution.buf4)
			solution.buf4Index = 0
			if solution.buf4Count == 0 {
				break
			}
		}
		take := solution.buf4Count - solution.buf4Index
		if take > n-transferred {
			take = n - transferred
		}
		for index := 0; index < take; index++ {
			buf[offset+transferred+index] = solution.buf4[solution.buf4Index+index]
		}
		solution.buf4Index += take
		transferred += take
	}
	return transferred
}
