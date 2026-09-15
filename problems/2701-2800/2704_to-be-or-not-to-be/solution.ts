// The whole contract is strict equality. expect captures its argument in
// a closure and hands back the two matchers over that one captured value:
// toBe reports true when the values === each other and throws the exact
// message "Not Equal" otherwise; notToBe is the complement, throwing
// "Equal" when the values coincide. Native === supplies every facet the
// cases probe — no type coercion, NaN never equal to itself, 0 === -0,
// and objects compared by reference, not contents.
function expect(val: any): { toBe: (other: any) => boolean; notToBe: (other: any) => boolean } {
    return {
        toBe(other: any): boolean {
            if (val === other) {
                return true;
            }
            throw new Error("Not Equal");
        },
        notToBe(other: any): boolean {
            if (val !== other) {
                return true;
            }
            throw new Error("Equal");
        },
    };
}

class Solution {
    run(expectCase: ExpectCase): void {
        expectCase.drive(expect);
    }
}
