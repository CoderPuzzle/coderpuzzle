// NestedInteger holds an integer or a list of NestedInteger (never both);
// the API mirrors LeetCode's TypeScript template.
class NestedInteger {
    private integer: number;
    private holdsInteger: boolean;
    private list: NestedInteger[];
    constructor(value?: number) {
        this.integer = 0;
        this.holdsInteger = false;
        this.list = [];
        if (value !== undefined) {
            this.setInteger(value);
        }
    }
    isInteger(): boolean {
        return this.holdsInteger;
    }
    getInteger(): number {
        return this.integer;
    }
    setInteger(value: number): void {
        this.integer = value;
        this.holdsInteger = true;
        this.list = [];
    }
    add(item: NestedInteger): void {
        this.holdsInteger = false;
        this.list.push(item);
    }
    getList(): NestedInteger[] {
        return this.list;
    }
}
