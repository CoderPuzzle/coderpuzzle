package main

type FileSystem struct{}

func NewFileSystemTyped() *FileSystem {
	panic("TODO")
}

func (design *FileSystem) ls(path string) []string {
	panic("TODO")
}

func (design *FileSystem) mkdir(path string) {
	panic("TODO")
}

func (design *FileSystem) addContentToFile(filePath string, content string) {
	panic("TODO")
}

func (design *FileSystem) readContentFromFile(filePath string) string {
	panic("TODO")
}
