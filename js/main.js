webpackJsonp([1],{

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(112);
var router_1 = __webpack_require__(77);
var mlab_1 = __webpack_require__(406);
var store_1 = __webpack_require__(69);
var authActions = __webpack_require__(407);
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(http, route, store) {
        _super.call(this);
        this.http = http;
        this.route = route;
        this.store = store;
        this.collection = 'users';
    }
    AuthService.prototype.initUser = function () {
        var user = localStorage.getItem('username');
        if (user) {
            this.store.dispatch({ type: authActions.USER_LOADED, payload: user });
        }
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('q', JSON.stringify({ name: username, pwd: password }));
        params.set('fo', 'true');
        return this.http.get(this.getQueryUrl(), { search: params })
            .map(function (result) {
            var data = result.json();
            if (data) {
                localStorage.setItem('username', data.name);
                _this.store.dispatch({ type: authActions.USER_LOADED, payload: data.name });
            }
            else {
                _this.store.dispatch({ type: authActions.USER_ERROR });
            }
            return data;
        });
    };
    AuthService.prototype.logout = function () {
        this.store.dispatch({ type: authActions.USER_LOGOUT });
        localStorage.removeItem('username');
        this.route.navigate(['login']);
    };
    AuthService.prototype.getUser = function () {
        return localStorage.getItem('username');
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.getUser() !== null;
    };
    return AuthService;
}(mlab_1.MLab));
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router,
        store_1.Store])
], AuthService);
exports.AuthService = AuthService;


/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return ActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StoreDevtoolActions; });
var ActionTypes = {
    PERFORM_ACTION: 'PERFORM_ACTION',
    RESET: 'RESET',
    ROLLBACK: 'ROLLBACK',
    COMMIT: 'COMMIT',
    SWEEP: 'SWEEP',
    TOGGLE_ACTION: 'TOGGLE_ACTION',
    SET_ACTIONS_ACTIVE: 'SET_ACTIONS_ACTIVE',
    JUMP_TO_STATE: 'JUMP_TO_STATE',
    IMPORT_STATE: 'IMPORT_STATE'
};
/**
* Action creators to change the History state.
*/
var StoreDevtoolActions = {
    performAction: function (action) {
        if (typeof action.type === 'undefined') {
            throw new Error('Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?');
        }
        return { type: ActionTypes.PERFORM_ACTION, action: action, timestamp: Date.now() };
    },
    reset: function () {
        return { type: ActionTypes.RESET, timestamp: Date.now() };
    },
    rollback: function () {
        return { type: ActionTypes.ROLLBACK, timestamp: Date.now() };
    },
    commit: function () {
        return { type: ActionTypes.COMMIT, timestamp: Date.now() };
    },
    sweep: function () {
        return { type: ActionTypes.SWEEP };
    },
    toggleAction: function (id) {
        return { type: ActionTypes.TOGGLE_ACTION, id: id };
    },
    setActionsActive: function (start, end, active) {
        if (active === void 0) { active = true; }
        return { type: ActionTypes.SET_ACTIONS_ACTIVE, start: start, end: end, active: active };
    },
    jumpToState: function (index) {
        return { type: ActionTypes.JUMP_TO_STATE, index: index };
    },
    importState: function (nextLiftedState) {
        return { type: ActionTypes.IMPORT_STATE, nextLiftedState: nextLiftedState };
    }
};
//# sourceMappingURL=actions.js.map

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_instrument__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_devtools__ = __webpack_require__(337);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "StoreDevtoolsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__src_instrument__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "StoreDevtools", function() { return __WEBPACK_IMPORTED_MODULE_1__src_devtools__["a"]; });


//# sourceMappingURL=index.js.map

/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(147);
/* harmony export (immutable) */ exports["e"] = difference;
/* harmony export (immutable) */ exports["b"] = unliftState;
/* harmony export (immutable) */ exports["a"] = unliftAction;
/* harmony export (immutable) */ exports["d"] = liftAction;
/* harmony export (immutable) */ exports["c"] = applyOperators;

function difference(first, second) {
    return first.filter(function (item) { return second.indexOf(item) < 0; });
}
/**
 * Provides an app's view into the state of the lifted store.
 */
function unliftState(liftedState) {
    var computedStates = liftedState.computedStates, currentStateIndex = liftedState.currentStateIndex;
    var state = computedStates[currentStateIndex].state;
    return state;
}
function unliftAction(liftedState) {
    return liftedState.actionsById[liftedState.nextActionId - 1];
}
/**
* Lifts an app's action into an action on the lifted store.
*/
function liftAction(action) {
    return __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* StoreDevtoolActions */].performAction(action);
}
function applyOperators(input$, operators) {
    return operators.reduce(function (source$, _a) {
        var operator = _a[0], args = _a.slice(1);
        return operator.apply(source$, args);
    }, input$);
}
//# sourceMappingURL=utils.js.map

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DockActions; });

var DockActions = (function () {
    function DockActions() {
    }
    DockActions.prototype.toggleVisibility = function () {
        return { type: DockActions.TOGGLE_VISIBILITY };
    };
    DockActions.prototype.changePosition = function () {
        return { type: DockActions.CHANGE_POSITION };
    };
    DockActions.prototype.changeSize = function (size) {
        return { type: DockActions.CHANGE_SIZE, payload: size };
    };
    DockActions.prototype.changeMonitor = function () {
        return { type: DockActions.CHANGE_MONITOR };
    };
    DockActions.TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY';
    DockActions.CHANGE_POSITION = '@@redux-devtools-log-monitor/CHANGE_POSITION';
    DockActions.CHANGE_SIZE = '@@redux-devtools-log-monitor/CHANGE_SIZE';
    DockActions.CHANGE_MONITOR = '@@redux-devtools-log-monitor/CHANGE_MONITOR';
    DockActions.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    DockActions.ctorParameters = [];
    return DockActions;
}());
//# sourceMappingURL=actions.js.map

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var QueueAction_1 = __webpack_require__(739);
var QueueScheduler_1 = __webpack_require__(740);
exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
//# sourceMappingURL=queue.js.map

/***/ },

/***/ 250:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(112);
var mlab_1 = __webpack_require__(406);
var CoursesService = (function (_super) {
    __extends(CoursesService, _super);
    function CoursesService(http) {
        _super.call(this);
        this.http = http;
        this.collection = 'courses';
    }
    CoursesService.prototype.getList = function () {
        return this.http.get(this.getQueryUrl())
            .map(function (result) { return result.json(); });
    };
    CoursesService.prototype.getCourse = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('q', JSON.stringify({ _id: { $oid: id } }));
        params.set('fo', 'true');
        return this.http.get(this.getQueryUrl(), { search: params })
            .map(function (result) { return result.json(); });
    };
    return CoursesService;
}(mlab_1.MLab));
CoursesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CoursesService);
exports.CoursesService = CoursesService;


/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var pluck_1 = __webpack_require__(392);
var map_1 = __webpack_require__(30);
var distinctUntilChanged_1 = __webpack_require__(387);
function select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    var mapped$;
    if (typeof pathOrMapFn === 'string') {
        mapped$ = pluck_1.pluck.call.apply(pluck_1.pluck, [this, pathOrMapFn].concat(paths));
    }
    else if (typeof pathOrMapFn === 'function') {
        mapped$ = map_1.map.call(this, pathOrMapFn);
    }
    else {
        throw new TypeError(("Unexpected type " + typeof pathOrMapFn + " in select operator,")
            + " expected 'string' or 'function'");
    }
    return distinctUntilChanged_1.distinctUntilChanged.call(mapped$);
}
exports.select = select;


/***/ },

/***/ 336:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return STORE_DEVTOOLS_CONFIG; });

var STORE_DEVTOOLS_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('@ngrx/devtools Options');
//# sourceMappingURL=config.js.map

/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_merge__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_observeOn__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_observeOn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_observeOn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_publishReplay__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_publishReplay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_publishReplay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__extension__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__reducer__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__actions__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__config__ = __webpack_require__(336);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return DevtoolsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StoreDevtools; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};















var DevtoolsDispatcher = (function (_super) {
    __extends(DevtoolsDispatcher, _super);
    function DevtoolsDispatcher() {
        _super.apply(this, arguments);
    }
    DevtoolsDispatcher.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    DevtoolsDispatcher.ctorParameters = [];
    return DevtoolsDispatcher;
}(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Dispatcher"]));
var StoreDevtools = (function () {
    function StoreDevtools(dispatcher, actions$, reducers$, extension, initialState, config) {
        var liftedInitialState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__reducer__["a" /* liftInitialState */])(initialState, config.monitor);
        var liftReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__reducer__["b" /* liftReducerWith */])(initialState, liftedInitialState, config.monitor, {
            maxAge: config.maxAge
        });
        var liftedActions$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils__["c" /* applyOperators */])(actions$, [
            [__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_skip__["skip"], 1],
            [__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_merge__["merge"], extension.actions$],
            [__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__["map"], __WEBPACK_IMPORTED_MODULE_11__utils__["d" /* liftAction */]],
            [__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_merge__["merge"], dispatcher, extension.liftedActions$],
            [__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_observeOn__["observeOn"], __WEBPACK_IMPORTED_MODULE_9_rxjs_scheduler_queue__["queue"]]
        ]);
        var liftedReducers$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__["map"].call(reducers$, liftReducer);
        var liftedState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils__["c" /* applyOperators */])(liftedActions$, [
            [__WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__["withLatestFrom"], liftedReducers$],
            [__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_scan__["scan"], function (liftedState, _a) {
                    var action = _a[0], reducer = _a[1];
                    var nextState = reducer(liftedState, action);
                    extension.notify(action, nextState);
                    return nextState;
                }, liftedInitialState],
            [__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_publishReplay__["publishReplay"], 1]
        ]).refCount();
        var state = __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__["map"].call(liftedState, __WEBPACK_IMPORTED_MODULE_11__utils__["b" /* unliftState */]);
        this.dispatcher = dispatcher;
        this.liftedState = liftedState;
        this.state = state;
    }
    StoreDevtools.prototype.dispatch = function (action) {
        this.dispatcher.dispatch(action);
    };
    StoreDevtools.prototype.next = function (action) {
        this.dispatcher.dispatch(action);
    };
    StoreDevtools.prototype.error = function (error) { };
    StoreDevtools.prototype.complete = function () { };
    StoreDevtools.prototype.performAction = function (action) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].performAction(action));
    };
    StoreDevtools.prototype.reset = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].reset());
    };
    StoreDevtools.prototype.rollback = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].rollback());
    };
    StoreDevtools.prototype.commit = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].commit());
    };
    StoreDevtools.prototype.sweep = function () {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].sweep());
    };
    StoreDevtools.prototype.toggleAction = function (id) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].toggleAction(id));
    };
    StoreDevtools.prototype.jumpToState = function (index) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].jumpToState(index));
    };
    StoreDevtools.prototype.importState = function (nextLiftedState) {
        this.dispatch(__WEBPACK_IMPORTED_MODULE_13__actions__["a" /* StoreDevtoolActions */].importState(nextLiftedState));
    };
    StoreDevtools.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    StoreDevtools.ctorParameters = [
        { type: DevtoolsDispatcher, },
        { type: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Dispatcher"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Reducer"], },
        { type: __WEBPACK_IMPORTED_MODULE_10__extension__["a" /* DevtoolsExtension */], },
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["INITIAL_STATE"],] },] },
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_14__config__["a" /* STORE_DEVTOOLS_CONFIG */],] },] },
    ];
    return StoreDevtools;
}());
//# sourceMappingURL=devtools.js.map

