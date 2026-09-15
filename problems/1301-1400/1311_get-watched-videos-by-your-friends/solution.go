import "sort"

func watchedVideosByFriends(watchedVideos [][]string, friends [][]int, id int, level int) []string {
	// BFS discovers nodes in increasing distance order, so the nodes whose
	// recorded distance equals `level` are exactly the level-k people.
	n := len(friends)
	dist := make([]int, n)
	for i := range dist {
		dist[i] = -1
	}
	dist[id] = 0
	queue := []int{id}
	counts := map[string]int{}
	for head := 0; head < len(queue); head++ {
		cur := queue[head]
		if dist[cur] == level {
			for _, video := range watchedVideos[cur] {
				counts[video]++
			}
			continue
		}
		for _, nxt := range friends[cur] {
			if dist[nxt] == -1 {
				dist[nxt] = dist[cur] + 1
				queue = append(queue, nxt)
			}
		}
	}
	names := make([]string, 0, len(counts))
	for name := range counts {
		names = append(names, name)
	}
	sort.Slice(names, func(a, b int) bool {
		if counts[names[a]] != counts[names[b]] {
			return counts[names[a]] < counts[names[b]]
		}
		return names[a] < names[b]
	})
	return names
}
