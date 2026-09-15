import (
	"sort"
)

// Costs and capacities are at most 1e5 and budget at most 2e5, so every
// cost sum stays below budget and every capacity sum is at most 2e5 — int
// carries them all. Sort the machines by cost with capacities aligned;
// every affordable pair is then reachable from its dearer machine with a
// prefix of cheaper partners, so a prefix maximum of capacities answers
// "best partner" in constant time per machine.
func maxCapacity(costs []int, capacity []int, budget int) int {
	n := len(costs)
	type machine struct {
		cost int
		cap  int
	}
	machines := make([]machine, n)
	for i := range costs {
		machines[i] = machine{costs[i], capacity[i]}
	}
	sort.Slice(machines, func(a, b int) bool {
		return machines[a].cost < machines[b].cost
	})
	sortedCosts := make([]int, n)
	prefMax := make([]int, n)
	run := 0
	for i, m := range machines {
		sortedCosts[i] = m.cost
		if m.cap > run {
			run = m.cap
		}
		prefMax[i] = run
	}
	// The empty selection costs 0 < budget (budget >= 1), so 0 is always
	// achievable and the answer only improves from there. Partners are
	// read only from indices before i, so a machine can never pair with
	// itself while every pair is still counted from its dearer end.
	ans := 0
	for i, m := range machines {
		if m.cost < budget && m.cap > ans {
			ans = m.cap
		}
		// Largest j with sortedCosts[j] < budget - m.cost.
		j := sort.SearchInts(sortedCosts, budget-m.cost) - 1
		t := j
		if i-1 < t {
			t = i - 1
		}
		if t >= 0 && m.cap+prefMax[t] > ans {
			ans = m.cap + prefMax[t]
		}
	}
	return ans
}