/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(216);
/* unused harmony export ExtensionActionTypes */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return REDUX_DEVTOOLS_EXTENSION; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DevtoolsExtension; });










var ExtensionActionTypes = {
    START: 'START',
    DISPATCH: 'DISPATCH',
    STOP: 'STOP',
    ACTION: 'ACTION'
};
var REDUX_DEVTOOLS_EXTENSION = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Redux Devtools Extension');
var DevtoolsExtension = (function () {
    function DevtoolsExtension(devtoolsExtension) {
        this.instanceId = "ngrx-store-" + Date.now();
        this.devtoolsExtension = devtoolsExtension;
        this.createActionStreams();
    }
    DevtoolsExtension.prototype.notify = function (action, state) {
        if (!this.devtoolsExtension || action.type !== __WEBPACK_IMPORTED_MODULE_8__actions__["b" /* ActionTypes */].PERFORM_ACTION) {
            return;
        }
        this.devtoolsExtension.send(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils__["a" /* unliftAction */])(state), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils__["b" /* unliftState */])(state), false, this.instanceId);
        this.devtoolsExtension.send(null, state, false, this.instanceId);
    };
    DevtoolsExtension.prototype.createChangesObservable = function () {
        var _this = this;
        if (!this.devtoolsExtension) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_empty__["empty"])();
        }
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (subscriber) {
            var connection = _this.devtoolsExtension.connect({ instanceId: _this.instanceId });
            connection.subscribe(function (change) { return subscriber.next(change); });
            return connection.unsubscribe();
        });
    };
    DevtoolsExtension.prototype.createActionStreams = function () {
        // Listens to all changes based on our instanceId
        var changes$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_share__["share"].call(this.createChangesObservable());
        // Listen for the start action
        var start$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"].call(changes$, function (change) { return change.type === ExtensionActionTypes.START; });
        // Listen for the stop action
        var stop$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"].call(changes$, function (change) { return change.type === ExtensionActionTypes.STOP; });
        // Listen for lifted actions
        var liftedActions$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils__["c" /* applyOperators */])(changes$, [
            [__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"], function (change) { return change.type === ExtensionActionTypes.DISPATCH; }],
            [__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"], function (change) { return change.payload; }]
        ]);
        // Listen for unlifted actions
        var actions$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils__["c" /* applyOperators */])(changes$, [
            [__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"], function (change) { return change.type === ExtensionActionTypes.DISPATCH; }],
            [__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"], function (change) { return change.payload; }]
        ]);
        var actionsUntilStop$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__["takeUntil"].call(actions$, stop$);
        var liftedUntilStop$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_takeUntil__["takeUntil"].call(liftedActions$, stop$);
        // Only take the action sources between the start/stop events
        this.actions$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__["switchMap"].call(start$, function () { return actionsUntilStop$; });
        this.liftedActions$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_switchMap__["switchMap"].call(start$, function () { return liftedUntilStop$; });
    };
    DevtoolsExtension.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    DevtoolsExtension.ctorParameters = [
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [REDUX_DEVTOOLS_EXTENSION,] },] },
    ];
    return DevtoolsExtension;
}());
//# sourceMappingURL=extension.js.map

/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commander__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dock__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dock_monitor__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducer__ = __webpack_require__(551);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DockMonitorModule; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__reducer__["a"]; });






var DockMonitorModule = (function () {
    function DockMonitorModule() {
    }
    DockMonitorModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
                    ],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_2__commander__["a" /* CommanderComponent */],
                        __WEBPACK_IMPORTED_MODULE_3__dock__["a" /* DockComponent */],
                        __WEBPACK_IMPORTED_MODULE_4__dock_monitor__["a" /* DockMonitorComponent */]
                    ],
                    providers: [
                        __WEBPACK_IMPORTED_MODULE_5__actions__["a" /* DockActions */]
                    ],
                    exports: [
                        __WEBPACK_IMPORTED_MODULE_4__dock_monitor__["a" /* DockMonitorComponent */]
                    ]
                },] },
    ];
    /** @nocollapse */
    DockMonitorModule.ctorParameters = [];
    return DockMonitorModule;
}());

//# sourceMappingURL=index.js.map

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__);
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return KNOWN; });
/* harmony export (immutable) */ exports["b"] = getTypeOf;
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return getLabelFor; });
/* harmony export (immutable) */ exports["d"] = getChildrenFor;

var KNOWN = {
    Array: 'array',
    Object: 'object',
    Null: 'null',
    Undefined: 'undefined',
    Boolean: 'boolean',
    Number: 'number',
    String: 'string',
    Symbol: 'symbol',
    Function: 'function',
    Iterable: 'iterable'
};
function getTypeOf(object) {
    var literalType = typeof object;
    if (literalType === 'object') {
        if (Array.isArray(object)) {
            return KNOWN.Array;
        }
        if (object === null) {
            return KNOWN.Null;
        }
        if (typeof object[Symbol.iterator] === 'function') {
            return KNOWN.Iterable;
        }
    }
    return literalType;
}
var arrayLength = function (value) { return value.length; };
var lengthLabel = function (single, plural) { return function (length) { return (length + " " + (length === 1 ? single : plural)); }; };
var typeIndicator = function (typeIndicator) { return function (input) { return (typeIndicator + " " + input); }; };
var typeIdentity = function (type) { return function () { return type; }; };
var withQuotes = function (val) { return ("\"" + val + "\""); };
var toString = function (val) { return val.toString(); };
var iterableToArray = function (value) { return Array.from(value); };
var labelFactoriesForTypes = (_a = {},
    _a[KNOWN.Array] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__["compose"])(typeIndicator('[]'), lengthLabel('item', 'items'), arrayLength),
    _a[KNOWN.Object] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__["compose"])(typeIndicator('{}'), lengthLabel('key', 'keys'), arrayLength, Object.getOwnPropertyNames),
    _a[KNOWN.Null] = typeIdentity(KNOWN.Null),
    _a[KNOWN.Undefined] = typeIdentity(KNOWN.Undefined),
    _a[KNOWN.Boolean] = function (val) { return val ? 'true' : 'false'; },
    _a[KNOWN.Number] = toString,
    _a[KNOWN.String] = withQuotes,
    _a[KNOWN.Symbol] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__["compose"])(withQuotes, toString),
    _a[KNOWN.Function] = typeIdentity(KNOWN.Function),
    _a[KNOWN.Iterable] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__["compose"])(typeIndicator('()'), lengthLabel('entry', 'entries'), arrayLength, iterableToArray),
    _a
);
var lookupLabelForType = function (type) { return labelFactoriesForTypes[type]; };
var getLabelFor = function (object) { return labelFactoriesForTypes[getTypeOf(object)](object); };
function getChildrenFor(object) {
    var literalType = getTypeOf(object);
    if (literalType === KNOWN.Object) {
        return Object.getOwnPropertyNames(object).map(function (name) {
            return { key: name, value: object[name] };
        });
    }
    else if (literalType === KNOWN.Array) {
        return object.map(function (value, index) {
            return { key: index, value: value };
        });
    }
    else if (literalType === KNOWN.Iterable) {
        return Array.from(object).map(function (value, index) {
            return { key: index, value: value };
        });
    }
    throw new TypeError("Tried to get children for non-enumerable type \"" + literalType + "\"");
}
var _a;
//# sourceMappingURL=types.js.map

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Dispatcher; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Dispatcher = (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        _super.call(this, { type: Dispatcher.INIT });
    }
    Dispatcher.prototype.dispatch = function (action) {
        this.next(action);
    };
    Dispatcher.prototype.complete = function () {
        // noop
    };
    Dispatcher.INIT = '@ngrx/store/init';
    return Dispatcher;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]));
//# sourceMappingURL=dispatcher.js.map

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Reducer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Reducer = (function (_super) {
    __extends(Reducer, _super);
    function Reducer(_dispatcher, initialReducer) {
        _super.call(this, initialReducer);
        this._dispatcher = _dispatcher;
    }
    Reducer.prototype.replaceReducer = function (reducer) {
        this.next(reducer);
    };
    Reducer.prototype.next = function (reducer) {
        _super.prototype.next.call(this, reducer);
        this._dispatcher.dispatch({ type: Reducer.REPLACE });
    };
    Reducer.REPLACE = '@ngrx/store/replace-reducer';
    return Reducer;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]));
//# sourceMappingURL=reducer.js.map

/***/ },

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return State; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





var State = (function (_super) {
    __extends(State, _super);
    function State(_initialState, action$, reducer$) {
        var _this = this;
        _super.call(this, _initialState);
        var actionInQueue$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_observeOn__["observeOn"].call(action$, __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_queue__["queue"]);
        var actionAndReducer$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_withLatestFrom__["withLatestFrom"].call(actionInQueue$, reducer$);
        var state$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_scan__["scan"].call(actionAndReducer$, function (state, _a) {
            var action = _a[0], reducer = _a[1];
            return reducer(state, action);
        }, _initialState);
        state$.subscribe(function (value) { return _this.next(value); });
    }
    return State;
}(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]));
//# sourceMappingURL=state.js.map

/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Store; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var Store = (function (_super) {
    __extends(Store, _super);
    function Store(_dispatcher, _reducer, state$) {
        _super.call(this);
        this._dispatcher = _dispatcher;
        this._reducer = _reducer;
        this.select = __WEBPACK_IMPORTED_MODULE_0__ngrx_core__["a" /* select */].bind(this);
        this.source = state$;
    }
    Store.prototype.lift = function (operator) {
        var store = new Store(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    Store.prototype.replaceReducer = function (reducer) {
        this._reducer.next(reducer);
    };
    Store.prototype.dispatch = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.next = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.error = function (err) {
        this._dispatcher.error(err);
    };
    Store.prototype.complete = function () {
        // noop
    };
    return Store;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]));
//# sourceMappingURL=store.js.map

/***/ },

/***/ 345:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = combineReducers;
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i];
            var reducer = finalReducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
//# sourceMappingURL=utils.js.map

/***/ },

