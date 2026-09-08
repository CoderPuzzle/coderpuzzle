import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.lang.reflect.Array;
import java.lang.reflect.Constructor;
import java.lang.reflect.Executable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public final class CoderPuzzleJavaHarness {
    private static final String PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__";
    private static final int MAX_CAPTURED_OUTPUT = 16_384;
    private static final long SCHEDULE_STACK_BYTES = 512L * 1024L;

    private CoderPuzzleJavaHarness() {}

    public static void main(String[] arguments) {
        if (arguments.length == 1 && "--benchmark".equals(arguments[0])) {
            benchmark();
            return;
        }

        PrintStream protocolOutput = openProtocolChannel();
        CappedOutputStream capturedBytes = new CappedOutputStream(MAX_CAPTURED_OUTPUT);
        PrintStream capturedOutput = new PrintStream(capturedBytes, true, StandardCharsets.UTF_8);
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String payloadText = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
            Object parsed = Json.parse(payloadText);
            Map<String, Object> payload = asMap(parsed, "Judge payload must be an object");
            Map<String, Object> invocation = asMap(payload.get("invocation"), "Invocation must be an object");

            System.setOut(capturedOutput);
            Object actual = invoke(invocation, payload.get("input"));
            response.put("status", "completed");
            response.put("actual", actual);
        } catch (Throwable error) {
            Throwable root = unwrap(error);
            response.put("status", "runtime_error");
            response.put("error", boundedError(root));
        } finally {
            System.setOut(protocolOutput);
            capturedOutput.flush();
            response.put("stdout", capturedBytes.asString());
        }

        try {
            protocolOutput.println(PROTOCOL_PREFIX + Json.stringify(response));
        } catch (Throwable serializationError) {
            Map<String, Object> fallback = new LinkedHashMap<>();
            fallback.put("status", "runtime_error");
            fallback.put("error", boundedError(unwrap(serializationError)));
            fallback.put("stdout", capturedBytes.asString());
            protocolOutput.println(PROTOCOL_PREFIX + Json.stringify(fallback));
        }
    }

    /**
     * The judge protocol prefers a dedicated inherited fd (63) so submission
     * code cannot forge verdicts on stdout; stdout is the fallback when the
     * fd is absent (local authoring tooling).
     */
    private static PrintStream openProtocolChannel() {
        try {
            java.io.FileOutputStream channel = new java.io.FileOutputStream("/dev/fd/63");
            return new PrintStream(channel, true, StandardCharsets.UTF_8);
        } catch (Throwable unavailable) {
            return System.out;
        }
    }

    private static void benchmark() {
        long accumulator = 0x12345678L;
        for (int value = 0; value < 3_000_000; value++) {
            accumulator = ((accumulator << 5) - accumulator + value) & 0xffffffffL;
        }
        if (accumulator == -1L) {
            throw new IllegalStateException("Unreachable benchmark state");
        }
        System.out.print(accumulator);
    }

    private static Object invoke(Map<String, Object> invocation, Object rawInput) throws Exception {
        String className = asString(invocation.get("class_name"), "Invocation class_name must be a string");
        Class<?> targetClass = Class.forName(className);
        String type = invocation.getOrDefault("type", "function").toString();
        if ("design".equals(type)) {
            return invokeDesign(targetClass, invocation, rawInput);
        }
        if ("interactive".equals(type)) {
            return invokeInteractive(targetClass, invocation, rawInput);
        }
        if ("concurrent".equals(type)) {
            return invokeConcurrent(targetClass, invocation, rawInput);
        }
        if (!"function".equals(type)) {
            throw new IllegalArgumentException("Unsupported invocation type: " + type);
        }
        return invokeFunction(targetClass, invocation, rawInput);
    }


    /**
     * Runs a schedule of calls on real threads and reports what happened.
     * Each schedule entry becomes one thread; a call that LeetCode hands a
     * Runnable declares `emits` and receives a callback appending that token
     * to the shared log, while a call declaring `records` contributes its
     * return value when it completes. The judge compares the log against the
     * problem's invariant, because a correct concurrent program has many
     * valid interleavings.
     */
    private static Object invokeConcurrent(
        Class<?> targetClass,
        Map<String, Object> invocation,
        Object rawInput
    ) throws Exception {
        Map<String, Object> state = asMap(rawInput, "Concurrent input must be an object");
        List<Object> schedule = asList(state.get("threads"), "Concurrent input needs a threads list");
        if (schedule.isEmpty()) {
            throw new IllegalArgumentException("Concurrent schedule must not be empty");
        }
        List<Object> constructorArguments = state.get("constructor") == null
            ? new ArrayList<>()
            : asList(state.get("constructor"), "Constructor params must be a list");
        InvocationPlan<Constructor<?>> constructorPlan = findConstructor(targetClass, constructorArguments);
        Object instance;
        try {
            instance = constructorPlan.executable().newInstance(constructorPlan.arguments());
        } catch (InvocationTargetException error) {
            throw propagate(error.getTargetException());
        }

        Map<String, List<Object>> parameterSpecs = new HashMap<>();
        for (Object entry : asList(invocation.getOrDefault("methods", List.of()), "Methods must be a list")) {
            Map<String, Object> methodSpec = asMap(entry, "Method spec must be an object");
            parameterSpecs.put(
                asString(methodSpec.get("name"), "Method spec needs a name"),
                asList(methodSpec.getOrDefault("parameters", List.of()), "Method parameters must be a list"));
        }

        List<Object> events = java.util.Collections.synchronizedList(new ArrayList<>());
        List<Throwable> failures = java.util.Collections.synchronizedList(new ArrayList<>());
        List<Thread> threads = new ArrayList<>();
        for (Object entry : schedule) {
            Map<String, Object> spec = asMap(entry, "Schedule entry must be an object");
            String call = asString(spec.get("call"), "Schedule entry needs a call name");
            List<Object> arguments = spec.get("args") == null
                ? new ArrayList<>()
                : asList(spec.get("args"), "Schedule args must be a list");
            Object emits = spec.get("emits");
            boolean records = Boolean.TRUE.equals(spec.get("records"));
            threads.add(new Thread(null, () -> {
                try {
                    List<Object> parameterList = parameterSpecs.get(call);
                    List<Integer> callbackSlots = callbackSlotIndexes(parameterList);
                    if (!callbackSlots.isEmpty()) {
                        // The manifest's callback parameters sit at fixed
                        // positions; the schedule's args fill the rest in
                        // order, converted to the method's own types.
                        invokeWithCallbacks(
                            targetClass, instance, call, arguments, emits,
                            parameterList, callbackSlots, events, records);
                    } else if (emits != null) {
                        List<Object> callArguments = new ArrayList<>(arguments);
                        callArguments.add((Runnable) () -> events.add(emits));
                        InvocationPlan<Method> plan = findMethod(targetClass, call, callArguments);
                        plan.executable().invoke(instance, plan.arguments());
                    } else {
                        InvocationPlan<Method> plan = findMethod(targetClass, call, arguments);
                        Object value = plan.executable().invoke(instance, plan.arguments());
                        if (records) {
                            events.add(value);
                        }
                    }
                } catch (InvocationTargetException error) {
                    failures.add(error.getTargetException());
                } catch (Throwable error) {
                    failures.add(error);
                }
                // Each thread reserves its stack from the sandbox's
                // address-space allowance; the default times a schedule's
                // worth of threads exceeds it, and a schedule thread runs one
                // short method, so a small stack is ample.
            }, "coderpuzzle-schedule", SCHEDULE_STACK_BYTES));
        }
        for (Thread thread : threads) {
            thread.setDaemon(true);
            thread.start();
        }
        // The outer judge timeout is the deadlock detector: a schedule that
        // never completes simply never returns, and the case times out.
        for (Thread thread : threads) {
            thread.join();
        }
        if (!failures.isEmpty()) {
            throw propagate(failures.get(0));
        }
        return new ArrayList<>(events);
    }

    /** Positions in a method spec whose value_type declares a callback. */
    private static List<Integer> callbackSlotIndexes(List<Object> parameterList) {
        List<Integer> slots = new ArrayList<>();
        if (parameterList == null) {
            return slots;
        }
        for (int index = 0; index < parameterList.size(); index++) {
            Object valueType = asMap(parameterList.get(index), "Parameter spec must be an object").get("value_type");
            if (valueType instanceof Map && "callback".equals(((Map<?, ?>) valueType).get("kind"))) {
                slots.add(index);
            }
        }
        return slots;
    }

    private static Object invokeWithCallbacks(
        Class<?> targetClass,
        Object instance,
        String call,
        List<Object> arguments,
        Object emits,
        List<Object> parameterList,
        List<Integer> callbackSlots,
        List<Object> events,
        boolean records
    ) throws Exception {
        int expected = Math.max(parameterList.size(), arguments.size());
        Method target = null;
        for (Method candidate : targetClass.getDeclaredMethods()) {
            if (candidate.getName().equals(call) && candidate.getParameterCount() == expected) {
                candidate.setAccessible(true);
                target = candidate;
                break;
            }
        }
        if (target == null) {
            throw new IllegalArgumentException("No method " + call + " with " + expected + " arguments");
        }
        Class<?>[] types = target.getParameterTypes();
        Type[] genericTypes = target.getGenericParameterTypes();
        java.util.Iterator<Object> supplied = arguments.iterator();
        Object[] callArguments = new Object[expected];
        for (int index = 0; index < expected; index++) {
            if (callbackSlots.contains(index)) {
                Map<String, Object> valueType = asMap(
                    asMap(parameterList.get(index), "Parameter spec must be an object").get("value_type"),
                    "value_type must be an object");
                // Event templates reference the enclosing call's CONVERTED
                // arguments, so "#i" sees the same values the method sees
                // (ints as ints, not the raw JSON doubles).
                callArguments[index] = newCallback(valueType, callArguments, emits, types[index], events);
            } else {
                callArguments[index] = convert(supplied.next(), types[index], genericTypes[index]);
            }
        }
        try {
            Object value = target.invoke(instance, callArguments);
            if (records) {
                events.add(value);
            }
            return value;
        } catch (InvocationTargetException error) {
            throw propagate(error.getTargetException());
        }
    }

    /**
     * Builds the callback a schedule call receives, per the manifest's
     * value_type. Legacy {@code {"kind": "callback"}} records the schedule
     * entry's emits token; "value" records the argument the solution passes;
     * "event" composes the enclosing call's arguments (#i) with literal JSON
     * values; "record": false is a silent no-op. The proxy implements
     * whatever callback interface the solution declares.
     */
    private static Object newCallback(
        Map<String, Object> spec,
        Object[] callArguments,
        Object emits,
        Class<?> callbackType,
        List<Object> events
    ) {
        if (!callbackType.isInterface()) {
            throw new IllegalArgumentException(
                "Callback parameter must be an interface type: " + callbackType.getName());
        }
        boolean silent = Boolean.FALSE.equals(spec.get("record"));
        boolean recordValue = Boolean.TRUE.equals(spec.get("value"));
        List<Object> template = spec.get("event") == null
            ? null
            : asList(spec.get("event"), "event must be a list");
        java.lang.reflect.InvocationHandler handler = (proxy, method, methodArguments) -> {
            if (method.getDeclaringClass() == Object.class) {
                switch (method.getName()) {
                    case "toString":
                        return "CoderPuzzle callback (" + callbackType.getName() + ")";
                    case "hashCode":
                        return System.identityHashCode(proxy);
                    case "equals":
                        return proxy == (methodArguments != null && methodArguments.length > 0
                            ? methodArguments[0]
                            : null);
                    default:
                        return null;
                }
            }
            if (!silent) {
                if (recordValue) {
                    events.add(methodArguments != null && methodArguments.length > 0 ? methodArguments[0] : null);
                } else if (template != null) {
                    List<Object> composed = new ArrayList<>();
                    for (Object token : template) {
                        if (token instanceof String text && text.startsWith("#")) {
                            composed.add(callArguments[Integer.parseInt(text.substring(1))]);
                        } else {
                            composed.add(token);
                        }
                    }
                    events.add(composed);
                } else {
                    events.add(emits);
                }
            }
            return defaultValue(method.getReturnType());
        };
        return java.lang.reflect.Proxy.newProxyInstance(
            callbackType.getClassLoader(), new Class<?>[] {callbackType}, handler);
    }

    /** The value a callback's declared return type implies when ignored. */
    private static Object defaultValue(Class<?> type) {
        if (!type.isPrimitive() || type == void.class) {
            return null;
        }
        if (type == boolean.class) {
            return false;
        }
        if (type == char.class) {
            return (char) 0;
        }
        if (type == byte.class) {
            return (byte) 0;
        }
        if (type == short.class) {
            return (short) 0;
        }
        if (type == int.class) {
            return 0;
        }
        if (type == long.class) {
            return 0L;
        }
        if (type == float.class) {
            return 0f;
        }
        return 0.0d;
    }

    private static Object invokeInteractive(
        Class<?> targetClass,
        Map<String, Object> invocation,
        Object rawInput
    ) throws Exception {
        Map<String, Object> state = asMap(rawInput, "Interactive input must be an object");
        long budget = numberValue(invocation.getOrDefault("query_limit", 1_000_000)).longValue();
        Map<String, Object> providedOracle = providedOracle(invocation);
        if (providedOracle == null) {
            throw new IllegalArgumentException(
                "Interactive problems must carry their oracle in provided/ (invocation.provided.oracle)");
        }
        {
            // Bundle-carried oracle: the class ships in the problem's
            // provided/ sources and compiled with the submission; the
            // manifest names it, the case keys that build it, and the
            // method parameters (an out_buffer parameter is allocated by
            // the harness; the rest resolve from case keys by name,
            // converted to the method's own parameter types). The judge
            // core holds no per-oracle knowledge on this path.
            String providedClass = asString(providedOracle.get("class"), "Provided oracle class must be a string");
            List<String> constructKeys = stringList(providedOracle.get("construct"), "provided.construct");
            List<Object> parameterSpecs = asList(
                invocation.getOrDefault("parameters", List.of()), "Parameters must be a list");
            Class<?> oracleClass = Class.forName(providedClass);
            Constructor<?> chosen = null;
            for (Constructor<?> candidateCtor : oracleClass.getDeclaredConstructors()) {
                if (candidateCtor.getParameterCount() == constructKeys.size() + 1) {
                    chosen = candidateCtor;
                    break;
                }
            }
            if (chosen == null) {
                throw new IllegalArgumentException(
                    "Provided oracle " + providedClass + " has no constructor taking "
                        + constructKeys.size() + " case value(s) plus the query budget");
            }
            chosen.setAccessible(true);
            Class<?>[] parameterTypes = chosen.getParameterTypes();
            Object[] constructorArguments = new Object[parameterTypes.length];
            for (int index = 0; index < constructKeys.size(); index++) {
                constructorArguments[index] = convert(
                    state.get(constructKeys.get(index)),
                    parameterTypes[index],
                    parameterTypes[index]
                );
            }
            constructorArguments[constructKeys.size()] = convert(budget, parameterTypes[constructKeys.size()], null);
            Object oracleInstance = chosen.newInstance(constructorArguments);

            Constructor<?> constructor = targetClass.getDeclaredConstructor();
            constructor.setAccessible(true);
            Object instance = constructor.newInstance();
            String method = asString(invocation.get("method"), "Invocation method must be a string");
            for (Method candidate : targetClass.getDeclaredMethods()) {
                if (!candidate.getName().equals(method)) {
                    continue;
                }
                candidate.setAccessible(true);
                Class<?>[] methodParameters = candidate.getParameterTypes();
                if (methodParameters.length != 1 + parameterSpecs.size()) {
                    continue;
                }
                Object[] callArguments = new Object[methodParameters.length];
                callArguments[0] = oracleInstance;
                int bufferSlot = -1;
                for (int index = 0; index < parameterSpecs.size(); index++) {
                    Map<String, Object> spec = asMap(parameterSpecs.get(index), "Parameter spec must be an object");
                    Object outBuffer = spec.get("out_buffer");
                    if (outBuffer instanceof Map) {
                        // The read4 wire: the harness allocates the buffer
                        // the solution writes into, capacity named by
                        // another case key.
                        Object capacityKey = ((Map<?, ?>) outBuffer).get("capacity_from");
                        Object capacityValue = state.get(asString(capacityKey, "out_buffer needs capacity_from"));
                        int capacity = numberValue(capacityValue).intValue();
                        callArguments[1 + index] = new char[Math.max(capacity, 0)];
                        bufferSlot = index;
                        continue;
                    }
                    String name = asString(spec.get("name"), "Parameter spec needs a name");
                    callArguments[1 + index] = convert(
                        state.get(name), methodParameters[1 + index], methodParameters[1 + index]);
                }
                return finishInteractive(candidate, instance, callArguments, oracleInstance, bufferSlot);
            }
            throw new IllegalArgumentException("Method not found on solution class: " + method);
        }
    }

    private static Object finishInteractive(
        Method method,
        Object instance,
        Object[] callArguments,
        Object oracleInstance,
        int bufferSlot
    ) throws Exception {
        Object result = method.invoke(instance, callArguments);
        // Void-method oracles are judged by their own final state —
        // e.g. the robot's exact set of cleaned cells.
        if (result == null) {
            try {
                return oracleInstance
                    .getClass()
                    .getMethod("verdict")
                    .invoke(oracleInstance);
            } catch (NoSuchMethodException noVerdict) {
                return null;
            }
        }
        if (bufferSlot >= 0) {
            // The read4 wire: report [return_value, buffer[:return_value]].
            int count = ((Number) result).intValue();
            char[] buffer = (char[]) callArguments[1 + bufferSlot];
            List<Object> written = new ArrayList<>();
            for (int index = 0; index < Math.min(Math.max(count, 0), buffer.length); index++) {
                written.add(String.valueOf(buffer[index]));
            }
            List<Object> output = new ArrayList<>();
            output.add(count);
            output.add(written);
            return output;
        }
        return result;
    }

    /** The invocation's bundle-owned provided.oracle manifest, or null when absent. */
    @SuppressWarnings("unchecked")
    private static Map<String, Object> providedOracle(Map<String, Object> invocation) {
        Object provided = invocation.get("provided");
        if (!(provided instanceof Map)) {
            return null;
        }
        Object oracleManifest = ((Map<String, Object>) provided).get("oracle");
        return oracleManifest instanceof Map ? (Map<String, Object>) oracleManifest : null;
    }

    private static List<String> stringList(Object value, String field) {
        if (value == null) {
            return List.of();
        }
        List<Object> raw = asList(value, field + " must be a list");
        List<String> keys = new ArrayList<>(raw.size());
        for (Object item : raw) {
            keys.add(asString(item, field + " entries must be strings"));
        }
        return keys;
    }

    private static Object invokeFunction(
        Class<?> targetClass,
        Map<String, Object> invocation,
        Object rawInput
    ) throws Exception {
        List<Object> rawArguments = asList(rawInput, "Function input must be a positional argument list");
        List<Object> parameterSpecs = asList(invocation.getOrDefault("parameters", List.of()), "Parameters must be a list");
        if (parameterSpecs.size() != rawArguments.size()) {
            throw new IllegalArgumentException("Input argument count does not match the problem manifest");
        }
        // Struct values construct their provided class; an alias_list
        // parameter splices onto the aliased list decoded earlier. The
        // context lists carry the input-side nodes the result-time clone
        // checks compare against.
        Constructor<?> constructor = targetClass.getDeclaredConstructor();
        constructor.setAccessible(true);
        Object instance = constructor.newInstance();
        String methodName = asString(invocation.get("method"), "Invocation method must be a string");
        // Java is compile-typed: graph and random_list values are built
        // reflectively, so they must be constructed as the very class the
        // submission declares — the problem's provided class, which shadows
        // any mirror on the runtime classpath.
        List<Object> arguments = new ArrayList<>();
        List<Object> listHeads = new ArrayList<>();
        List<Object> graphNodes = new ArrayList<>();
        List<Object> randomNodes = new ArrayList<>();
        List<Object> randomTreeNodes = new ArrayList<>();
        for (int index = 0; index < parameterSpecs.size(); index++) {
            Map<String, Object> spec = asMap(parameterSpecs.get(index), "Parameter spec must be an object");
            Object valueType = spec.get("value_type");
            if (specHasStruct(valueType)) {
                arguments.add(decodeStruct(rawArguments.get(index), valueType));
                continue;
            }
            String codec = spec.getOrDefault("codec", "json").toString();
            if ("alias_list".equals(codec)) {
                Object aliasValue = spec.get("alias");
                if (!(aliasValue instanceof Number alias) || alias.intValue() < 0
                    || alias.intValue() >= arguments.size()) {
                    throw new IllegalArgumentException("alias_list requires an earlier aliased parameter");
                }
                arguments.add(decodeAliasList(rawArguments.get(index), arguments.get(alias.intValue())));
                continue;
            }
            if ("nary_tree_ref".equals(codec)) {
                // A node of an earlier n-ary tree, named by its (unique)
                // value: the argument is that exact node object, so
                // mutations through it land in the aliased tree.
                Object aliasValue = spec.get("alias");
                if (!(aliasValue instanceof Number alias) || alias.intValue() < 0
                    || alias.intValue() >= arguments.size()) {
                    throw new IllegalArgumentException("nary_tree_ref requires an earlier n-ary parameter");
                }
                arguments.add(decodeNaryTreeRef(rawArguments.get(index), arguments.get(alias.intValue())));
                continue;
            }
            Object decoded;
            if ("graph".equals(codec)) {
                decoded = decodeGraph(
                    rawArguments.get(index),
                    declaredNodeClass(targetClass, methodName, rawArguments.size(), index, "val", "neighbors"));
            } else if ("random_list".equals(codec)) {
                decoded = decodeRandomList(
                    rawArguments.get(index),
                    declaredNodeClass(targetClass, methodName, rawArguments.size(), index, "val", "next", "random"));
            } else if ("doubly_list".equals(codec)) {
                decoded = decodeDoublyChain(
                    rawArguments.get(index),
                    declaredNodeClass(targetClass, methodName, rawArguments.size(), index, "val", "prev", "next"));
            } else if ("doubly_list_node".equals(codec)) {
                decoded = decodeDoublyListNode(
                    rawArguments.get(index),
                    declaredNodeClass(targetClass, methodName, rawArguments.size(), index, "val", "prev", "next"));
            } else if ("random_tree".equals(codec)) {
                decoded = decodeRandomTree(
                    rawArguments.get(index),
                    declaredNodeClass(targetClass, methodName, rawArguments.size(), index, "val", "left", "right", "random"));
            } else {
                decoded = decodeCodec(rawArguments.get(index), codec);
            }
            if ("list_node".equals(codec)) {
                listHeads.add(decoded);
            } else if ("graph".equals(codec)) {
                collectGraphNodes(decoded, graphNodes);
            } else if ("random_list".equals(codec)) {
                collectChainNodes(decoded, randomNodes);
            } else if ("random_tree".equals(codec)) {
                collectRandomTreeNodes(decoded, randomTreeNodes);
            }
            arguments.add(decoded);
        }

        InvocationPlan<Method> plan = findMethod(targetClass, methodName, arguments);
        Object result;        try {
            result = plan.executable().invoke(instance, plan.arguments());
        } catch (InvocationTargetException error) {
            throw propagate(error.getTargetException());
        }
        String returnCodec = invocation.getOrDefault("return_codec", "json").toString();
        if ("alias_list".equals(returnCodec)) {
            Object aliasValue = invocation.get("return_alias");
            if (!(aliasValue instanceof Number alias) || alias.intValue() < 0
                || alias.intValue() >= listHeads.size()) {
                throw new IllegalArgumentException("alias_list return requires return_alias");
            }
            return serializeAliasList(result, listHeads.get(alias.intValue()));
        }
        if ("graph".equals(returnCodec)) {
            return serializeGraph(result, graphNodes);
        }
        if ("random_list".equals(returnCodec)) {
            return serializeRandomList(result, randomNodes);
        }
        if ("doubly_list".equals(returnCodec)) {
            return serializeDoublyList(result);
        }
        if ("random_tree".equals(returnCodec)) {
            return serializeRandomTree(result, randomTreeNodes);
        }
        return encodeCodec(result, returnCodec);
    }

    /**
     * The well-known class this codec's wire names, resolved from the
     * problem's own assembled classpath (never a judge-owned definition —
     * see docs/CODECS.md for the required name and shape per kind). A
     * missing class fails loudly, naming what the bundle must provide.
     */
    private static Class<?> wellKnownClass(String name) {
        try {
            return Class.forName(name);
        } catch (ClassNotFoundException missing) {
            throw new IllegalArgumentException(
                "This problem's wire needs a '" + name + "' class; provide it in provided/java/ "
                    + "(see docs/CODECS.md for the required shape)");
        }
    }

    /** The preferred scalar-value constructor (int val), falling back to a
     * no-arg constructor for {@code newNode} to finish via field access —
     * the same fallback graph/random_list construction already uses. */
    private static Constructor<?> scalarConstructor(Class<?> nodeClass) throws NoSuchMethodException {
        Constructor<?> ctor;
        try {
            ctor = nodeClass.getDeclaredConstructor(int.class);
        } catch (NoSuchMethodException noScalarCtor) {
            ctor = nodeClass.getDeclaredConstructor();
        }
        ctor.setAccessible(true);
        return ctor;
    }

    /** An optional field a shape may or may not carry (NodeWithNext's
     * ``parent`` back-pointer is a courtesy the LC 116/117 wire never
     * requires — only LC 510 reads it). */
    private static java.lang.reflect.Field optionalField(Class<?> nodeClass, String name) {
        try {
            return nodeClass.getField(name);
        } catch (NoSuchFieldException missing) {
            return null;
        }
    }

    /** Read a required field off any object by reflection — the read side
     * of every codec here never constructs, so it works on a return value
     * built by ANY class with the right shape, not just the one decode()
     * built. A missing field fails loudly, naming what is missing. */
    private static Object fieldValue(Object object, String field) {
        try {
            return object.getClass().getField(field).get(object);
        } catch (NoSuchFieldException | IllegalAccessException error) {
            throw new IllegalArgumentException(
                "Return value's class " + object.getClass().getSimpleName()
                    + " is missing the required field '" + field + "'");
        }
    }

    private static Object newNaryNode(Constructor<?> ctor, java.lang.reflect.Field valField,
            java.lang.reflect.Field childrenField, int value) throws Exception {
        Object node = newNode(ctor, valField, value);
        if (childrenField.get(node) == null) {
            childrenField.set(node, new ArrayList<>());
        }
        return node;
    }

    private static Object decodeCodec(Object value, String codec) throws Exception {
        if ("json".equals(codec)) {
            return value;
        }
        if ("list_node".equals(codec)) {
            if (value == null) {
                return null;
            }
            List<Object> values = asList(value, "list_node input must be an array");
            Class<?> nodeClass = wellKnownClass("ListNode");
            Constructor<?> ctor = scalarConstructor(nodeClass);
            java.lang.reflect.Field valField = nodeClass.getField("val");
            java.lang.reflect.Field nextField = nodeClass.getField("next");
            Object head = null;
            Object current = null;
            for (Object item : values) {
                Object node = newNode(ctor, valField, numberValue(item).intValue());
                if (current == null) {
                    head = node;
                } else {
                    nextField.set(current, node);
                }
                current = node;
            }
            return head;
        }
        if ("tree_node".equals(codec)) {
            if (value == null) {
                return null;
            }
            List<Object> values = asList(value, "tree_node input must be a level-order array");
            if (values.isEmpty() || values.get(0) == null) {
                return null;
            }
            Class<?> nodeClass = wellKnownClass("TreeNode");
            Constructor<?> ctor = scalarConstructor(nodeClass);
            java.lang.reflect.Field valField = nodeClass.getField("val");
            java.lang.reflect.Field leftField = nodeClass.getField("left");
            java.lang.reflect.Field rightField = nodeClass.getField("right");
            Object root = newNode(ctor, valField, numberValue(values.get(0)).intValue());
            // Null children are skipped below, so a growable list doubles as the BFS queue.
            List<Object> pending = new ArrayList<>();
            pending.add(root);
            int readIndex = 1;
            int writeIndex = 0;
            while (writeIndex < pending.size() && readIndex < values.size()) {
                Object node = pending.get(writeIndex++);
                if (readIndex < values.size()) {
                    if (values.get(readIndex) != null) {
                        Object left = newNode(ctor, valField, numberValue(values.get(readIndex)).intValue());
                        leftField.set(node, left);
                        pending.add(left);
                    }
                    readIndex++;
                }
                if (readIndex < values.size()) {
                    if (values.get(readIndex) != null) {
                        Object right = newNode(ctor, valField, numberValue(values.get(readIndex)).intValue());
                        rightField.set(node, right);
                        pending.add(right);
                    }
                    readIndex++;
                }
            }
            return root;
        }
        if ("list_node_array".equals(codec) || "tree_node_array".equals(codec)) {
            List<Object> values = asList(value, codec + " input must be an array");
            List<Object> nodes = new ArrayList<>();
            for (Object item : values) {
                nodes.add(decodeCodec(item, codec.substring(0, codec.length() - 6)));
            }
            return nodes;
        }
        if ("nary_tree".equals(codec)) {
            if (value == null) {
                return null;
            }
            List<Object> values = asList(value, "nary_tree input must be an array");
            if (values.isEmpty()) {
                return null;
            }
            Class<?> nodeClass = wellKnownClass("Node");
            Constructor<?> ctor = scalarConstructor(nodeClass);
            java.lang.reflect.Field valField = nodeClass.getField("val");
            java.lang.reflect.Field childrenField = nodeClass.getField("children");
            Object root = newNaryNode(ctor, valField, childrenField, numberValue(values.get(0)).intValue());
            List<Object> pending = new ArrayList<>();
            pending.add(root);
            int readIndex = 2;
            int writeIndex = 0;
            while (writeIndex < pending.size() && readIndex < values.size()) {
                Object parent = pending.get(writeIndex++);
                @SuppressWarnings("unchecked")
                List<Object> parentChildren = (List<Object>) childrenField.get(parent);
                while (readIndex < values.size() && values.get(readIndex) != null) {
                    Object child = newNaryNode(ctor, valField, childrenField, numberValue(values.get(readIndex)).intValue());
                    parentChildren.add(child);
                    pending.add(child);
                    readIndex++;
                }
                readIndex++;
            }
            return root;
        }
        if ("quad_tree".equals(codec)) {
            return decodeQuadTree(value);
        }
        if ("nested".equals(codec)) {
            return decodeNested(value);
        }
        if ("next_tree".equals(codec)) {
            if (value == null) {
                return null;
            }
            List<Object> values = asList(value, "next_tree input must be a level-order array");
            if (values.isEmpty() || values.get(0) == null) {
                return null;
            }
            Class<?> nodeClass = wellKnownClass("NodeWithNext");
            Constructor<?> ctor = scalarConstructor(nodeClass);
            java.lang.reflect.Field valField = nodeClass.getField("val");
            java.lang.reflect.Field leftField = nodeClass.getField("left");
            java.lang.reflect.Field rightField = nodeClass.getField("right");
            java.lang.reflect.Field parentField = optionalField(nodeClass, "parent");
            Object root = newNode(ctor, valField, numberValue(values.get(0)).intValue());
            List<Object> pending = new ArrayList<>();
            pending.add(root);
            int readIndex = 1;
            int writeIndex = 0;
            while (writeIndex < pending.size() && readIndex < values.size()) {
                Object node = pending.get(writeIndex++);
                if (readIndex < values.size()) {
                    if (values.get(readIndex) != null) {
                        Object left = newNode(ctor, valField, numberValue(values.get(readIndex)).intValue());
                        leftField.set(node, left);
                        if (parentField != null) {
                            parentField.set(left, node);
                        }
                        pending.add(left);
                    }
                    readIndex++;
                }
                if (readIndex < values.size()) {
                    if (values.get(readIndex) != null) {
                        Object right = newNode(ctor, valField, numberValue(values.get(readIndex)).intValue());
                        rightField.set(node, right);
                        if (parentField != null) {
                            parentField.set(right, node);
                        }
                        pending.add(right);
                    }
                    readIndex++;
                }
            }
            return root;
        }
        if ("circular_list".equals(codec)) {
            if (value == null) {
                return null;
            }
            List<Object> values = asList(value, "circular_list input must be an array");
            Class<?> nodeClass = wellKnownClass("ListNode");
            Constructor<?> ctor = scalarConstructor(nodeClass);
            java.lang.reflect.Field valField = nodeClass.getField("val");
            java.lang.reflect.Field nextField = nodeClass.getField("next");
            Object head = null;
            Object current = null;
            for (Object item : values) {
                Object node = newNode(ctor, valField, numberValue(item).intValue());
                if (current == null) {
                    head = node;
                } else {
                    nextField.set(current, node);
                }
                current = node;
            }
            if (current != null) {
                nextField.set(current, head);
            }
            return head;
        }
        if ("multi_list".equals(codec)) {
            return decodeMultiList(value);
        }
        if ("nary_tree_nodes".equals(codec)) {
            // The LC 1506 wire: an n-ary display array decoded and handed
            // over as the list of its nodes (level order — any order is
            // faithful, the statement grants an arbitrary permutation).
            Object root = decodeCodec(value, "nary_tree");
            List<Object> nodes = new ArrayList<>();
            if (root != null) {
                java.lang.reflect.Field childrenField = root.getClass().getField("children");
                List<Object> queue = new ArrayList<>();
                queue.add(root);
                int index = 0;
                while (index < queue.size()) {
                    Object node = queue.get(index++);
                    nodes.add(node);
                    @SuppressWarnings("unchecked")
                    List<Object> children = (List<Object>) childrenField.get(node);
                    queue.addAll(children);
                }
            }
            return nodes;
        }
        if ("special_tree".equals(codec)) {
            // The LC 2773 wire: a binary-tree display whose leaves b1..bk
            // (in increasing value order) are ring-wired left to the
            // previous and right to the next leaf — the special property
            // the statement grants, which the display cannot carry.
            if (value == null) {
                return null;
            }
            Object root = decodeCodec(value, "tree_node");
            if (root == null) {
                return null;
            }
            Class<?> nodeClass = root.getClass();
            java.lang.reflect.Field valField = nodeClass.getField("val");
            java.lang.reflect.Field leftField = nodeClass.getField("left");
            java.lang.reflect.Field rightField = nodeClass.getField("right");
            List<Object> leaves = new ArrayList<>();
            List<Object> queue = new ArrayList<>();
            queue.add(root);
            int index = 0;
            while (index < queue.size()) {
                Object node = queue.get(index++);
                Object left = leftField.get(node);
                Object right = rightField.get(node);
                if (left == null && right == null) {
                    leaves.add(node);
                } else {
                    if (left != null) {
                        queue.add(left);
                    }
                    if (right != null) {
                        queue.add(right);
                    }
                }
            }
            // Insertion sort by val: leaf counts are small, and this avoids
            // a checked-exception-throwing comparator.
            for (int i = 1; i < leaves.size(); i++) {
                Object key = leaves.get(i);
                int keyVal = (Integer) valField.get(key);
                int j = i - 1;
                while (j >= 0 && (Integer) valField.get(leaves.get(j)) > keyVal) {
                    leaves.set(j + 1, leaves.get(j));
                    j--;
                }
                leaves.set(j + 1, key);
            }
            int count = leaves.size();
            for (int position = 0; position < count; position++) {
                leftField.set(leaves.get(position), leaves.get((position - 1 + count) % count));
                rightField.set(leaves.get(position), leaves.get((position + 1) % count));
            }
            return root;
        }
        // graph / random_list / doubly_list / doubly_list_node /
        // random_tree are decoded in invokeFunction only: their reflective
        // construction needs the solution's declared node class.
        throw new IllegalArgumentException("Java executor does not support codec: " + codec);
    }

    private static Object encodeCodec(Object value, String codec) throws Exception {
        if ("json".equals(codec)) {
            return value;
        }
        if ("quad_tree".equals(codec)) {
            // A missing quad tree serializes as null, unlike the list/tree
            // wire where a missing head or root is [].
            if (value == null) {
                return null;
            }
            return encodeQuadTree(value);
        }
        if (value == null) {
            // Every other executor serializes a missing head or root as [].
            return List.of();
        }
        if ("list_node".equals(codec)) {
            List<Object> values = new ArrayList<>();
            Object current = value;
            while (current != null) {
                values.add(fieldValue(current, "val"));
                current = fieldValue(current, "next");
            }
            return values;
        }
        if ("tree_node".equals(codec)) {
            List<Object> values = new ArrayList<>();
            List<Object> queue = new ArrayList<>();
            queue.add(value);
            int index = 0;
            while (index < queue.size()) {
                Object entry = queue.get(index++);
                if (entry == null) {
                    values.add(null);
                    continue;
                }
                values.add(fieldValue(entry, "val"));
                queue.add(fieldValue(entry, "left"));
                queue.add(fieldValue(entry, "right"));
            }
            while (!values.isEmpty() && values.get(values.size() - 1) == null) {
                values.remove(values.size() - 1);
            }
            return values;
        }
        if ("list_node_array".equals(codec) || "tree_node_array".equals(codec)
                || "circular_list_array".equals(codec)) {
            List<?> items = asList(value, codec + " return value must be an array");
            List<Object> values = new ArrayList<>();
            for (Object item : items) {
                values.add(encodeCodec(item, codec.substring(0, codec.length() - 6)));
            }
            return values;
        }
        if ("nary_tree".equals(codec)) {
            List<Object> output = new ArrayList<>();
            output.add(fieldValue(value, "val"));
            output.add(null);
            List<Object> queue = new ArrayList<>();
            queue.add(value);
            int index = 0;
            while (index < queue.size()) {
                Object parent = queue.get(index++);
                @SuppressWarnings("unchecked")
                List<Object> children = (List<Object>) fieldValue(parent, "children");
                for (Object child : children) {
                    output.add(fieldValue(child, "val"));
                    queue.add(child);
                }
                output.add(null);
            }
            while (!output.isEmpty() && output.get(output.size() - 1) == null) {
                output.remove(output.size() - 1);
            }
            return output;
        }
        if ("nested".equals(codec)) {
            return encodeNested(value);
        }
        if ("next_tree".equals(codec)) {
            // LC display wire: values with a null marker between adjacent
            // levels, trailing markers trimmed. Each level is read through
            // the solution-populated next chain; the next level starts at
            // the first child found anywhere in this level (left or right
            // — the level's first node need not have a left child).
            List<Object> output = new ArrayList<>();
            Object level = value;
            while (level != null) {
                Object nextLevel = null;
                Object node = level;
                while (node != null) {
                    output.add(fieldValue(node, "val"));
                    if (nextLevel == null) {
                        Object left = fieldValue(node, "left");
                        nextLevel = left != null ? left : fieldValue(node, "right");
                    }
                    node = fieldValue(node, "next");
                }
                output.add(null);
                level = nextLevel;
            }
            while (!output.isEmpty() && output.get(output.size() - 1) == null) {
                output.remove(output.size() - 1);
            }
            return output;
        }
        if ("circular_list".equals(codec)) {
            List<Object> output = new ArrayList<>();
            output.add(fieldValue(value, "val"));
            Object current = fieldValue(value, "next");
            for (int i = 0; i < (1 << 20); i++) {
                if (current == null) {
                    throw new IllegalArgumentException("Circular list is not closed");
                }
                if (current == value) {
                    return output;
                }
                output.add(fieldValue(current, "val"));
                current = fieldValue(current, "next");
            }
            throw new IllegalArgumentException("Circular list exceeds the walk bound");
        }
        if ("doubly_circular".equals(codec)) {
            return serializeDoublyCircular(value);
        }
        if ("multi_list".equals(codec)) {
            return serializeMultiList(value);
        }
        throw new IllegalArgumentException("Java executor does not support codec: " + codec);
    }

    private static Object encodeQuadTree(Object node) throws Exception {
        // LC display wire: a flat preorder of [isLeaf, val] pairs. A
        // non-leaf's val is the solution's to choose, so both sides
        // normalize it to 0 — the wire never carries an arbitrary
        // internal val.
        if (node == null) {
            return null;
        }
        List<Object> output = new ArrayList<>();
        appendQuadTree(node, output);
        return output;
    }

    private static void appendQuadTree(Object node, List<Object> output) throws Exception {
        boolean isLeaf = (Boolean) fieldValue(node, "isLeaf");
        if (isLeaf) {
            boolean val = (Boolean) fieldValue(node, "val");
            output.add(List.of(1, val ? 1 : 0));
            return;
        }
        output.add(List.of(0, 0));
        appendQuadTree(fieldValue(node, "topLeft"), output);
        appendQuadTree(fieldValue(node, "topRight"), output);
        appendQuadTree(fieldValue(node, "bottomLeft"), output);
        appendQuadTree(fieldValue(node, "bottomRight"), output);
    }

    private static Object decodeQuadTree(Object value) throws Exception {
        if (value == null) {
            return null;
        }
        List<Object> data = asList(value, "quad_tree input must be a display array");
        Class<?> nodeClass = wellKnownClass("QuadNode");
        int[] cursor = {0};
        Object root = parseQuadNode(nodeClass, data, cursor);
        if (cursor[0] != data.size()) {
            throw new IllegalArgumentException("quad_tree wire has trailing entries");
        }
        return root;
    }

    private static Object newQuadNode(Class<?> nodeClass, boolean val, boolean isLeaf) throws Exception {
        try {
            Constructor<?> ctor = nodeClass.getDeclaredConstructor(boolean.class, boolean.class);
            ctor.setAccessible(true);
            return ctor.newInstance(val, isLeaf);
        } catch (NoSuchMethodException missing) {
            Constructor<?> ctor = nodeClass.getDeclaredConstructor();
            ctor.setAccessible(true);
            Object node = ctor.newInstance();
            nodeClass.getField("val").set(node, val);
            nodeClass.getField("isLeaf").set(node, isLeaf);
            return node;
        }
    }

    private static Object parseQuadNode(Class<?> nodeClass, List<Object> data, int[] cursor) throws Exception {
        if (cursor[0] >= data.size()) {
            throw new IllegalArgumentException("quad_tree wire ended without a node");
        }
        List<Object> pair = asList(data.get(cursor[0]++), "quad_tree node must be an [isLeaf, val] pair");
        if (pair.size() != 2) {
            throw new IllegalArgumentException("quad_tree node must be an [isLeaf, val] pair");
        }
        boolean isLeaf = quadFlag(pair.get(0), "isLeaf");
        boolean val = quadFlag(pair.get(1), "val");
        Object node = newQuadNode(nodeClass, val, isLeaf);
        if (!isLeaf) {
            nodeClass.getField("topLeft").set(node, parseQuadNode(nodeClass, data, cursor));
            nodeClass.getField("topRight").set(node, parseQuadNode(nodeClass, data, cursor));
            nodeClass.getField("bottomLeft").set(node, parseQuadNode(nodeClass, data, cursor));
            nodeClass.getField("bottomRight").set(node, parseQuadNode(nodeClass, data, cursor));
        }
        return node;
    }

    private static boolean quadFlag(Object value, String field) {
        if (value instanceof Boolean flag) {
            return flag;
        }
        if (value instanceof Number number && (number.intValue() == 0 || number.intValue() == 1)) {
            return number.intValue() == 1;
        }
        throw new IllegalArgumentException("quad_tree " + field + " must be 0 or 1");
    }

    private static Object decodeNested(Object value) throws Exception {
        Class<?> nodeClass = wellKnownClass("NestedInteger");
        if (value instanceof Boolean || !(value instanceof Number)) {
            if (!(value instanceof List<?>)) {
                throw new IllegalArgumentException("nested input must be an int or nested arrays");
            }
            Constructor<?> ctor = nodeClass.getDeclaredConstructor();
            ctor.setAccessible(true);
            Object node = ctor.newInstance();
            Method add = nodeClass.getMethod("add", nodeClass);
            for (Object item : (List<?>) value) {
                add.invoke(node, decodeNested(item));
            }
            return node;
        }
        int scalar = ((Number) value).intValue();
        try {
            Constructor<?> ctor = nodeClass.getDeclaredConstructor(int.class);
            ctor.setAccessible(true);
            return ctor.newInstance(scalar);
        } catch (NoSuchMethodException missing) {
            Constructor<?> ctor = nodeClass.getDeclaredConstructor();
            ctor.setAccessible(true);
            Object node = ctor.newInstance();
            nodeClass.getMethod("setInteger", int.class).invoke(node, scalar);
            return node;
        }
    }

    private static Object encodeNested(Object node) throws Exception {
        // Natural nested-arrays JSON: an integer hold is the integer
        // itself, a list hold the array of its encoded children.
        Class<?> nodeClass = node.getClass();
        boolean isInteger = (Boolean) nodeClass.getMethod("isInteger").invoke(node);
        if (isInteger) {
            return nodeClass.getMethod("getInteger").invoke(node);
        }
        List<Object> output = new ArrayList<>();
        @SuppressWarnings("unchecked")
        List<Object> items = (List<Object>) nodeClass.getMethod("getList").invoke(node);
        for (Object item : items) {
            output.add(encodeNested(item));
        }
        return output;
    }

    private static Object decodeMultiList(Object value) throws Exception {
        if (!(value instanceof Map)) {
            throw new IllegalArgumentException("multi_list input must carry values and children");
        }
        Map<?, ?> chain = (Map<?, ?>) value;
        Object rawValues = chain.get("values");
        Object rawChildren = chain.get("children");
        if (rawValues == null || rawChildren == null) {
            throw new IllegalArgumentException("multi_list input must carry values and children");
        }
        List<Object> values = asList(rawValues, "multi_list values must be an array");
        List<Object> children = asList(rawChildren, "multi_list children must be an array");
        if (values.size() != children.size()) {
            throw new IllegalArgumentException("multi_list children must match values slot for slot");
        }
        Class<?> nodeClass = wellKnownClass("MultiListNode");
        Constructor<?> ctor = scalarConstructor(nodeClass);
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field prevField = nodeClass.getField("prev");
        java.lang.reflect.Field nextField = nodeClass.getField("next");
        java.lang.reflect.Field childField = nodeClass.getField("child");
        List<Object> nodes = new ArrayList<>();
        for (int index = 0; index < values.size(); index++) {
            Object node = newNode(ctor, valField, numberValue(values.get(index)).intValue());
            Object child = children.get(index);
            if (child != null) {
                childField.set(node, decodeMultiList(child));
            }
            nodes.add(node);
        }
        for (int index = 1; index < nodes.size(); index++) {
            nextField.set(nodes.get(index - 1), nodes.get(index));
            prevField.set(nodes.get(index), nodes.get(index - 1));
        }
        return nodes.isEmpty() ? null : nodes.get(0);
    }

    private static List<Object> serializeMultiList(Object head) {
        List<Object> output = new ArrayList<>();
        Object node = head;
        Object previous = null;
        for (int i = 0; i < (1 << 20) && node != null; i++) {
            if (fieldValue(node, "prev") != previous || fieldValue(node, "child") != null) {
                throw new IllegalArgumentException("Flattened list is not properly linked");
            }
            output.add(fieldValue(node, "val"));
            previous = node;
            node = fieldValue(node, "next");
        }
        if (node != null) {
            throw new IllegalArgumentException("Flattened list exceeds the walk bound");
        }
        return output;
    }

    private static List<Object> serializeDoublyCircular(Object head) {
        // LC 426 wire (left = prev, right = next): read the ring through
        // right and require every back-link along the way.
        List<Object> output = new ArrayList<>();
        if (head == null) {
            return output;
        }
        output.add(fieldValue(head, "val"));
        Object previous = head;
        Object current = fieldValue(head, "right");
        for (int i = 0; i < (1 << 20); i++) {
            if (current == null || fieldValue(current, "left") != previous) {
                throw new IllegalArgumentException("Doubly linked list is not properly linked");
            }
            if (current == head) {
                if (fieldValue(head, "left") != previous) {
                    throw new IllegalArgumentException("Doubly linked list is not properly linked");
                }
                return output;
            }
            output.add(fieldValue(current, "val"));
            previous = current;
            current = fieldValue(current, "right");
        }
        throw new IllegalArgumentException("Doubly linked list exceeds the walk bound");
    }

    /**
     * The solution's declared class for a reflectively decoded parameter:
     * the first overload of this name and arity whose parameter at
     * {@code parameterIndex} carries the named public fields.
     */
    private static Class<?> declaredNodeClass(
        Class<?> targetClass,
        String methodName,
        int argumentCount,
        int parameterIndex,
        String... fields
    ) {
        for (Method candidate : targetClass.getDeclaredMethods()) {
            if (!candidate.getName().equals(methodName) || candidate.getParameterCount() != argumentCount) {
                continue;
            }
            Class<?> type = candidate.getParameterTypes()[parameterIndex];
            boolean matches = true;
            for (String field : fields) {
                try {
                    type.getField(field);
                } catch (NoSuchFieldException missing) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                return type;
            }
        }
        throw new IllegalArgumentException(
            "Method " + methodName + " must declare a node parameter with field(s) " + String.join(", ", fields));
    }

    private static Object decodeGraph(Object value, Class<?> nodeClass) throws Exception {
        List<Object> rows = asList(value, "graph input must be an adjacency array");
        if (rows.isEmpty()) {
            return null;
        }
        java.lang.reflect.Constructor<?> ctor;
        try {
            ctor = nodeClass.getDeclaredConstructor(int.class);
        } catch (NoSuchMethodException noScalarCtor) {
            ctor = nodeClass.getDeclaredConstructor();
        }
        ctor.setAccessible(true);
        Object[] nodes = new Object[rows.size()];
        for (int index = 0; index < rows.size(); index++) {
            nodes[index] = ctor.getParameterCount() == 1
                ? ctor.newInstance(index + 1)
                : ctor.newInstance();
            java.lang.reflect.Field val = nodeClass.getField("val");
            val.set(nodes[index], index + 1);
        }
        java.lang.reflect.Field neighbors = nodeClass.getField("neighbors");
        for (int index = 0; index < rows.size(); index++) {
            List<Object> row = asList(rows.get(index), "graph rows must be neighbor arrays");
            List<Object> linked = new ArrayList<>();
            for (Object item : row) {
                int neighbor = numberValue(item).intValue();
                if (neighbor < 1 || neighbor > nodes.length) {
                    throw new IllegalArgumentException("Graph neighbor " + neighbor + " is out of range");
                }
                linked.add(nodes[neighbor - 1]);
            }
            neighbors.set(nodes[index], linked);
        }
        return nodes[0];
    }

    private static void collectGraphNodes(Object head, List<Object> into) throws Exception {
        if (head == null) {
            return;
        }
        Class<?> nodeClass = head.getClass();
        java.lang.reflect.Field neighbors = nodeClass.getField("neighbors");
        List<Object> queue = new ArrayList<>();
        queue.add(head);
        List<Object> seen = new ArrayList<>();
        int index = 0;
        while (index < queue.size()) {
            Object node = queue.get(index++);
            if (seen.contains(node)) {
                continue;
            }
            seen.add(node);
            into.add(node);
            for (Object neighbor : (List<?>) neighbors.get(node)) {
                queue.add(neighbor);
            }
        }
    }

    private static List<Object> serializeGraph(Object result, List<Object> inputNodes) throws Exception {
        if (result == null) {
            return List.of();
        }
        Class<?> nodeClass = result.getClass();
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field neighbors = nodeClass.getField("neighbors");
        List<Object> queue = new ArrayList<>();
        queue.add(result);
        List<Object> visited = new ArrayList<>();
        int index = 0;
        while (index < queue.size()) {
            Object node = queue.get(index++);
            if (visited.contains(node)) {
                continue;
            }
            visited.add(node);
            queue.addAll((List<?>) neighbors.get(node));
        }
        visited.sort(java.util.Comparator.comparingInt(node -> {
            try {
                return valField.getInt(node);
            } catch (ReflectiveOperationException error) {
                throw propagate(error);
            }
        }));
        if (!inputNodes.isEmpty()) {
            for (Object node : visited) {
                if (inputNodes.contains(node)) {
                    throw new IllegalArgumentException("Returned graph shares nodes with the input graph");
                }
            }
        }
        List<Object> rows = new ArrayList<>();
        for (Object node : visited) {
            List<Object> row = new ArrayList<>();
            for (Object neighbor : (List<?>) neighbors.get(node)) {
                row.add(valField.getInt(neighbor));
            }
            rows.add(row);
        }
        return rows;
    }

    private static Object decodeRandomList(Object value, Class<?> nodeClass) throws Exception {
        List<Object> pairs = asList(value, "random_list input must be an array of [val, random] pairs");
        if (pairs.isEmpty()) {
            return null;
        }
        java.lang.reflect.Constructor<?> ctor;
        try {
            ctor = nodeClass.getDeclaredConstructor(int.class);
        } catch (NoSuchMethodException noScalarCtor) {
            ctor = nodeClass.getDeclaredConstructor();
        }
        ctor.setAccessible(true);
        Object[] nodes = new Object[pairs.size()];
        for (int index = 0; index < pairs.size(); index++) {
            List<Object> pair = asList(pairs.get(index), "random_list pairs must be [val, random]");
            nodes[index] = ctor.getParameterCount() == 1
                ? ctor.newInstance(numberValue(pair.get(0)).intValue())
                : ctor.newInstance();
            nodeClass.getField("val").set(nodes[index], numberValue(pair.get(0)).intValue());
        }
        java.lang.reflect.Field next = nodeClass.getField("next");
        java.lang.reflect.Field random = nodeClass.getField("random");
        for (int index = 0; index < pairs.size(); index++) {
            List<Object> pair = asList(pairs.get(index), "random_list pairs must be [val, random]");
            if (index + 1 < nodes.length) {
                next.set(nodes[index], nodes[index + 1]);
            }
            Object target = pair.get(1);
            if (target != null) {
                int targetIndex = numberValue(target).intValue();
                if (targetIndex < 0 || targetIndex >= nodes.length) {
                    throw new IllegalArgumentException("Random pointer target is out of range");
                }
                random.set(nodes[index], nodes[targetIndex]);
            }
        }
        return nodes[0];
    }

    private static void collectChainNodes(Object head, List<Object> into) throws Exception {
        if (head == null) {
            return;
        }
        Class<?> nodeClass = head.getClass();
        java.lang.reflect.Field next = nodeClass.getField("next");
        for (Object node = head; node != null; node = next.get(node)) {
            into.add(node);
        }
    }

    private static List<Object> serializeRandomList(Object result, List<Object> inputNodes) throws Exception {
        if (result == null) {
            return List.of();
        }
        Class<?> nodeClass = result.getClass();
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field next = nodeClass.getField("next");
        java.lang.reflect.Field random = nodeClass.getField("random");
        List<Object> nodes = new ArrayList<>();
        for (Object node = result; node != null; node = next.get(node)) {
            if (nodes.contains(node)) {
                throw new IllegalArgumentException("Random list has a cycle in next");
            }
            nodes.add(node);
        }
        if (!inputNodes.isEmpty()) {
            for (Object node : nodes) {
                if (inputNodes.contains(node)) {
                    throw new IllegalArgumentException("Returned list shares nodes with the input list");
                }
            }
        }
        List<Object> output = new ArrayList<>();
        for (Object node : nodes) {
            Object target = random.get(node);
            Integer targetIndex = null;
            for (int index = 0; index < nodes.size(); index++) {
                if (nodes.get(index) == target) {
                    targetIndex = index;
                    break;
                }
            }
            List<Object> pair = new ArrayList<>();
            pair.add(valField.getInt(node));
            pair.add(targetIndex);
            output.add(pair);
        }
        return output;
    }

    private static Object newNode(java.lang.reflect.Constructor<?> ctor, java.lang.reflect.Field valField, int value)
        throws Exception {
        Object node = ctor.getParameterCount() == 1 ? ctor.newInstance(value) : ctor.newInstance();
        valField.set(node, value);
        return node;
    }

    private static Object decodeDoublyChain(Object value, Class<?> nodeClass) throws Exception {
        // The LC 3263 wire: a plain value array decoding into an open
        // chain with both directions wired.
        List<Object> values = asList(value, "doubly_list input must be a value array");
        if (values.isEmpty()) {
            return null;
        }
        java.lang.reflect.Constructor<?> ctor;
        try {
            ctor = nodeClass.getDeclaredConstructor(int.class);
        } catch (NoSuchMethodException noScalarCtor) {
            ctor = nodeClass.getDeclaredConstructor();
        }
        ctor.setAccessible(true);
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field prev = nodeClass.getField("prev");
        java.lang.reflect.Field next = nodeClass.getField("next");
        List<Object> nodes = new ArrayList<>();
        for (Object item : values) {
            nodes.add(newNode(ctor, valField, numberValue(item).intValue()));
        }
        for (int index = 1; index < nodes.size(); index++) {
            next.set(nodes.get(index - 1), nodes.get(index));
            prev.set(nodes.get(index), nodes.get(index - 1));
        }
        return nodes.get(0);
    }

    private static Object decodeDoublyListNode(Object value, Class<?> nodeClass) throws Exception {
        // The LC 3294 wire: {"values": [...], "node": v} decodes to the
        // chain node whose value is v (values are unique per the
        // constraints).
        if (!(value instanceof Map)) {
            throw new IllegalArgumentException("doubly_list_node input must carry values and node");
        }
        Map<?, ?> spec = (Map<?, ?>) value;
        Object rawValues = spec.get("values");
        Object target = spec.get("node");
        if (rawValues == null || target == null) {
            throw new IllegalArgumentException("doubly_list_node input must carry values and node");
        }
        Object head = decodeDoublyChain(rawValues, nodeClass);
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field next = nodeClass.getField("next");
        int wanted = numberValue(target).intValue();
        for (Object node = head; node != null; node = next.get(node)) {
            if (valField.getInt(node) == wanted) {
                return node;
            }
        }
        throw new IllegalArgumentException("doubly_list_node target value is not in the chain");
    }

    private static List<Object> serializeDoublyList(Object head) throws Exception {
        // The forward walk must agree with every back-link, mirroring the
        // doubly_circular invariant on an open chain.
        List<Object> output = new ArrayList<>();
        if (head == null) {
            return output;
        }
        Class<?> nodeClass = head.getClass();
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field prev = nodeClass.getField("prev");
        java.lang.reflect.Field next = nodeClass.getField("next");
        Object node = head;
        Object previous = null;
        for (int i = 0; i < (1 << 20) && node != null; i++) {
            if (prev.get(node) != previous) {
                throw new IllegalArgumentException("Doubly linked list is not properly linked");
            }
            output.add(valField.getInt(node));
            previous = node;
            node = next.get(node);
        }
        if (node != null) {
            throw new IllegalArgumentException("Doubly linked list exceeds the walk bound");
        }
        return output;
    }

    private static Object decodeNaryTreeRef(Object value, Object aliasedRoot) throws Exception {
        if (!(value instanceof Number target)) {
            throw new IllegalArgumentException("nary_tree_ref input must be a node value");
        }
        Object found = findNaryNode(aliasedRoot, target.intValue());
        if (found == null) {
            throw new IllegalArgumentException("nary_tree_ref target value is not in the aliased tree");
        }
        return found;
    }

    private static Object findNaryNode(Object node, int target) {
        if (node == null) {
            return null;
        }
        if ((Integer) fieldValue(node, "val") == target) {
            return node;
        }
        @SuppressWarnings("unchecked")
        List<Object> children = (List<Object>) fieldValue(node, "children");
        for (Object child : children) {
            Object found = findNaryNode(child, target);
            if (found != null) {
                return found;
            }
        }
        return null;
    }

    private static Object[] randomTreeRow(Object raw) {
        List<Object> row = asList(raw, "random_tree node must be a [val, random] row");
        if (row.size() != 2) {
            throw new IllegalArgumentException("random_tree node must be a [val, random] row");
        }
        return new Object[] {numberValue(row.get(0)).intValue(), row.get(1)};
    }

    private static Object decodeRandomTree(Object value, Class<?> nodeClass) throws Exception {
        // The LC 1485 wire: a binary-tree level order whose present slots
        // are [val, randomIndex] rows — random_list's index addressing on
        // a tree topology. The index counts present nodes in level order,
        // from the root.
        List<Object> rows = asList(value, "random_tree input must be a display array");
        if (rows.isEmpty()) {
            return null;
        }
        java.lang.reflect.Constructor<?> ctor;
        try {
            ctor = nodeClass.getDeclaredConstructor(int.class);
        } catch (NoSuchMethodException noScalarCtor) {
            ctor = nodeClass.getDeclaredConstructor();
        }
        ctor.setAccessible(true);
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field left = nodeClass.getField("left");
        java.lang.reflect.Field right = nodeClass.getField("right");
        java.lang.reflect.Field random = nodeClass.getField("random");
        Object[] first = randomTreeRow(rows.get(0));
        Object root = newNode(ctor, valField, (Integer) first[0]);
        List<Object> order = new ArrayList<>();
        List<Object[]> pending = new ArrayList<>();
        List<Object> queue = new ArrayList<>();
        order.add(root);
        pending.add(new Object[] {root, first[1]});
        queue.add(root);
        int index = 1;
        int writeIndex = 0;
        while (writeIndex < queue.size() && index < rows.size()) {
            Object parent = queue.get(writeIndex++);
            for (java.lang.reflect.Field side : new java.lang.reflect.Field[] {left, right}) {
                if (index >= rows.size()) {
                    break;
                }
                Object raw = rows.get(index++);
                if (raw == null) {
                    continue;
                }
                Object[] row = randomTreeRow(raw);
                Object child = newNode(ctor, valField, (Integer) row[0]);
                side.set(parent, child);
                order.add(child);
                pending.add(new Object[] {child, row[1]});
                queue.add(child);
            }
        }
        for (Object[] entry : pending) {
            Object target = entry[1];
            if (target == null) {
                continue;
            }
            int targetIndex = numberValue(target).intValue();
            if (targetIndex < 0 || targetIndex >= order.size()) {
                throw new IllegalArgumentException("Random pointer target is out of range");
            }
            random.set(entry[0], order.get(targetIndex));
        }
        return root;
    }

    private static void collectRandomTreeNodes(Object root, List<Object> into) throws Exception {
        if (root == null) {
            return;
        }
        Class<?> nodeClass = root.getClass();
        java.lang.reflect.Field left = nodeClass.getField("left");
        java.lang.reflect.Field right = nodeClass.getField("right");
        List<Object> queue = new ArrayList<>();
        queue.add(root);
        List<Object> seen = new ArrayList<>();
        int index = 0;
        while (index < queue.size()) {
            Object node = queue.get(index++);
            if (node == null || seen.contains(node)) {
                continue;
            }
            seen.add(node);
            into.add(node);
            queue.add(left.get(node));
            queue.add(right.get(node));
        }
    }

    private static List<Object> serializeRandomTree(Object result, List<Object> inputNodes) throws Exception {
        // Level order rows like the input side; the clone check forbids
        // returning (part of) the input tree, and every random pointer
        // must land inside the returned tree.
        List<Object> rows = new ArrayList<>();
        if (result == null) {
            return rows;
        }
        Class<?> nodeClass = result.getClass();
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field left = nodeClass.getField("left");
        java.lang.reflect.Field right = nodeClass.getField("right");
        java.lang.reflect.Field random = nodeClass.getField("random");
        List<Object> order = new ArrayList<>();
        List<Object> queue = new ArrayList<>();
        queue.add(result);
        int index = 0;
        while (index < queue.size()) {
            Object node = queue.get(index++);
            if (node == null) {
                rows.add(null);
                order.add(null);
                continue;
            }
            if (order.contains(node)) {
                throw new IllegalArgumentException("Random tree repeats a node in level order");
            }
            rows.add(valField.getInt(node));
            order.add(node);
            queue.add(left.get(node));
            queue.add(right.get(node));
        }
        while (!rows.isEmpty() && rows.get(rows.size() - 1) == null) {
            rows.remove(rows.size() - 1);
            order.remove(order.size() - 1);
        }
        if (!inputNodes.isEmpty()) {
            for (Object node : order) {
                if (inputNodes.contains(node)) {
                    throw new IllegalArgumentException("Returned tree shares nodes with the input tree");
                }
            }
        }
        // Random indices address present nodes in level order — the same
        // convention the decode side uses — so placeholder slots shift
        // neither the numbering nor the walk below.
        List<Object> present = new ArrayList<>();
        for (Object node : order) {
            if (node != null) {
                present.add(node);
            }
        }
        List<Object> encoded = new ArrayList<>();
        for (Object node : order) {
            if (node == null) {
                encoded.add(null);
                continue;
            }
            Object target = random.get(node);
            Integer targetIndex = null;
            if (target != null) {
                for (int position = 0; position < present.size(); position++) {
                    if (present.get(position) == target) {
                        targetIndex = position;
                        break;
                    }
                }
                if (targetIndex == null) {
                    throw new IllegalArgumentException("Random pointer leaves the returned tree");
                }
            }
            List<Object> row = new ArrayList<>();
            row.add(valField.getInt(node));
            row.add(targetIndex);
            encoded.add(row);
        }
        return encoded;
    }

    @SuppressWarnings("unchecked")
    private static boolean specHasStruct(Object spec) {
        if (!(spec instanceof Map)) {
            return false;
        }
        Object kind = ((Map<String, Object>) spec).get("kind");
        if ("struct".equals(kind)) {
            return true;
        }
        if ("array".equals(kind)) {
            return specHasStruct(((Map<String, Object>) spec).get("items"));
        }
        return false;
    }

    private static Object decodeStruct(Object value, Object specValue) throws Exception {
        Map<String, Object> spec = asMap(specValue, "Struct spec must be an object");
        String kind = asString(spec.get("kind"), "Struct spec needs a kind");
        if ("struct".equals(kind)) {
            Class<?> cls = Class.forName(asString(spec.get("class"), "Struct spec needs a class"));
            List<Object> fields = asList(spec.getOrDefault("fields", List.of()), "Struct fields must be a list");
            List<Object> values = asList(value, "Struct values must be an array");
            if (values.size() != fields.size()) {
                throw new IllegalArgumentException("Expected " + fields.size() + " struct fields");
            }
            Class<?>[] ctorTypes = new Class<?>[fields.size()];
            for (int index = 0; index < fields.size(); index++) {
                Map<String, Object> field = asMap(fields.get(index), "Struct field must be an object");
                ctorTypes[index] = javaTypeOf(field.get("value_type"));
            }
            java.lang.reflect.Constructor<?> ctor;
            try {
                ctor = cls.getDeclaredConstructor(ctorTypes);
            } catch (NoSuchMethodException noExactCtor) {
                throw new IllegalArgumentException(
                    "Provided class " + cls.getName() + " needs a constructor matching its declared fields");
            }
            ctor.setAccessible(true);
            Object[] args = new Object[fields.size()];
            for (int index = 0; index < fields.size(); index++) {
                Map<String, Object> field = asMap(fields.get(index), "Struct field must be an object");
                args[index] = decodeStruct(values.get(index), field.get("value_type"));
            }
            return ctor.newInstance(args);
        }
        if ("array".equals(kind)) {
            List<Object> items = asList(value, "Struct array values must be an array");
            List<Object> decoded = new ArrayList<>();
            for (Object item : items) {
                decoded.add(decodeStruct(item, spec.get("items")));
            }
            return decoded;
        }
        // Leaf fields: the harness JSON parser hands back Long/Double/String,
        // while the provided class declares primitives — convert per kind.
        if ("integer".equals(kind)) {
            return numberValue(value).intValue();
        }
        if ("number".equals(kind)) {
            return numberValue(value).doubleValue();
        }
        if ("boolean".equals(kind)) {
            if (!(value instanceof Boolean flag)) {
                throw new IllegalArgumentException("Struct boolean field must be true or false");
            }
            return flag;
        }
        if ("string".equals(kind)) {
            if (!(value instanceof String text)) {
                throw new IllegalArgumentException("Struct string field must be a string");
            }
            return text;
        }
        throw new IllegalArgumentException("Struct field kind not supported: " + kind);
    }

    private static Class<?> javaTypeOf(Object specValue) {
        Map<String, Object> spec = asMap(specValue, "Field type must be an object");
        String kind = asString(spec.get("kind"), "Field type needs a kind");
        switch (kind) {
            case "integer":
                return int.class;
            case "number":
                return double.class;
            case "boolean":
                return boolean.class;
            case "string":
                return String.class;
            case "array":
                return java.util.List.class;
            default:
                throw new IllegalArgumentException("Struct field kind not supported: " + kind);
        }
    }

    private static Object decodeAliasList(Object value, Object aliasedHead) throws Exception {
        if (!(value instanceof Map)) {
            throw new IllegalArgumentException("alias_list input must carry values and splice_at");
        }
        Map<?, ?> spec = (Map<?, ?>) value;
        Object rawValues = spec.get("values");
        Object rawSplice = spec.get("splice_at");
        if (rawValues == null || !(rawSplice instanceof Number)) {
            throw new IllegalArgumentException("alias_list input must carry values and splice_at");
        }
        int spliceAt = ((Number) rawSplice).intValue();
        if (spliceAt < 0) {
            throw new IllegalArgumentException("alias_list splice_at must be non-negative");
        }
        Object target = aliasedHead;
        for (int index = 0; index < spliceAt; index++) {
            if (target == null) {
                throw new IllegalArgumentException("alias_list splice_at is past the aliased list");
            }
            target = fieldValue(target, "next");
        }
        if (rawValues == null || (rawValues instanceof List<?> && ((List<?>) rawValues).isEmpty())) {
            return target;
        }
        List<Object> values = asList(rawValues, "alias_list values must be an array");
        Class<?> nodeClass = wellKnownClass("ListNode");
        Constructor<?> ctor = scalarConstructor(nodeClass);
        java.lang.reflect.Field valField = nodeClass.getField("val");
        java.lang.reflect.Field nextField = nodeClass.getField("next");
        Object head = null;
        Object current = null;
        for (Object item : values) {
            Object node = newNode(ctor, valField, numberValue(item).intValue());
            if (current == null) {
                head = node;
            } else {
                nextField.set(current, node);
            }
            current = node;
        }
        nextField.set(current, target);
        return head;
    }

    private static List<Object> serializeAliasList(Object node, Object aliasedHead) {
        // A null return is the LC 160 no-intersection verdict.
        if (node == null) {
            return List.of();
        }
        for (Object current = aliasedHead; current != null; current = fieldValue(current, "next")) {
            if (current == node) {
                List<Object> values = new ArrayList<>();
                for (Object walk = node; walk != null; walk = fieldValue(walk, "next")) {
                    values.add(fieldValue(walk, "val"));
                }
                return values;
            }
        }
        throw new IllegalArgumentException("Returned node is not part of the aliased list");
    }

    private static Number numberValue(Object value) {
        if (value instanceof Number number) {
            return number;
        }
        throw new IllegalArgumentException("Expected a JSON number but found: " + value);
    }

    /** Per-method (parameter codecs, return codec) from the manifest. */
    private static Map<String, Object[]> methodCodecs(Map<String, Object> invocation) {
        Map<String, Object[]> table = new LinkedHashMap<>();
        Object declared = invocation.get("methods");
        if (!(declared instanceof List<?> methods)) {
            return table;
        }
        for (Object entry : methods) {
            if (!(entry instanceof Map<?, ?> method)) {
                continue;
            }
            List<String> parameterCodecs = new ArrayList<>();
            if (method.get("parameters") instanceof List<?> parameters) {
                for (Object parameter : parameters) {
                    String codec = "json";
                    if (parameter instanceof Map<?, ?> spec && spec.get("codec") != null) {
                        codec = spec.get("codec").toString();
                    }
                    parameterCodecs.add(codec);
                }
            }
            Object returnCodec = method.get("return_codec");
            table.put(
                asString(method.get("name"), "Method name must be a string"),
                new Object[] { parameterCodecs, returnCodec == null ? "json" : returnCodec.toString() }
            );
        }
        return table;
    }

    private static Object invokeDesign(
        Class<?> targetClass,
        Map<String, Object> invocation,
        Object rawInput
    ) throws Exception {
        Map<String, Object> designInput = asMap(rawInput, "Design input must be an object");
        List<Object> actions = asList(designInput.get("actions"), "Design actions must be a list");
        List<Object> params = asList(designInput.get("params"), "Design params must be a list");
        if (actions.isEmpty() || actions.size() != params.size()) {
            throw new IllegalArgumentException("Design actions and params must have the same non-zero length");
        }
        List<Object> constructorArguments = asList(params.get(0), "Constructor params must be a list");
        if (invocation.get("constructor") instanceof Map<?, ?> constructorSpec
            && constructorSpec.get("parameters") instanceof List<?> constructorParameters) {
            for (int slot = 0; slot < constructorArguments.size() && slot < constructorParameters.size(); slot++) {
                String codec = "json";
                if (constructorParameters.get(slot) instanceof Map<?, ?> spec && spec.get("codec") != null) {
                    codec = spec.get("codec").toString();
                }
                constructorArguments.set(slot, decodeCodec(constructorArguments.get(slot), codec));
            }
        }
        InvocationPlan<Constructor<?>> constructorPlan = findConstructor(targetClass, constructorArguments);
        Object instance;
        try {
            instance = constructorPlan.executable().newInstance(constructorPlan.arguments());
        } catch (InvocationTargetException error) {
            throw propagate(error.getTargetException());
        }

        // Named instances ({"new": handle} actions) live here for the whole
        // replay; $ref arguments and "on" targets resolve through it. The
        // primary instance from params[0] is registered when actions[0]
        // names it, and stays the default target otherwise.
        Map<String, Object> instances = new LinkedHashMap<>();
        String primaryHandle = null;
        Object primary = instance;
        if (actions.get(0) instanceof Map<?, ?> firstAction && firstAction.get("new") != null) {
            primaryHandle = asString(firstAction.get("new"), "Design new action needs a string handle");
            instances.put(primaryHandle, primary);
        }
        Map<String, Object[]> codecs = methodCodecs(invocation);
        Map<String, List<String>> parameterKinds = methodParameterKinds(invocation);
        List<Object> output = new ArrayList<>();
        output.add(null);
        // Raw (undecoded, unencoded) returns feed piped arguments, so a piped
        // value crosses methods as the live object rather than its wire form.
        List<Object> rawOutput = new ArrayList<>();
        rawOutput.add(null);
        for (int index = 1; index < actions.size(); index++) {
            Object actionSpec = actions.get(index);
            // A {"new": handle} action constructs another instance of the
            // design class from this step's params row; constructors return
            // nothing, so the recorded slot is null.
            if (actionSpec instanceof Map<?, ?> newAction && newAction.get("new") != null) {
                String handle = asString(newAction.get("new"), "Design new action needs a string handle");
                if (instances.containsKey(handle)) {
                    throw new IllegalArgumentException("Duplicate design instance handle " + handle);
                }
                List<Object> row = asList(params.get(index), "Constructor params must be a list");
                decodeConstructorRow(invocation, row);
                InvocationPlan<Constructor<?>> plan = findConstructor(targetClass, row);
                Object built;
                try {
                    built = plan.executable().newInstance(plan.arguments());
                } catch (InvocationTargetException error) {
                    throw propagate(error.getTargetException());
                }
                instances.put(handle, built);
                output.add(null);
                rawOutput.add(null);
                continue;
            }
            String methodName;
            int repeat = 1;
            Object target = primary;
            // A repeated action ({"call": name, "repeat": K, "on": handle})
            // is a randomized method under statistical judging: invoke K
            // times, report the frequency table keyed by the canonical JSON
            // of each value.
            if (actionSpec instanceof Map<?, ?> actionMap) {
                methodName = asString(actionMap.get("call"), "Repeated action needs a call name");
                Object repeatSpec = actionMap.get("repeat");
                if (repeatSpec != null) {
                    repeat = numberValue(repeatSpec).intValue();
                }
                if (actionMap.get("on") != null) {
                    String handle = asString(actionMap.get("on"), "Design on action needs a string handle");
                    target = instances.get(handle);
                    if (target == null) {
                        throw new IllegalArgumentException("Unknown design instance handle " + handle);
                    }
                }
            } else {
                methodName = asString(actions.get(index), "Design action must be a string");
            }
            Object[] methodCodec = codecs.getOrDefault(methodName, new Object[] { List.of(), "json" });
            @SuppressWarnings("unchecked")
            List<String> parameterCodecs = (List<String>) methodCodec[0];
            String returnCodec = methodCodec[1].toString();
            List<String> kinds = parameterKinds.getOrDefault(methodName, List.of());
            List<Object> methodArguments = asList(params.get(index), "Method params must be a list");
            for (int slot = 0; slot < methodArguments.size(); slot++) {
                Object argument = methodArguments.get(slot);
                boolean expectsInstance = slot < kinds.size() && "instance".equals(kinds.get(slot));
                boolean isReference = argument instanceof Map<?, ?> reference
                    && reference.size() == 1 && reference.get("$ref") instanceof String;
                if (isReference || expectsInstance) {
                    if (!isReference || !expectsInstance) {
                        throw new IllegalArgumentException(
                            "Design action " + index + " parameter " + (slot + 1)
                                + ": {\"$ref\": handle} instance references are only valid on an instance parameter"
                        );
                    }
                    String handle = (String) ((Map<?, ?>) argument).get("$ref");
                    Object referenced = instances.get(handle);
                    if (referenced == null) {
                        throw new IllegalArgumentException("Unknown design instance handle " + handle);
                    }
                    methodArguments.set(slot, referenced);
                } else if (argument instanceof Map<?, ?> pipe && pipe.size() == 1 && pipe.get("$prev") != null) {
                    // {"$prev": i} feeds action i's own return value straight
                    // back in, so a round-trip pair is judged without pinning
                    // the intermediate format.
                    methodArguments.set(slot, rawOutput.get(numberValue(pipe.get("$prev")).intValue()));
                } else if (slot < parameterCodecs.size()) {
                    methodArguments.set(slot, decodeCodec(argument, parameterCodecs.get(slot)));
                }
            }
            InvocationPlan<Method> methodPlan = findMethod(targetClass, methodName, methodArguments);
            if (repeat <= 1) {
                Object value;
                try {
                    value = methodPlan.executable().invoke(target, methodPlan.arguments());
                } catch (InvocationTargetException error) {
                    throw propagate(error.getTargetException());
                }
                rawOutput.add(value);
                output.add(encodeCodec(value, returnCodec));
                continue;
            }
            Map<String, Integer> counts = new LinkedHashMap<>();
            Object last = null;
            for (int draw = 0; draw < repeat; draw++) {
                try {
                    last = methodPlan.executable().invoke(target, methodPlan.arguments());
                } catch (InvocationTargetException error) {
                    throw propagate(error.getTargetException());
                }
                String key = Json.stringify(encodeCodec(last, returnCodec));
                counts.merge(key, 1, Integer::sum);
            }
            rawOutput.add(last);
            output.add(counts);
        }
        return output;
    }

    /** Per-method parameter kinds from the manifest, so an "instance"
     * parameter (another live object of the design class) is recognized
     * while decoding a method row. */
    private static Map<String, List<String>> methodParameterKinds(Map<String, Object> invocation) {
        Map<String, List<String>> table = new LinkedHashMap<>();
        if (!(invocation.get("methods") instanceof List<?> methods)) {
            return table;
        }
        for (Object entry : methods) {
            if (!(entry instanceof Map<?, ?> method)) {
                continue;
            }
            List<String> kinds = new ArrayList<>();
            if (method.get("parameters") instanceof List<?> parameters) {
                for (Object parameter : parameters) {
                    String kind = "json";
                    if (parameter instanceof Map<?, ?> spec
                        && spec.get("value_type") instanceof Map<?, ?> value
                        && value.get("kind") != null) {
                        kind = value.get("kind").toString();
                    }
                    kinds.add(kind);
                }
            }
            table.put(asString(method.get("name"), "Method name must be a string"), kinds);
        }
        return table;
    }

    /** Decode one {"new": handle} constructor row in place through the
     * constructor's declared codecs (same rule as params[0]). */
    private static void decodeConstructorRow(Map<String, Object> invocation, List<Object> row) throws Exception {
        if (!(invocation.get("constructor") instanceof Map<?, ?> constructorSpec)
            || !(constructorSpec.get("parameters") instanceof List<?> constructorParameters)) {
            return;
        }
        for (int slot = 0; slot < row.size() && slot < constructorParameters.size(); slot++) {
            String codec = "json";
            if (constructorParameters.get(slot) instanceof Map<?, ?> spec && spec.get("codec") != null) {
                codec = spec.get("codec").toString();
            }
            row.set(slot, decodeCodec(row.get(slot), codec));
        }
    }

    private static InvocationPlan<Method> findMethod(
        Class<?> targetClass,
        String name,
        List<Object> rawArguments
    ) {
        IllegalArgumentException lastConversionError = null;
        for (Method method : targetClass.getDeclaredMethods()) {
            if (!method.getName().equals(name) || method.getParameterCount() != rawArguments.size()) {
                continue;
            }
            try {
                method.setAccessible(true);
                return new InvocationPlan<>(method, convertArguments(method, rawArguments));
            } catch (IllegalArgumentException error) {
                lastConversionError = error;
            }
        }
        if (lastConversionError != null) {
            throw lastConversionError;
        }
        throw new IllegalArgumentException("No matching method " + name + " with " + rawArguments.size() + " arguments");
    }

    private static InvocationPlan<Constructor<?>> findConstructor(
        Class<?> targetClass,
        List<Object> rawArguments
    ) {
        IllegalArgumentException lastConversionError = null;
        for (Constructor<?> constructor : targetClass.getDeclaredConstructors()) {
            if (constructor.getParameterCount() != rawArguments.size()) {
                continue;
            }
            try {
                constructor.setAccessible(true);
                return new InvocationPlan<>(constructor, convertArguments(constructor, rawArguments));
            } catch (IllegalArgumentException error) {
                lastConversionError = error;
            }
        }
        if (lastConversionError != null) {
            throw lastConversionError;
        }
        throw new IllegalArgumentException("No matching constructor with " + rawArguments.size() + " arguments");
    }

    private static Object[] convertArguments(Executable executable, List<Object> rawArguments) {
        Class<?>[] parameterTypes = executable.getParameterTypes();
        Type[] genericTypes = executable.getGenericParameterTypes();
        Object[] converted = new Object[rawArguments.size()];
        for (int index = 0; index < rawArguments.size(); index++) {
            converted[index] = convert(rawArguments.get(index), parameterTypes[index], genericTypes[index]);
        }
        return converted;
    }

    private static Object convert(Object value, Class<?> targetType, Type genericType) {
        if (value == null) {
            if (targetType.isPrimitive()) {
                throw new IllegalArgumentException("null cannot be converted to " + targetType.getName());
            }
            return null;
        }
        if (targetType == Object.class || targetType.isInstance(value)) {
            return value;
        }
        if (targetType == String.class) {
            if (!(value instanceof String)) throw conversionError(value, targetType);
            return value;
        }
        if (targetType == char.class || targetType == Character.class) {
            if (value instanceof String text && text.length() == 1) return text.charAt(0);
            throw conversionError(value, targetType);
        }
        if (targetType == boolean.class || targetType == Boolean.class) {
            if (value instanceof Boolean) return value;
            throw conversionError(value, targetType);
        }
        if (value instanceof Number number) {
            if (targetType == byte.class || targetType == Byte.class) return number.byteValue();
            if (targetType == short.class || targetType == Short.class) return number.shortValue();
            if (targetType == int.class || targetType == Integer.class) return Math.toIntExact(number.longValue());
            if (targetType == long.class || targetType == Long.class) return number.longValue();
            if (targetType == float.class || targetType == Float.class) return number.floatValue();
            if (targetType == double.class || targetType == Double.class) return number.doubleValue();
        }
        if (targetType.isArray()) {
            List<Object> values = asList(value, "Array argument must be a JSON array");
            Class<?> componentType = targetType.getComponentType();
            Object array = Array.newInstance(componentType, values.size());
            for (int index = 0; index < values.size(); index++) {
                Array.set(array, index, convert(values.get(index), componentType, componentType));
            }
            return array;
        }
        if (Collection.class.isAssignableFrom(targetType)) {
            List<Object> values = asList(value, "Collection argument must be a JSON array");
            Collection<Object> collection = Set.class.isAssignableFrom(targetType)
                ? new LinkedHashSet<>()
                : new ArrayList<>();
            Type elementType = Object.class;
            if (genericType instanceof ParameterizedType parameterized) {
                elementType = parameterized.getActualTypeArguments()[0];
            }
            Class<?> elementClass = rawClass(elementType);
            for (Object item : values) {
                collection.add(convert(item, elementClass, elementType));
            }
            return collection;
        }
        if (Map.class.isAssignableFrom(targetType)) {
            Map<String, Object> values = asMap(value, "Map argument must be a JSON object");
            return new LinkedHashMap<>(values);
        }
        if (targetType.isEnum() && value instanceof String text) {
            @SuppressWarnings({"unchecked", "rawtypes"})
            Object constant = Enum.valueOf((Class<? extends Enum>) targetType, text);
            return constant;
        }
        throw conversionError(value, targetType);
    }

    private static Class<?> rawClass(Type type) {
        if (type instanceof Class<?> clazz) return clazz;
        if (type instanceof ParameterizedType parameterized && parameterized.getRawType() instanceof Class<?> clazz) {
            return clazz;
        }
        return Object.class;
    }

    private static IllegalArgumentException conversionError(Object value, Class<?> targetType) {
        return new IllegalArgumentException("Cannot convert " + value.getClass().getSimpleName() + " to " + targetType.getTypeName());
    }

    private static RuntimeException propagate(Throwable error) {
        if (error instanceof RuntimeException runtime) return runtime;
        if (error instanceof Error serious) throw serious;
        return new RuntimeException(error);
    }

    private static Throwable unwrap(Throwable error) {
        Throwable current = error;
        while (current instanceof InvocationTargetException invocation && invocation.getTargetException() != null) {
            current = invocation.getTargetException();
        }
        return current;
    }

    private static String boundedError(Throwable error) {
        String message = error.getMessage();
        String text = error.getClass().getSimpleName() + (message == null || message.isBlank() ? "" : ": " + message);
        return text.length() <= 4096 ? text : text.substring(0, 4096);
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> asMap(Object value, String message) {
        if (!(value instanceof Map<?, ?> map)) throw new IllegalArgumentException(message);
        return (Map<String, Object>) map;
    }

    @SuppressWarnings("unchecked")
    private static List<Object> asList(Object value, String message) {
        if (!(value instanceof List<?> list)) throw new IllegalArgumentException(message);
        return (List<Object>) list;
    }

    private static String asString(Object value, String message) {
        if (!(value instanceof String text)) throw new IllegalArgumentException(message);
        return text;
    }

    private record InvocationPlan<T extends Executable>(T executable, Object[] arguments) {}

    private static final class CappedOutputStream extends OutputStream {
        private final ByteArrayOutputStream delegate = new ByteArrayOutputStream();
        private final int limit;

        private CappedOutputStream(int limit) {
            this.limit = limit;
        }

        @Override
        public void write(int value) {
            if (delegate.size() < limit) delegate.write(value);
        }

        @Override
        public void write(byte[] bytes, int offset, int length) {
            int remaining = limit - delegate.size();
            if (remaining > 0) delegate.write(bytes, offset, Math.min(length, remaining));
        }

        private String asString() {
            return delegate.toString(StandardCharsets.UTF_8);
        }
    }

    private static final class Json {
        private Json() {}

        static Object parse(String text) {
            Parser parser = new Parser(text);
            Object value = parser.parseValue();
            parser.skipWhitespace();
            if (!parser.atEnd()) throw new IllegalArgumentException("Unexpected trailing JSON data");
            return value;
        }

        static String stringify(Object value) {
            StringBuilder output = new StringBuilder();
            writeValue(output, value);
            return output.toString();
        }

        private static void writeValue(StringBuilder output, Object value) {
            if (value == null) {
                output.append("null");
            } else if (value instanceof String text) {
                writeString(output, text);
            } else if (value instanceof Character character) {
                writeString(output, character.toString());
            } else if (value instanceof Boolean || value instanceof Byte || value instanceof Short
                || value instanceof Integer || value instanceof Long) {
                output.append(value);
            } else if (value instanceof Float number) {
                if (!Float.isFinite(number)) throw new IllegalArgumentException("Non-finite number cannot be serialized");
                output.append(number);
            } else if (value instanceof Double number) {
                if (!Double.isFinite(number)) throw new IllegalArgumentException("Non-finite number cannot be serialized");
                output.append(number);
            } else if (value.getClass().isArray()) {
                output.append('[');
                for (int index = 0; index < Array.getLength(value); index++) {
                    if (index > 0) output.append(',');
                    writeValue(output, Array.get(value, index));
                }
                output.append(']');
            } else if (value instanceof Iterable<?> items) {
                output.append('[');
                boolean first = true;
                for (Object item : items) {
                    if (!first) output.append(',');
                    first = false;
                    writeValue(output, item);
                }
                output.append(']');
            } else if (value instanceof Map<?, ?> map) {
                output.append('{');
                boolean first = true;
                for (Map.Entry<?, ?> entry : map.entrySet()) {
                    if (!(entry.getKey() instanceof String key)) {
                        throw new IllegalArgumentException("JSON object keys must be strings");
                    }
                    if (!first) output.append(',');
                    first = false;
                    writeString(output, key);
                    output.append(':');
                    writeValue(output, entry.getValue());
                }
                output.append('}');
            } else {
                throw new IllegalArgumentException("Unsupported return type: " + value.getClass().getTypeName());
            }
        }

        private static void writeString(StringBuilder output, String text) {
            output.append('"');
            for (int index = 0; index < text.length(); index++) {
                char character = text.charAt(index);
                switch (character) {
                    case '"' -> output.append("\\\"");
                    case '\\' -> output.append("\\\\");
                    case '\b' -> output.append("\\b");
                    case '\f' -> output.append("\\f");
                    case '\n' -> output.append("\\n");
                    case '\r' -> output.append("\\r");
                    case '\t' -> output.append("\\t");
                    default -> {
                        if (character < 0x20) output.append(String.format("\\u%04x", (int) character));
                        else output.append(character);
                    }
                }
            }
            output.append('"');
        }

        private static final class Parser {
            private final String text;
            private int position;

            private Parser(String text) {
                this.text = text;
            }

            private Object parseValue() {
                skipWhitespace();
                if (atEnd()) throw error("Unexpected end of JSON");
                return switch (text.charAt(position)) {
                    case 'n' -> parseLiteral("null", null);
                    case 't' -> parseLiteral("true", true);
                    case 'f' -> parseLiteral("false", false);
                    case '"' -> parseString();
                    case '[' -> parseArray();
                    case '{' -> parseObject();
                    default -> parseNumber();
                };
            }

            private Object parseLiteral(String literal, Object value) {
                if (!text.startsWith(literal, position)) throw error("Invalid JSON literal");
                position += literal.length();
                return value;
            }

            private List<Object> parseArray() {
                position++;
                List<Object> values = new ArrayList<>();
                skipWhitespace();
                if (consume(']')) return values;
                while (true) {
                    values.add(parseValue());
                    skipWhitespace();
                    if (consume(']')) return values;
                    require(',');
                }
            }

            private Map<String, Object> parseObject() {
                position++;
                Map<String, Object> values = new LinkedHashMap<>();
                skipWhitespace();
                if (consume('}')) return values;
                while (true) {
                    skipWhitespace();
                    if (atEnd() || text.charAt(position) != '"') throw error("JSON object key must be a string");
                    String key = parseString();
                    skipWhitespace();
                    require(':');
                    values.put(key, parseValue());
                    skipWhitespace();
                    if (consume('}')) return values;
                    require(',');
                }
            }

            private String parseString() {
                require('"');
                StringBuilder value = new StringBuilder();
                while (!atEnd()) {
                    char character = text.charAt(position++);
                    if (character == '"') return value.toString();
                    if (character != '\\') {
                        if (character < 0x20) throw error("Control character in JSON string");
                        value.append(character);
                        continue;
                    }
                    if (atEnd()) throw error("Unterminated JSON escape");
                    char escape = text.charAt(position++);
                    switch (escape) {
                        case '"', '\\', '/' -> value.append(escape);
                        case 'b' -> value.append('\b');
                        case 'f' -> value.append('\f');
                        case 'n' -> value.append('\n');
                        case 'r' -> value.append('\r');
                        case 't' -> value.append('\t');
                        case 'u' -> value.append(parseUnicode());
                        default -> throw error("Invalid JSON escape");
                    }
                }
                throw error("Unterminated JSON string");
            }

            private char parseUnicode() {
                if (position + 4 > text.length()) throw error("Incomplete Unicode escape");
                try {
                    int codePoint = Integer.parseInt(text.substring(position, position + 4), 16);
                    position += 4;
                    return (char) codePoint;
                } catch (NumberFormatException invalidNumber) {
                    throw error("Invalid Unicode escape");
                }
            }

            private Number parseNumber() {
                int start = position;
                if (consume('-')) {}
                if (consume('0')) {
                    // A single leading zero is valid; further digits are rejected below.
                } else {
                    requireDigit();
                    while (!atEnd() && Character.isDigit(text.charAt(position))) position++;
                }
                boolean decimal = false;
                if (consume('.')) {
                    decimal = true;
                    requireDigit();
                    while (!atEnd() && Character.isDigit(text.charAt(position))) position++;
                }
                if (!atEnd() && (text.charAt(position) == 'e' || text.charAt(position) == 'E')) {
                    decimal = true;
                    position++;
                    if (!atEnd() && (text.charAt(position) == '+' || text.charAt(position) == '-')) position++;
                    requireDigit();
                    while (!atEnd() && Character.isDigit(text.charAt(position))) position++;
                }
                String token = text.substring(start, position);
                try {
                    return decimal ? Double.parseDouble(token) : Long.parseLong(token);
                } catch (NumberFormatException invalidNumber) {
                    throw error("Invalid JSON number");
                }
            }

            private void requireDigit() {
                if (atEnd() || !Character.isDigit(text.charAt(position))) throw error("Expected a digit");
                position++;
            }

            private void require(char expected) {
                skipWhitespace();
                if (!consume(expected)) throw error("Expected '" + expected + "'");
            }

            private boolean consume(char expected) {
                if (!atEnd() && text.charAt(position) == expected) {
                    position++;
                    return true;
                }
                return false;
            }

            private void skipWhitespace() {
                while (!atEnd() && Character.isWhitespace(text.charAt(position))) position++;
            }

            private boolean atEnd() {
                return position >= text.length();
            }

            private IllegalArgumentException error(String message) {
                return new IllegalArgumentException(message + " at character " + position);
            }
        }
    }
}
