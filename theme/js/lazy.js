/*! lazy.js 0.4.2 (c)2015 Dan Tao @license MIT */ ! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.Lazy = t()
}(this, function(context) {
    function Lazy(e) {
        if (e instanceof Array) return new ArrayWrapper(e);
        if ("string" == typeof e) return new StringWrapper(e);
        if (e instanceof Sequence) return e;
        if (Lazy.extensions) {
            for (var t, n = Lazy.extensions, r = n.length; !t && r--;) t = n[r](e);
            if (t) return t
        }
        return new ObjectWrapper(e)
    }

    function Sequence() {}

    function Iterator(e) {
        this.sequence = e, this.index = -1
    }

    function MemoizedSequence(e) {
        this.parent = e
    }

    function MappedSequence(e, t) {
        this.parent = e, this.mapFn = t
    }

    function MappingIterator(e, t) {
        this.iterator = e.getIterator(), this.mapFn = t, this.index = -1
    }

    function FilteredSequence(e, t) {
        this.parent = e, this.filterFn = t
    }

    function FilteringIterator(e, t) {
        this.iterator = e.getIterator(), this.filterFn = t, this.index = 0
    }

    function ReversedSequence(e) {
        this.parent = e
    }

    function ReversedIterator(e) {
        this.sequence = e
    }

    function ConcatenatedSequence(e, t) {
        this.parent = e, this.arrays = t
    }

    function TakeSequence(e, t) {
        this.parent = e, this.count = t
    }

    function TakeIterator(e, t) {
        this.iterator = e.getIterator(), this.count = t
    }

    function TakeWhileSequence(e, t) {
        this.parent = e, this.predicate = t
    }

    function InitialSequence(e, t) {
        this.parent = e, this.count = "number" == typeof t ? t : 1
    }

    function DropSequence(e, t) {
        this.parent = e, this.count = "number" == typeof t ? t : 1
    }

    function DropWhileSequence(e, t) {
        this.parent = e, this.predicate = t
    }

    function SortedSequence(e, t) {
        this.parent = e, this.sortFn = t
    }

    function GroupedSequence(e, t, n) {
        this.parent = e, this.keyFn = t, this.valFn = n
    }

    function IndexedSequence(e, t, n) {
        this.parent = e, this.keyFn = t, this.valFn = n
    }

    function CountedSequence(e, t) {
        this.parent = e, this.keyFn = t
    }

    function UniqueSequence(e, t) {
        this.parent = e, this.keyFn = t
    }

    function ZippedSequence(e, t) {
        this.parent = e, this.arrays = t
    }

    function ShuffledSequence(e) {
        this.parent = e
    }

    function FlattenedSequence(e) {
        this.parent = e
    }

    function WithoutSequence(e, t) {
        this.parent = e, this.values = t
    }

    function IntersectionSequence(e, t) {
        this.parent = e, this.arrays = t
    }

    function UniqueMemoizer(e) {
        this.iterator = e, this.set = new Set, this.memo = [], this.currentValue = void 0
    }

    function ChunkedSequence(e, t) {
        this.parent = e, this.chunkSize = t
    }

    function ChunkedIterator(e, t) {
        this.iterator = e.getIterator(), this.size = t
    }

    function TappedSequence(e, t) {
        this.parent = e, this.callback = t
    }

    function SimpleIntersectionSequence(e, t) {
        this.parent = e, this.array = t, this.each = getEachForIntersection(t)
    }

    function getEachForIntersection(e) {
        return e.length < 40 ? SimpleIntersectionSequence.prototype.eachArrayCache : SimpleIntersectionSequence.prototype.eachMemoizerCache
    }

    function SimpleZippedSequence(e, t) {
        this.parent = e, this.array = t
    }

    function ArrayLikeSequence() {}

    function IndexedIterator(e) {
        this.sequence = e, this.index = -1
    }

    function IndexedMappedSequence(e, t) {
        this.parent = e, this.mapFn = t
    }

    function IndexedFilteredSequence(e, t) {
        this.parent = e, this.filterFn = t
    }

    function IndexedReversedSequence(e) {
        this.parent = e
    }

    function IndexedTakeSequence(e, t) {
        this.parent = e, this.count = t
    }

    function IndexedDropSequence(e, t) {
        this.parent = e, this.count = "number" == typeof t ? t : 1
    }

    function IndexedConcatenatedSequence(e, t) {
        this.parent = e, this.other = t
    }

    function IndexedUniqueSequence(e, t) {
        this.parent = e, this.each = getEachForParent(e), this.keyFn = t
    }

    function getEachForParent(e) {
        return e.length() < 100 ? IndexedUniqueSequence.prototype.eachArrayCache : UniqueSequence.prototype.each
    }

    function ArrayWrapper(e) {
        this.source = e
    }

    function MappedArrayWrapper(e, t) {
        this.parent = e, this.mapFn = t
    }

    function FilteredArrayWrapper(e, t) {
        this.parent = e, this.filterFn = t
    }

    function UniqueArrayWrapper(e, t) {
        this.parent = e, this.each = getEachForSource(e.source), this.keyFn = t
    }

    function getEachForSource(e) {
        return e.length < 40 ? UniqueArrayWrapper.prototype.eachNoCache : e.length < 100 ? UniqueArrayWrapper.prototype.eachArrayCache : UniqueArrayWrapper.prototype.eachSetCache
    }

    function ConcatArrayWrapper(e, t) {
        this.parent = e, this.other = t
    }

    function ObjectLikeSequence() {}

    function FilteredObjectLikeSequence(e, t) {
        this.parent = e, this.filterFn = t
    }

    function AssignSequence(e, t) {
        this.parent = e, this.other = t
    }

    function DefaultsSequence(e, t) {
        this.parent = e, this.defaults = t
    }

    function InvertedSequence(e) {
        this.parent = e
    }

    function MergedSequence(e, t, n) {
        this.parent = e, this.others = t, this.mergeFn = n
    }

    function mergeObjects(e, t) {
        var n, r;
        if ("undefined" == typeof t) return e;
        if (isVanillaObject(e) && isVanillaObject(t)) n = {};
        else {
            if (!(e instanceof Array && t instanceof Array)) return t;
            n = []
        }
        for (r in e) n[r] = mergeObjects(e[r], t[r]);
        for (r in t) n[r] || (n[r] = t[r]);
        return n
    }

    function isVanillaObject(e) {
        return e && e.constructor === Object
    }

    function PickSequence(e, t) {
        this.parent = e, this.properties = t
    }

    function OmitSequence(e, t) {
        this.parent = e, this.properties = t
    }

    function ObjectWrapper(e) {
        this.source = e
    }

    function StringLikeSequence() {}

    function CharIterator(e) {
        this.source = Lazy(e), this.index = -1
    }

    function StringSegment(e, t, n) {
        this.parent = e, this.start = Math.max(0, t), this.stop = n
    }

    function MappedStringLikeSequence(e, t) {
        this.parent = e, this.mapFn = t
    }

    function ReversedStringLikeSequence(e) {
        this.parent = e
    }

    function StringMatchSequence(e, t) {
        this.parent = e, this.pattern = t
    }

    function StringMatchIterator(e, t) {
        this.source = e, this.pattern = cloneRegex(t)
    }

    function SplitStringSequence(e, t) {
        this.parent = e, this.pattern = t
    }

    function SplitWithRegExpIterator(e, t) {
        this.source = e, this.pattern = cloneRegex(t)
    }

    function SplitWithStringIterator(e, t) {
        this.source = e, this.delimiter = t
    }

    function StringWrapper(e) {
        this.source = e
    }

    function GeneratedSequence(e, t) {
        this.get = e, this.fixedLength = t
    }

    function GeneratedIterator(e) {
        this.sequence = e, this.index = 0, this.currentValue = null
    }

    function AsyncSequence(e, t) {
        if (e instanceof AsyncSequence) throw new Error("Sequence is already asynchronous!");
        this.parent = e, this.interval = t, this.onNextCallback = getOnNextCallback(t), this.cancelCallback = getCancelCallback(t)
    }

    function AsyncHandle(e) {
        this.resolveListeners = [], this.rejectListeners = [], this.state = PENDING, this.cancelFn = e
    }

    function resolve(e, t) {
        if (e === t) return void e._reject(new TypeError("Cannot resolve a promise to itself"));
        if (t instanceof AsyncHandle) return void t.then(function(t) {
            resolve(e, t)
        }, function(t) {
            e._reject(t)
        });
        var n;
        try {
            n = /function|object/.test(typeof t) && null != t && t.then
        } catch (r) {
            return void e._reject(r)
        }
        var i = PENDING;
        if ("function" != typeof n) e._resolve(t);
        else try {
            n.call(t, function(t) {
                i === PENDING && (i = RESOLVED, resolve(e, t))
            }, function(t) {
                i === PENDING && (i = REJECTED, e._reject(t))
            })
        } catch (r) {
            if (i !== PENDING) return;
            e._reject(r)
        }
    }

    function consumeListeners(e, t, n) {
        n || (n = getOnNextCallback()), n(function() {
            e.length > 0 && (e.shift()(t), consumeListeners(e, t, n))
        })
    }

    function getOnNextCallback(e) {
        return "undefined" == typeof e && "function" == typeof setImmediate ? setImmediate : (e = e || 0, function(t) {
            return setTimeout(t, e)
        })
    }

    function getCancelCallback(e) {
        return "undefined" == typeof e && "function" == typeof clearImmediate ? clearImmediate : clearTimeout
    }

    function transform(e, t) {
        return t instanceof AsyncHandle ? t.then(function() {
            e(t)
        }) : e(t)
    }

    function WatchedPropertySequence(e, t) {
        this.listeners = [], t ? t instanceof Array || (t = [t]) : t = Lazy(e).keys().toArray();
        var n = this.listeners,
            r = 0;
        Lazy(t).each(function(t) {
            var i = e[t];
            Object.defineProperty(e, t, {
                get: function() {
                    return i
                },
                set: function(e) {
                    for (var o = n.length - 1; o >= 0; --o) n[o]({
                        property: t,
                        value: e
                    }, r) === !1 && n.splice(o, 1);
                    i = e, ++r
                }
            })
        })
    }

    function StreamLikeSequence() {}

    function SplitStreamSequence(e, t) {
        this.parent = e, this.delimiter = t, this.each = this.getEachForDelimiter(t)
    }

    function MatchedStreamSequence(e, t) {
        this.parent = e, this.pattern = cloneRegex(t)
    }

    function createCallback(e, t) {
        switch (typeof e) {
            case "function":
                return e;
            case "string":
                return function(t) {
                    return t[e]
                };
            case "object":
                return function(t) {
                    return Lazy(e).all(function(e, n) {
                        return t[n] === e
                    })
                };
            case "undefined":
                return t ? function() {
                    return t
                } : Lazy.identity;
            default:
                throw new Error("Don't know how to make a callback from a " + typeof e + "!")
        }
    }

    function createComparator(e) {
        return e ? (e = createCallback(e), function(t, n) {
            return compare(e(t), e(n))
        }) : compare
    }

    function reverseArguments(e) {
        return function(t, n) {
            return e(n, t)
        }
    }

    function createSet(e) {
        var t = new Set;
        return Lazy(e || []).flatten().each(function(e) {
            t.add(e)
        }), t
    }

    function compare(e, t) {
        return e === t ? 0 : e > t ? 1 : -1
    }

    function forEach(e, t) {
        for (var n = -1, r = e.length; ++n < r;)
            if (t(e[n], n) === !1) return !1;
        return !0
    }

    function getFirst(e) {
        var t;
        return e.each(function(e) {
            return t = e, !1
        }), t
    }

    function arrayContains(e, t) {
        var n = -1,
            r = e.length;
        if (t !== t) {
            for (; ++n < r;)
                if (e[n] !== e[n]) return !0;
            return !1
        }
        for (; ++n < r;)
            if (e[n] === t) return !0;
        return !1
    }

    function arrayContainsBefore(e, t, n, r) {
        var i = -1;
        if (r) {
            for (r = createCallback(r); ++i < n;)
                if (r(e[i]) === r(t)) return !0
        } else
            for (; ++i < n;)
                if (e[i] === t) return !0; return !1
    }

    function swap(e, t, n) {
        var r = e[t];
        e[t] = e[n], e[n] = r
    }

    function cloneRegex(pattern) {
        return eval("" + pattern + (pattern.global ? "" : "g"))
    }

    function Set() {
        this.table = {}, this.objects = []
    }

    function Queue(e) {
        this.contents = new Array(e), this.start = 0, this.count = 0
    }

    function defineSequenceType(e, t, n) {
        var r = function() {};
        r.prototype = new e;
        for (var i in n) r.prototype[i] = n[i];
        for (var o = function() {
            var e = new r;
            return e.parent = this, e.init && e.init.apply(e, arguments), e
        }, u = "string" == typeof t ? [t] : t, c = 0; c < u.length; ++c) e.prototype[u[c]] = o;
        return r
    }
    Lazy.VERSION = "0.4.2", Lazy.noop = function() {}, Lazy.identity = function(e) {
        return e
    }, Lazy.strict = function() {
        function e(e) {
            if (null == e) throw new Error("You cannot wrap null or undefined using Lazy.");
            if ("number" == typeof e || "boolean" == typeof e) throw new Error("You cannot wrap primitive values using Lazy.");
            return Lazy(e)
        }
        return Lazy(Lazy).each(function(t, n) {
            e[n] = t
        }), e
    }, Sequence.define = function(e, t) {
        if (!t || !t.getIterator && !t.each) throw new Error("A custom sequence must implement *at least* getIterator or each!");
        return defineSequenceType(Sequence, e, t)
    }, Sequence.prototype.size = function() {
        return this.getIndex().length()
    }, Sequence.prototype.getIterator = function() {
        return new Iterator(this)
    }, Sequence.prototype.root = function() {
        return this.parent.root()
    }, Sequence.prototype.isAsync = function() {
        return this.parent ? this.parent.isAsync() : !1
    }, Sequence.prototype.value = function() {
        return this.toArray()
    }, Sequence.prototype.apply = function(e) {
        var t, n = this.root(),
            r = n.source;
        try {
            n.source = e, t = this.value()
        } finally {
            n.source = r
        }
        return t
    }, Iterator.prototype.current = function() {
        return this.cachedIndex && this.cachedIndex.get(this.index)
    }, Iterator.prototype.moveNext = function() {
        var e = this.cachedIndex;
        return e || (e = this.cachedIndex = this.sequence.getIndex()), this.index >= e.length() - 1 ? !1 : (++this.index, !0)
    }, Sequence.prototype.toArray = function() {
        return this.reduce(function(e, t) {
            return e.push(t), e
        }, [])
    }, Sequence.prototype.getIndex = function() {
        return new ArrayWrapper(this.toArray())
    }, Sequence.prototype.get = function(e) {
        var t;
        return this.each(function(n, r) {
            return r === e ? (t = n, !1) : void 0
        }), t
    }, Sequence.prototype.memoize = function() {
        return new MemoizedSequence(this)
    }, Sequence.prototype.toObject = function() {
        return this.reduce(function(e, t) {
            return e[t[0]] = t[1], e
        }, {})
    }, Sequence.prototype.each = function(e) {
        for (var t = this.getIterator(), n = -1; t.moveNext();)
            if (e(t.current(), ++n) === !1) return !1;
        return !0
    }, Sequence.prototype.forEach = function(e) {
        return this.each(e)
    }, Sequence.prototype.map = function(e) {
        return new MappedSequence(this, createCallback(e))
    }, Sequence.prototype.collect = function(e) {
        return this.map(e)
    }, MappedSequence.prototype = new Sequence, MappedSequence.prototype.getIterator = function() {
        return new MappingIterator(this.parent, this.mapFn)
    }, MappedSequence.prototype.each = function(e) {
        var t = this.mapFn;
        return this.parent.each(function(n, r) {
            return e(t(n, r), r)
        })
    }, MappingIterator.prototype.current = function() {
        return this.mapFn(this.iterator.current(), this.index)
    }, MappingIterator.prototype.moveNext = function() {
        return this.iterator.moveNext() ? (++this.index, !0) : !1
    }, Sequence.prototype.pluck = function(e) {
        return this.map(e)
    }, Sequence.prototype.invoke = function(e) {
        return this.map(function(t) {
            return t[e]()
        })
    }, Sequence.prototype.filter = function(e) {
        return new FilteredSequence(this, createCallback(e))
    }, Sequence.prototype.select = function(e) {
        return this.filter(e)
    }, FilteredSequence.prototype = new Sequence, FilteredSequence.prototype.getIterator = function() {
        return new FilteringIterator(this.parent, this.filterFn)
    }, FilteredSequence.prototype.each = function(e) {
        var t = this.filterFn,
            n = 0;
        return this.parent.each(function(r, i) {
            return t(r, i) ? e(r, n++) : void 0
        })
    }, FilteredSequence.prototype.reverse = function() {
        return this.parent.reverse().filter(this.filterFn)
    }, FilteringIterator.prototype.current = function() {
        return this.value
    }, FilteringIterator.prototype.moveNext = function() {
        for (var e, t = this.iterator, n = this.filterFn; t.moveNext();)
            if (e = t.current(), n(e, this.index++)) return this.value = e, !0;
        return this.value = void 0, !1
    }, Sequence.prototype.reject = function(e) {
        return e = createCallback(e), this.filter(function(t) {
            return !e(t)
        })
    }, Sequence.prototype.ofType = function(e) {
        return this.filter(function(t) {
            return typeof t === e
        })
    }, Sequence.prototype.where = function(e) {
        return this.filter(e)
    }, Sequence.prototype.reverse = function() {
        return new ReversedSequence(this)
    }, ReversedSequence.prototype = new Sequence, ReversedSequence.prototype.getIterator = function() {
        return new ReversedIterator(this.parent)
    }, ReversedIterator.prototype.current = function() {
        return this.getIndex().get(this.index)
    }, ReversedIterator.prototype.moveNext = function() {
        var e = this.getIndex(),
            t = e.length();
        return "undefined" == typeof this.index && (this.index = t), --this.index >= 0
    }, ReversedIterator.prototype.getIndex = function() {
        return this.cachedIndex || (this.cachedIndex = this.sequence.getIndex()), this.cachedIndex
    }, Sequence.prototype.concat = function() {
        return new ConcatenatedSequence(this, arraySlice.call(arguments, 0))
    }, ConcatenatedSequence.prototype = new Sequence, ConcatenatedSequence.prototype.each = function(e) {
        var t = !1,
            n = 0;
        this.parent.each(function(r) {
            return e(r, n++) === !1 ? (t = !0, !1) : void 0
        }), t || Lazy(this.arrays).flatten().each(function(t) {
            return e(t, n++) === !1 ? !1 : void 0
        })
    }, Sequence.prototype.first = function(e) {
        return "undefined" == typeof e ? getFirst(this) : new TakeSequence(this, e)
    }, Sequence.prototype.head = Sequence.prototype.take = function(e) {
        return this.first(e)
    }, TakeSequence.prototype = new Sequence, TakeSequence.prototype.getIterator = function() {
        return new TakeIterator(this.parent, this.count)
    }, TakeSequence.prototype.each = function(e) {
        var t, n = this.count,
            r = 0,
            i = this.parent.each(function(i) {
                return n > r && (t = e(i, r++)), r >= n ? !1 : t
            });
        return i instanceof AsyncHandle ? i : r === n && t !== !1
    }, TakeIterator.prototype.current = function() {
        return this.iterator.current()
    }, TakeIterator.prototype.moveNext = function() {
        return --this.count >= 0 && this.iterator.moveNext()
    }, Sequence.prototype.takeWhile = function(e) {
        return new TakeWhileSequence(this, e)
    }, TakeWhileSequence.prototype = new Sequence, TakeWhileSequence.prototype.each = function(e) {
        var t = this.predicate,
            n = !1,
            r = 0,
            i = this.parent.each(function(i, o) {
                return t(i, o) ? e(i, r++) : (n = !0, !1)
            });
        return i instanceof AsyncHandle ? i : n
    }, Sequence.prototype.initial = function(e) {
        return new InitialSequence(this, e)
    }, InitialSequence.prototype = new Sequence, InitialSequence.prototype.each = function(e) {
        var t = this.parent.getIndex();
        return t.take(t.length() - this.count).each(e)
    }, Sequence.prototype.last = function(e) {
        return "undefined" == typeof e ? this.reverse().first() : this.reverse().take(e).reverse()
    }, Sequence.prototype.findWhere = function(e) {
        return this.where(e).first()
    }, Sequence.prototype.rest = function(e) {
        return new DropSequence(this, e)
    }, Sequence.prototype.skip = Sequence.prototype.tail = Sequence.prototype.drop = function(e) {
        return this.rest(e)
    }, DropSequence.prototype = new Sequence, DropSequence.prototype.each = function(e) {
        var t = this.count,
            n = 0,
            r = 0;
        return this.parent.each(function(i) {
            return n++ < t ? void 0 : e(i, r++)
        })
    }, Sequence.prototype.dropWhile = function(e) {
        return new DropWhileSequence(this, e)
    }, Sequence.prototype.skipWhile = function(e) {
        return this.dropWhile(e)
    }, DropWhileSequence.prototype = new Sequence, DropWhileSequence.prototype.each = function(e) {
        var t = this.predicate,
            n = !1;
        return this.parent.each(function(r) {
            if (!n) {
                if (t(r)) return;
                n = !0
            }
            return e(r)
        })
    }, Sequence.prototype.sort = function(e, t) {
        return e || (e = compare), t && (e = reverseArguments(e)), new SortedSequence(this, e)
    }, Sequence.prototype.sortBy = function(e, t) {
        return e = createComparator(e), t && (e = reverseArguments(e)), new SortedSequence(this, e)
    }, SortedSequence.prototype = new Sequence, SortedSequence.prototype.each = function(e) {
        var t = this.sortFn,
            n = this.parent.toArray();
        return n.sort(t), forEach(n, e)
    }, SortedSequence.prototype.reverse = function() {
        return new SortedSequence(this.parent, reverseArguments(this.sortFn))
    }, Sequence.prototype.groupBy = function(e, t) {
        return new GroupedSequence(this, e, t)
    }, Sequence.prototype.indexBy = function(e, t) {
        return new IndexedSequence(this, e, t)
    }, Sequence.prototype.countBy = function(e) {
        return new CountedSequence(this, e)
    }, Sequence.prototype.uniq = function(e) {
        return new UniqueSequence(this, e)
    }, Sequence.prototype.unique = function(e) {
        return this.uniq(e)
    }, UniqueSequence.prototype = new Sequence, UniqueSequence.prototype.each = function(e) {
        var t = new Set,
            n = this.keyFn,
            r = 0;
        return n ? (n = createCallback(n), this.parent.each(function(i) {
            return t.add(n(i)) ? e(i, r++) : void 0
        })) : this.parent.each(function(n) {
            return t.add(n) ? e(n, r++) : void 0
        })
    }, Sequence.prototype.zip = function(e) {
        return 1 === arguments.length ? new SimpleZippedSequence(this, e) : new ZippedSequence(this, arraySlice.call(arguments, 0))
    }, ZippedSequence.prototype = new Sequence, ZippedSequence.prototype.each = function(e) {
        var t = this.arrays,
            n = 0;
        this.parent.each(function(r) {
            for (var i = [r], o = 0; o < t.length; ++o) t[o].length > n && i.push(t[o][n]);
            return e(i, n++)
        })
    }, Sequence.prototype.shuffle = function() {
        return new ShuffledSequence(this)
    }, ShuffledSequence.prototype = new Sequence, ShuffledSequence.prototype.each = function(e) {
        for (var t = this.parent.toArray(), n = Math.floor, r = Math.random, i = 0, o = t.length - 1; o > 0; --o)
            if (swap(t, o, n(r() * (o + 1))), e(t[o], i++) === !1) return;
        e(t[0], i)
    }, Sequence.prototype.flatten = function() {
        return new FlattenedSequence(this)
    }, FlattenedSequence.prototype = new Sequence, FlattenedSequence.prototype.each = function(e) {
        var t = 0;
        return this.parent.each(function n(r) {
            return r instanceof Array ? forEach(r, n) : r instanceof Sequence ? r.each(n) : e(r, t++)
        })
    }, Sequence.prototype.compact = function() {
        return this.filter(function(e) {
            return !!e
        })
    }, Sequence.prototype.without = function() {
        return new WithoutSequence(this, arraySlice.call(arguments, 0))
    }, Sequence.prototype.difference = function() {
        return this.without.apply(this, arguments)
    }, WithoutSequence.prototype = new Sequence, WithoutSequence.prototype.each = function(e) {
        var t = createSet(this.values),
            n = 0;
        return this.parent.each(function(r) {
            return t.contains(r) ? void 0 : e(r, n++)
        })
    }, Sequence.prototype.union = function(e) {
        return this.concat(e).uniq()
    }, Sequence.prototype.intersection = function(e) {
        return 1 === arguments.length && arguments[0] instanceof Array ? new SimpleIntersectionSequence(this, e) : new IntersectionSequence(this, arraySlice.call(arguments, 0))
    }, IntersectionSequence.prototype = new Sequence, IntersectionSequence.prototype.each = function(e) {
        var t = Lazy(this.arrays).map(function(e) {
            return new UniqueMemoizer(Lazy(e).getIterator())
        }),
            n = new UniqueMemoizer(t.getIterator()),
            r = 0;
        return this.parent.each(function(t) {
            var i = !0;
            return n.each(function(e) {
                return e.contains(t) ? void 0 : (i = !1, !1)
            }), i ? e(t, r++) : void 0
        })
    }, UniqueMemoizer.prototype.current = function() {
        return this.currentValue
    }, UniqueMemoizer.prototype.moveNext = function() {
        for (var e, t = this.iterator, n = this.set, r = this.memo; t.moveNext();)
            if (e = t.current(), n.add(e)) return r.push(e), this.currentValue = e, !0;
        return !1
    }, UniqueMemoizer.prototype.each = function(e) {
        for (var t = this.memo, n = t.length, r = -1; ++r < n;)
            if (e(t[r], r) === !1) return !1;
        for (; this.moveNext() && e(this.currentValue, r++) !== !1;);
    }, UniqueMemoizer.prototype.contains = function(e) {
        if (this.set.contains(e)) return !0;
        for (; this.moveNext();)
            if (this.currentValue === e) return !0;
        return !1
    }, Sequence.prototype.every = function(e) {
        return e = createCallback(e), this.each(function(t, n) {
            return !!e(t, n)
        })
    }, Sequence.prototype.all = function(e) {
        return this.every(e)
    }, Sequence.prototype.some = function(e) {
        e = createCallback(e, !0);
        var t = !1;
        return this.each(function(n) {
            return e(n) ? (t = !0, !1) : void 0
        }), t
    }, Sequence.prototype.any = function(e) {
        return this.some(e)
    }, Sequence.prototype.none = function(e) {
        return !this.any(e)
    }, Sequence.prototype.isEmpty = function() {
        return !this.any()
    }, Sequence.prototype.indexOf = function(e) {
        var t = -1;
        return this.each(function(n, r) {
            return n === e ? (t = r, !1) : void 0
        }), t
    }, Sequence.prototype.lastIndexOf = function(e) {
        var t = this.getIndex().reverse(),
            n = t.indexOf(e);
        return -1 !== n && (n = t.length() - n - 1), n
    }, Sequence.prototype.sortedIndex = function(e) {
        for (var t, n = this.getIndex(), r = 0, i = n.length(); i > r;) t = r + i >>> 1, -1 === compare(n.get(t), e) ? r = t + 1 : i = t;
        return r
    }, Sequence.prototype.contains = function(e) {
        return -1 !== this.indexOf(e)
    }, Sequence.prototype.reduce = function(e, t) {
        if (arguments.length < 2) return this.tail().reduce(e, this.head());
        var n = this.each(function(n, r) {
            t = e(t, n, r)
        });
        return n instanceof AsyncHandle ? n.then(function() {
            return t
        }) : t
    }, Sequence.prototype.inject = Sequence.prototype.foldl = function(e, t) {
        return this.reduce(e, t)
    }, Sequence.prototype.reduceRight = function(e, t) {
        if (arguments.length < 2) return this.initial(1).reduceRight(e, this.last());
        var n = this.getIndex(),
            r = n.length() - 1;
        return n.reverse().reduce(function(t, n) {
            return e(t, n, r--)
        }, t)
    }, Sequence.prototype.foldr = function(e, t) {
        return this.reduceRight(e, t)
    }, Sequence.prototype.consecutive = function(e) {
        var t = new Queue(e),
            n = this.map(function(n) {
                return t.add(n).count === e ? t.toArray() : void 0
            });
        return n.compact()
    }, Sequence.prototype.chunk = function(e) {
        if (1 > e) throw new Error("You must specify a positive chunk size.");
        return new ChunkedSequence(this, e)
    }, ChunkedSequence.prototype = new Sequence, ChunkedSequence.prototype.getIterator = function() {
        return new ChunkedIterator(this.parent, this.chunkSize)
    }, ChunkedIterator.prototype.current = function() {
        return this.currentChunk
    }, ChunkedIterator.prototype.moveNext = function() {
        for (var e = this.iterator, t = this.size, n = []; n.length < t && e.moveNext();) n.push(e.current());
        return 0 === n.length ? !1 : (this.currentChunk = n, !0)
    }, Sequence.prototype.tap = function(e) {
        return new TappedSequence(this, e)
    }, TappedSequence.prototype = new Sequence, TappedSequence.prototype.each = function(e) {
        var t = this.callback;
        return this.parent.each(function(n, r) {
            return t(n, r), e(n, r)
        })
    }, Sequence.prototype.find = function(e) {
        return this.filter(e).first()
    }, Sequence.prototype.detect = function(e) {
        return this.find(e)
    }, Sequence.prototype.min = function(e) {
        return "undefined" != typeof e ? this.minBy(e) : this.reduce(function(e, t) {
            return e > t ? t : e
        }, 1 / 0)
    }, Sequence.prototype.minBy = function(e) {
        return e = createCallback(e), this.reduce(function(t, n) {
            return e(n) < e(t) ? n : t
        })
    }, Sequence.prototype.max = function(e) {
        return "undefined" != typeof e ? this.maxBy(e) : this.reduce(function(e, t) {
            return t > e ? t : e
        }, -1 / 0)
    }, Sequence.prototype.maxBy = function(e) {
        return e = createCallback(e), this.reduce(function(t, n) {
            return e(n) > e(t) ? n : t
        })
    }, Sequence.prototype.sum = function(e) {
        return "undefined" != typeof e ? this.sumBy(e) : this.reduce(function(e, t) {
            return e + t
        }, 0)
    }, Sequence.prototype.sumBy = function(e) {
        return e = createCallback(e), this.reduce(function(t, n) {
            return t + e(n)
        }, 0)
    }, Sequence.prototype.join = function(e) {
        return e = "string" == typeof e ? e : ",", this.reduce(function(t, n, r) {
            return r > 0 && (t += e), t + n
        }, "")
    }, Sequence.prototype.toString = function(e) {
        return this.join(e)
    }, Sequence.prototype.async = function(e) {
        return new AsyncSequence(this, e)
    }, SimpleIntersectionSequence.prototype = new Sequence, SimpleIntersectionSequence.prototype.eachMemoizerCache = function(e) {
        var t = new UniqueMemoizer(Lazy(this.array).getIterator()),
            n = 0;
        return this.parent.each(function(r) {
            return t.contains(r) ? e(r, n++) : void 0
        })
    }, SimpleIntersectionSequence.prototype.eachArrayCache = function(e) {
        var t = this.array,
            n = arrayContains,
            r = 0;
        return this.parent.each(function(i) {
            return n(t, i) ? e(i, r++) : void 0
        })
    }, SimpleZippedSequence.prototype = new Sequence, SimpleZippedSequence.prototype.each = function(e) {
        var t = this.array;
        return this.parent.each(function(n, r) {
            return e([n, t[r]], r)
        })
    }, ArrayLikeSequence.prototype = new Sequence, ArrayLikeSequence.define = function(e, t) {
        if (!t || "function" != typeof t.get) throw new Error("A custom array-like sequence must implement *at least* get!");
        return defineSequenceType(ArrayLikeSequence, e, t)
    }, ArrayLikeSequence.prototype.get = function(e) {
        return this.parent.get(e)
    }, ArrayLikeSequence.prototype.length = function() {
        return this.parent.length()
    }, ArrayLikeSequence.prototype.getIndex = function() {
        return this
    }, ArrayLikeSequence.prototype.getIterator = function() {
        return new IndexedIterator(this)
    }, IndexedIterator.prototype.current = function() {
        return this.sequence.get(this.index)
    }, IndexedIterator.prototype.moveNext = function() {
        return this.index >= this.sequence.length() - 1 ? !1 : (++this.index, !0)
    }, ArrayLikeSequence.prototype.each = function(e) {
        for (var t = this.length(), n = -1; ++n < t;)
            if (e(this.get(n), n) === !1) return !1;
        return !0
    }, ArrayLikeSequence.prototype.pop = function() {
        return this.initial()
    }, ArrayLikeSequence.prototype.shift = function() {
        return this.drop()
    }, ArrayLikeSequence.prototype.slice = function(e, t) {
        var n = this.length();
        0 > e && (e = n + e);
        var r = this.drop(e);
        return "number" == typeof t && (0 > t && (t = n + t), r = r.take(t - e)), r
    }, ArrayLikeSequence.prototype.map = function(e) {
        return new IndexedMappedSequence(this, createCallback(e))
    }, IndexedMappedSequence.prototype = new ArrayLikeSequence, IndexedMappedSequence.prototype.get = function(e) {
        return 0 > e || e >= this.parent.length() ? void 0 : this.mapFn(this.parent.get(e), e)
    }, ArrayLikeSequence.prototype.filter = function(e) {
        return new IndexedFilteredSequence(this, createCallback(e))
    }, IndexedFilteredSequence.prototype = new FilteredSequence, IndexedFilteredSequence.prototype.each = function(e) {
        for (var t, n = this.parent, r = this.filterFn, i = this.parent.length(), o = -1, u = 0; ++o < i;)
            if (t = n.get(o), r(t, o) && e(t, u++) === !1) return !1;
        return !0
    }, ArrayLikeSequence.prototype.reverse = function() {
        return new IndexedReversedSequence(this)
    }, IndexedReversedSequence.prototype = new ArrayLikeSequence, IndexedReversedSequence.prototype.get = function(e) {
        return this.parent.get(this.length() - e - 1)
    }, ArrayLikeSequence.prototype.first = function(e) {
        return "undefined" == typeof e ? this.get(0) : new IndexedTakeSequence(this, e)
    }, IndexedTakeSequence.prototype = new ArrayLikeSequence, IndexedTakeSequence.prototype.length = function() {
        var e = this.parent.length();
        return this.count <= e ? this.count : e
    }, ArrayLikeSequence.prototype.rest = function(e) {
        return new IndexedDropSequence(this, e)
    }, IndexedDropSequence.prototype = new ArrayLikeSequence, IndexedDropSequence.prototype.get = function(e) {
        return this.parent.get(this.count + e)
    }, IndexedDropSequence.prototype.length = function() {
        var e = this.parent.length();
        return this.count <= e ? e - this.count : 0
    }, ArrayLikeSequence.prototype.concat = function(e) {
        return 1 === arguments.length && arguments[0] instanceof Array ? new IndexedConcatenatedSequence(this, e) : Sequence.prototype.concat.apply(this, arguments)
    }, IndexedConcatenatedSequence.prototype = new ArrayLikeSequence, IndexedConcatenatedSequence.prototype.get = function(e) {
        var t = this.parent.length();
        return t > e ? this.parent.get(e) : this.other[e - t]
    }, IndexedConcatenatedSequence.prototype.length = function() {
        return this.parent.length() + this.other.length
    }, ArrayLikeSequence.prototype.uniq = function(e) {
        return new IndexedUniqueSequence(this, createCallback(e))
    }, IndexedUniqueSequence.prototype = new Sequence, IndexedUniqueSequence.prototype.eachArrayCache = function(e) {
        for (var t, n, r = this.parent, i = this.keyFn, o = r.length(), u = [], c = arrayContains, a = -1, p = 0; ++a < o;)
            if (n = r.get(a), t = i(n), !c(u, t) && (u.push(t), e(n, p++) === !1)) return !1
    }, IndexedUniqueSequence.prototype.eachSetCache = UniqueSequence.prototype.each, MemoizedSequence.prototype = new ArrayLikeSequence, MemoizedSequence.prototype.cache = function() {
        return this.cachedResult || (this.cachedResult = this.parent.toArray())
    }, MemoizedSequence.prototype.get = function(e) {
        return this.cache()[e]
    }, MemoizedSequence.prototype.length = function() {
        return this.cache().length
    }, MemoizedSequence.prototype.slice = function(e, t) {
        return this.cache().slice(e, t)
    }, MemoizedSequence.prototype.toArray = function() {
        return this.cache().slice(0)
    }, ArrayWrapper.prototype = new ArrayLikeSequence, ArrayWrapper.prototype.root = function() {
        return this
    }, ArrayWrapper.prototype.isAsync = function() {
        return !1
    }, ArrayWrapper.prototype.get = function(e) {
        return this.source[e]
    }, ArrayWrapper.prototype.length = function() {
        return this.source.length
    }, ArrayWrapper.prototype.each = function(e) {
        return forEach(this.source, e)
    }, ArrayWrapper.prototype.map = function(e) {
        return new MappedArrayWrapper(this, createCallback(e))
    }, ArrayWrapper.prototype.filter = function(e) {
        return new FilteredArrayWrapper(this, createCallback(e))
    }, ArrayWrapper.prototype.uniq = function(e) {
        return new UniqueArrayWrapper(this, e)
    }, ArrayWrapper.prototype.concat = function(e) {
        return 1 === arguments.length && arguments[0] instanceof Array ? new ConcatArrayWrapper(this, e) : ArrayLikeSequence.prototype.concat.apply(this, arguments)
    }, ArrayWrapper.prototype.toArray = function() {
        return this.source.slice(0)
    }, MappedArrayWrapper.prototype = new ArrayLikeSequence, MappedArrayWrapper.prototype.get = function(e) {
        var t = this.parent.source;
        return 0 > e || e >= t.length ? void 0 : this.mapFn(t[e])
    }, MappedArrayWrapper.prototype.length = function() {
        return this.parent.source.length
    }, MappedArrayWrapper.prototype.each = function(e) {
        for (var t = this.parent.source, n = t.length, r = this.mapFn, i = -1; ++i < n;)
            if (e(r(t[i], i), i) === !1) return !1;
        return !0
    }, FilteredArrayWrapper.prototype = new FilteredSequence, FilteredArrayWrapper.prototype.each = function(e) {
        for (var t, n = this.parent.source, r = this.filterFn, i = n.length, o = -1, u = 0; ++o < i;)
            if (t = n[o], r(t, o) && e(t, u++) === !1) return !1;
        return !0
    }, UniqueArrayWrapper.prototype = new Sequence, UniqueArrayWrapper.prototype.eachNoCache = function(e) {
        for (var t, n = this.parent.source, r = this.keyFn, i = n.length, o = arrayContainsBefore, u = -1, c = 0; ++u < i;)
            if (t = n[u], !o(n, t, u, r) && e(t, c++) === !1) return !1;
        return !0
    }, UniqueArrayWrapper.prototype.eachArrayCache = function(e) {
        var t, n, r = this.parent.source,
            i = this.keyFn,
            o = r.length,
            u = [],
            c = arrayContains,
            a = -1,
            p = 0;
        if (i) {
            for (i = createCallback(i); ++a < o;)
                if (n = r[a], t = i(n), !c(u, t) && (u.push(t), e(n, p++) === !1)) return !1
        } else
            for (; ++a < o;)
                if (n = r[a], !c(u, n) && (u.push(n), e(n, p++) === !1)) return !1; return !0
    }, UniqueArrayWrapper.prototype.eachSetCache = UniqueSequence.prototype.each, ConcatArrayWrapper.prototype = new ArrayLikeSequence, ConcatArrayWrapper.prototype.get = function(e) {
        var t = this.parent.source,
            n = t.length;
        return n > e ? t[e] : this.other[e - n]
    }, ConcatArrayWrapper.prototype.length = function() {
        return this.parent.source.length + this.other.length
    }, ConcatArrayWrapper.prototype.each = function(e) {
        for (var t = this.parent.source, n = t.length, r = this.other, i = r.length, o = 0, u = -1; ++u < n;)
            if (e(t[u], o++) === !1) return !1;
        for (u = -1; ++u < i;)
            if (e(r[u], o++) === !1) return !1;
        return !0
    }, ObjectLikeSequence.prototype = new Sequence, ObjectLikeSequence.define = function(e, t) {
        if (!t || "function" != typeof t.each) throw new Error("A custom object-like sequence must implement *at least* each!");
        return defineSequenceType(ObjectLikeSequence, e, t)
    }, ObjectLikeSequence.prototype.value = function() {
        return this.toObject()
    }, ObjectLikeSequence.prototype.get = function(e) {
        var t = this.pairs().find(function(t) {
            return t[0] === e
        });
        return t ? t[1] : void 0
    }, ObjectLikeSequence.prototype.keys = function() {
        return this.map(function(e, t) {
            return t
        })
    }, ObjectLikeSequence.prototype.values = function() {
        return this.map(function(e) {
            return e
        })
    }, ObjectLikeSequence.prototype.async = function() {
        throw new Error("An ObjectLikeSequence does not support asynchronous iteration.")
    }, ObjectLikeSequence.prototype.filter = function(e) {
        return new FilteredObjectLikeSequence(this, createCallback(e))
    }, FilteredObjectLikeSequence.prototype = new ObjectLikeSequence, FilteredObjectLikeSequence.prototype.each = function(e) {
        var t = this.filterFn;
        return this.parent.each(function(n, r) {
            return t(n, r) ? e(n, r) : void 0
        })
    }, ObjectLikeSequence.prototype.reverse = function() {
        return this
    }, ObjectLikeSequence.prototype.assign = function(e) {
        return new AssignSequence(this, e)
    }, ObjectLikeSequence.prototype.extend = function(e) {
        return this.assign(e)
    }, AssignSequence.prototype = new ObjectLikeSequence, AssignSequence.prototype.get = function(e) {
        return this.other[e] || this.parent.get(e)
    }, AssignSequence.prototype.each = function(e) {
        var t = new Set,
            n = !1;
        return Lazy(this.other).each(function(r, i) {
            return e(r, i) === !1 ? (n = !0, !1) : void t.add(i)
        }), n ? void 0 : this.parent.each(function(n, r) {
            return t.contains(r) || e(n, r) !== !1 ? void 0 : !1
        })
    }, ObjectLikeSequence.prototype.defaults = function e(e) {
        return new DefaultsSequence(this, e)
    }, DefaultsSequence.prototype = new ObjectLikeSequence, DefaultsSequence.prototype.get = function(e) {
        return this.parent.get(e) || this.defaults[e]
    }, DefaultsSequence.prototype.each = function(e) {
        var t = new Set,
            n = !1;
        this.parent.each(function(r, i) {
            return e(r, i) === !1 ? (n = !0, !1) : void("undefined" != typeof r && t.add(i))
        }), n || Lazy(this.defaults).each(function(n, r) {
            return t.contains(r) || e(n, r) !== !1 ? void 0 : !1
        })
    }, ObjectLikeSequence.prototype.invert = function() {
        return new InvertedSequence(this)
    }, InvertedSequence.prototype = new ObjectLikeSequence, InvertedSequence.prototype.each = function(e) {
        this.parent.each(function(t, n) {
            return e(n, t)
        })
    }, ObjectLikeSequence.prototype.merge = function() {
        var e = arguments.length > 1 && "function" == typeof arguments[arguments.length - 1] ? arrayPop.call(arguments) : null;
        return new MergedSequence(this, arraySlice.call(arguments, 0), e)
    }, MergedSequence.prototype = new ObjectLikeSequence, MergedSequence.prototype.each = function(e) {
        var t = this.others,
            n = this.mergeFn || mergeObjects,
            r = {}, i = this.parent.each(function(i, o) {
                var u = i;
                return forEach(t, function(e) {
                    o in e && (u = n(u, e[o]))
                }), r[o] = !0, e(u, o)
            });
        if (i === !1) return !1;
        var o = {};
        return forEach(t, function(e) {
            for (var t in e) r[t] || (o[t] = n(o[t], e[t]))
        }), Lazy(o).each(e)
    }, ObjectLikeSequence.prototype.functions = function() {
        return this.filter(function(e) {
            return "function" == typeof e
        }).map(function(e, t) {
            return t
        })
    }, ObjectLikeSequence.prototype.methods = function() {
        return this.functions()
    }, ObjectLikeSequence.prototype.pick = function(e) {
        return new PickSequence(this, e)
    }, PickSequence.prototype = new ObjectLikeSequence, PickSequence.prototype.get = function(e) {
        return arrayContains(this.properties, e) ? this.parent.get(e) : void 0
    }, PickSequence.prototype.each = function(e) {
        var t = arrayContains,
            n = this.properties;
        return this.parent.each(function(r, i) {
            return t(n, i) ? e(r, i) : void 0
        })
    }, ObjectLikeSequence.prototype.omit = function(e) {
        return new OmitSequence(this, e)
    }, OmitSequence.prototype = new ObjectLikeSequence, OmitSequence.prototype.get = function(e) {
        return arrayContains(this.properties, e) ? void 0 : this.parent.get(e)
    }, OmitSequence.prototype.each = function(e) {
        var t = arrayContains,
            n = this.properties;
        return this.parent.each(function(r, i) {
            return t(n, i) ? void 0 : e(r, i)
        })
    }, ObjectLikeSequence.prototype.pairs = function() {
        return this.map(function(e, t) {
            return [t, e]
        })
    }, ObjectLikeSequence.prototype.toArray = function() {
        return this.pairs().toArray()
    }, ObjectLikeSequence.prototype.toObject = function() {
        return this.reduce(function(e, t, n) {
            return e[n] = t, e
        }, {})
    }, GroupedSequence.prototype = new ObjectLikeSequence, GroupedSequence.prototype.each = function(e) {
        var t, n = createCallback(this.keyFn),
            r = createCallback(this.valFn);
        return t = this.parent.reduce(function(e, t) {
            var i = n(t),
                o = r(t);
            return e[i] instanceof Array ? e[i].push(o) : e[i] = [o], e
        }, {}), transform(function(t) {
            for (var n in t)
                if (e(t[n], n) === !1) return !1
        }, t)
    }, IndexedSequence.prototype = new ObjectLikeSequence, IndexedSequence.prototype.each = function(e) {
        var t = createCallback(this.keyFn),
            n = createCallback(this.valFn),
            r = {};
        return this.parent.each(function(i) {
            var o = t(i),
                u = n(i);
            return r[o] ? void 0 : (r[o] = u, e(u, o))
        })
    }, CountedSequence.prototype = new ObjectLikeSequence, CountedSequence.prototype.each = function(e) {
        var t = createCallback(this.keyFn),
            n = {};
        this.parent.each(function(e) {
            var r = t(e);
            n[r] ? n[r] += 1 : n[r] = 1
        });
        for (var r in n)
            if (e(n[r], r) === !1) return !1;
        return !0
    }, ObjectLikeSequence.prototype.watch = function() {
        throw new Error("You can only call #watch on a directly wrapped object.")
    }, ObjectWrapper.prototype = new ObjectLikeSequence, ObjectWrapper.prototype.root = function() {
        return this
    }, ObjectWrapper.prototype.isAsync = function() {
        return !1
    }, ObjectWrapper.prototype.get = function(e) {
        return this.source[e]
    }, ObjectWrapper.prototype.each = function(e) {
        var t, n = this.source;
        for (t in n)
            if (e(n[t], t) === !1) return !1;
        return !0
    }, StringLikeSequence.prototype = new ArrayLikeSequence, StringLikeSequence.define = function(e, t) {
        if (!t || "function" != typeof t.get) throw new Error("A custom string-like sequence must implement *at least* get!");
        return defineSequenceType(StringLikeSequence, e, t)
    }, StringLikeSequence.prototype.value = function() {
        return this.toString()
    }, StringLikeSequence.prototype.getIterator = function() {
        return new CharIterator(this)
    }, CharIterator.prototype.current = function() {
        return this.source.charAt(this.index)
    }, CharIterator.prototype.moveNext = function() {
        return ++this.index < this.source.length()
    }, StringLikeSequence.prototype.charAt = function(e) {
        return this.get(e)
    }, StringLikeSequence.prototype.charCodeAt = function(e) {
        var t = this.charAt(e);
        return t ? t.charCodeAt(0) : 0 / 0
    }, StringLikeSequence.prototype.substring = function(e, t) {
        return new StringSegment(this, e, t)
    }, StringSegment.prototype = new StringLikeSequence, StringSegment.prototype.get = function(e) {
        return this.parent.get(e + this.start)
    }, StringSegment.prototype.length = function() {
        return ("number" == typeof this.stop ? this.stop : this.parent.length()) - this.start
    }, StringLikeSequence.prototype.first = function(e) {
        return "undefined" == typeof e ? this.charAt(0) : this.substring(0, e)
    }, StringLikeSequence.prototype.last = function(e) {
        return "undefined" == typeof e ? this.charAt(this.length() - 1) : this.substring(this.length() - e)
    }, StringLikeSequence.prototype.drop = function(e) {
        return this.substring(e)
    }, StringLikeSequence.prototype.indexOf = function(e, t) {
        return this.toString().indexOf(e, t)
    }, StringLikeSequence.prototype.lastIndexOf = function(e, t) {
        return this.toString().lastIndexOf(e, t)
    }, StringLikeSequence.prototype.contains = function(e) {
        return -1 !== this.indexOf(e)
    }, StringLikeSequence.prototype.endsWith = function(e) {
        return this.substring(this.length() - e.length).toString() === e
    }, StringLikeSequence.prototype.startsWith = function(e) {
        return this.substring(0, e.length).toString() === e
    }, StringLikeSequence.prototype.toUpperCase = function() {
        return this.mapString(function(e) {
            return e.toUpperCase()
        })
    }, StringLikeSequence.prototype.toLowerCase = function() {
        return this.mapString(function(e) {
            return e.toLowerCase()
        })
    }, StringLikeSequence.prototype.mapString = function(e) {
        return new MappedStringLikeSequence(this, e)
    }, MappedStringLikeSequence.prototype = new StringLikeSequence, MappedStringLikeSequence.prototype.get = IndexedMappedSequence.prototype.get, MappedStringLikeSequence.prototype.length = IndexedMappedSequence.prototype.length, StringLikeSequence.prototype.reverse = function() {
        return new ReversedStringLikeSequence(this)
    }, ReversedStringLikeSequence.prototype = new StringLikeSequence, ReversedStringLikeSequence.prototype.get = IndexedReversedSequence.prototype.get, ReversedStringLikeSequence.prototype.length = IndexedReversedSequence.prototype.length, StringLikeSequence.prototype.toString = function() {
        return this.join("")
    }, StringLikeSequence.prototype.match = function(e) {
        return new StringMatchSequence(this, e)
    }, StringMatchSequence.prototype = new Sequence, StringMatchSequence.prototype.getIterator = function() {
        return new StringMatchIterator(this.parent.toString(), this.pattern)
    }, StringMatchIterator.prototype.current = function() {
        return this.match[0]
    }, StringMatchIterator.prototype.moveNext = function() {
        return !!(this.match = this.pattern.exec(this.source))
    }, StringLikeSequence.prototype.split = function(e) {
        return new SplitStringSequence(this, e)
    }, SplitStringSequence.prototype = new Sequence, SplitStringSequence.prototype.getIterator = function() {
        var e = this.parent.toString();
        return this.pattern instanceof RegExp ? "" === this.pattern.source || "(?:)" === this.pattern.source ? new CharIterator(e) : new SplitWithRegExpIterator(e, this.pattern) : "" === this.pattern ? new CharIterator(e) : new SplitWithStringIterator(e, this.pattern)
    }, SplitWithRegExpIterator.prototype.current = function() {
        return this.source.substring(this.start, this.end)
    }, SplitWithRegExpIterator.prototype.moveNext = function() {
        if (!this.pattern) return !1;
        var e = this.pattern.exec(this.source);
        return e ? (this.start = this.nextStart ? this.nextStart : 0, this.end = e.index, this.nextStart = e.index + e[0].length, !0) : this.pattern ? (this.start = this.nextStart, this.end = void 0, this.nextStart = void 0, this.pattern = void 0, !0) : !1
    }, SplitWithStringIterator.prototype.current = function() {
        return this.source.substring(this.leftIndex, this.rightIndex)
    }, SplitWithStringIterator.prototype.moveNext = function() {
        return this.finished || (this.leftIndex = "undefined" != typeof this.leftIndex ? this.rightIndex + this.delimiter.length : 0, this.rightIndex = this.source.indexOf(this.delimiter, this.leftIndex)), -1 === this.rightIndex ? (this.finished = !0, this.rightIndex = void 0, !0) : !this.finished
    }, StringWrapper.prototype = new StringLikeSequence, StringWrapper.prototype.root = function() {
        return this
    }, StringWrapper.prototype.isAsync = function() {
        return !1
    }, StringWrapper.prototype.get = function(e) {
        return this.source.charAt(e)
    }, StringWrapper.prototype.length = function() {
        return this.source.length
    }, StringWrapper.prototype.toString = function() {
        return this.source
    }, GeneratedSequence.prototype = new Sequence, GeneratedSequence.prototype.isAsync = function() {
        return !1
    }, GeneratedSequence.prototype.length = function() {
        return this.fixedLength
    }, GeneratedSequence.prototype.each = function(e) {
        for (var t = this.get, n = this.fixedLength, r = 0;
            "undefined" == typeof n || n > r;)
            if (e(t(r), r++) === !1) return !1;
        return !0
    }, GeneratedSequence.prototype.getIterator = function() {
        return new GeneratedIterator(this)
    }, GeneratedIterator.prototype.current = function() {
        return this.currentValue
    }, GeneratedIterator.prototype.moveNext = function() {
        var e = this.sequence;
        return "number" == typeof e.fixedLength && this.index >= e.fixedLength ? !1 : (this.currentValue = e.get(this.index++), !0)
    }, AsyncSequence.prototype = new Sequence, AsyncSequence.prototype.isAsync = function() {
        return !0
    }, AsyncSequence.prototype.getIterator = function() {
        throw new Error("An AsyncSequence does not support synchronous iteration.")
    }, AsyncSequence.prototype.each = function(e) {
        var t = this.parent.getIterator(),
            n = this.onNextCallback,
            r = this.cancelCallback,
            i = 0,
            o = new AsyncHandle(function() {
                u && r(u)
            }),
            u = n(function c() {
                u = null;
                try {
                    t.moveNext() && e(t.current(), i++) !== !1 ? u = n(c) : o._resolve()
                } catch (r) {
                    o._reject(r)
                }
            });
        return o
    };
    var PENDING = 1,
        RESOLVED = 2,
        REJECTED = 3;
    AsyncHandle.prototype.then = function(e, t) {
        var n = new AsyncHandle(this.cancelFn);
        return this.resolveListeners.push(function(t) {
            try {
                if ("function" != typeof e) return void resolve(n, t);
                resolve(n, e(t))
            } catch (r) {
                n._reject(r)
            }
        }), this.rejectListeners.push(function(e) {
            try {
                if ("function" != typeof t) return void n._reject(e);
                resolve(n, t(e))
            } catch (r) {
                n._reject(r)
            }
        }), this.state === RESOLVED && this._resolve(this.value), this.state === REJECTED && this._reject(this.reason), n
    }, AsyncHandle.prototype._resolve = function(e) {
        this.state !== REJECTED && (this.state === PENDING && (this.state = RESOLVED, this.value = e), consumeListeners(this.resolveListeners, this.value))
    }, AsyncHandle.prototype._reject = function(e) {
        this.state !== RESOLVED && (this.state === PENDING && (this.state = REJECTED, this.reason = e), consumeListeners(this.rejectListeners, this.reason))
    }, AsyncHandle.prototype.cancel = function() {
        this.cancelFn && (this.cancelFn(), this.cancelFn = null, this._resolve(!1))
    }, AsyncHandle.prototype.onComplete = function(e) {
        return this.resolveListeners.push(e), this
    }, AsyncHandle.prototype.onError = function(e) {
        return this.rejectListeners.push(e), this
    }, AsyncSequence.prototype.reverse = function() {
        return this.parent.reverse().async()
    }, AsyncSequence.prototype.find = function(e) {
        var t, n = this.each(function(n, r) {
                return e(n, r) ? (t = n, !1) : void 0
            });
        return n.then(function() {
            return t
        })
    }, AsyncSequence.prototype.indexOf = function(e) {
        var t = -1,
            n = this.each(function(n, r) {
                return n === e ? (t = r, !1) : void 0
            });
        return n.then(function() {
            return t
        })
    }, AsyncSequence.prototype.contains = function(e) {
        var t = !1,
            n = this.each(function(n) {
                return n === e ? (t = !0, !1) : void 0
            });
        return n.then(function() {
            return t
        })
    }, AsyncSequence.prototype.async = function() {
        return this
    }, ObjectWrapper.prototype.watch = function(e) {
        return new WatchedPropertySequence(this.source, e)
    }, WatchedPropertySequence.prototype = new AsyncSequence, WatchedPropertySequence.prototype.each = function(e) {
        this.listeners.push(e)
    }, StreamLikeSequence.prototype = new AsyncSequence, StreamLikeSequence.prototype.isAsync = function() {
        return !0
    }, StreamLikeSequence.prototype.split = function(e) {
        return new SplitStreamSequence(this, e)
    }, SplitStreamSequence.prototype = new Sequence, SplitStreamSequence.prototype.getEachForDelimiter = function(e) {
        return e instanceof RegExp ? this.regexEach : this.stringEach
    }, SplitStreamSequence.prototype.regexEach = function(e) {
        var t, n = cloneRegex(this.delimiter),
            r = "",
            i = 0,
            o = 0,
            u = this.parent.each(function(u) {
                r += u;
                for (var c; c = n.exec(r);) {
                    if (t = c.index, e(r.substring(i, t), o++) === !1) return !1;
                    i = t + c[0].length
                }
                r = r.substring(i), i = 0
            });
        return u.onComplete(function() {
            r.length > 0 && e(r, o++)
        }), u
    }, SplitStreamSequence.prototype.stringEach = function(e) {
        var t = this.delimiter,
            n = 0,
            r = "",
            i = this.parent.each(function(i) {
                r += i;
                for (var o;
                    (o = r.indexOf(t)) >= 0;) {
                    var u = r.substr(0, o);
                    if (r = r.substr(o + t.length), e(u, n++) === !1) return !1
                }
                return !0
            });
        return i.onComplete(function() {
            e(r, n++)
        }), i
    }, StreamLikeSequence.prototype.lines = function() {
        return this.split("\n")
    }, StreamLikeSequence.prototype.match = function(e) {
        return new MatchedStreamSequence(this, e)
    }, MatchedStreamSequence.prototype = new AsyncSequence, MatchedStreamSequence.prototype.each = function(e) {
        var t = this.pattern,
            n = !1,
            r = 0;
        return this.parent.each(function(i) {
            return Lazy(i).match(t).each(function(t) {
                return e(t, r++) === !1 ? (n = !0, !1) : void 0
            }), !n
        })
    }, Lazy.createWrapper = function(e) {
        var t = function() {
            this.listeners = []
        };
        return t.prototype = new StreamLikeSequence, t.prototype.each = function(e) {
            this.listeners.push(e)
        }, t.prototype.emit = function(e) {
            for (var t = this.listeners, n = t.length, r = n - 1; r >= 0; --r) t[r](e) === !1 && t.splice(r, 1)
        },
        function() {
            var n = new t;
            return e.apply(n, arguments), n
        }
    }, Lazy.generate = function(e, t) {
        return new GeneratedSequence(e, t)
    }, Lazy.range = function() {
        var e = arguments.length > 1 ? arguments[0] : 0,
            t = arguments.length > 1 ? arguments[1] : arguments[0],
            n = arguments.length > 2 && arguments[2];
        return n === !1 && (n = t > e ? 1 : -1), 0 === n ? Lazy([]) : Lazy.generate(function(t) {
            return e + n * t
        }).take(Math.ceil((t - e) / n))
    }, Lazy.repeat = function(e, t) {
        return Lazy.generate(function() {
            return e
        }, t)
    }, Lazy.Sequence = Sequence, Lazy.ArrayLikeSequence = ArrayLikeSequence, Lazy.ObjectLikeSequence = ObjectLikeSequence, Lazy.StringLikeSequence = StringLikeSequence, Lazy.StreamLikeSequence = StreamLikeSequence, Lazy.GeneratedSequence = GeneratedSequence, Lazy.AsyncSequence = AsyncSequence, Lazy.AsyncHandle = AsyncHandle, Lazy.clone = function(e) {
        return Lazy(e).value()
    }, Lazy.deprecate = function(e, t) {
        return function() {
            return console.warn(e), t.apply(this, arguments)
        }
    };
    var arrayPop = Array.prototype.pop,
        arraySlice = Array.prototype.slice;
    return Set.prototype.add = function(e) {
        var t, n = this.table,
            r = typeof e;
        switch (r) {
            case "number":
            case "boolean":
            case "undefined":
                return n[e] ? !1 : (n[e] = !0, !0);
            case "string":
                switch (e.charAt(0)) {
                    case "_":
                    case "f":
                    case "t":
                    case "c":
                    case "u":
                    case "@":
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "N":
                        e = "@" + e
                }
                return n[e] ? !1 : (n[e] = !0, !0);
            default:
                return t = this.objects, arrayContains(t, e) ? !1 : (t.push(e), !0)
        }
    }, Set.prototype.contains = function(e) {
        var t = typeof e;
        switch (t) {
            case "number":
            case "boolean":
            case "undefined":
                return !!this.table[e];
            case "string":
                switch (e.charAt(0)) {
                    case "_":
                    case "f":
                    case "t":
                    case "c":
                    case "u":
                    case "@":
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "N":
                        e = "@" + e
                }
                return !!this.table[e];
            default:
                return arrayContains(this.objects, e)
        }
    }, Queue.prototype.add = function(e) {
        var t = this.contents,
            n = t.length,
            r = this.start;
        return this.count === n ? (t[r] = e, this.start = (r + 1) % n) : t[this.count++] = e, this
    }, Queue.prototype.toArray = function() {
        var e = this.contents,
            t = this.start,
            n = this.count,
            r = e.slice(t, t + n);
        return r.length < n && (r = r.concat(e.slice(0, n - r.length))), r
    }, Lazy
});