/***/ 346:
/***/ function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(54);
var Observable_1 = __webpack_require__(10);
var Subscriber_1 = __webpack_require__(19);
var Subscription_1 = __webpack_require__(109);
/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return this.lift(new RefCountOperator(this));
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
var ConnectableSubscriber = (function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject_1.SubjectSubscriber));
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source._subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's dowstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ConnectableObservable.js.map

/***/ },

/***/ 387:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(19);
var tryCatch_1 = __webpack_require__(400);
var errorObject_1 = __webpack_require__(248);
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If a comparator function is not provided, an equality check is used by default.
 * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },

/***/ 389:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(19);
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctKey}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
        this.predicate = predicate;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=filter.js.map

/***/ },

/***/ 390:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ArrayObservable_1 = __webpack_require__(239);
var mergeAll_1 = __webpack_require__(158);
var isScheduler_1 = __webpack_require__(399);
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return mergeStatic.apply(this, observables);
}
exports.merge = merge;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} input1 An input Observable to merge with others.
 * @param {Observable} input2 An input Observable to merge with others.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (observables.length === 1) {
        return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
}
exports.mergeStatic = mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ },

/***/ 391:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var MulticastObservable_1 = __webpack_require__(724);
var ConnectableObservable_1 = __webpack_require__(382);
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} an Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
    }
    else {
        subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
        };
    }
    return !selector ?
        new ConnectableObservable_1.ConnectableObservable(this, subjectFactory) :
        new MulticastObservable_1.MulticastObservable(this, subjectFactory, selector);
}
exports.multicast = multicast;
//# sourceMappingURL=multicast.js.map

/***/ },

/***/ 392:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var map_1 = __webpack_require__(30);
/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * @example <caption>Map every every click to the tagName of the clicked target element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {...string} properties The nested properties to pluck from each source
 * value (an object).
 * @return {Observable} Returns a new Observable of property values from the
 * source values.
 * @method pluck
 * @owner Observable
 */
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
}
exports.pluck = pluck;
function plucker(props, length) {
    var mapper = function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
//# sourceMappingURL=pluck.js.map

/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(19);
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    return this.lift(new ScanOperator(accumulator, seed));
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed) {
        this.accumulator = accumulator;
        this.seed = seed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
    };
    return ScanOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, seed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.index = 0;
        this.accumulatorSet = false;
        this.seed = seed;
        this.accumulatorSet = typeof seed !== 'undefined';
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.accumulatorSet = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.accumulatorSet) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=scan.js.map

/***/ },

/***/ 395:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(87);
var subscribeToResult_1 = __webpack_require__(88);
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 *
 * @param {Observable} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Function} [project] Projection function for combining values
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method withLatestFrom
 * @owner Observable
 */
function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var project;
    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
}
exports.withLatestFrom = withLatestFrom;
/* tslint:enable:max-line-length */
var WithLatestFromOperator = (function () {
    function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var WithLatestFromSubscriber = (function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        _super.call(this, destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        var len = observables.length;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
                this._tryProject(args);
            }
            else {
                this.destination.next(args);
            }
        }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return WithLatestFromSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=withLatestFrom.js.map

/***/ },

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__(77);
var loggedin_guard_1 = __webpack_require__(402);
var login_component_1 = __webpack_require__(405);
var courses_component_1 = __webpack_require__(403);
var edit_course_component_1 = __webpack_require__(404);
var appRoutes = [
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'courses', component: courses_component_1.CoursesComponent, canActivate: [loggedin_guard_1.LoggedInGuard] },
    { path: 'courses/:id', component: edit_course_component_1.EditCourseComponent, canActivate: [loggedin_guard_1.LoggedInGuard] },
    { path: 'login', component: login_component_1.LoginComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });


/***/ },

/***/ 402:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__(77);
var auth_service_1 = __webpack_require__(111);
var core_1 = __webpack_require__(0);
var LoggedInGuard = (function () {
    function LoggedInGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function () {
        var isLoggedIn = this.authService.isLoggedIn();
        if (!isLoggedIn) {
            this.router.navigate(['login']);
        }
        return isLoggedIn;
    };
    return LoggedInGuard;
}());
LoggedInGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router])
], LoggedInGuard);
exports.LoggedInGuard = LoggedInGuard;


/***/ },

/***/ 403:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var courses_service_1 = __webpack_require__(250);
var CoursesComponent = (function () {
    function CoursesComponent(coursesService) {
        this.coursesService = coursesService;
    }
    CoursesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.coursesService
            .getList()
            .subscribe(function (res) { return _this.renderCourses(res); });
    };
    CoursesComponent.prototype.renderCourses = function (data) {
        this.list = data;
    };
    return CoursesComponent;
}());
CoursesComponent = __decorate([
    core_1.Component({
        selector: 'courses',
        template: __webpack_require__(707),
    }),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesComponent);
exports.CoursesComponent = CoursesComponent;


/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var courses_service_1 = __webpack_require__(250);
var router_1 = __webpack_require__(77);
var common_1 = __webpack_require__(37);
var EditCourseComponent = (function () {
    function EditCourseComponent(route, coursesService, location) {
        this.route = route;
        this.coursesService = coursesService;
        this.location = location;
        this.id = '';
        this.mode = 'Edit';
    }
    EditCourseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            if (_this.id !== 'new') {
                _this.getCourse();
            }
            else {
                _this.mode = 'Add';
                _this.renderCourse({
                    title: '',
                    description: '',
                    img: ''
                });
            }
        });
    };
    EditCourseComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    EditCourseComponent.prototype.getCourse = function () {
        var _this = this;
        this.coursesService
            .getCourse(this.id)
            .subscribe(function (res) { return _this.renderCourse(res); });
    };
    EditCourseComponent.prototype.renderCourse = function (data) {
        this.course = data;
    };
    EditCourseComponent.prototype.goBack = function () {
        this.location.back();
    };
    return EditCourseComponent;
}());
EditCourseComponent = __decorate([
    core_1.Component({
        selector: 'home',
        template: __webpack_require__(708),
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        courses_service_1.CoursesService,
        common_1.Location])
], EditCourseComponent);
exports.EditCourseComponent = EditCourseComponent;


/***/ },

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var auth_service_1 = __webpack_require__(111);
var md5 = __webpack_require__(711);
var router_1 = __webpack_require__(77);
var forms_1 = __webpack_require__(160);
var LoginComponent = (function () {
    function LoginComponent(authService, router, fb) {
        this.authService = authService;
        this.router = router;
        this.fb = fb;
        this.message = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            login: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern('[A-Za-z]+')
                ]
            ],
            password: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern('[A-Za-z0-9]+')
                ]
            ]
        });
    };
    LoginComponent.prototype.showError = function (fieldName, validator) {
        var field = this.loginForm.controls[fieldName];
        return field.touched && (validator ? field.hasError(validator) : !field.valid);
    };
    LoginComponent.prototype.logIn = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            return;
        }
        this.authService.login(this.loginForm.value.login, md5(this.loginForm.value.password))
            .subscribe(function (res) {
            if (res) {
                _this.router.navigate(['courses']);
            }
            else {
                _this.message = 'Incorrect credentials';
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        template: __webpack_require__(709),
        styles: [__webpack_require__(713)],
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router,
        forms_1.FormBuilder])
], LoginComponent);
exports.LoginComponent = LoginComponent;


/***/ },

/***/ 406:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
__webpack_require__(720);
var MLab = (function () {
    function MLab() {
        this.baseUrl = 'https://api.mlab.com/api/1/databases';
        this.apiKey = 'hlrhBvtVSrE1yzYRCfG4A4Q4ZaA00mn9';
        this.db = 'angular2_db';
        this.collection = '';
    }
    MLab.prototype.getQueryUrl = function () {
        return this.baseUrl + "/" + this.db + "/collections/" + this.collection + "?apiKey=" + this.apiKey;
    };
    return MLab;
}());
exports.MLab = MLab;


/***/ },

/***/ 407:
/***/ function(module, exports) {

"use strict";
"use strict";
exports.USER_LOADED = 'USER_LOADED';
exports.USER_LOGOUT = 'USER_LOGOUT';
exports.USER_ERROR = 'USER_ERROR';


/***/ },

/***/ 427:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 428:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(89);
var http_1 = __webpack_require__(112);
var forms_1 = __webpack_require__(160);
var store_1 = __webpack_require__(69);
var store_devtools_1 = __webpack_require__(215);
var store_log_monitor_1 = __webpack_require__(546);
var app_component_1 = __webpack_require__(744);
var app_routes_1 = __webpack_require__(401);
var loggedin_guard_1 = __webpack_require__(402);
var auth_service_1 = __webpack_require__(111);
var store_2 = __webpack_require__(749);
var courses_module_1 = __webpack_require__(747);
var login_component_1 = __webpack_require__(405);
var header_component_1 = __webpack_require__(745);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            courses_module_1.CoursesModule,
            app_routes_1.routing,
            store_1.StoreModule.provideStore(store_2.reducers),
            store_devtools_1.StoreDevtoolsModule.instrumentStore({
                monitor: store_log_monitor_1.useLogMonitor({
                    visible: false,
                    position: 'right'
                })
            }),
            store_log_monitor_1.StoreLogMonitorModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            header_component_1.AppHeaderComponent,
            login_component_1.LoginComponent
        ],
        providers: [
            loggedin_guard_1.LoggedInGuard,
            auth_service_1.AuthService
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;


/***/ },

/***/ 538:
/***/ function(module, exports) {

"use strict";
"use strict";
exports.compose = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i - 0] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var last = functions[functions.length - 1];
        var rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
};


/***/ },

/***/ 539:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_operator_enterZone__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_operator_leaveZone__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_operator_select__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_compose__ = __webpack_require__(540);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_operator_select__["a"]; });
/* unused harmony namespace reexport */




//# sourceMappingURL=index.js.map

/***/ },

/***/ 540:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export compose */
var compose = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i - 0] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var last = functions[functions.length - 1];
        var rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
};
//# sourceMappingURL=compose.js.map

/***/ },

/***/ 541:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__);
/* unused harmony export enterZone */
/* unused harmony export EnterZoneOperator */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function enterZone(zone) {
    return this.lift(new EnterZoneOperator(zone));
}
var EnterZoneOperator = (function () {
    function EnterZoneOperator(_zone) {
        this._zone = _zone;
    }
    EnterZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new EnterZoneSubscriber(subscriber, this._zone));
    };
    return EnterZoneOperator;
}());
var EnterZoneSubscriber = (function (_super) {
    __extends(EnterZoneSubscriber, _super);
    function EnterZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    EnterZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.run(function () { return _this.destination.next(value); });
    };
    return EnterZoneSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__["Subscriber"]));
//# sourceMappingURL=enterZone.js.map

/***/ },

