package main

type Leaderboard struct{}

func NewLeaderboardTyped() *Leaderboard {
	panic("TODO")
}

func (design *Leaderboard) addScore(playerId int, score int) {
	panic("TODO")
}

func (design *Leaderboard) top(K int) int64 {
	panic("TODO")
}

func (design *Leaderboard) reset(playerId int) {
	panic("TODO")
}
