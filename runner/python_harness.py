import contextlib
import importlib.util
import io
import json
import sys
import threading
import traceback
from pathlib import Path
from typing import Any

# The harness also runs with Python isolated mode. Only trusted modules baked
# into the read-only runner image are added; the submission directory is never
# placed on the import path.
sys.path.insert(0, "/runner")

from leetcode_codecs import (
    CLASS_BEARING_CODECS,
    binary_tree_nodes,
    chain_nodes,
    decode,
    encode,
    graph_nodes,
    parse_alias_list,
    parse_nary_tree_ref,
    serialize_alias_list,
    serialize_graph,
    serialize_random_list,
    serialize_random_tree,
)
from protocol import emit_protocol


PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__"
MAX_CAPTURED_OUTPUT = 16_384
SCHEDULE_STACK_BYTES = 512 * 1024


class BoundedText(io.StringIO):
    def write(self, value: str) -> int:
        remaining = MAX_CAPTURED_OUTPUT - self.tell()
        if remaining > 0:
            super().write(value[:remaining])
        return len(value)


def _json_safe(value: Any, output_limit: int = 65_536, budget: int | None = None) -> Any:
    encoded = json.dumps(value, allow_nan=False, separators=(",", ":"))
    if len(encoded) > (min(output_limit, budget) if budget is not None else output_limit):
        raise ValueError(f"Return value exceeds the {output_limit // 1024} KiB output limit")
    return json.loads(encoded)