/***/ 542:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__);
/* unused harmony export leaveZone */
/* unused harmony export LeaveZoneOperator */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function leaveZone(zone) {
    return this.lift(new LeaveZoneOperator(zone));
}
var LeaveZoneOperator = (function () {
    function LeaveZoneOperator(_zone) {
        this._zone = _zone;
    }
    LeaveZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new LeaveZoneSubscriber(subscriber, this._zone));
    };
    return LeaveZoneOperator;
}());
var LeaveZoneSubscriber = (function (_super) {
    __extends(LeaveZoneSubscriber, _super);
    function LeaveZoneSubscriber(destination, _zone) {
        _super.call(this, destination);
        this._zone = _zone;
    }
    LeaveZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this._zone.runOutsideAngular(function () { return _this.destination.next(value); });
    };
    return LeaveZoneSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subscriber__["Subscriber"]));
//# sourceMappingURL=leaveZone.js.map

/***/ },

/***/ 543:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__);
/* harmony export (immutable) */ exports["a"] = select;



function select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    var mapped$;
    if (typeof pathOrMapFn === 'string') {
        mapped$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__["pluck"].call.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs_operator_pluck__["pluck"], [this, pathOrMapFn].concat(paths));
    }
    else if (typeof pathOrMapFn === 'function') {
        mapped$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__["map"].call(this, pathOrMapFn);
    }
    else {
        throw new TypeError(("Unexpected type " + typeof pathOrMapFn + " in select operator,")
            + " expected 'string' or 'function'");
    }
    return __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_distinctUntilChanged__["distinctUntilChanged"].call(mapped$);
}
//# sourceMappingURL=select.js.map

/***/ },

/***/ 544:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__devtools__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__extension__ = __webpack_require__(338);
/* unused harmony export _createReduxDevtoolsExtension */
/* unused harmony export _createState */
/* unused harmony export _createReducer */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StoreDevtoolsModule; });





function _createReduxDevtoolsExtension() {
    if (typeof window !== 'undefined' && window.devToolsExtension) {
        return window.devtoolsExtension;
    }
    return null;
}
function _createState(devtools) {
    return devtools.state;
}
function _createReducer(dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["Reducer"](dispatcher, reducer);
}
var StoreDevtoolsModule = (function () {
    function StoreDevtoolsModule() {
    }
    StoreDevtoolsModule.instrumentStore = function (_options) {
        if (_options === void 0) { _options = {}; }
        var DEFAULT_OPTIONS = {
            monitor: function () { return null; }
        };
        var options = Object.assign({}, DEFAULT_OPTIONS, _options);
        if (options.maxAge && options.maxAge < 2) {
            throw new Error("Devtools 'maxAge' cannot be less than 2, got " + options.maxAge);
        }
        return {
            ngModule: StoreDevtoolsModule,
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["State"],
                    deps: [__WEBPACK_IMPORTED_MODULE_2__devtools__["a" /* StoreDevtools */]],
                    useFactory: _createState
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["Reducer"],
                    deps: [__WEBPACK_IMPORTED_MODULE_2__devtools__["b" /* DevtoolsDispatcher */], __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["INITIAL_REDUCER"]],
                    useFactory: _createReducer
                },
                { provide: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* STORE_DEVTOOLS_CONFIG */], useValue: options }
            ]
        };
    };
    StoreDevtoolsModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["StoreModule"]
                    ],
                    providers: [
                        __WEBPACK_IMPORTED_MODULE_4__extension__["a" /* DevtoolsExtension */],
                        __WEBPACK_IMPORTED_MODULE_2__devtools__["b" /* DevtoolsDispatcher */],
                        __WEBPACK_IMPORTED_MODULE_2__devtools__["a" /* StoreDevtools */],
                        {
                            provide: __WEBPACK_IMPORTED_MODULE_4__extension__["b" /* REDUX_DEVTOOLS_EXTENSION */],
                            useFactory: _createReduxDevtoolsExtension
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    StoreDevtoolsModule.ctorParameters = [];
    return StoreDevtoolsModule;
}());
//# sourceMappingURL=instrument.js.map

/***/ },

/***/ 545:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(147);
/* unused harmony export INIT_ACTION */
/* harmony export (immutable) */ exports["a"] = liftInitialState;
/* harmony export (immutable) */ exports["b"] = liftReducerWith;



var INIT_ACTION = { type: __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["Dispatcher"].INIT };
/**
* Computes the next entry in the log by applying an action.
*/
function computeNextEntry(reducer, action, state, error) {
    if (error) {
        return {
            state: state,
            error: 'Interrupted by an error up the chain'
        };
    }
    var nextState = state;
    var nextError;
    try {
        nextState = reducer(state, action);
    }
    catch (err) {
        nextError = err.toString();
        console.error(err.stack || err);
    }
    return {
        state: nextState,
        error: nextError
    };
}
/**
* Runs the reducer on invalidated actions to get a fresh computation log.
*/
function recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds) {
    // Optimization: exit early and return the same reference
    // if we know nothing could have changed.
    if (minInvalidatedStateIndex >= computedStates.length &&
        computedStates.length === stagedActionIds.length) {
        return computedStates;
    }
    var nextComputedStates = computedStates.slice(0, minInvalidatedStateIndex);
    for (var i = minInvalidatedStateIndex; i < stagedActionIds.length; i++) {
        var actionId = stagedActionIds[i];
        var action = actionsById[actionId].action;
        var previousEntry = nextComputedStates[i - 1];
        var previousState = previousEntry ? previousEntry.state : committedState;
        var previousError = previousEntry ? previousEntry.error : undefined;
        var shouldSkip = skippedActionIds.indexOf(actionId) > -1;
        var entry = shouldSkip ?
            previousEntry :
            computeNextEntry(reducer, action, previousState, previousError);
        nextComputedStates.push(entry);
    }
    return nextComputedStates;
}
function liftInitialState(initialCommittedState, monitorReducer) {
    return {
        monitorState: monitorReducer(undefined, {}),
        nextActionId: 1,
        actionsById: { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* liftAction */])(INIT_ACTION) },
        stagedActionIds: [0],
        skippedActionIds: [],
        committedState: initialCommittedState,
        currentStateIndex: 0,
        computedStates: []
    };
}
/**
* Creates a history state reducer from an app's reducer.
*/
function liftReducerWith(initialCommittedState, initialLiftedState, monitorReducer, options) {
    if (options === void 0) { options = {}; }
    /**
    * Manages how the history actions modify the history state.
    */
    return function (reducer) { return function (liftedState, liftedAction) {
        var _a = liftedState || initialLiftedState, monitorState = _a.monitorState, actionsById = _a.actionsById, nextActionId = _a.nextActionId, stagedActionIds = _a.stagedActionIds, skippedActionIds = _a.skippedActionIds, committedState = _a.committedState, currentStateIndex = _a.currentStateIndex, computedStates = _a.computedStates;
        if (!liftedState) {
            // Prevent mutating initialLiftedState
            actionsById = Object.create(actionsById);
        }
        function commitExcessActions(n) {
            // Auto-commits n-number of excess actions.
            var excess = n;
            var idsToDelete = stagedActionIds.slice(1, excess + 1);
            for (var i = 0; i < idsToDelete.length; i++) {
                if (computedStates[i + 1].error) {
                    // Stop if error is found. Commit actions up to error.
                    excess = i;
                    idsToDelete = stagedActionIds.slice(1, excess + 1);
                    break;
                }
                else {
                    delete actionsById[idsToDelete[i]];
                }
            }
            skippedActionIds = skippedActionIds.filter(function (id) { return idsToDelete.indexOf(id) === -1; });
            stagedActionIds = [0].concat(stagedActionIds.slice(excess + 1));
            committedState = computedStates[excess].state;
            computedStates = computedStates.slice(excess);
            currentStateIndex = currentStateIndex > excess
                ? currentStateIndex - excess
                : 0;
        }
        // By default, agressively recompute every state whatever happens.
        // This has O(n) performance, so we'll override this to a sensible
        // value whenever we feel like we don't have to recompute the states.
        var minInvalidatedStateIndex = 0;
        switch (liftedAction.type) {
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].RESET: {
                // Get back to the state the store was created with.
                actionsById = { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* liftAction */])(INIT_ACTION) };
                nextActionId = 1;
                stagedActionIds = [0];
                skippedActionIds = [];
                committedState = initialCommittedState;
                currentStateIndex = 0;
                computedStates = [];
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].COMMIT: {
                // Consider the last committed state the new starting point.
                // Squash any staged actions into a single committed state.
                actionsById = { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* liftAction */])(INIT_ACTION) };
                nextActionId = 1;
                stagedActionIds = [0];
                skippedActionIds = [];
                committedState = computedStates[currentStateIndex].state;
                currentStateIndex = 0;
                computedStates = [];
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].ROLLBACK: {
                // Forget about any staged actions.
                // Start again from the last committed state.
                actionsById = { 0: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* liftAction */])(INIT_ACTION) };
                nextActionId = 1;
                stagedActionIds = [0];
                skippedActionIds = [];
                currentStateIndex = 0;
                computedStates = [];
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].TOGGLE_ACTION: {
                // Toggle whether an action with given ID is skipped.
                // Being skipped means it is a no-op during the computation.
                var actionId_1 = liftedAction.id;
                var index = skippedActionIds.indexOf(actionId_1);
                if (index === -1) {
                    skippedActionIds = [actionId_1].concat(skippedActionIds);
                }
                else {
                    skippedActionIds = skippedActionIds.filter(function (id) { return id !== actionId_1; });
                }
                // Optimization: we know history before this action hasn't changed
                minInvalidatedStateIndex = stagedActionIds.indexOf(actionId_1);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].SET_ACTIONS_ACTIVE: {
                // Toggle whether an action with given ID is skipped.
                // Being skipped means it is a no-op during the computation.
                var start = liftedAction.start, end = liftedAction.end, active = liftedAction.active;
                var actionIds = [];
                for (var i = start; i < end; i++)
                    actionIds.push(i);
                if (active) {
                    skippedActionIds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* difference */])(skippedActionIds, actionIds);
                }
                else {
                    skippedActionIds = skippedActionIds.concat(actionIds);
                }
                // Optimization: we know history before this action hasn't changed
                minInvalidatedStateIndex = stagedActionIds.indexOf(start);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].JUMP_TO_STATE: {
                // Without recomputing anything, move the pointer that tell us
                // which state is considered the current one. Useful for sliders.
                currentStateIndex = liftedAction.index;
                // Optimization: we know the history has not changed.
                minInvalidatedStateIndex = Infinity;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].SWEEP: {
                // Forget any actions that are currently being skipped.
                stagedActionIds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* difference */])(stagedActionIds, skippedActionIds);
                skippedActionIds = [];
                currentStateIndex = Math.min(currentStateIndex, stagedActionIds.length - 1);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].PERFORM_ACTION: {
                // Auto-commit as new actions come in.
                if (options.maxAge && stagedActionIds.length === options.maxAge) {
                    commitExcessActions(1);
                }
                if (currentStateIndex === stagedActionIds.length - 1) {
                    currentStateIndex++;
                }
                var actionId = nextActionId++;
                // Mutation! This is the hottest path, and we optimize on purpose.
                // It is safe because we set a new key in a cache dictionary.
                actionsById[actionId] = liftedAction;
                stagedActionIds = stagedActionIds.concat([actionId]);
                // Optimization: we know that only the new action needs computing.
                minInvalidatedStateIndex = stagedActionIds.length - 1;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__actions__["b" /* ActionTypes */].IMPORT_STATE: {
                // Completely replace everything.
                (_b = liftedAction.nextLiftedState, monitorState = _b.monitorState, actionsById = _b.actionsById, nextActionId = _b.nextActionId, stagedActionIds = _b.stagedActionIds, skippedActionIds = _b.skippedActionIds, committedState = _b.committedState, currentStateIndex = _b.currentStateIndex, computedStates = _b.computedStates, _b);
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["Reducer"].REPLACE:
            case __WEBPACK_IMPORTED_MODULE_0__ngrx_store__["Dispatcher"].INIT: {
                // Always recompute states on hot reload and init.
                minInvalidatedStateIndex = 0;
                if (options.maxAge && stagedActionIds.length > options.maxAge) {
                    // States must be recomputed before committing excess.
                    computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds);
                    commitExcessActions(stagedActionIds.length - options.maxAge);
                    // Avoid double computation.
                    minInvalidatedStateIndex = Infinity;
                }
                break;
            }
            default: {
                // If the action is not recognized, it's a monitor action.
                // Optimization: a monitor action can't change history.
                minInvalidatedStateIndex = Infinity;
                break;
            }
        }
        computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds);
        monitorState = monitorReducer(monitorState, liftedAction);
        return {
            monitorState: monitorState,
            actionsById: actionsById,
            nextActionId: nextActionId,
            stagedActionIds: stagedActionIds,
            skippedActionIds: skippedActionIds,
            committedState: committedState,
            currentStateIndex: currentStateIndex,
            computedStates: computedStates
        };
        var _b;
    }; };
}
//# sourceMappingURL=reducer.js.map

