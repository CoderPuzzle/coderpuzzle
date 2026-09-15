// A defective readout agrees with the truth up to the dropped point and
// then matches the truth shifted one place left, so each candidacy is a
// single scan; when both scans succeed (or both fail), the defect cannot
// be pinned on either sensor.
func badSensor(sensor1 []int, sensor2 []int) int {
	one := shifted(sensor1, sensor2)
	two := shifted(sensor2, sensor1)
	if one == two {
		return -1
	}
	if one {
		return 1
	}
	return 2
}

func shifted(a, b []int) bool {
	i := 0
	for i < len(a) && a[i] == b[i] {
		i++
	}
	for ; i < len(a)-1; i++ {
		if a[i] != b[i+1] {
			return false
		}
	}
	return true
}
