"use strict";
(self["webpackChunkwebrtc_demo"] = self["webpackChunkwebrtc_demo"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);


class AppComponent {
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 2,
      vars: 0,
      consts: [[1, "container"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 2181:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_ROUTES: () => (/* binding */ APP_ROUTES)
/* harmony export */ });
/* harmony import */ var _pages_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/home.component */ 3791);
/* harmony import */ var _pages_monitor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/monitor.component */ 8846);


const APP_ROUTES = [{
  path: '',
  component: _pages_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
}, {
  path: 'monitor',
  component: _pages_monitor_component__WEBPACK_IMPORTED_MODULE_1__.MonitorComponent
}, {
  path: '**',
  redirectTo: ''
}];

/***/ }),

/***/ 3791:
/*!*****************************************!*\
  !*** ./src/app/pages/home.component.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _shared_peer_pane_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/peer-pane.component */ 246);
/* harmony import */ var _monitor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monitor.component */ 8846);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




class HomeComponent {
  constructor() {
    this.room = 'demo';
    this.wsUrl = 'ws://localhost:8081';
    this.stunUrl = 'stun:127.0.0.1:3478';
    this.stunHttp = 'http://localhost:8791/metrics';
  }
  peerA() {
    return {
      nick: 'Alice',
      initiator: true,
      room: this.room,
      wsUrl: this.wsUrl,
      stunUrl: this.stunUrl,
      stunHttp: this.stunHttp
    };
  }
  peerB() {
    return {
      nick: 'Bob',
      initiator: false,
      room: this.room,
      wsUrl: this.wsUrl,
      stunUrl: this.stunUrl,
      stunHttp: this.stunHttp
    };
  }
  apply() {
    // signals will recompute; input-bound components will pick up changes
  }
  static {
    this.ɵfac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HomeComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: HomeComponent,
      selectors: [["app-home"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 8,
      vars: 4,
      consts: [[1, "page-content"], [1, "grid2"], [3, "config", "autoJoin"], [1, "monitor-panel"]],
      template: function HomeComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "WebRTC P2P Demo");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "app-peer-pane", 2)(5, "app-peer-pane", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "app-monitor");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("config", ctx.peerA())("autoJoin", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("config", ctx.peerB())("autoJoin", true);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _shared_peer_pane_component__WEBPACK_IMPORTED_MODULE_0__.PeerPaneComponent, _monitor_component__WEBPACK_IMPORTED_MODULE_1__.MonitorComponent],
      styles: [".page-content[_ngcontent-%COMP%] {\n      padding: 32px;\n      max-width: 1400px;\n      margin: 0 auto;\n    }\n    h1[_ngcontent-%COMP%] {\n      margin-bottom: 32px;\n    }\n    .grid2[_ngcontent-%COMP%] {\n      margin-bottom: 32px;\n      gap: 32px;\n    }\n    .monitor-panel[_ngcontent-%COMP%] {\n      margin-top: 32px;\n      padding-top: 32px;\n      border-top: 1px solid var(--line);\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvaG9tZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsYUFBYTtNQUNiLGlCQUFpQjtNQUNqQixjQUFjO0lBQ2hCO0lBQ0E7TUFDRSxtQkFBbUI7SUFDckI7SUFDQTtNQUNFLG1CQUFtQjtNQUNuQixTQUFTO0lBQ1g7SUFDQTtNQUNFLGdCQUFnQjtNQUNoQixpQkFBaUI7TUFDakIsaUNBQWlDO0lBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLnBhZ2UtY29udGVudCB7XG4gICAgICBwYWRkaW5nOiAzMnB4O1xuICAgICAgbWF4LXdpZHRoOiAxNDAwcHg7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgaDEge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgICB9XG4gICAgLmdyaWQyIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDMycHg7XG4gICAgICBnYXA6IDMycHg7XG4gICAgfVxuICAgIC5tb25pdG9yLXBhbmVsIHtcbiAgICAgIG1hcmdpbi10b3A6IDMycHg7XG4gICAgICBwYWRkaW5nLXRvcDogMzJweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1saW5lKTtcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 8846:
/*!********************************************!*\
  !*** ./src/app/pages/monitor.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MonitorComponent: () => (/* binding */ MonitorComponent)
/* harmony export */ });
/* harmony import */ var _Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _shared_metrics_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/metrics.service */ 3246);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);






