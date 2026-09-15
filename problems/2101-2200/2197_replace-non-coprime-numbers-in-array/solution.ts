function replaceNonCoprimes(nums: number[]): number[] {
    const stack: number[] = [];
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    for (const num of nums) {
        let current = num;
        // keep absorbing into `current` while it shares a factor with
        // the processed value to its left
        while (stack.length > 0 && gcd(stack[stack.length - 1], current) > 1) {
            const top = stack.pop()!;
            current = Math.round((top / gcd(top, current)) * current);
        }
        stack.push(current);
    }
    return stack;
}