/***/ },

/***/ 546:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_dock_monitor_index__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_log_monitor_index__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_store_log_monitor__ = __webpack_require__(559);
/* harmony export (binding) */ __webpack_require__.d(exports, "StoreLogMonitorModule", function() { return StoreLogMonitorModule; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "useLogMonitor", function() { return __WEBPACK_IMPORTED_MODULE_2__src_dock_monitor_index__["b"]; });





var StoreLogMonitorModule = (function () {
    function StoreLogMonitorModule() {
    }
    StoreLogMonitorModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                        __WEBPACK_IMPORTED_MODULE_2__src_dock_monitor_index__["a" /* DockMonitorModule */],
                        __WEBPACK_IMPORTED_MODULE_3__src_log_monitor_index__["a" /* LogMonitorModule */]
                    ],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_4__src_store_log_monitor__["a" /* StoreLogMonitorComponent */]
                    ],
                    exports: [
                        __WEBPACK_IMPORTED_MODULE_4__src_store_log_monitor__["a" /* StoreLogMonitorComponent */]
                    ]
                },] },
    ];
    /** @nocollapse */
    StoreLogMonitorModule.ctorParameters = [];
    return StoreLogMonitorModule;
}());

//# sourceMappingURL=index.js.map

/***/ },

/***/ 547:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_filter__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keycodes__ = __webpack_require__(550);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CommanderComponent; });




var CommanderComponent = (function () {
    function CommanderComponent() {
        var _this = this;
        this.keydown$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._ignoreTags = ['INPUT', 'SELECT', 'TEXTAREA'];
        this.keydown$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        var filtered$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_filter__["filter"].call(this.keydown$, function (e) {
            if (_this._ignoreTags.indexOf(e.target.tagName) !== -1) {
                return false;
            }
            if (e.target.isContentEditable) {
                return false;
            }
            var command = _this.parseCommand(_this.shortcut);
            if (!command) {
                return false;
            }
            var charCode = e.keyCode || e.which;
            var char = String.fromCharCode(charCode);
            return command.name.toUpperCase() === char.toUpperCase() &&
                command.alt === e.altKey &&
                command.ctrl === e.ctrlKey &&
                command.meta === e.metaKey &&
                command.shift === e.shiftKey;
        });
        this.command = __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__["map"].call(filtered$, function (e) {
            e.preventDefault();
            return { command: _this.shortcut };
        });
    }
    CommanderComponent.prototype.parseCommand = function (s) {
        var keyString = s.trim().toLowerCase();
        if (!/^(ctrl-|shift-|alt-|meta-){0,4}\w+$/.test(keyString)) {
            throw new Error('The string to parse needs to be of the format "c", "ctrl-c", "shift-ctrl-c".');
        }
        var parts = keyString.split('-');
        var key = {
            ctrl: false,
            meta: false,
            shift: false,
            alt: false
        };
        var c;
        key.name = parts.pop();
        while ((c = parts.pop())) {
            key[c] = true;
        }
        if (key.ctrl) {
            key.sequence = __WEBPACK_IMPORTED_MODULE_3__keycodes__["a" /* KEYCODES */].ctrl[key.name] || key.name;
        }
        else {
            key.sequence = __WEBPACK_IMPORTED_MODULE_3__keycodes__["a" /* KEYCODES */].nomod[key.name] || key.name;
        }
        if (key.shift && key.sequence && key.sequence.length === 1) {
            key.sequence = key.sequence.toUpperCase();
        }
        return key;
    };
    CommanderComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngrx-commander',
                    template: '',
                    styles: [':host{ display: none }'],
                    host: {
                        '(document:keydown)': 'keydown$.emit($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    CommanderComponent.ctorParameters = [];
    CommanderComponent.propDecorators = {
        'shortcut': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'command': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return CommanderComponent;
}());
//# sourceMappingURL=commander.js.map

/***/ },

/***/ 548:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_core_operator_select__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_core_operator_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_core_operator_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store_devtools__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions__ = __webpack_require__(217);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DockMonitorComponent; });






var DockMonitorComponent = (function () {
    function DockMonitorComponent(tools, actions) {
        this.state$ = __WEBPACK_IMPORTED_MODULE_1__ngrx_core_operator_select__["select"].call(tools.liftedState, function (s) { return s.monitorState; });
        this.visible$ = __WEBPACK_IMPORTED_MODULE_1__ngrx_core_operator_select__["select"].call(this.state$, function (s) { return s.visible; });
        this.position$ = __WEBPACK_IMPORTED_MODULE_1__ngrx_core_operator_select__["select"].call(this.state$, function (s) { return s.position; });
        this.size$ = __WEBPACK_IMPORTED_MODULE_1__ngrx_core_operator_select__["select"].call(this.state$, function (s) { return s.size; });
        this.toggle$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.changePosition$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.actionsSubscription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_merge__["merge"])(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"].call(this.toggle$, function () { return actions.toggleVisibility(); }), __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"].call(this.changePosition$, function () { return actions.changePosition(); })).subscribe(tools);
    }
    DockMonitorComponent.prototype.ngOnDestroy = function () {
        this.actionsSubscription.unsubscribe();
    };
    DockMonitorComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'dock-monitor',
                    changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
                    template: "\n    <ngrx-commander [shortcut]=\"toggleCommand\" (command)=\"toggle$.emit($event)\"></ngrx-commander>\n    <ngrx-commander [shortcut]=\"positionCommand\" (command)=\"changePosition$.emit($event)\"></ngrx-commander>\n\n    <ngrx-dock [visible]=\"visible$ | async\" [position]=\"position$ | async\" [size]=\"size$ | async\">\n      <ng-content></ng-content>\n    </ngrx-dock>\n  "
                },] },
    ];
    /** @nocollapse */
    DockMonitorComponent.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_2__ngrx_store_devtools__["StoreDevtools"], },
        { type: __WEBPACK_IMPORTED_MODULE_5__actions__["a" /* DockActions */], },
    ];
    DockMonitorComponent.propDecorators = {
        'toggleCommand': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'positionCommand': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return DockMonitorComponent;
}());
//# sourceMappingURL=dock-monitor.js.map

/***/ },

/***/ 549:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DockComponent; });

var DockComponent = (function () {
    function DockComponent() {
        this.position = 'right';
        this.size = 0.3;
        this.visible = true;
    }
    Object.defineProperty(DockComponent.prototype, "absoluteSize", {
        get: function () {
            return 100 * this.size + "%";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "restSize", {
        get: function () {
            return (100 - (100 * this.size)) + "%";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "leftPosition", {
        get: function () {
            return this.calculatePosition('left', 'right');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "rightPosition", {
        get: function () {
            return this.calculatePosition('right', 'left');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "topPosition", {
        get: function () {
            return this.calculatePosition('top', 'bottom');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DockComponent.prototype, "bottomPosition", {
        get: function () {
            return this.calculatePosition('bottom', 'top');
        },
        enumerable: true,
        configurable: true
    });
    DockComponent.prototype.calculatePosition = function (primary, secondary) {
        if (this.visible) {
            switch (this.position) {
                case secondary:
                    return this.restSize;
                default:
                    return '0%';
            }
        }
        else {
            switch (this.position) {
                case primary:
                    return "-" + this.absoluteSize;
                case secondary:
                    return '100%';
                default:
                    return '0%';
            }
        }
    };
    DockComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngrx-dock',
                    template: "\n    <div class=\"dock\">\n      <div class=\"dock-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                    styles: ["\n    :host {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      transition: all 0.3s;\n      z-index: 9999;\n    }\n\n    .dock {\n      position: absolute;\n      z-index: 1;\n      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);\n      background-color: white;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 100%;\n    }\n\n    .dock-content {\n      width: 100%;\n      height: 100%;\n      overflow: auto;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    DockComponent.ctorParameters = [];
    DockComponent.propDecorators = {
        'position': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'size': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'visible': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'leftPosition': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"], args: ['style.left',] },],
        'rightPosition': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"], args: ['style.right',] },],
        'topPosition': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"], args: ['style.top',] },],
        'bottomPosition': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"], args: ['style.bottom',] },],
    };
    return DockComponent;
}());
//# sourceMappingURL=dock.js.map

/***/ },

/***/ 550:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return KEYCODES; });
// Most of these are according to this table: http://www.ssicom.org/js/x171166.htm
// However where nodejs readline diverges, they are adjusted to conform to it
var KEYCODES = {
    nomod: {
        escape: '\u001b',
        space: ' ' // actually '\u0020'
    },
    ctrl: {
        ' ': '\u0000',
        'a': '\u0001',
        'b': '\u0002',
        'c': '\u0003',
        'd': '\u0004',
        'e': '\u0005',
        'f': '\u0006',
        'g': '\u0007',
        'h': '\u0008',
        'i': '\u0009',
        'j': '\u000a',
        'k': '\u000b',
        'm': '\u000c',
        'n': '\u000d',
        'l': '\u000e',
        'o': '\u000f',
        'p': '\u0010',
        'q': '\u0011',
        'r': '\u0012',
        's': '\u0013',
        't': '\u0014',
        'u': '\u0015',
        'v': '\u0016',
        'w': '\u0017',
        'x': '\u0018',
        'y': '\u0019',
        'z': '\u001a',
        '[': '\u001b',
        '\\': '\u001c',
        ']': '\u001d',
        '^': '\u001e',
        '_': '\u001f',
        'space': '\u0000'
    }
};
//# sourceMappingURL=keycodes.js.map

/***/ },

/***/ 551:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(217);
/* unused harmony export POSITIONS */
/* harmony export (immutable) */ exports["a"] = useDockMonitor;


var POSITIONS = ['left', 'top', 'right', 'bottom'];
function useDockMonitor(_options) {
    if (_options === void 0) { _options = {}; }
    var options = Object.assign({
        position: 'right',
        visible: true,
        size: 0.3
    }, _options);
    function position(state, action) {
        if (state === void 0) { state = options.position; }
        return (action.type === __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* DockActions */].CHANGE_POSITION) ?
            POSITIONS[(POSITIONS.indexOf(state) + 1) % POSITIONS.length] :
            state;
    }
    function size(state, action) {
        if (state === void 0) { state = options.size; }
        return (action.type === __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* DockActions */].CHANGE_SIZE) ?
            action.size :
            state;
    }
    function visible(state, action) {
        if (state === void 0) { state = options.visible; }
        return (action.type === __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* DockActions */].TOGGLE_VISIBILITY) ?
            !state :
            state;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["combineReducers"])({
        position: position,
        visible: visible,
        size: size
    });
}
//# sourceMappingURL=reducer.js.map

/***/ },

/***/ 552:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__json_node__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__json_tree__ = __webpack_require__(554);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return JsonTreeModule; });