def _load_solution(solution_path: Path, assembly_paths: list[Path] | None = None):
    """Load the submission. Every well-known data structure a bundle's wire
    needs (ListNode, TreeNode, ...) is the bundle's OWN provided/python/
    source — the judge holds no fallback definitions. assembly_paths is the
    bundle's provided/ sources (and any narrow oracle/helper classes),
    exec'd into the submission's namespace ahead of it, so the submission
    sees exactly one definition of each name it uses."""
    spec = importlib.util.spec_from_file_location("coderpuzzle_solution", solution_path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Unable to load solution")
    module = importlib.util.module_from_spec(spec)
    namespace = {"__name__": "coderpuzzle_assembly"}
    for assembly_path in assembly_paths or []:
        exec(compile(assembly_path.read_text(encoding="utf-8"), str(assembly_path), "exec"), namespace)
    for name, value in namespace.items():
        if not name.startswith("__"):
            module.__dict__[name] = value
    spec.loader.exec_module(module)
    return module


def _decode_struct(value: Any, spec: dict[str, Any], module: Any) -> Any:
    """Build the provided class for a struct value_type (constructor args in
    declared field order); array fields recurse."""
    if spec.get("kind") == "struct":
        cls = getattr(module, spec["class"])
        fields = spec.get("fields", [])
        if not isinstance(value, list) or len(value) != len(fields):
            raise ValueError(f"Expected {len(fields)} struct fields")
        return cls(
            *[_decode_struct(item, field["value_type"], module) for item, field in zip(value, fields)]
        )
    if spec.get("kind") == "array":
        return [_decode_struct(item, spec["items"], module) for item in value]
    return value


def _spec_has_struct(spec: Any) -> bool:
    if not isinstance(spec, dict):
        return False
    if spec.get("kind") == "struct":
        return True
    if spec.get("kind") == "array":
        return _spec_has_struct(spec.get("items"))
    return False


def _decode_function_arguments(
    module: Any, raw_input: Any, parameters: list[dict[str, Any]]
) -> tuple[list[Any], dict[str, Any]]:
    """Decode the positional arguments. Struct values construct their
    provided class; an alias_list parameter splices onto the aliased list
    decoded earlier. The context carries the input-side node lists the
    result-time clone checks compare against."""
    arguments: list[Any] = []
    context: dict[str, Any] = {}
    for index, (value, parameter) in enumerate(zip(raw_input, parameters)):
        value_type = parameter.get("value_type")
        if _spec_has_struct(value_type):
            arguments.append(_decode_struct(value, value_type, module))
            continue
        codec = parameter.get("codec", "json")
        if codec == "alias_list":
            alias = parameter.get("alias")
            if alias is None or not 0 <= int(alias) < index:
                raise ValueError("alias_list requires an earlier aliased parameter")
            arguments.append(parse_alias_list(module, value, arguments[int(alias)]))
            continue
        if codec == "nary_tree_ref":
            # A node of an earlier n-ary tree, named by its (unique) value:
            # the argument is that exact node object, so mutations through
            # it land in the aliased tree.
            alias = parameter.get("alias")
            if alias is None or not 0 <= int(alias) < index:
                raise ValueError("nary_tree_ref requires an earlier n-ary parameter")
            arguments.append(parse_nary_tree_ref(value, arguments[int(alias)]))
            continue
        # Class-bearing kinds (graph, random_list, ...) name their class on
        # the value_type; every other kind resolves its class by naming
        # convention (decode()'s per-codec default).
        class_name = (value_type or {}).get("class") if codec in CLASS_BEARING_CODECS else None
        decoded = decode(value, codec, module, class_name)
        if codec == "list_node":
            context.setdefault("list_heads", []).append(decoded)
        elif codec == "graph":
            context.setdefault("graph_nodes", []).extend(graph_nodes(decoded))
        elif codec == "random_list":
            context.setdefault("random_nodes", []).extend(chain_nodes(decoded))
        elif codec == "random_tree":
            context.setdefault("random_tree_nodes", []).extend(binary_tree_nodes(decoded))
        arguments.append(decoded)
    return arguments, context


def _encode_function_result(
    actual: Any, codec: str, invocation: dict[str, Any], context: dict[str, Any]
) -> Any:
    if codec == "alias_list":
        alias = invocation.get("return_alias")
        heads = context.get("list_heads", [])
        if alias is None or not 0 <= int(alias) < len(heads):
            raise ValueError("alias_list return requires return_alias")
        return serialize_alias_list(actual, heads[int(alias)])
    if codec == "graph":
        return serialize_graph(actual, context.get("graph_nodes", []))
    if codec == "random_list":
        return serialize_random_list(actual, context.get("random_nodes", []))
    if codec == "random_tree":
        return serialize_random_tree(actual, context.get("random_tree_nodes", []))
    return encode(actual, codec)


def _invoke_function(module, invocation: dict[str, Any], raw_input: Any) -> Any:
    if not isinstance(raw_input, list):
        raise ValueError("Function input must be a positional argument list")
    parameters = invocation.get("parameters", [])
    if len(raw_input) != len(parameters):
        raise ValueError(
            f"Expected {len(parameters)} arguments, received {len(raw_input)}"
        )
    arguments, context = _decode_function_arguments(module, raw_input, parameters)
    instance = getattr(module, invocation["class_name"])()
    actual = getattr(instance, invocation["method"])(*arguments)
    return _encode_function_result(actual, invocation.get("return_codec", "json"), invocation, context)


def _canonical_key(value: Any) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"))


def _method_codecs(
    invocation: dict[str, Any],
) -> dict[str, tuple[list[str], str, list[str], list[str | None]]]:
    """Per-method (parameter codecs, return codec, parameter kinds, parameter
    class names) from the manifest, so a design method can take or return a
    ListNode/TreeNode just like a function-invocation problem does, so an
    "instance" parameter (another live object of the design class) can be
    recognized, and so a class-bearing kind (graph, random_list, ...)
    resolves the bundle's own class name."""
    table: dict[str, tuple[list[str], str, list[str], list[str | None]]] = {}
    for method in invocation.get("methods", []):
        parameter_codecs = [
            parameter.get("codec", "json") for parameter in method.get("parameters", [])
        ]
        value_types = [parameter.get("value_type") or {} for parameter in method.get("parameters", [])]
        parameter_kinds = [value_type.get("kind", "json") for value_type in value_types]
        parameter_class_names = [value_type.get("class") for value_type in value_types]
        table[method["name"]] = (
            parameter_codecs,
            method.get("return_codec", "json"),
            parameter_kinds,
            parameter_class_names,
        )
    return table


def _resolve_pipe(value: Any, output: list[Any]) -> Any:
    """{"$prev": i} feeds action i's own return value straight back in, so a
    round-trip pair (serialize then deserialize) can be judged without
    pinning the intermediate format."""
    if isinstance(value, dict) and set(value) == {"$prev"}:
        return output[int(value["$prev"])]
    return value


def _reference_marker(value: Any) -> str | None:
    """{"$ref": handle} names a live design instance (multi-instance replay,
    LC 1570): the handle is resolved to the object itself, never decoded."""
    if isinstance(value, dict) and set(value) == {"$ref"} and isinstance(value["$ref"], str):
        return value["$ref"]
    return None


def _invoke_design(module, invocation: dict[str, Any], raw_input: Any) -> Any:
    actions = raw_input["actions"]
    params = raw_input["params"]
    if not actions or len(actions) != len(params):
        raise ValueError("Design input requires equally sized actions and params")
    codecs = _method_codecs(invocation)
    constructor_parameters = invocation.get("constructor", {}).get("parameters", [])
    constructor_codecs = [parameter.get("codec", "json") for parameter in constructor_parameters]
    constructor_value_types = [parameter.get("value_type") or {} for parameter in constructor_parameters]
    entry_class = getattr(module, invocation["class_name"])

    def construct(row: Any) -> Any:
        arguments = []
        for index, value in enumerate(row):
            codec = constructor_codecs[index] if index < len(constructor_codecs) else "json"
            value_type = constructor_value_types[index] if index < len(constructor_value_types) else {}
            class_name = value_type.get("class") if codec in CLASS_BEARING_CODECS else None
            arguments.append(decode(value, codec, module, class_name))
        return entry_class(*arguments)

    # Named instances ({"new": handle} actions) live here for the whole
    # replay; $ref arguments and "on" targets resolve through it. The
    # primary instance from params[0] is registered when actions[0] names
    # it, and stays the default target otherwise.
    instances: dict[str, Any] = {}
    if isinstance(actions[0], dict) and "new" in actions[0]:
        primary_handle = actions[0]["new"]
        if not isinstance(primary_handle, str) or not primary_handle:
            raise ValueError('Design action {"new": ...} needs a string handle')
        if primary_handle in instances:
            raise ValueError(f"Duplicate design instance handle {primary_handle!r}")
        instances[primary_handle] = construct(params[0])
    else:
        primary_handle = None
        primary = construct(params[0])
    output = [None]
    # Raw (undecoded, unencoded) returns feed piped arguments, so a piped
    # value crosses methods as the live object rather than its wire form.
    raw_output: list[Any] = [None]
    for step, (action, arguments) in enumerate(zip(actions[1:], params[1:]), start=1):
        # A {"new": handle} action constructs another instance of the design
        # class from this step's params row; constructors return nothing.
        if isinstance(action, dict) and "new" in action:
            handle = action["new"]
            if not isinstance(handle, str) or not handle:
                raise ValueError('Design action {"new": ...} needs a string handle')
            if handle in instances or handle == primary_handle:
                raise ValueError(f"Duplicate design instance handle {handle!r}")
            instances[handle] = construct(arguments)
            output.append(None)
            raw_output.append(None)
            continue
        target = instances.get(primary_handle) if primary_handle is not None else primary
        # A repeated action ({"call": name, "repeat": K, "on": handle}) is a
        # randomized method under statistical judging: the harness invokes it
        # K times and reports a frequency table keyed by the canonical JSON
        # of each returned value, which the judge compares against the
        # expected distribution.
        repeat = 1
        if isinstance(action, dict):
            repeat = int(action.get("repeat", 1))
            if "on" in action:
                handle = action["on"]
                if handle not in instances:
                    raise ValueError(f"Unknown design instance handle {handle!r}")
                target = instances[handle]
            action = action["call"]
        parameter_codecs, return_codec, parameter_kinds, parameter_class_names = codecs.get(
            action, ([], "json", [], [])
        )
        decoded = []
        for index, argument in enumerate(arguments):
            if isinstance(argument, dict) and set(argument) == {"$prev"}:
                decoded.append(_resolve_pipe(argument, raw_output))
                continue
            handle = _reference_marker(argument)
            expects_instance = index < len(parameter_kinds) and parameter_kinds[index] == "instance"
            if handle is not None or expects_instance:
                if handle is None or not expects_instance:
                    raise ValueError(
                        f'Design action {step} parameter {index + 1}: {{"$ref": handle}}'
                        " instance references are only valid on an instance parameter"
                    )
                if handle not in instances:
                    raise ValueError(f"Unknown design instance handle {handle!r}")
                decoded.append(instances[handle])
                continue
            codec = parameter_codecs[index] if index < len(parameter_codecs) else "json"
            class_name = (
                parameter_class_names[index]
                if codec in CLASS_BEARING_CODECS and index < len(parameter_class_names)
                else None
            )
            decoded.append(decode(argument, codec, module, class_name))
        if repeat <= 1:
            value = getattr(target, action)(*decoded)
            raw_output.append(value)
            output.append(encode(value, return_codec))
            continue
        counts: dict[str, int] = {}
        last = None
        for _ in range(repeat):
            last = getattr(target, action)(*decoded)
            key = _canonical_key(encode(last, return_codec))
            counts[key] = counts.get(key, 0) + 1
        raw_output.append(last)
        output.append(counts)
    return output




def _invoke_interactive(module, invocation: dict[str, Any], raw_input: Any) -> Any:
    if not isinstance(raw_input, dict):
        raise ValueError("Interactive input must be an object")
    budget = int(invocation.get("query_limit", 1_000_000))
    provided = (invocation.get("provided") or {}).get("oracle")
    if not provided:
        raise ValueError(
            "Interactive problems must carry their oracle in provided/ "
            "(invocation.provided.oracle)"
        )
    # Bundle-carried oracle: the class ships in the problem's provided/
    # sources (already assembled into the submission's namespace); the
    # manifest names it, the case keys that build it, and any keys that
    # ride as extra method arguments. The judge core holds no per-oracle
    # knowledge.
    oracle = getattr(module, provided["class"])(
        *(raw_input[key] for key in provided.get("construct", ())), budget
    )
    instance = getattr(module, invocation["class_name"])()
    # A parameter may declare an out_buffer: the harness allocates the
    # buffer the solution writes into (capacity named by another case key),
    # then reports [return_value, buffer[:return_value]] — the read4 wire.
    arguments: list[Any] = [oracle]
    for parameter in invocation.get("parameters", []):
        out_buffer = parameter.get("out_buffer")
        if out_buffer:
            capacity = int(raw_input[out_buffer["capacity_from"]])
            arguments.append([None] * max(capacity, 0))
            continue
        name = parameter["name"]
        if name not in raw_input:
            raise ValueError(f"Interactive input needs {name!r}")
        arguments.append(raw_input[name])
    result = getattr(instance, invocation["method"])(*arguments)
    # Void-method oracles are judged by their own final state — e.g. the
    # robot's exact set of cleaned cells.
    if result is None and hasattr(oracle, "verdict"):
        return oracle.verdict()
    buffers = [
        argument
        for argument, parameter in zip(arguments[1:], invocation.get("parameters", []))
        if parameter.get("out_buffer")
    ]
    if buffers:
        return [result, buffers[0][: max(result, 0)]]
    return result


# glibc's malloc gives each thread its own arena, reserving 64 MiB of
# address space apiece — a schedule's worth of threads blows past the
# sandbox's allowance and pthread_create fails with "can't start new
# thread". MALLOC_ARENA_MAX cannot carry this: glibc scrubs MALLOC_* from
# the environment after the sandbox drops privileges, so the cap is set
# in-process instead. M_ARENA_MAX is mallopt parameter -8.
M_ARENA_MAX = -8


def _cap_allocator_arenas() -> None:
    try:
        import ctypes

        ctypes.CDLL("libc.so.6").mallopt(M_ARENA_MAX, 1)
    except Exception:  # noqa: BLE001 — musl and friends have no mallopt
        pass


def _invoke_concurrent(module, invocation: dict[str, Any], raw_input: Any) -> Any:
    """Run a schedule of calls on real threads and report what happened.

    Each entry in the schedule becomes one thread. A call that LeetCode
    hands a release callback declares `emits`: the harness passes a
    callback that appends that token to the shared log, so the log is the
    interleaving the solution actually produced. A call that returns a
    value declares `records`, and its return value is appended when it
    completes. The judge compares the log — order-insensitively, or
    against the problem's structural invariant — because a correct
    concurrent program has many valid interleavings.
    """
    if not isinstance(raw_input, dict):
        raise ValueError("Concurrent input must be an object")
    schedule = raw_input.get("threads")
    if not isinstance(schedule, list) or not schedule:
        raise ValueError("Concurrent input needs a non-empty threads list")
    instance = getattr(module, invocation["class_name"])(*raw_input.get("constructor", []))
    events: list[Any] = []
    lock = threading.Lock()
    failures: list[str] = []

    def record(value: Any) -> None:
        with lock:
            events.append(value)

    def build_callback(spec: dict[str, Any], call_arguments: list[Any], emits: Any):
        """The callback a schedule call receives, per the manifest's
        value_type. Legacy ``{"kind": "callback"}`` records the schedule
        entry's emits token; ``value`` records the argument the solution
        passes; ``event`` composes the enclosing call's arguments (#i) with
        literal JSON values; ``record: false`` is a silent no-op. The
        solution invokes a NAMED method on the callback (launch(), pass(n),
        accept(x), run()), so the object records through whatever attribute
        the solution touches — or a bare call, for the Runnable legacy."""
        def invoke(*args: Any) -> None:
            if spec.get("record") is False:
                return
            if spec.get("value"):
                record(args[0] if args else None)
                return
            template = spec.get("event")
            if template is not None:
                record([
                    call_arguments[int(token[1:])]
                    if isinstance(token, str) and token.startswith("#")
                    else token
                    for token in template
                ])
                return
            record(emits)

        class callback:
            def __getattr__(self, _name):
                return invoke

            def __call__(self, *args: Any) -> None:
                invoke(*args)

        return callback()

    methods = {
        method["name"]: method for method in invocation.get("methods", [])
    }

    def runner(call: str, arguments: list[Any], emits: Any, records: bool):
        def run() -> None:
            try:
                method = getattr(instance, call)
                parameters = methods.get(call, {}).get("parameters", [])
                callback_slots = {
                    index
                    for index, parameter in enumerate(parameters)
                    if isinstance(parameter.get("value_type"), dict)
                    and parameter["value_type"].get("kind") == "callback"
                }
                if callback_slots:
                    # The manifest's callback parameters sit at fixed
                    # positions; the schedule's args fill the rest in order.
                    supplied = iter(arguments)
                    assembled = [
                        build_callback(parameters[index]["value_type"], arguments, emits)
                        if index in callback_slots
                        else next(supplied)
                        for index in range(max(len(parameters), len(arguments)))
                    ]
                    value = method(*assembled)
                    if records:
                        record(value)
                elif emits is not None:
                    method(*arguments, lambda: record(emits))
                elif records:
                    record(method(*arguments))
                else:
                    method(*arguments)
            except BaseException as error:  # noqa: BLE001 — reported as a verdict
                with lock:
                    failures.append(f"{type(error).__name__}: {error}")
        return run

    _cap_allocator_arenas()
    # Each thread reserves its stack from the sandbox's address-space
    # allowance, and the default 8 MiB times a schedule's worth of threads
    # exceeds it outright — pthread_create then fails with "can't start new
    # thread". A schedule thread runs one short method, so a small stack is
    # ample.
    # The stack size has to still be in effect when a thread *starts* — that
    # is when the stack is reserved — not merely when it is constructed.
    previous_stack = threading.stack_size()
    threading.stack_size(SCHEDULE_STACK_BYTES)
    try:
        threads = [
            threading.Thread(
                target=runner(
                    spec["call"],
                    list(spec.get("args", [])),
                    spec.get("emits"),
                    bool(spec.get("records")),
                ),
                daemon=True,
            )
            for spec in schedule
        ]
        for thread in threads:
            thread.start()
    finally:
        threading.stack_size(previous_stack)
    # The outer judge timeout is the deadlock detector: a schedule that
    # never completes simply never returns, and the case times out.
    for thread in threads:
        thread.join()
    if failures:
        raise RuntimeError(failures[0])
    return events


def _invoke(module, invocation: dict[str, Any], raw_input: Any) -> Any:
    invocation_type = invocation.get("type", "function")
    if invocation_type == "function":
        return _invoke_function(module, invocation, raw_input)
    if invocation_type == "design":
        return _invoke_design(module, invocation, raw_input)
    if invocation_type == "interactive":
        return _invoke_interactive(module, invocation, raw_input)
    if invocation_type == "concurrent":
        return _invoke_concurrent(module, invocation, raw_input)
    raise ValueError(f"Unsupported invocation type: {invocation_type}")


def main() -> None:
    response: dict[str, Any]
    captured = BoundedText()
    # Default-limits budgets, used only if the payload itself fails to
    # parse; recomputed from the real output limit below.
    stdout_budget = MAX_CAPTURED_OUTPUT
    try:
        payload = json.load(sys.stdin)
        invocation = payload["invocation"]
        output_limit = int(payload.get("limits", {}).get("output_kb", 64)) * 1024
        # `actual`, the captured output, and the traceback all share ONE
        # protocol write, and the runtime sandbox caps that file at
        # output_limit (RLIMIT_FSIZE): budget each part so the line can
        # never cross the cap — a SIGXFSZ mid-emit would surface as a
        # misleading "unparseable protocol output".
        actual_budget = max(1024, output_limit - MAX_CAPTURED_OUTPUT - 4096)
        stdout_budget = max(0, output_limit - 4096)
        with contextlib.redirect_stdout(captured), contextlib.redirect_stderr(captured):
            argv = sys.argv[1:]
            if "--" in argv:
                split = argv.index("--")
                assembly_args, solution_args = argv[:split], argv[split + 1 :]
            else:
                assembly_args, solution_args = [], argv
            module = _load_solution(Path(solution_args[0]), [Path(a) for a in assembly_args])
            actual = _invoke(module, invocation, payload["input"])
        response = {
            "status": "completed",
            "actual": _json_safe(actual, output_limit, actual_budget),
            "stdout": captured.getvalue(),
        }
    except BaseException as error:
        if isinstance(error, (KeyboardInterrupt, SystemExit)):
            error = RuntimeError("Solution interrupted execution")
        response = {
            "status": "runtime_error",
            "error": f"{type(error).__name__}: {error}"[:1000],
            "stdout": captured.getvalue()[:stdout_budget],
            "traceback": "".join(traceback.format_exception_only(type(error), error))[
                -2000:
            ],
        }
    emit_protocol(
        PROTOCOL_PREFIX + json.dumps(response, allow_nan=False, separators=(",", ":"))
    )


if __name__ == "__main__":
    main()
