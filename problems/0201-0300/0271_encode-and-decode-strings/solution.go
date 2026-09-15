package main

import (
	"strconv"
	"strings"
)

// Length-prefixed chunks: each string travels as its decimal length, a
// colon, then the string itself, concatenated in order. The prefix says
// exactly how many characters belong to the piece, so no colon or digit
// inside a string can be mistaken for structure.
type Codec struct{}

func NewCodecTyped() *Codec {
	return &Codec{}
}

func (design *Codec) encode(strs []string) string {
	var out strings.Builder
	for _, word := range strs {
		out.WriteString(strconv.Itoa(len(word)))
		out.WriteByte(':')
		out.WriteString(word)
	}
	return out.String()
}

// The mirror walk: digits up to the next colon are the decimal length,
// that many characters are the next string, and the cursor lands on the
// following length.
func (design *Codec) decode(s string) []string {
	words := []string{}
	position := 0
	for position < len(s) {
		colon := position + strings.IndexByte(s[position:], ':')
		length, _ := strconv.Atoi(s[position:colon])
		words = append(words, s[colon+1:colon+1+length])
		position = colon + 1 + length
	}
	return words
}
