package main

import "fmt"

func main() {
	accumulator := uint32(0x12345678)
	for value := uint32(0); value < 3_000_000; value++ {
		accumulator = (accumulator << 5) - accumulator + value
	}
	fmt.Print(accumulator)
}
