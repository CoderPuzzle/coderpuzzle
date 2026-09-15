package main

type FileSharing struct{}

func NewFileSharingTyped(m int) *FileSharing {
	panic("TODO")
}

func (design *FileSharing) join(ownedChunks []int) int {
	panic("TODO")
}

func (design *FileSharing) leave(userID int) {
	panic("TODO")
}

func (design *FileSharing) request(userID int, chunkID int) []int {
	panic("TODO")
}
