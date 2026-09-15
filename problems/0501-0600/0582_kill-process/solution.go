// Killing a process kills its whole subtree, so group the processes by
// parent — children of one parent keep pid-array order — and walk down
// from kill. The queue doubles as the answer: every process enters it in
// exactly the required breadth-first order, so each dequeue is one more
// confirmed kill.
func killProcess(pid []int, ppid []int, kill int) []int {
	children := make(map[int][]int)
	for i, child := range pid {
		children[ppid[i]] = append(children[ppid[i]], child)
	}
	killed := []int{kill}
	for head := 0; head < len(killed); head++ {
		killed = append(killed, children[killed[head]]...)
	}
	return killed
}
