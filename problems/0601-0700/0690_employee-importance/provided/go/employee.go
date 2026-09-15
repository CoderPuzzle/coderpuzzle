// Problem-provided record class (LC 690 contract). The judge's decoder
// fills the record positionally: id, importance, subordinates.
package main

type Employee struct {
	id           int
	importance   int
	subordinates []int
}
