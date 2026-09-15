import "sort"

func findHighAccessEmployees(accessTimes [][]string) []string {
	// Bucket per employee; "HHMM" becomes 60 * HH + MM so the one-hour
	// rule is a plain integer span. After sorting a bucket, the employee
	// is high-access iff some three consecutive stamps span < 60: any
	// qualifying triple's earliest three members are consecutive, and a
	// consecutive triple under an hour is itself a witness.
	buckets := make(map[string][]int)
	for _, entry := range accessTimes {
		stamp := entry[1]
		hh := int(stamp[0]-'0')*10 + int(stamp[1]-'0')
		mm := int(stamp[2]-'0')*10 + int(stamp[3]-'0')
		buckets[entry[0]] = append(buckets[entry[0]], 60*hh+mm)
	}
	answer := []string{}
	for name, minutes := range buckets {
		sort.Ints(minutes)
		for k := 0; k+2 < len(minutes); k++ {
			if minutes[k+2]-minutes[k] < 60 {
				answer = append(answer, name)
				break
			}
		}
	}
	return answer
}
