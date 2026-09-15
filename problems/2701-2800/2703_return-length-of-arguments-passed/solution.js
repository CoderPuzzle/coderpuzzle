class Solution {
    solve(argsCase) {
        // Every non-arrow JS function invocation builds its own implicit
        // `arguments` object recording exactly what the call delivered.
        // Its .length IS the requested count — value kinds, emptiness,
        // and duplication never matter — so the entire answer is one
        // property read off the engine's own call record.
        function argumentsLength() {
            return arguments.length;
        }
        return argumentsLength(...argsCase.args);
    }
}
