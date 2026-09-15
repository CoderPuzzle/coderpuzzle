package main

type TweetCounts struct{}

func NewTweetCountsTyped() *TweetCounts {
	panic("TODO")
}

func (design *TweetCounts) recordTweet(tweetName string, time int64) {
	panic("TODO")
}

func (design *TweetCounts) getTweetCountsPerFrequency(freq string, tweetName string, startTime int64, endTime int64) []int {
	panic("TODO")
}