class MonitorComponent {
  constructor(metrics) {
    this.metrics = metrics;
    this.stunHttp = 'http://localhost:8791/metrics';
    this.metricsJson = '';
    this.polling = false;
  }
  toggle() {
    var _this = this;
    if (this.polling) {
      this.polling = false;
      clearInterval(this.timer);
      this.timer = null;
      return;
    }
    this.polling = true;
    const tick = /*#__PURE__*/function () {
      var _ref = (0,_Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        try {
          const data = yield _this.metrics.fetchMetrics(_this.stunHttp);
          _this.metricsJson = JSON.stringify(data, null, 2);
        } catch (e) {
          _this.metricsJson = 'fetch failed: ' + (e?.message ?? e);
        }
      });
      return function tick() {
        return _ref.apply(this, arguments);
      };
    }();
    tick();
    this.timer = setInterval(tick, 1500);
  }
  static {
    this.ɵfac = function MonitorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MonitorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_metrics_service__WEBPACK_IMPORTED_MODULE_1__.MetricsService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: MonitorComponent,
      selectors: [["app-monitor"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([_shared_metrics_service__WEBPACK_IMPORTED_MODULE_1__.MetricsService]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 9,
      vars: 2,
      consts: [[1, "card"], [1, "header"], [3, "click"]],
      template: function MonitorComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div")(3, "b");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "STUN Metrics");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MonitorComponent_Template_button_click_5_listener() {
            return ctx.toggle();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "pre");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.polling ? "Stop" : "Start", " Polling");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.metricsJson);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule],
      styles: [".card[_ngcontent-%COMP%] {\n      background: var(--bg2);\n      border: 1px solid var(--line);\n      border-radius: 4px;\n      padding: 16px;\n    }\n    .header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 16px;\n    }\n    pre[_ngcontent-%COMP%] {\n      height: 200px;\n      overflow: auto;\n      margin: 0;\n      font-size: 13px;\n      line-height: 1.5;\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvbW9uaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0Usc0JBQXNCO01BQ3RCLDZCQUE2QjtNQUM3QixrQkFBa0I7TUFDbEIsYUFBYTtJQUNmO0lBQ0E7TUFDRSxhQUFhO01BQ2IsOEJBQThCO01BQzlCLG1CQUFtQjtNQUNuQixtQkFBbUI7SUFDckI7SUFDQTtNQUNFLGFBQWE7TUFDYixjQUFjO01BQ2QsU0FBUztNQUNULGVBQWU7TUFDZixnQkFBZ0I7SUFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuY2FyZCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iZzIpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGluZSk7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBwYWRkaW5nOiAxNnB4O1xuICAgIH1cbiAgICAuaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICB9XG4gICAgcHJlIHtcbiAgICAgIGhlaWdodDogMjAwcHg7XG4gICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 3246:
/*!*******************************************!*\
  !*** ./src/app/shared/metrics.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetricsService: () => (/* binding */ MetricsService)
/* harmony export */ });
/* harmony import */ var _Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);


class MetricsService {
  fetchMetrics(url) {
    return (0,_Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const r = yield fetch(url, {
        cache: 'no-store'
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })();
  }
  static {
    this.ɵfac = function MetricsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MetricsService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: MetricsService,
      factory: MetricsService.ɵfac
    });
  }
}

/***/ }),

/***/ 246:
/*!***********************************************!*\
  !*** ./src/app/shared/peer-pane.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PeerPaneComponent: () => (/* binding */ PeerPaneComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _signaling_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signaling.service */ 2323);
