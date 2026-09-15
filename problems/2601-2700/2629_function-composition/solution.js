// A right-to-left pass over the array threads the value through the
// chain without recursion or library folds: acc starts at x, the LAST
// function applies first — f1 receives whatever f2 produced, exactly as
// fn(x) = f1(f2(...fn(x))) demands. Index arithmetic rather than reverse
// iteration keeps it a flat O(1)-stack loop, which matters at the 1000-
// function chain boundary. An empty array skips the loop entirely, so
// identity falls out of the same code path.
function compose(functions) {
    return function (x) {
        let acc = x;
        for (let i = functions.length - 1; i >= 0; i--) {
            acc = functions[i](acc);
        }
        return acc;
    };
}

class Solution {
    run(composeCase) {
        composeCase.drive(compose);
    }
}