var JsonTreeModule = (function () {
    function JsonTreeModule() {
    }
    JsonTreeModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
                    ],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_2__json_node__["a" /* JsonNodeComponent */],
                        __WEBPACK_IMPORTED_MODULE_3__json_tree__["a" /* JsonTreeComponent */]
                    ],
                    exports: [
                        __WEBPACK_IMPORTED_MODULE_3__json_tree__["a" /* JsonTreeComponent */]
                    ]
                },] },
    ];
    /** @nocollapse */
    JsonTreeModule.ctorParameters = [];
    return JsonTreeModule;
}());
//# sourceMappingURL=index.js.map

/***/ },

/***/ 553:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return JsonNodeComponent; });


var JsonNodeComponent = (function () {
    function JsonNodeComponent() {
        this.expanded = false;
    }
    Object.defineProperty(JsonNodeComponent.prototype, "value", {
        set: function (value) {
            this.label = __WEBPACK_IMPORTED_MODULE_1__types__["a" /* getLabelFor */](value);
            this.type = __WEBPACK_IMPORTED_MODULE_1__types__["b" /* getTypeOf */](value);
            if (this.type === __WEBPACK_IMPORTED_MODULE_1__types__["c" /* KNOWN */].Array || this.type === __WEBPACK_IMPORTED_MODULE_1__types__["c" /* KNOWN */].Object || this.type === __WEBPACK_IMPORTED_MODULE_1__types__["c" /* KNOWN */].Iterable) {
                this.children = __WEBPACK_IMPORTED_MODULE_1__types__["d" /* getChildrenFor */](value);
            }
            else {
                this.children = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    JsonNodeComponent.prototype.toggle = function () {
        if (this.children) {
            this.expanded = !this.expanded;
        }
    };
    JsonNodeComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngrx-json-node',
                    styles: ["\n    :host {\n      display: block;\n      padding: 2px 2px 2px 20px;\n      position: relative;\n      color: #70AFCD;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n    }\n    .expanded-indicator {\n      position: absolute;\n      top: 7px;\n      left: 5px;\n      font-size: 10px;\n      transition: transform 200ms;\n    }\n\n    .expanded .expanded-indicator {\n      transform: rotate(90deg);\n    }\n\n    .node-key::after {\n      content: ': ';\n      display: inline;\n    }\n\n    .expanded .node-label {\n      color: #BABBBD !important;\n    }\n\n    .node-label {\n      color: #9AC05C;\n    }\n\n    .node-label.array, .node-label.null, .node-label.iterable {\n      color: #D182C0;\n    }\n\n    .node-label.number, .node-label.undefined, .node-label.boolean {\n      color: #F86936;\n    }\n  "],
                    template: "\n    <div (click)=\"toggle()\" [class.expanded]=\"expanded\">\n      <span class=\"expanded-indicator\" *ngIf=\"children\">\u25B6</span>\n      <span class=\"node-key\">{{ key }}</span>\n      <span class=\"node-label\" [ngClass]=\"type\">{{ label }}</span>\n    </div>\n    <div class=\"child-nodes\" *ngIf=\"children && expanded\">\n      <ngrx-json-node *ngFor=\"let child of children\" [value]=\"child.value\" [key]=\"child.key\"></ngrx-json-node>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    JsonNodeComponent.ctorParameters = [];
    JsonNodeComponent.propDecorators = {
        'key': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'expanded': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return JsonNodeComponent;
}());
//# sourceMappingURL=json-node.js.map

/***/ },

/***/ 554:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return JsonTreeComponent; });


var JsonTreeComponent = (function () {
    function JsonTreeComponent() {
        this.children = [];
        this.expanded = true;
    }
    Object.defineProperty(JsonTreeComponent.prototype, "value", {
        set: function (value) {
            this.children = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__types__["d" /* getChildrenFor */])(value);
        },
        enumerable: true,
        configurable: true
    });
    JsonTreeComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngrx-json-tree',
                    template: "\n    <ngrx-json-node *ngFor=\"let child of children\" [expanded]=\"expanded\" [value]=\"child.value\" [key]=\"child.key\"></ngrx-json-node>\n  "
                },] },
    ];
    /** @nocollapse */
    JsonTreeComponent.ctorParameters = [];
    JsonTreeComponent.propDecorators = {
        'expanded': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return JsonTreeComponent;
}());
//# sourceMappingURL=json-tree.js.map

/***/ },

/***/ 555:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__json_tree_index__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__log_monitor__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__log_monitor_button__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__log_monitor_entry__ = __webpack_require__(557);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LogMonitorModule; });






var LogMonitorModule = (function () {
    function LogMonitorModule() {
    }
    LogMonitorModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                        __WEBPACK_IMPORTED_MODULE_2__json_tree_index__["a" /* JsonTreeModule */]
                    ],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_3__log_monitor__["a" /* LogMonitorComponent */],
                        __WEBPACK_IMPORTED_MODULE_4__log_monitor_button__["a" /* LogMonitorButtonComponent */],
                        __WEBPACK_IMPORTED_MODULE_5__log_monitor_entry__["a" /* LogMonitorEntryComponent */]
                    ],
                    exports: [
                        __WEBPACK_IMPORTED_MODULE_3__log_monitor__["a" /* LogMonitorComponent */]
                    ]
                },] },
    ];
    /** @nocollapse */
    LogMonitorModule.ctorParameters = [];
    return LogMonitorModule;
}());
//# sourceMappingURL=index.js.map

/***/ },

/***/ 556:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LogMonitorButtonComponent; });

var LogMonitorButtonComponent = (function () {
    function LogMonitorButtonComponent() {
        this.action = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    LogMonitorButtonComponent.prototype.handleAction = function ($event) {
        if (!this.disabled) {
            this.action.next({});
        }
        $event.stopPropagation();
        return false;
    };
    LogMonitorButtonComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'log-monitor-button',
                    template: "\n    <ng-content></ng-content>\n  ",
                    styles: ["\n    :host{\n      flex-grow: 1;\n      display: inline-block;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n      cursor: pointer;\n      font-weight: bold;\n      border-radius: 3px;\n      padding: 4px 8px;\n      margin: 5px 3px 5px 3px;\n      font-size: 0.8em;\n      color: white;\n      text-decoration: none;\n      background-color: #4F5A65;\n    }\n\n    :host.disabled{\n      opacity: 0.2;\n      cursor: text;\n      background-color: transparent;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    LogMonitorButtonComponent.ctorParameters = [];
    LogMonitorButtonComponent.propDecorators = {
        'disabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"], args: ['class.disabled',] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'action': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'handleAction': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['click', ['$event'],] },],
    };
    return LogMonitorButtonComponent;
}());
//# sourceMappingURL=log-monitor-button.js.map

/***/ },

/***/ 557:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LogMonitorEntryComponent; });

var LogMonitorEntryComponent = (function () {
    function LogMonitorEntryComponent() {
        this.expandEntries = false;
        this.disabled = false;
        this.toggle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(LogMonitorEntryComponent.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            this._item = value;
            this.stateActionPair = {
                state: value.state,
                action: value.action
            };
        },
        enumerable: true,
        configurable: true
    });
    LogMonitorEntryComponent.prototype.handleToggle = function () {
        if (!this.disabled) {
            this.toggle.next({ id: this.item.actionId });
        }
    };
    LogMonitorEntryComponent.prototype.logPayload = function () {
        console.log(this.item.action);
    };
    LogMonitorEntryComponent.prototype.logState = function () {
        console.log(this.item.state);
    };
    LogMonitorEntryComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'log-monitor-entry',
                    template: "\n    <div class=\"title-bar\" [ngClass]=\"{ collapsed: item.collapsed }\" (click)=\"handleToggle()\">\n      {{ item.action.type }}\n    </div>\n    <div class=\"action-bar\" *ngIf=\"!item.collapsed\">\n      <ngrx-json-tree [value]=\"stateActionPair\" [expanded]=\"expandEntries\"></ngrx-json-tree>\n    </div>\n  ",
                    styles: ["\n    :host{\n      color: #FFFFFF;\n      background-color: #4F5A65;\n      cursor: pointer;\n    }\n    .title-bar{\n      padding: 8px 0 7px 16px;\n      background-color: rgba(0,0,0,0.1);\n    }\n    .action-bar{\n      padding: 20px;\n    }\n    .collapsed{\n      text-decoration: line-through;\n      font-style: italic;\n      opacity: 0.5;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    LogMonitorEntryComponent.ctorParameters = [];
    LogMonitorEntryComponent.propDecorators = {
        'expandEntries': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'disabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'item': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'toggle': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return LogMonitorEntryComponent;
}());
//# sourceMappingURL=log-monitor-entry.js.map

/***/ },

/***/ 558:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store_devtools__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_core_operator_select__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_core_operator_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ngrx_core_operator_select__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LogMonitorComponent; });