/* harmony import */ var _rtc_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rtc.service */ 5108);
/* harmony import */ var _metrics_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metrics.service */ 3246);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);










function PeerPaneComponent_textarea_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "textarea", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function PeerPaneComponent_textarea_29_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r1.iceText, $event) || (ctx_r1.iceText = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.iceText);
  }
}
class PeerPaneComponent {
  constructor(signal, rtc, ngZone, cdr) {
    this.signal = signal;
    this.rtc = rtc;
    this.ngZone = ngZone;
    this.cdr = cdr;
    this.autoJoin = false;
    this.wsState = 'idle';
    this.iceVisible = false;
    this.statsOn = false;
    this.logText = '';
    this.iceText = '';
    this.sendText = '';
    this.pendingSignals = [];
    this.joined = false;
    this._statsCb = arr => {
      this.iceText = JSON.stringify(arr, null, 2);
    };
  }
  ngOnInit() {
    this.signal.state$.subscribe(s => this.wsState = s);
    this.signal.joined$.subscribe(({
      id,
      room
    }) => {
      this.joined = true;
      this.log(`[joined] id=${id} room=${room}`);
      this.setupSession();
    });
    this.signal.peers$.subscribe(update => {
      if (update && this.joined) {
        this.log(`[peers] count=${update.peers.length}`);
        // If we're the initiator and there are peers, start the connection
        if (this.config.initiator && update.peers.length > 0) {
          this.setupSession();
          this.session?.startOffer();
        }
      }
    });
    this.signal.signal$.subscribe(({
      from,
      data
    }) => {
      // If we haven't created a PeerSession yet, buffer incoming signals
      // so they aren't dropped by a race between signaling and session setup.
      if (!this.session) {
        this.pendingSignals.push({
          from,
          data
        });
        return;
      }
      if (data.sdp) this.session.handleRemoteSdp(data.sdp);else if (data.candidate) this.session.handleRemoteCandidate(data.candidate);
    });
    if (this.autoJoin) setTimeout(() => this.doJoin(), 0);
  }
  ngOnDestroy() {
    this.hangup();
  }
  doJoin() {
    if (!this.config) return;
    this.signal.connect(this.config.wsUrl);
    this.signal.join(this.config.room, this.config.nick);
  }
  setupSession() {
    this.session?.close();
    this.session = this.rtc.createSession(this.config.initiator, this.config.stunUrl, {
      onSignal: data => this.ngZone.run(() => this.signal.sendSignal(data)),
      onIceState: s => this.ngZone.run(() => {
        this.iceState = s;
        this.cdr.detectChanges();
      }),
      onDcState: s => this.ngZone.run(() => {
        this.dcState = s;
        this.cdr.detectChanges();
      }),
      onDcMessage: t => this.ngZone.run(() => this.log(`[rx] ${t}`))
    });
    // If there were any signals received before the session existed, replay them now
    if (this.pendingSignals.length) {
      for (const p of this.pendingSignals) {
        const data = p.data;
        if (data.sdp) this.session.handleRemoteSdp(data.sdp);else if (data.candidate) this.session.handleRemoteCandidate(data.candidate);
      }
      this.pendingSignals = [];
    }
  }
  hangup() {
    try {
      this.session?.close();
    } catch {}
    this.session = undefined;
    this.dcState = undefined;
    this.iceState = undefined;
  }
  send() {
    if (this.session && this.sendText.trim()) {
      this.session.send(this.sendText);
      this.log(`[tx] ${this.sendText}`);
      this.sendText = '';
    }
  }
  canSend() {
    return !!this.session && this.dcState === 'open';
  }
  icedump() {
    this.iceVisible = true;
    if (this.session) this.session.startStatsLoop(this._statsCb);
  }
  toggleStats() {
    this.statsOn = !this.statsOn;
    this.iceVisible = this.statsOn;
    if (this.session) this.statsOn ? this.session.startStatsLoop(this._statsCb) : this.session.stopStatsLoop();
  }
  log(msg) {
    this.ngZone.run(() => {
      this.logText += (this.logText ? '\n' : '') + msg;
      this.cdr.detectChanges();
      // Force textarea to scroll to bottom
      queueMicrotask(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.scrollTop = textarea.scrollHeight;
        }
      });
    });
  }
  dcStateClass() {
    return {
      'ok': this.dcState === 'open',
      'warn': this.dcState === 'connecting',
      'bad': this.dcState === 'closed' || this.dcState === 'closing'
    };
  }
  iceStateClass() {
    return {
      'ok': this.iceState === 'connected' || this.iceState === 'completed',
      'warn': this.iceState === 'checking',
      'bad': this.iceState === 'failed' || this.iceState === 'disconnected' || this.iceState === 'closed'
    };
  }
  static {
    this.ɵfac = function PeerPaneComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PeerPaneComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_signaling_service__WEBPACK_IMPORTED_MODULE_0__.SignalingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_rtc_service__WEBPACK_IMPORTED_MODULE_1__.RtcService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: PeerPaneComponent,
      selectors: [["app-peer-pane"]],
      inputs: {
        config: "config",
        autoJoin: "autoJoin"
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_signaling_service__WEBPACK_IMPORTED_MODULE_0__.SignalingService, _rtc_service__WEBPACK_IMPORTED_MODULE_1__.RtcService, _metrics_service__WEBPACK_IMPORTED_MODULE_2__.MetricsService]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 34,
      vars: 17,
      consts: [[1, "card", "panel"], [1, "header"], [1, "tag"], [3, "ngClass"], [1, "toolbar"], [3, "click", "disabled"], [3, "click"], [1, "content"], ["readonly", "", 3, "ngModelChange", "ngModel"], ["readonly", "", 3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "composer"], ["placeholder", "enter text...", 3, "ngModelChange", "ngModel"]],
      template: function PeerPaneComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "WS: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "b");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "DC: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "b", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "ICE: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "b", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 4)(19, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PeerPaneComponent_Template_button_click_19_listener() {
            return ctx.doJoin();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Join");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PeerPaneComponent_Template_button_click_21_listener() {
            return ctx.hangup();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Hangup");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PeerPaneComponent_Template_button_click_23_listener() {
            return ctx.icedump();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "ICE Dump");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PeerPaneComponent_Template_button_click_25_listener() {
            return ctx.toggleStats();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 7)(28, "textarea", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function PeerPaneComponent_Template_textarea_ngModelChange_28_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.logText, $event) || (ctx.logText = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, PeerPaneComponent_textarea_29_Template, 1, 1, "textarea", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 10)(31, "input", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function PeerPaneComponent_Template_input_ngModelChange_31_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.sendText, $event) || (ctx.sendText = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PeerPaneComponent_Template_button_click_32_listener() {
            return ctx.send();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "Send");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.config == null ? null : ctx.config.nick);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("room: ", ctx.config == null ? null : ctx.config.room, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.wsState);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.dcStateClass());
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.dcState || "-");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.iceStateClass());
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.iceState || "-");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.wsState === "connecting");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.statsOn ? "Stop" : "Start", " Stats");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("has-ice", ctx.iceVisible)("no-ice", !ctx.iceVisible);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.logText);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.iceVisible);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.sendText);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.canSend());
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
      styles: [".card.panel[_ngcontent-%COMP%] {\n      height: 100%;\n      min-height: 500px;\n    }\n    .header[_ngcontent-%COMP%] {\n      padding: 16px !important;\n    }\n    .toolbar[_ngcontent-%COMP%] {\n      padding: 16px !important;\n    }\n    .content[_ngcontent-%COMP%] {\n      padding: 16px !important;\n    }\n    .content[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n      padding: 12px !important;\n      min-height: 200px;\n    }\n    .composer[_ngcontent-%COMP%] {\n      margin-top: 16px;\n    }\n    .composer[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      padding: 8px 12px;\n    }\n    .tag[_ngcontent-%COMP%] {\n      background: var(--bg);\n      padding: 4px 8px;\n      border-radius: 4px;\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL3BlZXItcGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsWUFBWTtNQUNaLGlCQUFpQjtJQUNuQjtJQUNBO01BQ0Usd0JBQXdCO0lBQzFCO0lBQ0E7TUFDRSx3QkFBd0I7SUFDMUI7SUFDQTtNQUNFLHdCQUF3QjtJQUMxQjtJQUNBO01BQ0Usd0JBQXdCO01BQ3hCLGlCQUFpQjtJQUNuQjtJQUNBO01BQ0UsZ0JBQWdCO0lBQ2xCO0lBQ0E7TUFDRSxpQkFBaUI7SUFDbkI7SUFDQTtNQUNFLHFCQUFxQjtNQUNyQixnQkFBZ0I7TUFDaEIsa0JBQWtCO0lBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLmNhcmQucGFuZWwge1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgbWluLWhlaWdodDogNTAwcHg7XG4gICAgfVxuICAgIC5oZWFkZXIge1xuICAgICAgcGFkZGluZzogMTZweCAhaW1wb3J0YW50O1xuICAgIH1cbiAgICAudG9vbGJhciB7XG4gICAgICBwYWRkaW5nOiAxNnB4ICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5jb250ZW50IHtcbiAgICAgIHBhZGRpbmc6IDE2cHggIWltcG9ydGFudDtcbiAgICB9XG4gICAgLmNvbnRlbnQgdGV4dGFyZWEge1xuICAgICAgcGFkZGluZzogMTJweCAhaW1wb3J0YW50O1xuICAgICAgbWluLWhlaWdodDogMjAwcHg7XG4gICAgfVxuICAgIC5jb21wb3NlciB7XG4gICAgICBtYXJnaW4tdG9wOiAxNnB4O1xuICAgIH1cbiAgICAuY29tcG9zZXIgaW5wdXQge1xuICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgfVxuICAgIC50YWcge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tYmcpO1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 5108:
/*!***************************************!*\
  !*** ./src/app/shared/rtc.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PeerSession: () => (/* binding */ PeerSession),
