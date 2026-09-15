package main

import "strings"

type FileSystem struct {
	values map[string]int
}

func NewFileSystemTyped() *FileSystem {
	return &FileSystem{values: make(map[string]int)}
}

func (design *FileSystem) createPath(path string, value int) bool {
	if _, exists := design.values[path]; exists {
		return false
	}
	parent := path[:strings.LastIndex(path, "/")]
	if parent != "" {
		if _, exists := design.values[parent]; !exists {
			return false
		}
	}
	design.values[path] = value
	return true
}

func (design *FileSystem) get(path string) int {
	if value, exists := design.values[path]; exists {
		return value
	}
	return -1
}