var LogMonitorComponent = (function () {
    function LogMonitorComponent(devtools) {
        this.devtools = devtools;
        this.expandEntries = true;
        this.canRevert$ = __WEBPACK_IMPORTED_MODULE_3__ngrx_core_operator_select__["select"].call(devtools.liftedState, function (s) { return !(s.computedStates.length > 1); });
        this.canSweep$ = __WEBPACK_IMPORTED_MODULE_3__ngrx_core_operator_select__["select"].call(devtools.liftedState, function (s) { return !(s.skippedActionIds.length > 0); });
        this.canCommit$ = __WEBPACK_IMPORTED_MODULE_3__ngrx_core_operator_select__["select"].call(devtools.liftedState, function (s) { return !(s.computedStates.length > 1); });
        this.items$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_map__["map"].call(devtools.liftedState, function (_a) {
            var actionsById = _a.actionsById, skippedActionIds = _a.skippedActionIds, stagedActionIds = _a.stagedActionIds, computedStates = _a.computedStates;
            var actions = [];
            for (var i = 0; i < stagedActionIds.length; i++) {
                var actionId = stagedActionIds[i];
                var action = actionsById[actionId].action;
                var _b = computedStates[i], state = _b.state, error = _b.error;
                var previousState = void 0;
                if (i > 0) {
                    previousState = computedStates[i - 1].state;
                }
                actions.push({
                    key: actionId,
                    collapsed: skippedActionIds.indexOf(actionId) > -1,
                    action: action,
                    actionId: actionId,
                    state: state,
                    previousState: previousState,
                    error: error
                });
            }
            return actions;
        });
    }
    LogMonitorComponent.prototype.handleToggle = function (id) {
        this.devtools.toggleAction(id);
    };
    LogMonitorComponent.prototype.handleReset = function () {
        this.devtools.reset();
    };
    LogMonitorComponent.prototype.handleRollback = function () {
        this.devtools.rollback();
    };
    LogMonitorComponent.prototype.handleSweep = function () {
        this.devtools.sweep();
    };
    LogMonitorComponent.prototype.handleCommit = function () {
        this.devtools.commit();
    };
    LogMonitorComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'log-monitor',
                    styles: ["\n    :host {\n      display: block;\n      background-color: #2A2F3A;\n      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;\n      position: relative;\n      overflow-y: hidden;\n      width: 100%;\n      height: 100%;\n      min-width: 300px;\n      direction: ltr;\n    }\n\n    .button-bar {\n      text-align: center;\n      border-bottom-width: 1px;\n      border-bottom-style: solid;\n      border-color: transparent;\n      z-index: 1;\n      display: flex;\n      flex-direction: row;\n      padding: 0 4px;\n    }\n\n    .elements {\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 38px;\n      bottom: 0;\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n  "],
                    template: "\n    <div class=\"button-bar\">\n      <log-monitor-button (action)=\"handleReset()\">\n        Reset\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleRollback()\">\n        Revert\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleSweep()\" [disabled]=\"canSweep$ | async\">\n        Sweep\n      </log-monitor-button>\n\n      <log-monitor-button (action)=\"handleCommit()\" [disabled]=\"canCommit$ | async\">\n        Commit\n      </log-monitor-button>\n    </div>\n    <div class=\"elements\">\n      <log-monitor-entry\n        *ngFor=\"let item of (items$ | async); let i = index\"\n        [item]=\"item\"\n        [disabled]=\"i === 0\"\n        [expandEntries]=\"expandEntries\"\n        (toggle)=\"handleToggle($event.id)\">\n      </log-monitor-entry>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    LogMonitorComponent.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_2__ngrx_store_devtools__["StoreDevtools"], },
    ];
    LogMonitorComponent.propDecorators = {
        'expandEntries': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return LogMonitorComponent;
}());
//# sourceMappingURL=log-monitor.js.map

/***/ },

/***/ 559:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StoreLogMonitorComponent; });

var StoreLogMonitorComponent = (function () {
    function StoreLogMonitorComponent() {
        this.toggleCommand = 'ctrl-h';
        this.positionCommand = 'ctrl-m';
        this.expandEntries = false;
    }
    StoreLogMonitorComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngrx-store-log-monitor',
                    template: "\n    <dock-monitor [toggleCommand]=\"toggleCommand\" [positionCommand]=\"positionCommand\">\n      <log-monitor [expandEntries]=\"expandEntries\"></log-monitor>\n    </dock-monitor>\n  "
                },] },
    ];
    /** @nocollapse */
    StoreLogMonitorComponent.ctorParameters = [];
    StoreLogMonitorComponent.propDecorators = {
        'toggleCommand': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'positionCommand': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'expandEntries': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return StoreLogMonitorComponent;
}());
//# sourceMappingURL=store-log-monitor.js.map

/***/ },

/***/ 560:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dispatcher__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(345);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return INITIAL_REDUCER; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return INITIAL_STATE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return _INITIAL_REDUCER; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return _INITIAL_STATE; });
/* harmony export (immutable) */ exports["e"] = _initialReducerFactory;
/* harmony export (immutable) */ exports["f"] = _initialStateFactory;
/* harmony export (immutable) */ exports["g"] = _storeFactory;
/* harmony export (immutable) */ exports["h"] = _stateFactory;
/* harmony export (immutable) */ exports["i"] = _reducerFactory;
/* harmony export (immutable) */ exports["j"] = provideStore;
/* harmony export (binding) */ __webpack_require__.d(exports, "k", function() { return StoreModule; });






var INITIAL_REDUCER = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token ngrx/store/reducer');
var INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token ngrx/store/initial-state');
var _INITIAL_REDUCER = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token _ngrx/store/reducer');
var _INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('Token _ngrx/store/initial-state');
function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* combineReducers */])(reducer);
}
function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */].INIT });
    }
    return initialState;
}
function _storeFactory(dispatcher, reducer, state$) {
    return new __WEBPACK_IMPORTED_MODULE_3__store__["a" /* Store */](dispatcher, reducer, state$);
}
function _stateFactory(initialState, dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */](initialState, dispatcher, reducer);
}
function _reducerFactory(dispatcher, reducer) {
    return new __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */](dispatcher, reducer);
}
;
/**
 * @deprecated, use StoreModule.provideStore instead!
 */
function provideStore(_reducer, _initialState) {
    return [
        __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */],
        { provide: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* Store */], useFactory: _storeFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */], __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */]] },
        { provide: __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */], useFactory: _reducerFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], INITIAL_REDUCER] },
        { provide: __WEBPACK_IMPORTED_MODULE_4__state__["a" /* State */], useFactory: _stateFactory, deps: [INITIAL_STATE, __WEBPACK_IMPORTED_MODULE_2__dispatcher__["a" /* Dispatcher */], __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* Reducer */]] },
        { provide: INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [_INITIAL_REDUCER] },
        { provide: INITIAL_STATE, useFactory: _initialStateFactory, deps: [_INITIAL_STATE, INITIAL_REDUCER] },
        { provide: _INITIAL_STATE, useValue: _initialState },
        { provide: _INITIAL_REDUCER, useValue: _reducer }
    ];
}
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (_reducer, _initialState) {
        return {
            ngModule: StoreModule,
            providers: provideStore(_reducer, _initialState)
        };
    };
    StoreModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{},] },
    ];
    /** @nocollapse */
    StoreModule.ctorParameters = [];
    return StoreModule;
}());
//# sourceMappingURL=ng2.js.map

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_dispatcher__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ng2__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_reducer__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_state__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_store__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils__ = __webpack_require__(345);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Dispatcher", function() { return __WEBPACK_IMPORTED_MODULE_0__src_dispatcher__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "INITIAL_REDUCER", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "INITIAL_STATE", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "_INITIAL_REDUCER", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "_INITIAL_STATE", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "_initialReducerFactory", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "_initialStateFactory", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "_storeFactory", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "_stateFactory", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "_reducerFactory", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "provideStore", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "StoreModule", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ng2__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Reducer", function() { return __WEBPACK_IMPORTED_MODULE_2__src_reducer__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "State", function() { return __WEBPACK_IMPORTED_MODULE_3__src_state__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Store", function() { return __WEBPACK_IMPORTED_MODULE_4__src_store__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_5__src_utils__["a"]; });






//# sourceMappingURL=index.js.map

/***/ },

/***/ 703:
/***/ function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ },

/***/ 704:
/***/ function(module, exports) {

module.exports = "<app-header></app-header>\n\n<div class=\"container app-container\">\n    <router-outlet></router-outlet>\n</div>\n\n<ngrx-store-log-monitor toggleCommand=\"ctrl-h\" positionCommand=\"ctrl-m\"></ngrx-store-log-monitor>\n";

/***/ },

/***/ 705:
/***/ function(module, exports) {

module.exports = "<nav class=\"navbar navbar-fixed-top navbar-dark bg-inverse\">\n    <div class=\"container\">\n        <a class=\"navbar-brand\" [routerLink]=\"['courses']\">Angular courses</a>\n        <ul class=\"nav navbar-nav\">\n            <li class=\"nav-item active\" routerLinkActive=\"active\" *ngIf=\"user\">\n                <a class=\"nav-link\" [routerLink]=\"['courses']\">Courses list</a>\n            </li>\n        </ul>\n        <ul class=\"nav navbar-nav pull-xs-right\" *ngIf=\"user\">\n            <li class=\"nav-item\">\n                <span class=\"nav-link\">{{user}}</span>\n            </li>\n            <li class=\"nav-item\">\n                <button class=\"btn btn-outline-secondary\" (click)=\"authService.logout()\">\n                    Logout\n                </button>\n            </li>\n        </ul>\n    </div>\n</nav>\n";

/***/ },

/***/ 706:
/***/ function(module, exports) {

module.exports = "<div class=\"card\">\n    <img class=\"card-img-top\" src=\"{{course.img}}\" width=\"100%\" alt=\"Card image cap\">\n    <div class=\"card-block\">\n        <h4 class=\"card-title\">{{course.title}}</h4>\n        <p class=\"card-text\">{{course.description}}</p>\n        <div class=\"text-xs-right\">\n            <a href=\"#\" class=\"btn btn-outline-primary\" [routerLink]=\"['/courses', course._id.$oid]\">\n                Edit\n            </a>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 707:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"card card-block\">\n            <form class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label class=\"sr-only\" for=\"search\">search</label>\n                    <input type=\"text\" class=\"form-control\" id=\"search\"\n                           placeholder=\"search\">\n                    <button type=\"submit\" class=\"btn btn-info\">Find</button>\n                </div>\n                <div class=\"form-group pull-xs-right\">\n                    <button type=\"submit\" class=\"btn btn-outline-success\" [routerLink]=\"['/courses', 'new']\">\n                        Add course\n                    </button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <course-item class=\"col-xs-4 grid-card\"\n                 *ngFor=\"let item of list\"\n                 [course]=\"item\">\n    </course-item>\n</div>\n";

/***/ },