/* harmony export */   RtcService: () => (/* binding */ RtcService)
/* harmony export */ });
/* harmony import */ var _Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);


class PeerSession {
  constructor(initiator, stunUrl, cb) {
    this.initiator = initiator;
    this.cb = cb;
    this.pc = new RTCPeerConnection({
      iceServers: [{
        urls: stunUrl
      }]
    });
    this.pc.onicecandidate = e => {
      if (e.candidate) this.cb.onSignal({
        candidate: e.candidate
      });
    };
    this.pc.oniceconnectionstatechange = () => {
      const s = this.pc.iceConnectionState;
      this.cb.onIceState?.(s);
    };
    this.pc.ondatachannel = e => this.attachDc(e.channel);
    if (initiator) {
      // Configure data channel for low latency
      const dc = this.pc.createDataChannel('chat', {
        ordered: true,
        // Guarantee message order
        maxRetransmits: 0 // Don't retry - better to show new messages than retry old ones
      });
      this.attachDc(dc);
    }
  }
  attachDc(dc) {
    this.dc = dc;
    this.cb.onDcState?.(dc.readyState);
    dc.onopen = () => this.cb.onDcState?.(dc.readyState);
    dc.onclose = () => this.cb.onDcState?.(dc.readyState);
    dc.onmessage = e => this.cb.onDcMessage?.(String(e.data ?? ''));
  }
  startOffer() {
    var _this = this;
    return (0,_Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const offer = yield _this.pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false
      });
      yield _this.pc.setLocalDescription(offer);
      _this.cb.onSignal({
        sdp: _this.pc.localDescription
      });
    })();
  }
  handleRemoteSdp(sdp) {
    var _this2 = this;
    return (0,_Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.pc.setRemoteDescription(new RTCSessionDescription(sdp));
      if (sdp.type === 'offer') {
        const answer = yield _this2.pc.createAnswer();
        yield _this2.pc.setLocalDescription(answer);
        _this2.cb.onSignal({
          sdp: _this2.pc.localDescription
        });
      }
    })();
  }
  handleRemoteCandidate(candidate) {
    var _this3 = this;
    return (0,_Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this3.pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch {}
    })();
  }
  send(text) {
    if (!this.dc || this.dc.readyState !== 'open') return;
    try {
      this.dc.send(text);
    } catch {}
  }
  startStatsLoop(onStats) {
    var _this4 = this;
    this.stopStatsLoop();
    this.statsTimer = setInterval(/*#__PURE__*/(0,_Users_dustin_projects_WebRTC_src_webapp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const stats = yield _this4.pc.getStats();
        const arr = [];
        stats.forEach(s => {
          if (['local-candidate', 'remote-candidate', 'candidate-pair'].includes(s.type)) arr.push(s);
        });
        onStats(arr);
      } catch {}
    }), 1000);
  }
  stopStatsLoop() {
    if (this.statsTimer) {
      clearInterval(this.statsTimer);
      this.statsTimer = null;
    }
  }
  close() {
    this.stopStatsLoop();
    try {
      this.dc?.close();
    } catch {}
    try {
      this.pc.close();
    } catch {}
  }
}
class RtcService {
  createSession(initiator, stunUrl, cb) {
    return new PeerSession(initiator, stunUrl, cb);
  }
  static {
    this.ɵfac = function RtcService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || RtcService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: RtcService,
      factory: RtcService.ɵfac
    });
  }
}

