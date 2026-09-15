// Between the additions and subtractions, every maximal run of
// multiplications and divisions collapses to one power of x, so the
// expression is a signed sum of powers. A copy of x^i (i >= 1) costs i - 1
// operators to build plus one to attach, and a copy of 1 = x/x costs the
// division plus the attach — so a copy is charged 2 operators at the units
// place and i operators at the i-th place. Reading target in base x, each
// digit d is paid either d copies at its own place or x - d copies
// subtracted with one unit carried into the next place up. Sweeping digits
// from the least significant end with the two carry states 0/1, and
// charging one top unit for a carry that survives past the top digit,
// minimizes the operator total; the very first copy needs no attaching
// operator, so one is deducted at the end. The sentinel marking the carry
// state unreachable before the first digit is what keeps the two totals in
// int64.
func leastOpsExpressTarget(x int, target int) int {
	cost0, cost1 := int64(0), int64(1)<<60
	i := 0
	t := target
	for t > 0 {
		p := i
		if i == 0 {
			p = 2
		}
		r := t % x
		t /= x
		cost0, cost1 = min(cost0+int64(r)*int64(p), cost1+int64(r+1)*int64(p)),
			min(cost0+int64(x-r)*int64(p), cost1+int64(x-r-1)*int64(p))
		i++
	}
	return int(min(cost0, cost1+int64(i)) - 1)
}
