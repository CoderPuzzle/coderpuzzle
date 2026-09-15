package main

import "sort"

type Leaderboard struct {
	scores map[int]int64
}

func NewLeaderboardTyped() *Leaderboard {
	return &Leaderboard{scores: map[int]int64{}}
}

func (design *Leaderboard) addScore(playerId int, score int) {
	design.scores[playerId] += int64(score)
}

func (design *Leaderboard) top(K int) int64 {
	// Removing on reset (not zeroing) keeps zeros out of this sort.
	values := make([]int64, 0, len(design.scores))
	for _, score := range design.scores {
		values = append(values, score)
	}
	sort.Slice(values, func(a, b int) bool { return values[a] > values[b] })
	var sum int64
	for i := 0; i < K; i++ {
		sum += values[i]
	}
	return sum
}

func (design *Leaderboard) reset(playerId int) {
	delete(design.scores, playerId)
}
