/*
 * This is the interface that allows for creating nested lists.
 * You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *     isInteger(): boolean
 *     getInteger(): number | null
 *     setInteger(value: number): void
 *     add(item: NestedInteger): void
 *     getList(): NestedInteger[]
 * }
 */

class NestedSequenceIterator {
    constructor(nestedList: NestedInteger) {}

    nextValue(): number {}

    hasMore(): boolean {}
}
