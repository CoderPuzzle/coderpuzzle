func rand10(rand7_outputs []int) int {
	index := 0
	for {
		a := rand7_outputs[index]
		b := rand7_outputs[index+1]
		index += 2
		// Two independent draws give 49 equally likely pairs folded into
		// idx, uniform over 1..49.
		idx := (a-1)*7 + b
		// 40 is the largest multiple of 10 under 49, so each output class
		// owns exactly four indices; pairs 41..49 are rejected wholesale,
		// which keeps the mapping unbiased.
		if idx <= 40 {
			return (idx-1)%10 + 1
		}
	}
}
