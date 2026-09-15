package main

import (
	"strconv"
	"strings"
)

// Counter-indexed tiny URLs: the object keeps every URL it has encoded,
// in order, and answers with "http://tinyurl.com/" plus the URL's
// 1-based position in that list written in lowercase base-36 — "1" for
// the first, "a" for the tenth, "10" for the 36th.
type Codec struct {
	urls []string
}

func NewCodecTyped() *Codec {
	return &Codec{}
}

func (design *Codec) encode(longUrl string) string {
	design.urls = append(design.urls, longUrl)
	return "http://tinyurl.com/" + strconv.FormatInt(int64(len(design.urls)), 36)
}

func (design *Codec) decode(shortUrl string) string {
	suffix := strings.TrimPrefix(shortUrl, "http://tinyurl.com/")
	position, _ := strconv.ParseInt(suffix, 36, 64)
	return design.urls[int(position)-1]
}
