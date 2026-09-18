package main

type Twitter struct{}

func NewTwitterTyped() *Twitter {
	panic("TODO")
}

func (design *Twitter) postTweet(userId int, tweetId int) {
	panic("TODO")
}

func (design *Twitter) getNewsFeed(userId int) []int {
	panic("TODO")
}

func (design *Twitter) follow(followerId int, followeeId int) {
	panic("TODO")
}

func (design *Twitter) unfollow(followerId int, followeeId int) {
	panic("TODO")
}