/***/ }),

/***/ 2323:
/*!*********************************************!*\
  !*** ./src/app/shared/signaling.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignalingService: () => (/* binding */ SignalingService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);


class SignalingService {
  constructor() {
    this.state$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject('idle');
    this.joined$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.peers$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this.signal$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  connect(url) {
    this.url = url;
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) return;
    this.state$.next('connecting');
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      this.state$.next('open');
      if (this.pendingJoin) {
        try {
          this.ws.send(JSON.stringify({
            type: 'join',
            room: this.pendingJoin.room,
            nick: this.pendingJoin.nick
          }));
        } catch {}
      }
    };
    this.ws.onclose = () => this.state$.next('closed');
    this.ws.onerror = () => this.state$.next('error');
    this.ws.onmessage = ev => {
      let msg;
      try {
        msg = JSON.parse(String(ev.data));
      } catch {
        return;
      }
      if (msg.type === 'joined') this.joined$.next({
        id: msg.id,
        room: msg.room
      });else if (msg.type === 'peers') this.peers$.next({
        id: msg.id,
        peers: msg.peers
      });else if (msg.type === 'signal') this.signal$.next({
        from: msg.from,
        data: msg.data
      });
    };
  }
  send(obj) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    try {
      this.ws.send(JSON.stringify(obj));
    } catch {}
  }
  join(room, nick) {
    this.pendingJoin = {
      room,
      nick
    };
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({
        type: 'join',
        room,
        nick
      });
    }
  }
  updateNick(nick) {
    this.send({
      type: 'nick',
      nick
    });
  }
  sendSignal(data, to) {
    this.send(to ? {
      type: 'signal',
      data,
      to
    } : {
      type: 'signal',
      data
    });
  }
  static {
    this.ɵfac = function SignalingService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SignalingService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: SignalingService,
      factory: SignalingService.ɵfac
    });
  }
}

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _app_app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.routes */ 2181);




(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, {
  providers: [(0,_angular_router__WEBPACK_IMPORTED_MODULE_3__.provideRouter)(_app_app_routes__WEBPACK_IMPORTED_MODULE_1__.APP_ROUTES)]
}).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map