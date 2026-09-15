package main

type VideoSharingPlatform struct{}

func NewVideoSharingPlatformTyped() *VideoSharingPlatform {
	panic("TODO")
}

func (design *VideoSharingPlatform) upload(video string) int {
	panic("TODO")
}

func (design *VideoSharingPlatform) remove(videoId int) {
	panic("TODO")
}

func (design *VideoSharingPlatform) watch(videoId int, startMinute int, endMinute int) string {
	panic("TODO")
}

func (design *VideoSharingPlatform) like(videoId int) {
	panic("TODO")
}

func (design *VideoSharingPlatform) dislike(videoId int) {
	panic("TODO")
}

func (design *VideoSharingPlatform) getLikesAndDislikes(videoId int) []int {
	panic("TODO")
}

func (design *VideoSharingPlatform) getViews(videoId int) int {
	panic("TODO")
}
