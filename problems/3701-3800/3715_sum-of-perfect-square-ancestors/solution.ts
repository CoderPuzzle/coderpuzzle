function sumOfAncestors(parent: number[], nums: number[]): number {
    const n = parent.length;
    let maxValue = 0;
    for (let i = 0; i < n; ++i) {
        maxValue = Math.max(maxValue, nums[i]);
    }

    // Smallest-prime-factor sieve up to the largest value present.
    const spf: number[] = new Array(maxValue + 1).fill(0);
    for (let i = 2; i <= maxValue; ++i) {
        if (spf[i] === 0) {
            for (let j = i; j <= maxValue; j += i) {
                if (spf[j] === 0) {
                    spf[j] = i;
                }
            }
        }
    }

    // Square-free kernel: the product of primes dividing the value an
    // odd number of times. Two positive integers multiply to a perfect
    // square exactly when their kernels are equal.
    const kernel: number[] = new Array(n).fill(1);
    for (let i = 0; i < n; ++i) {
        let v = nums[i];
        while (v > 1) {
            const p = spf[v];
            let odd = false;
            while (v % p === 0) {
                v = Math.floor(v / p);
                odd = !odd;
            }
            if (odd) {
                kernel[i] *= p;
            }
        }
    }

    const children: number[][] = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; ++i) {
        children[parent[i]].push(i);
    }

    // Iterative depth-first walk; freq[k] counts ancestors on the current
    // root path whose kernel is k. Entering a node first adds its matches,
    // then records its own kernel; the node + n marker undoes the record
    // once the whole subtree is done.
    const freq: number[] = new Array(maxValue + 1).fill(0);
    let total = 0;
    const stack: number[] = [0];
    while (stack.length > 0) {
        const node = stack.pop()!;
        if (node < n) {
            total += freq[kernel[node]];
            freq[kernel[node]] += 1;
            stack.push(node + n);
            for (const child of children[node]) {
                stack.push(child);
            }
        } else {
            freq[kernel[node - n]] -= 1;
        }
    }
    return total;
}
