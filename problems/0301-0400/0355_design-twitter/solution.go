package main

// Twitter: per-user chronological message lists (newest last) plus
// follow sets. getFeed merges the last 10 messages of the user and
// every followee, keeping only the 10 most recent by global timestamp.
type Twitter struct {
	posts     map[int][][2]int // user -> [time, id] pairs, newest last
	following map[int]map[int]bool
	clock     int
}

func NewTwitterTyped() *Twitter {
	return &Twitter{
		posts:     map[int][][2]int{},
		following: map[int]map[int]bool{},
	}
}

// entryLess orders (time, id) entries; times are unique, so the id
// comparison only guards the impossible tie.
func entryLess(a [2]int, b [2]int) bool {
	if a[0] != b[0] {
		return a[0] < b[0]
	}
	return a[1] < b[1]
}

func (board *Twitter) postTweet(userId int, messageId int) {
	board.posts[userId] = append(board.posts[userId], [2]int{board.clock, messageId})
	board.clock++
}

func (board *Twitter) getNewsFeed(userId int) []int {
	sources := map[int]bool{userId: true}
	for followee := range board.following[userId] {
		sources[followee] = true
	}
	// Bounded min-heap of (time, id): at most 10 entries survive, so a
	// linear scan for the minimum replaces heap machinery.
	kept := make([][2]int, 0, 10)
	for source := range sources {
		timeline := board.posts[source]
		start := len(timeline) - 10
		if start < 0 {
			start = 0
		}
		for index := start; index < len(timeline); index++ {
			candidate := timeline[index]
			if len(kept) < 10 {
				kept = append(kept, candidate)
				continue
			}
			// Evict the smallest kept entry when the candidate is newer.
			oldest := 0
			for other := 1; other < len(kept); other++ {
				if entryLess(kept[other], kept[oldest]) {
					oldest = other
				}
			}
			if entryLess(kept[oldest], candidate) {
				kept[oldest] = candidate
			}
		}
	}
	// Newest first: sort descending by (time, id).
	for i := 1; i < len(kept); i++ {
		for j := i; j > 0 && entryLess(kept[j-1], kept[j]); j-- {
			kept[j], kept[j-1] = kept[j-1], kept[j]
		}
	}
	feed := make([]int, len(kept))
	for i, entry := range kept {
		feed[i] = entry[1]
	}
	return feed
}

func (board *Twitter) follow(followerId int, followeeId int) {
	set, exists := board.following[followerId]
	if !exists {
		set = map[int]bool{}
		board.following[followerId] = set
	}
	set[followeeId] = true
}

func (board *Twitter) unfollow(followerId int, followeeId int) {
	delete(board.following[followerId], followeeId)
}
