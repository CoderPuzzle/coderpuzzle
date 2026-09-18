package main

import (
	"sort"
	"strings"
)

// One directory or file: files carry a text buffer and no children,
// directories the reverse.
type treeNode struct {
	children map[string]*treeNode
	content  strings.Builder
	file     bool
}

func newDirectory() *treeNode {
	return &treeNode{children: make(map[string]*treeNode)}
}

type FileSystem struct {
	root *treeNode
}

func NewFileSystemTyped() *FileSystem {
	return &FileSystem{root: newDirectory()}
}

func splitPath(path string) []string {
	parts := []string{}
	for _, part := range strings.Split(path, "/") {
		if part != "" {
			parts = append(parts, part)
		}
	}
	return parts
}

func (design *FileSystem) ls(path string) []string {
	parts := splitPath(path)
	node := design.root
	for _, part := range parts {
		node = node.children[part]
	}
	// A file answers with its own name; a directory with its children.
	if node.file {
		return []string{parts[len(parts)-1]}
	}
	names := []string{}
	for name := range node.children {
		names = append(names, name)
	}
	sort.Strings(names)
	return names
}

func (design *FileSystem) mkdir(path string) {
	node := design.root
	for _, part := range splitPath(path) {
		// Creating each missing component also creates the middle dirs.
		next, exists := node.children[part]
		if !exists {
			next = newDirectory()
			node.children[part] = next
		}
		node = next
	}
}

func (design *FileSystem) addContentToFile(filePath string, content string) {
	parts := splitPath(filePath)
	node := design.root
	for _, part := range parts[:len(parts)-1] {
		node = node.children[part]
	}
	name := parts[len(parts)-1]
	// Append to the existing buffer, creating the file on first write.
	file, exists := node.children[name]
	if !exists {
		file = &treeNode{children: nil, file: true}
		node.children[name] = file
	}
	file.file = true
	file.content.WriteString(content)
}

func (design *FileSystem) readContentFromFile(filePath string) string {
	parts := splitPath(filePath)
	node := design.root
	for _, part := range parts[:len(parts)-1] {
		node = node.children[part]
	}
	return node.children[parts[len(parts)-1]].content.String()
}
