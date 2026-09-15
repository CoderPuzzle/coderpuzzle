package main

import "sort"

// Per-name sorted time lists; a query slices its window into chunks and
// counts each chunk with sort.SearchInts range counts.
type TweetCounts struct {
	times map[string][]int64
}

func NewTweetCountsTyped() *TweetCounts {
	return &TweetCounts{times: map[string][]int64{}}
}

func (design *TweetCounts) recordTweet(tweetName string, time int64) {
	list := design.times[tweetName]
	at := sort.Search(len(list), func(i int) bool { return list[i] > time })
	list = append(list, 0)
	copy(list[at+1:], list[at:])
	list[at] = time
	design.times[tweetName] = list
}

func (design *TweetCounts) getTweetCountsPerFrequency(freq string, tweetName string, startTime int64, endTime int64) []int {
	chunk := int64(86400)
	switch freq {
	case "minute":
		chunk = 60
	case "hour":
		chunk = 3600
	}
	list := design.times[tweetName]
	buckets := []int{}
	for lo := startTime; lo <= endTime; lo += chunk {
		hi := lo + chunk - 1
		if hi > endTime {
			hi = endTime
		}
		lower := sort.Search(len(list), func(i int) bool { return list[i] >= lo })
		upper := sort.Search(len(list), func(i int) bool { return list[i] > hi })
		buckets = append(buckets, upper-lower)
	}
	return buckets
}
