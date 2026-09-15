package main

type Solution struct{}

func (solution *Solution) read(file *File, n int, buf []string) int {
	total := 0
	buf4 := make([]string, 4)
	for total < n {
		count := file.Read4(buf4)
		if count == 0 {
			break
		}
		take := count
		if take > n-total {
			take = n - total
		}
		for index := 0; index < take; index++ {
			buf[total+index] = buf4[index]
		}
		total += take
	}
	return total
}
