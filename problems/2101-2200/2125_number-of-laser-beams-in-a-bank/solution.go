func numberOfBeams(bank []string) int {
	beams := 0
	previous := 0
	for _, row := range bank {
		devices := 0
		for index := 0; index < len(row); index++ {
			if row[index] == '1' {
				devices++
			}
		}
		if devices > 0 {
			beams += previous * devices
			previous = devices
		}
	}
	return beams
}
