// Prefix sums: pref[i] is the total candies in types 0 .. i-1. The
// earliest day type t can be touched is pref[t]/cap (eat cap every day);
// the latest is pref[t] + candiesCount[t] - 1 (eat one every day). The
// query holds iff favoriteDay lies in that window. Prefix sums reach 1e10,
// so they are held in 64-bit integers.
func canEat(candiesCount []int, queries [][]int) []bool {
	pref := make([]int64, len(candiesCount)+1)
	for i, c := range candiesCount {
		pref[i+1] = pref[i] + int64(c)
	}
	answer := make([]bool, len(queries))
	for i, q := range queries {
		t, day, cap := q[0], q[1], q[2]
		earliest := pref[t] / int64(cap)
		latest := pref[t] + int64(candiesCount[t]) - 1
		answer[i] = earliest <= int64(day) && int64(day) <= latest
	}
	return answer
}