/***/ 708:
/***/ function(module, exports) {

module.exports = "<div class=\"card\">\n    <div class=\"card-header\">\n        <h4 class=\"pull-xs-left\">{{mode}} Course</h4>\n\n        <div class=\"pull-xs-right\">\n            <a href=\"#\" class=\"btn btn-success\" (click)=\"goBack()\">Save</a>\n            <a href=\"#\" class=\"btn btn-primary\" (click)=\"goBack()\">Go back</a>\n        </div>\n    </div>\n    <div class=\"card-block\" *ngIf=\"course\">\n        <div class=\"col-xs-10 offset-xs-2\">\n            <div class=\"form-group row\">\n                <label for=\"title\" class=\"col-xs-2 col-form-label\">Title</label>\n                <div class=\"col-xs-10\">\n                    <input class=\"form-control\" type=\"text\" [value]=\"course.title\" id=\"title\">\n                </div>\n            </div>\n\n            <div class=\"form-group row\">\n                <label for=\"description\" class=\"col-xs-2 col-form-label\">Description</label>\n                <div class=\"col-xs-10\">\n                    <input class=\"form-control\" type=\"text\" [value]=\"course.description\" id=\"description\">\n                </div>\n            </div>\n\n            <div class=\"form-group row\">\n                <label class=\"col-xs-2 col-form-label\">Image</label>\n                <div class=\"col-xs-10\">\n                    <img [src]=\"course.img\">\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n";

/***/ },

/***/ 709:
/***/ function(module, exports) {

module.exports = "<form class=\"form-signin\" novalidate\n      [formGroup]=\"loginForm\"\n      (ngSubmit)=\"logIn()\">\n    <h2 class=\"form-signin-heading\">Please sign in</h2>\n\n    <div class=\"form-group\" [ngClass]=\"{'has-danger': showError('login')}\">\n        <label for=\"login\" class=\"sr-only\">Login</label>\n        <input type=\"text\" id=\"login\" class=\"form-control\" placeholder=\"Login\"\n               formControlName=\"login\"\n               [ngClass]=\"{'form-control-danger': showError('login')}\">\n        <div class=\"error-tooltip\" *ngIf=\"showError('login', 'required')\">\n            login is required\n        </div>\n        <div class=\"error-tooltip\" *ngIf=\"showError('login', 'pattern')\">\n            field could contain English letters only\n        </div>\n    </div>\n\n    <div class=\"form-group\" [ngClass]=\"{'has-danger': showError('password')}\">\n        <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n        <input type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\"\n               formControlName=\"password\"\n               [ngClass]=\"{'form-control-danger': showError('password')}\">\n        <div class=\"error-tooltip\" *ngIf=\"showError('password', 'required')\">\n            password is required\n        </div>\n        <div class=\"error-tooltip\" *ngIf=\"showError('password', 'pattern')\">\n            field could contain English letters and numbers\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\" [disabled]=\"!loginForm.valid\">\n            Sign in\n        </button>\n    </div>\n\n    <div class=\"alert alert-danger\" *ngIf=\"message\">{{message}}</div>\n</form>\n";

/***/ },

/***/ 710:
/***/ function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ },

/***/ 711:
/***/ function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(703),
      utf8 = __webpack_require__(346).utf8,
      isBuffer = __webpack_require__(710),
      bin = __webpack_require__(346).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ },

/***/ 712:
/***/ function(module, exports) {

module.exports = ".app-container {\n  padding-top: 60px;\n  box-sizing: border-box;\n  min-height: 100%;\n}\n"

/***/ },

/***/ 713:
/***/ function(module, exports) {

module.exports = "@-webkit-keyframes show-tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-50%) translateX(-4px);\n            transform: translateY(-50%) translateX(-4px);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(-50%) translateX(0);\n            transform: translateY(-50%) translateX(0);\n  }\n}\n\n@keyframes show-tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-50%) translateX(-4px);\n            transform: translateY(-50%) translateX(-4px);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(-50%) translateX(0);\n            transform: translateY(-50%) translateX(0);\n  }\n}\n\n:host {\n  position: relative;\n  top: calc(50vh - 160px);\n}\n\n.form-signin {\n  max-width: 330px;\n  padding: 15px;\n  margin: 0 auto;\n}\n\n.form-signin-heading {\n  margin-bottom: 10px;\n}\n\n.form-control {\n  padding: 10px;\n  font-size: 16px;\n}\n\n.form-group {\n  position: relative;\n}\n\n.error-tooltip {\n  opacity: 0;\n  position: absolute;\n  left: 103%;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  padding: 3px 7px;\n  border-radius: 2px;\n  background: #f2dede;\n  -webkit-animation: show-tooltip .3s ease 1 forwards;\n          animation: show-tooltip .3s ease 1 forwards;\n  color: #a94442;\n  text-align: center;\n  width: 100%;\n  max-width: 180px\n}\n\n.error-tooltip:before {\n  content: '';\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n  display: block;\n  top: 50%;\n  left: -5px;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #f2dede;\n}\n"

/***/ },

/***/ 717:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(54);
var queue_1 = __webpack_require__(243);
var observeOn_1 = __webpack_require__(159);
/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map

/***/ },

/***/ 718:
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ },

/***/ 720:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(10);
var toPromise_1 = __webpack_require__(394);
Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ },

/***/ 724:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(10);
var ConnectableObservable_1 = __webpack_require__(382);
var MulticastObservable = (function (_super) {
    __extends(MulticastObservable, _super);
    function MulticastObservable(source, subjectFactory, selector) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastObservable.prototype._subscribe = function (subscriber) {
        var _a = this, selector = _a.selector, source = _a.source;
        var connectable = new ConnectableObservable_1.ConnectableObservable(source, this.subjectFactory);
        var subscription = selector(connectable).subscribe(subscriber);
        subscription.add(connectable.connect());
        return subscription;
    };
    return MulticastObservable;
}(Observable_1.Observable));
exports.MulticastObservable = MulticastObservable;
//# sourceMappingURL=MulticastObservable.js.map

/***/ },

/***/ 725:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var EmptyObservable_1 = __webpack_require__(240);
exports.empty = EmptyObservable_1.EmptyObservable.create;
//# sourceMappingURL=empty.js.map

/***/ },

/***/ 726:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var merge_1 = __webpack_require__(390);
exports.merge = merge_1.mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ },

/***/ 730:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ReplaySubject_1 = __webpack_require__(717);
var multicast_1 = __webpack_require__(391);
/**
 * @param bufferSize
 * @param windowTime
 * @param scheduler
 * @return {ConnectableObservable<T>}
 * @method publishReplay
 * @owner Observable
 */
function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
}
exports.publishReplay = publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ },

/***/ 732:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var multicast_1 = __webpack_require__(391);
var Subject_1 = __webpack_require__(54);
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .publish().refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
 * @method share
 * @owner Observable
 */
function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
}
exports.share = share;
;
//# sourceMappingURL=share.js.map

/***/ },

/***/ 733:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(19);
/**
 * Returns an Observable that skips `n` items emitted by an Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
 * @return {Observable} an Observable that skips values emitted by the source Observable.
 *
 * @method skip
 * @owner Observable
 */
function skip(total) {
    return this.lift(new SkipOperator(total));
}
exports.skip = skip;
var SkipOperator = (function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipSubscriber = (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=skip.js.map

/***/ },

/***/ 734:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(87);
var subscribeToResult_1 = __webpack_require__(88);
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ },

/***/ 735:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(87);
var subscribeToResult_1 = __webpack_require__(88);
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=takeUntil.js.map

/***/ },

/***/ 736:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(109);
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ },

/***/ 737:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(55);
var Action_1 = __webpack_require__(736);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.delay = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ },

/***/ 738:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__(718);
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ },

/***/ 739:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncAction_1 = __webpack_require__(737);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay is greater than 0, enqueue as an async action.
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map

/***/ },

/***/ 740:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__(738);
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;
//# sourceMappingURL=QueueScheduler.js.map

/***/ },

/***/ 744:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: __webpack_require__(704),
        styles: [__webpack_require__(712)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;


/***/ },

/***/ 745:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var auth_service_1 = __webpack_require__(111);
var store_1 = __webpack_require__(69);
var AppHeaderComponent = (function () {
    function AppHeaderComponent(authService, store) {
        this.authService = authService;
        this.store = store;
        this.subscriptions = [];
    }
    AppHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.store.select('user').subscribe(function (user) {
            _this.user = user;
        }));
        this.authService.initUser();
    };
    AppHeaderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    return AppHeaderComponent;
}());
AppHeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-header',
        template: __webpack_require__(705)
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        store_1.Store])
], AppHeaderComponent);
exports.AppHeaderComponent = AppHeaderComponent;


/***/ },

/***/ 746:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var CourseItemComponent = (function () {
    function CourseItemComponent() {
    }
    return CourseItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CourseItemComponent.prototype, "course", void 0);
CourseItemComponent = __decorate([
    core_1.Component({
        selector: 'course-item',
        template: __webpack_require__(706),
    }),
    __metadata("design:paramtypes", [])
], CourseItemComponent);
exports.CourseItemComponent = CourseItemComponent;


/***/ },

/***/ 747:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(89);
var courses_component_1 = __webpack_require__(403);
var edit_course_component_1 = __webpack_require__(404);
var course_item_component_1 = __webpack_require__(746);
var courses_service_1 = __webpack_require__(250);
var auth_service_1 = __webpack_require__(111);
var app_routes_1 = __webpack_require__(401);
var CoursesModule = (function () {
    function CoursesModule() {
    }
    return CoursesModule;
}());
CoursesModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routes_1.routing
        ],
        declarations: [
            courses_component_1.CoursesComponent,
            course_item_component_1.CourseItemComponent,
            edit_course_component_1.EditCourseComponent
        ],
        providers: [
            auth_service_1.AuthService,
            courses_service_1.CoursesService
        ]
    }),
    __metadata("design:paramtypes", [])
], CoursesModule);
exports.CoursesModule = CoursesModule;


/***/ },

/***/ 748:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var authActions = __webpack_require__(407);
exports.auth = function (state, action) {
    if (state === void 0) { state = null; }
    console.log(action);
    switch (action.type) {
        case authActions.USER_LOADED:
            return action.payload;
        case authActions.USER_LOGOUT:
        case authActions.USER_ERROR:
            return null;
        default:
            return state;
    }
};


/***/ },

/***/ 749:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var auth_reducer_1 = __webpack_require__(748);
exports.reducers = {
    user: auth_reducer_1.auth
};


/***/ },

/***/ 750:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var platform_browser_dynamic_1 = __webpack_require__(161);
var app_module_1 = __webpack_require__(432);
__webpack_require__(428);
__webpack_require__(427);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }

},[750]);
//# sourceMappingURL=main.js.map