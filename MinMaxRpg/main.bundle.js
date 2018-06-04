webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/ability-condition/ability-condition.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/ability-condition/ability-condition.component.html":
/***/ (function(module, exports) {

module.exports = "\n<app-ability-icon [ability]=\"abilityCondition.ability\"></app-ability-icon>\n\n<select name=\"ability\" [(ngModel)]=\"selectedAbility\">\n\t<option *ngFor=\"let ability of abilities\" [ngValue]=\"ability\">{{ability.name}}</option>\n</select>\n\n<select name=\"type\" [(ngModel)]=\"abilityType\">\n\t\t<option *ngFor=\"let t of conditionTypes\" [ngValue]=\"t\">{{t}}</option>\n</select>\n\n<span *ngIf=\"abilityType === 'lifeIsLess' || abilityType === 'lifeIsMore'\">\n\tUse {{abilityCondition.ability.name}} if life of  \n\t<select name=\"target\" [(ngModel)]=\"abilityCondition.values[0]\">\n\t\t\t<option *ngFor=\"let t of ['myself', 'tank', 'friend', 'mob']\" [ngValue]=\"t\">{{t}}</option>\n\t</select>\n\tis \n\t<span *ngIf=\"abilityType === 'lifeIsLess'\">less</span>\n\t<span *ngIf=\"abilityType === 'lifeIsMore'\">more</span>\n\tthan:\n\t<input type=\"range\" min=\"0\" max=\"100\" \n\t\t[(ngModel)]=\"abilityCondition.values[1]\">\n\t\t{{abilityCondition.values[1]}}% \n</span>\n"

/***/ }),

/***/ "./src/app/ability-condition/ability-condition.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbilityConditionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AbilityConditionComponent = class AbilityConditionComponent {
    constructor() {
        this.conditionTypes = __WEBPACK_IMPORTED_MODULE_1__world___["b" /* AbilityCondition */].allTypes;
    }
    get selectedAbility() {
        return this.abilityCondition.ability;
    }
    set selectedAbility(value) {
        this.abilityCondition.ability = value;
        this.player.dispatchAbilities();
    }
    get abilityType() {
        return this.abilityCondition.type;
    }
    set abilityType(value) {
        this.abilityCondition.type = value;
        if (value === 'lifeIsLess') {
            if (!this.abilityCondition.values[0]) {
                this.abilityCondition.values[0] = 'myself';
                this.abilityCondition.values[1] = 50;
            }
        }
        else if (value === 'lifeIsMore') {
            if (!this.abilityCondition.values[0]) {
                this.abilityCondition.values[0] = 'mob';
                this.abilityCondition.values[1] = 50;
            }
        }
        this.player.dispatchAbilities();
    }
    ngOnInit() { }
    ngOnChanges() {
        this.abilities = this.player.abilities;
    }
    ngDoCheck() {
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["L" /* Player */])
], AbilityConditionComponent.prototype, "player", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["b" /* AbilityCondition */])
], AbilityConditionComponent.prototype, "abilityCondition", void 0);
AbilityConditionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-ability-condition',
        template: __webpack_require__("./src/app/ability-condition/ability-condition.component.html"),
        styles: [__webpack_require__("./src/app/ability-condition/ability-condition.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AbilityConditionComponent);



/***/ }),

/***/ "./src/app/ability-icon/ability-icon.component.css":
/***/ (function(module, exports) {

module.exports = ".description{\r\n\tcolor:yellow;\r\n}\r\n.requirementNotOk{\r\n\tcolor:red;\r\n}"

/***/ }),

/***/ "./src/app/ability-icon/ability-icon.component.html":
/***/ (function(module, exports) {

module.exports = "<app-tooltip-icon [icon]=\"ability.icon\">\n\t<span>{{ability.name}}</span>\n\t<span *ngIf=\"castingDuration$|async\">\n\t\t<br/>Mana: {{castingDuration$|async}}</span>\n\t<span *ngIf=\"castingDuration$|async\">\n\t\t<br/>{{(castingDuration$|async)/10}} sec cast</span>\n\t<span *ngIf=\"cooldown$|async\">\n\t\t<br/>cooldown: {{(cooldown$|async)/10}} sec</span>\n\t<span *ngFor=\"let requirement of (requirements$ | async)\" [ngClass]=\"{requirementOk:requirement.ok,requirementNotOk:!requirement.ok}\">\n\t\t<br/>{{requirement.description}}</span>\n\t<br/> \n\t<span class=\"description\">{{ability.description}}</span>\n\t<br/>\n</app-tooltip-icon>"

/***/ }),

/***/ "./src/app/ability-icon/ability-icon.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbilityIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AbilityIconComponent = class AbilityIconComponent {
    constructor() { }
    ngOnInit() {
        this.requirements$ = this.ability.$.map(a => a.requirements);
        this.cooldown$ = this.ability.$.map(a => a.cooldown);
        this.manaCost$ = this.ability.$.map(a => a.manaCost);
        this.castingDuration$ = this.ability.$.map(a => a.castingDuration);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["a" /* Ability */])
], AbilityIconComponent.prototype, "ability", void 0);
AbilityIconComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-ability-icon',
        template: __webpack_require__("./src/app/ability-icon/ability-icon.component.html"),
        styles: [__webpack_require__("./src/app/ability-icon/ability-icon.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
    }),
    __metadata("design:paramtypes", [])
], AbilityIconComponent);



/***/ }),

/***/ "./src/app/ability-usage/ability-usage.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/ability-usage/ability-usage.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n\tBefore fighting, eat if hero's life is less than:\n\t<input type=\"range\" min=\"0\" max=\"100\" [(ngModel)]=\"player.abilitySelector.eatIfLifePercentUnder\"> {{player.abilitySelector.eatIfLifePercentUnder}}%\n</p>\n\n<p>\n\tDuring fight, use the following abilities:\n</p>\n\n<div *ngFor=\"let abilityCondition of player.abilitySelector.abilityConditions\">\n\t<button (click)=\"remove(abilityCondition)\">delete</button>\n\t<app-ability-condition [player]=\"player\" [abilityCondition]=\"abilityCondition\">\n\t</app-ability-condition>\n</div>\n<button (click)=\"add()\">add</button>\n<br/>\n<br/>\n<button (click)=\"focus.selectTab('game')\">Return to game</button>"

/***/ }),

/***/ "./src/app/ability-usage/ability-usage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbilityUsageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let AbilityUsageComponent = class AbilityUsageComponent {
    constructor() { }
    ngOnInit() { }
    ngOnChanges() {
    }
    remove(abilityCondition) {
        const index = this.player.abilitySelector.abilityConditions.indexOf(abilityCondition);
        if (index >= 0) {
            this.player.abilitySelector.abilityConditions.splice(index, 1);
            this.player.dispatchAbilities();
        }
    }
    add() {
        const cond = new __WEBPACK_IMPORTED_MODULE_1__world___["b" /* AbilityCondition */]();
        cond.ability = this.player.abilities[0];
        this.player.abilitySelector.abilityConditions.push(cond);
        this.player.dispatchAbilities();
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__layout_focus__["a" /* Focus */])
], AbilityUsageComponent.prototype, "focus", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["L" /* Player */])
], AbilityUsageComponent.prototype, "player", void 0);
AbilityUsageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-ability-usage',
        template: __webpack_require__("./src/app/ability-usage/ability-usage.component.html"),
        styles: [__webpack_require__("./src/app/ability-usage/ability-usage.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AbilityUsageComponent);



/***/ }),

/***/ "./src/app/activity/activity.component.css":
/***/ (function(module, exports) {

module.exports = "td {\t\r\n\tvertical-align: top;\r\n}\r\n\r\ntable{\r\n\twidth: 100%;\r\n}"

/***/ }),

/***/ "./src/app/activity/activity.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n\t{{activity.name}}\n</p>\n\n\n<ul class=\"\">\n\t<li *ngFor=\"let task of activity.thread.allTasks\">\n\t\t{{task.name}} &nbsp;&nbsp;&nbsp; {{task.progress}}\n\t\t<app-fighting-character *ngIf=\"task.mob\" [character]=\"task.mob\" [world]=\"focus.world\"></app-fighting-character>\n\t</li>\n</ul>\n\n<div *ngIf=\"activity.done\">\n\n\t<div *ngIf=\"activity.success\">\n\t\tSuccess\n\t\t<div *ngIf=\"activity.activity.ability\">\n\t\t\tTo configure the learned ability:\n\t\t\t<button (click)=\"selectTab('abilities')\">Abilities usage</button>\n\t\t</div>\n\t\t<div *ngIf=\" activity.group.foundItems.length != 0\">\n\t\t\t<br/> Reward:\n\t\t\t<br/>\n\t\t\t<div class=\"item-container\">\n\t\t\t\t<app-item *ngFor=\"let item of activity.group.foundItems\" [item]=\"item\"></app-item>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div *ngIf=\"!activity.success\">\n\t\t<br/> Failure\n\t\t<br/>\n\t</div>\n\n\t<br/>\n\t<button *ngIf=\"hasEquipableReward()\" (click)=\"selectTab('armory')\">Armory</button>\n\t<button (click)=\"done()\">Ok</button>\n</div>"

/***/ }),

/***/ "./src/app/activity/activity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__world___ = __webpack_require__("./src/app/world/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ActivityComponent = class ActivityComponent {
    constructor() { }
    ngOnInit() { }
    ngOnChanges() {
        this.activity = this.focus.activityProgress;
        console.log("ngChanges");
    }
    getMob() {
        const fight = this.activity.thread.allTasks[this.activity.thread.allTasks.length - 1];
        this.mob = fight ? fight.mob : null;
        return this.mob;
    }
    done() {
        this.focus.refresh();
    }
    selectTab(tabName) {
        this.focus.selectTab(tabName);
        this.focus.refresh();
    }
    hasEquipableReward() {
        return this.activity.group.foundItems.some(item => item.isEquipable);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__layout_focus__["a" /* Focus */])
], ActivityComponent.prototype, "focus", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__world___["L" /* Player */])
], ActivityComponent.prototype, "player", void 0);
ActivityComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-activity',
        template: __webpack_require__("./src/app/activity/activity.component.html"),
        styles: [__webpack_require__("./src/app/activity/activity.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ActivityComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm2015/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm2015/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_app_component__ = __webpack_require__("./src/app/layout/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__log_log_component__ = __webpack_require__("./src/app/log/log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layout_app_routing_module__ = __webpack_require__("./src/app/layout/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__start_menu_start_menu_component__ = __webpack_require__("./src/app/start-menu/start-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recruitment_recruitment_component__ = __webpack_require__("./src/app/recruitment/recruitment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__quest_dashboard_quest_dashboard_component__ = __webpack_require__("./src/app/quest-dashboard/quest-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nav_group_nav_group_component__ = __webpack_require__("./src/app/nav-group/nav-group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__activity_activity_component__ = __webpack_require__("./src/app/activity/activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ability_usage_ability_usage_component__ = __webpack_require__("./src/app/ability-usage/ability-usage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ability_condition_ability_condition_component__ = __webpack_require__("./src/app/ability-condition/ability-condition.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__armory_armory_component__ = __webpack_require__("./src/app/armory/armory.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__bank_bank_component__ = __webpack_require__("./src/app/bank/bank.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__item_item_component__ = __webpack_require__("./src/app/item/item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__mob_mob_component__ = __webpack_require__("./src/app/mob/mob.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__fighting_character_fighting_character_component__ = __webpack_require__("./src/app/fighting-character/fighting-character.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__progressbar_progressbar_component__ = __webpack_require__("./src/app/progressbar/progressbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__tooltip_icon_tooltip_icon_component__ = __webpack_require__("./src/app/tooltip-icon/tooltip-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__player_icon_player_icon_component__ = __webpack_require__("./src/app/player-icon/player-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ability_icon_ability_icon_component__ = __webpack_require__("./src/app/ability-icon/ability-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__buff_icon_buff_icon_component__ = __webpack_require__("./src/app/buff-icon/buff-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__edit_group_edit_group_component__ = __webpack_require__("./src/app/edit-group/edit-group.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__layout_app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__log_log_component__["a" /* LogComponent */],
            __WEBPACK_IMPORTED_MODULE_6__start_menu_start_menu_component__["a" /* StartMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_7__recruitment_recruitment_component__["a" /* RecruitmentComponent */],
            __WEBPACK_IMPORTED_MODULE_8__quest_dashboard_quest_dashboard_component__["a" /* QuestDashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_9__nav_group_nav_group_component__["a" /* NavGroupComponent */],
            __WEBPACK_IMPORTED_MODULE_10__activity_activity_component__["a" /* ActivityComponent */],
            __WEBPACK_IMPORTED_MODULE_11__ability_usage_ability_usage_component__["a" /* AbilityUsageComponent */],
            __WEBPACK_IMPORTED_MODULE_12__ability_condition_ability_condition_component__["a" /* AbilityConditionComponent */],
            __WEBPACK_IMPORTED_MODULE_13__armory_armory_component__["a" /* ArmoryComponent */],
            __WEBPACK_IMPORTED_MODULE_14__bank_bank_component__["a" /* BankComponent */],
            __WEBPACK_IMPORTED_MODULE_15__item_item_component__["a" /* ItemComponent */],
            __WEBPACK_IMPORTED_MODULE_16__mob_mob_component__["a" /* MobComponent */],
            __WEBPACK_IMPORTED_MODULE_17__fighting_character_fighting_character_component__["a" /* FightingCharacterComponent */],
            __WEBPACK_IMPORTED_MODULE_18__progressbar_progressbar_component__["a" /* ProgressbarComponent */],
            __WEBPACK_IMPORTED_MODULE_19__tooltip_icon_tooltip_icon_component__["a" /* TooltipIconComponent */],
            __WEBPACK_IMPORTED_MODULE_20__player_icon_player_icon_component__["a" /* PlayerIconComponent */],
            __WEBPACK_IMPORTED_MODULE_21__ability_icon_ability_icon_component__["a" /* AbilityIconComponent */],
            __WEBPACK_IMPORTED_MODULE_22__buff_icon_buff_icon_component__["a" /* BuffIconComponent */],
            __WEBPACK_IMPORTED_MODULE_23__edit_group_edit_group_component__["a" /* EditGroupComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__layout_app_routing_module__["a" /* AppRoutingModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__layout_app_component__["a" /* AppComponent */]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/armory/armory.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/armory/armory.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n\t{{player.name}} :\n</p>\n<div class=\"flex-container\">\n\t<app-item *ngFor=\"let item of (player.$|async).equipedItems\" (click)=\"unequip(item)\" [item]=\"item\" [player]=\"player\" [clickable]=\"true\"></app-item>\n</div>\n\n<p>\n\tLife: {{currentLife$|async}} / {{(player.$|async).maxLife}}\n\t<br/> Stamina: {{stamina$|async}}\n\t<br/> Strength: {{strength$|async}}\n\t<br/> Agility: {{agility$|async}}\n\t<span *ngIf=\"player.useMana\">\t\t\n\t\t<br/> Wisdom: {{wisdom$|async}} \n\t\t<br/>Mana:{{currentMana$ | async}}/{{(player.$|async).maxMana}}\n\t\t<br/> Spirit: {{spirit$|async}} \n\t\t<br/> Regen: {{(player.$|async).regenManaPerSecond}} mana/sec\n\t\t<br/> Intellect: {{intellect$|async}} spell power and spell cost\n\t\t\n\t</span>\n\n\n\t<br/> Weapon damage: {{(player.$|async).weaponDamage}}, Cool down: {{(player.$|async).weaponCooldown / 10}} sec\n\t<br/> Attack power: {{attackPower$|async}}\n\t<br/> Swing DPS: {{dps$|async}}\n\t<br/> Armor: {{armor$|async}} (a 100 physical hit deal {{armorRecution$|async}} damage)\n</p>\n--\n<p>\n\tBank (click to equip):\n</p>\n\n<div class=\"flex-container\">\n\t<app-item *ngFor=\"let item of (bankItems$|async)\" (click)=\"equip(item)\" [item]=\"item\" [player]=\"player\" [clickable]=\"true\"></app-item>\n</div>\n<br/>\n<button (click)=\"focus.selectTab('game')\">Return to game</button>"

/***/ }),

/***/ "./src/app/armory/armory.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArmoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm2015/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ArmoryComponent = class ArmoryComponent {
    constructor() { }
    bankItems() {
        return this.bag.getEquipables();
    }
    ngOnInit() {
        this.bag = this.focus.world.bag;
        this.currentLife$ = this.player.$.map(p => Math.floor(p.currentLife));
        this.currentMana$ = this.player.$.map(p => Math.floor(p.currentMana));
        this.stamina$ = this.player.$.map(p => p.characterStat.stamina.defaultValue);
        this.strength$ = this.player.$.map(p => p.characterStat.strength.defaultValue);
        this.agility$ = this.player.$.map(p => p.characterStat.agility.defaultValue);
        this.spirit$ = this.player.$.map(p => p.characterStat.spirit.defaultValue);
        this.intellect$ = this.player.$.map(p => p.characterStat.intellect.defaultValue);
        this.wisdom$ = this.player.$.map(p => p.characterStat.wisdom.defaultValue);
        this.attackPower$ = this.player.$.map(p => p.characterStat.getAttackPower(null, null, null));
        this.dps$ = this.player.$.map(p => p.getWeaponDps());
        this.armor$ = this.player.$.map(p => p.characterStat.armor.defaultValue);
        this.armorRecution$ = this.player.$.map(p => p.characterStat.armorReduceDamage(100, null, null, null));
        this.bankItems$ = this.bag.$.map(b => b.getEquipables());
    }
    ngOnChanges() {
    }
    equip(item) {
        this.bag.equip(this.player, item);
    }
    unequip(item) {
        this.bag.unequip(this.player, item);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__layout_focus__["a" /* Focus */])
], ArmoryComponent.prototype, "focus", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["L" /* Player */])
], ArmoryComponent.prototype, "player", void 0);
ArmoryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-armory',
        template: __webpack_require__("./src/app/armory/armory.component.html"),
        styles: [__webpack_require__("./src/app/armory/armory.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
    }),
    __metadata("design:paramtypes", [])
], ArmoryComponent);



/***/ }),

/***/ "./src/app/bank/bank.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./src/app/bank/bank.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n\tBank:\n</p>\n<div class=\"item-container\">\n\t<app-item *ngFor=\"let stack of (stacks$|async)\" \n\t[item]=\"stack.item\" [quantity]=\"stack.quantity\"></app-item>\n</div>\n<br/>\n<button (click)=\"focus.selectTab('game')\">Return to game</button>"

/***/ }),

/***/ "./src/app/bank/bank.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let BankComponent = class BankComponent {
    constructor() { }
    ngOnInit() {
        this.bag = this.focus.world.bag;
        this.stacks$ = this.bag.$.map(b => b.stacks);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__layout_focus__["a" /* Focus */])
], BankComponent.prototype, "focus", void 0);
BankComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-bank',
        template: __webpack_require__("./src/app/bank/bank.component.html"),
        styles: [__webpack_require__("./src/app/bank/bank.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
    }),
    __metadata("design:paramtypes", [])
], BankComponent);



/***/ }),

/***/ "./src/app/buff-icon/buff-icon.component.css":
/***/ (function(module, exports) {

module.exports = ".container{\r\n\tfont-size: 0.4em;\r\n}"

/***/ }),

/***/ "./src/app/buff-icon/buff-icon.component.html":
/***/ (function(module, exports) {

module.exports = "<app-tooltip-icon [icon]=\"buff.buffType.icon\" class=\"container\">\n\t\t<span>{{buff.buffType.name}}</span><br/>\t\n\t\t<span>{{buff.description}}</span><br/>\t\n</app-tooltip-icon>\n"

/***/ }),

/***/ "./src/app/buff-icon/buff-icon.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuffIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let BuffIconComponent = class BuffIconComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["j" /* Buff */])
], BuffIconComponent.prototype, "buff", void 0);
BuffIconComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-buff-icon',
        template: __webpack_require__("./src/app/buff-icon/buff-icon.component.html"),
        styles: [__webpack_require__("./src/app/buff-icon/buff-icon.component.css")]
    }),
    __metadata("design:paramtypes", [])
], BuffIconComponent);



/***/ }),

/***/ "./src/app/edit-group/edit-group.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/edit-group/edit-group.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n\tGroup:\n</p>\n<p *ngFor=\"let p of group.players\">\n\t<app-player-icon [player]=\"p\"></app-player-icon>\n\t<span *ngIf=\"group.players.length >= 2\">\n\t\t<button (click)=\"excludePlayer(p)\">Ungroup</button>\n\t\t<button *ngIf=\"group.players.indexOf(p) != 0\" (click)=\"promotePlayer(p)\">promote</button>\n\t</span>\n</p>\n\n\n<P>\n\tAvailable:\n</P>\n<p *ngFor=\"let p of availablePlayers\">\n\t<app-player-icon [player]=\"p\"></app-player-icon>\n\t<button (click)=\"inludePlayer(p)\">group</button>\n</p>\n\n<br/>\n<button (click)=\"focus.selectTab('game')\">Return to game</button>"

/***/ }),

/***/ "./src/app/edit-group/edit-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let EditGroupComponent = class EditGroupComponent {
    constructor() { }
    ngOnInit() { }
    ngOnChanges() {
        this.refresh();
    }
    refresh() {
        this.availablePlayers = this.group.world.players.filter(p => this.group.players.indexOf(p) === -1);
    }
    inludePlayer(player) {
        this.group.includePlayer(player);
        this.refresh();
    }
    excludePlayer(player) {
        this.group.excludePlayer(player);
        this.refresh();
        if (player === this.focus.selectedPlayer) {
            this.focus.selectGroup(player, player.group);
        }
    }
    promotePlayer(player) {
        this.group.promotePlayer(player);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__layout_focus__["a" /* Focus */])
], EditGroupComponent.prototype, "focus", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["v" /* Group */])
], EditGroupComponent.prototype, "group", void 0);
EditGroupComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-edit-group',
        template: __webpack_require__("./src/app/edit-group/edit-group.component.html"),
        styles: [__webpack_require__("./src/app/edit-group/edit-group.component.css")]
    }),
    __metadata("design:paramtypes", [])
], EditGroupComponent);



/***/ }),

/***/ "./src/app/fighting-character/fighting-character.component.css":
/***/ (function(module, exports) {

module.exports = ".component{\r\n\tpadding: 0.3em;\t\r\n\twidth:12em;\r\n}\r\n\r\n.header {\r\n\tposition:relative;\r\n\theight: 3.2em;\r\n}\r\n\r\n.portrait {\t\t\t\r\n\tposition:absolute;\r\n}\r\n\r\n.life{\r\n\tposition:absolute;\t\r\n\tmargin: 0.1em;\t\t\r\n\tleft: 3.5em;\r\n\twidth: 8em;\r\n}\r\n\r\n.mana{\r\n\tposition:absolute;\t\r\n\tfont-size: 0.5em;\t\r\n\tmargin: 0.2em;\t\t\r\n\ttop: 2.5em;\r\n\tleft: 7em;\r\n\twidth: 16em;\r\n}\r\n\r\n.buffbar{\r\n\tposition:absolute;\t\r\n\tmargin: 0.1em;\t\t\r\n\tleft: 3.8em;\r\n\ttop: 1.3em;\r\n\twidth: 8em;\r\n}\r\n\r\n.debuff{\r\n\tposition:absolute;\t\r\n\ttop:0em;\r\n\tright:0em;\r\n}\r\n\r\n.ability{\t\r\n\tposition:relative;\r\n\theight: 2em;\t\r\n\r\n}\r\n\r\n.abilityIcon{\t\t\t\r\n\tfont-size: 0.6em;\t\r\n\tposition:absolute;\t\r\n}\r\n\r\n.abilityState{\r\n\tposition:absolute;\r\n\ttop : 0em;\t\r\n\tleft: 3em;\r\n\tright: 0em;\r\n\tfont-size: 0.8em;\t\t\t\r\n}\r\n\r\n.abilityProgress{\t\r\n\tposition:absolute;\r\n\ttop : 0em;\t\r\n\twidth: 4em;\t\r\n}\r\n\r\n.abilityDesc{\t\r\n\tposition:absolute;\r\n\ttop : 1.1em;\t\r\n}"

/***/ }),

/***/ "./src/app/fighting-character/fighting-character.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n\t<div class=\"header\">\n\t\t<div class=\"portrait\">\n\t\t\t<app-player-icon *ngIf=\"character.isPlayer\" [player]=\"character\"></app-player-icon>\n\t\t\t<app-mob *ngIf=\"character.isMob\" [mob]=\"character\"></app-mob>\n\t\t</div>\n\t\t<app-progressbar value=\"{{character.currentLife}}\" max=\"{{character.maxLife}}\" class=\"life\" color=\"red\"></app-progressbar>\n\t\t<app-progressbar *ngIf=\"character.useMana\" value=\"{{character.currentMana}}\" max=\"{{character.maxMana}}\" class=\"mana\" color=\"blue\"></app-progressbar>\n\t\t<div class=\"buffbar\">\n\t\t\t<div class=\"buff\">\n\t\t\t\t<app-buff-icon *ngFor=\"let appliedBuff of character.buffs.appliedBuffs\" [buff]=\"appliedBuff.buff\"></app-buff-icon>\n\t\t\t</div>\n\t\t\t<div class=\"debuff\">\n\t\t\t\t<app-buff-icon *ngFor=\"let appliedBuff of character.debuffs.appliedBuffs\" [buff]=\"appliedBuff.buff\"></app-buff-icon>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"abilitiesContainer\">\n\t\t<div *ngFor=\"let ability of (abilities$|async)\" class=\"ability\">\n\t\t\t<div class=\"abilityIcon\">\n\t\t\t\t<app-ability-icon [ability]=\"ability.ability\"></app-ability-icon>\n\t\t\t</div>\n\t\t\t<div class=\"abilityState\">\n\t\t\t\t<app-progressbar *ngIf=\"ability.casting\" [value]=\"ability.castingPercent$|async\" max=\"100\" class=\"abilityProgress\" color=\"#6B6\"\n\t\t\t\t [showText]=\"false\"></app-progressbar>\n\t\t\t\t<app-progressbar *ngIf=\"!ability.casting\" [value]=\"ability.cooldownPercent$|async\" max=\"100\" class=\"abilityProgress\" color=\"#669\"\n\t\t\t\t [showText]=\"false\"></app-progressbar>\n\t\t\t\t<div class=\"abilityDesc\"> {{ability.lastActionDesc}}</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/fighting-character/fighting-character.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FightingCharacterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm2015/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm2015/add/operator/distinctUntilChanged.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let FightingCharacterComponent = class FightingCharacterComponent {
    constructor() {
        //@Input() tick: number;
        this.showAbilities = true;
    }
    ngOnInit() {
        this.abilities$ = this.character.abilities$.map(c => this.getAbilities(c));
    }
    ngOnChanges() {
        this.character.dispatchAbilities(); //Force the refresh of 'showAbilities'
    }
    getAbilities(character) {
        if (!this.showAbilities || character.isDead) {
            return [];
        }
        const clone = character.getActiveAbilities().map(a => ({
            ability: a,
            icon: a.icon,
            casting: a.casting,
            castingPercent$: this.world.tick$.map(tick => a.casting != null ? a.casting.percent : 0).distinctUntilChanged(),
            cooldownPercent$: this.world.tick$.map(tick => character.getCooldownPercent(a, tick)).distinctUntilChanged(),
            lastActionDesc: a.lastActionDesc
        }));
        for (let a of clone) {
            if (character.isDead) {
                a.lastActionDesc = a.ability.name;
            }
            else if (!a.casting) {
                if (a.ability.lastActionTick <= 0 || a.ability.lastActionTick + 20 < this.world.tick) {
                    a.lastActionDesc = a.ability.name;
                }
            }
        }
        return clone;
        //Tools.arrayAssign(this.abilities, clone);//Avoid blinking
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["o" /* Character */])
], FightingCharacterComponent.prototype, "character", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["Z" /* World */])
], FightingCharacterComponent.prototype, "world", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Boolean)
], FightingCharacterComponent.prototype, "showAbilities", void 0);
FightingCharacterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-fighting-character',
        template: __webpack_require__("./src/app/fighting-character/fighting-character.component.html"),
        styles: [__webpack_require__("./src/app/fighting-character/fighting-character.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
    }),
    __metadata("design:paramtypes", [])
], FightingCharacterComponent);



/***/ }),

/***/ "./src/app/item/item.component.css":
/***/ (function(module, exports) {

module.exports = ".tooltip {\r\n\tposition: relative;\r\n\tdisplay: inline-block;\t\r\n}\r\n.clickable{\r\n\tcursor:pointer;\r\n}\r\n.icon {\r\n\tcursor: default;\r\n\tfont-size: 32px;\r\n\tbackground-color: rgb(240, 240, 240);\r\n  /*width: 32px;*/\r\n  margin: 4px;\r\n  text-align: center;\r\n  font-family: \"Noto Color Emoji\", \"Apple Color Emoji\", \"Segoe UI Emoji\", Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort;\r\n}\r\n.clickable .icon{\r\n\tcursor:pointer;\r\n}\r\n.clickable .icon:hover {\r\n\t\tbackground-color: #DDD;\r\n\t\tmargin-left: 5px;\r\n\t\tmargin-right: 3px;\r\n}\r\n.quantity{\r\n\tposition: absolute;\r\n\ttext-align: right;\r\n\tpadding-right: 0.6em;\r\n\tz-index: 0.5;\r\n\tright: 0px;\r\n\tbottom: 0px;\r\n\tcolor: rgb(240, 240, 240);\r\n\ttext-shadow: 2px 2px 4px #000000;\r\n\tfont-weight: 600;\r\n}\r\n.tooltip .tooltiptext {\r\n\tvisibility: hidden;\r\n\twidth: 120px;\r\n\tbackground-color:rgba(10,0,5,0.8);\r\n\tcolor: #fff;\r\n\ttext-align: center;\r\n\tborder-radius: 6px;\r\n\tpadding: 5px 0;\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n\tbottom: 125%;\r\n\tleft: 50%;\r\n\tmargin-left: -60px;\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.3s;\r\n\ttransition: opacity 0.3s;\r\n\ttext-align: left;\r\n\tpadding: 1em;\r\n\tmin-width: 16em;\r\n}\r\n/*\r\n.tooltip .tooltiptext::after {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\ttop: 100%;\r\n\tleft: 50%;\r\n\tmargin-left: -5px;\r\n\tborder-width: 5px;\r\n\tborder-style: solid;\r\n\tborder-color: #555 transparent transparent transparent;\r\n}\r\n*/\r\n.tooltip:hover .tooltiptext {\r\n\tvisibility: visible;\r\n\topacity: 1;\r\n}\r\n.white{\r\n\tcolor: white;\r\n}\r\n.green{\r\n\tcolor: #24ee10;\r\n}\r\n.blue{\r\n\tcolor: #0070DD;\r\n}\r\n.purple{\r\n\tcolor: #ad23ed;\r\n}"

/***/ }),

/***/ "./src/app/item/item.component.html":
/***/ (function(module, exports) {

module.exports = "\n<app-tooltip-icon [icon]=\"item.icon\"  [quantity]=\"quantity\" (click)=\"onClick()\" [clickable]=\"clickable\" >\n\t\t<span class=\"{{item.qualityColor}}\">{{item.name}}</span><br/>\n\t\t{{item.slot}}<br *ngIf=\"item.slot\"/>\n\t\t<span *ngFor=\"let attr of getAttributeDescriptions()\">\n\t\t\t{{attr.label}}<br/>\n\t\t</span>\n</app-tooltip-icon>\n"

/***/ }),

/***/ "./src/app/item/item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ItemComponent = class ItemComponent {
    constructor() {
        this.click = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    ngOnInit() { }
    ngOnChanges() {
        if (this.quantity === 1) {
            this.quantity = null;
        }
    }
    onClick() {
        this.click.emit(this.item);
    }
    getAttributeDescriptions() {
        const attrs = this.item.getAttributeDescriptions();
        return attrs.map(a => ({ label: __WEBPACK_IMPORTED_MODULE_1__world___["X" /* Tools */].format(a.template, a.value) }));
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["y" /* Item */])
], ItemComponent.prototype, "item", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["L" /* Player */])
], ItemComponent.prototype, "player", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Number)
], ItemComponent.prototype, "quantity", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Boolean)
], ItemComponent.prototype, "clickable", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
    __metadata("design:type", Object)
], ItemComponent.prototype, "click", void 0);
ItemComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-item',
        template: __webpack_require__("./src/app/item/item.component.html"),
        styles: [__webpack_require__("./src/app/item/item.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ItemComponent);



/***/ }),

/***/ "./src/app/layout/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const routes = [];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/layout/app.component.css":
/***/ (function(module, exports) {

module.exports = "td {\t\r\n\tvertical-align: top;\r\n}\r\n\r\ntable{\r\n\twidth: 100%;\t\r\n}\r\n\r\n.nav{\r\n\twidth: 20%;\r\n\tpadding-right: 4em;\r\n}\r\n\r\n.scene{\r\n\twidth: 80%;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/layout/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>{{title}}</h1>\n\n<nav>\n\n\t<button *ngIf=\"focus.selectedPlayer\" (click)=\"selectTab('game')\">Game</button>\n\t<button *ngIf=\"focus.selectedPlayer\" (click)=\"selectTab('bank')\">Bank</button>\n\t<button *ngIf=\"focus.selectedPlayer\" (click)=\"selectTab('armory')\">Armory</button>\n\t<button *ngIf=\"focus.selectedPlayer\" (click)=\"selectTab('abilities')\">Abilities usage</button>\n\t<button *ngIf=\"focus.selectedPlayer && focus.world.players.length >= 2\" (click)=\"selectTab('group')\">Group</button>\n\n\n</nav>\n\n<table style=\"width: 100%\">\n\t<tr>\n\t\t<td class=\"nav\">\n\t\t\t<app-nav-group *ngIf=\"focus.world\" [focus]=\"focus\">\n\t\t\t</app-nav-group>\n\t\t</td>\n\t\t<td class=\"scene\">\n\t\t\t<app-start-menu *ngIf=\"!focus.world\" (start)=\"start()\"></app-start-menu>\n\t\t\t<div *ngIf=\"focus.seletedTab == 'game'\">\n\t\t\t\t<app-quest-dashboard *ngIf=\"focus.availableQuests\" [focus]=\"focus\" [quests]=\"focus.availableQuests\" [location]=\"focus.location\"></app-quest-dashboard>\n\t\t\t\t<app-activity *ngIf=\"focus.activityProgress\" [focus]=\"focus\" [player]=\"focus.selectedPlayer\"></app-activity>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"focus.seletedTab == 'bank'\">\n\t\t\t\t<app-bank *ngIf=\"focus.selectedPlayer\" [focus]=\"focus\"></app-bank>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"focus.seletedTab == 'armory'\">\n\t\t\t\t<app-armory *ngIf=\"focus.selectedPlayer\" [focus]=\"focus\" [player]=\"focus.selectedPlayer\"></app-armory>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"focus.seletedTab == 'abilities'\">\n\t\t\t\t<app-ability-usage *ngIf=\"focus.selectedPlayer\" [focus]=\"focus\" [player]=\"focus.selectedPlayer\"></app-ability-usage>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"focus.seletedTab == 'group'\">\n\t\t\t\t<app-edit-group *ngIf=\"focus.selectedGroup\"  [focus]=\"focus\" [group]=\"focus.selectedGroup\"></app-edit-group>\n\t\t\t</div>\n\t\t</td>\n\t</tr>\n</table>\n<!-- \n<app-logs *ngIf=\"focus.selectedGroup\" [logger]=\"focus.selectedGroup.logger\"></app-logs>\n-->"

/***/ }),

/***/ "./src/app/layout/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__focus__ = __webpack_require__("./src/app/layout/focus.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AppComponent = class AppComponent {
    constructor() {
        this.title = 'MinMax RPG';
        this.focus = new __WEBPACK_IMPORTED_MODULE_2__focus__["a" /* Focus */]();
    }
    start() {
        console.log("Start");
        this.focus.world = new __WEBPACK_IMPORTED_MODULE_1__world___["Z" /* World */]();
    }
    selectTab(tabName) {
        this.focus.selectTab(tabName);
    }
};
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/layout/app.component.html"),
        styles: [__webpack_require__("./src/app/layout/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);



/***/ }),

/***/ "./src/app/layout/focus.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world___ = __webpack_require__("./src/app/world/index.ts");

class Focus {
    constructor() {
        this.seletedTab = 'game';
        //Temp	
        this.world = new __WEBPACK_IMPORTED_MODULE_0__world___["Z" /* World */]();
        this.selectGroup(this.world.players[0], this.world.groups[0]);
    }
    selectGroup(player, group) {
        this.selectedPlayer = player;
        this.selectedGroup = group;
        this.refresh();
    }
    refresh() {
        this.availableQuests = null;
        this.activityProgress = null;
        this.location = null;
        if (this.selectedGroup) {
            this.location = this.selectedGroup.location;
            if (this.selectedGroup.activityProgress && !this.selectedGroup.activityProgress.done) {
                this.activityProgress = this.selectedGroup.activityProgress;
            }
            else {
                this.availableQuests = this.world.getAvailableQuests(this.selectedGroup);
            }
        }
    }
    selectTab(tabName) {
        this.seletedTab = tabName;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Focus;



/***/ }),

/***/ "./src/app/log/log.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/log/log.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"logger.messages.length\">\n\n  <h2>Messages</h2>  \n  <div *ngFor='let message of logger.messages'> {{message}} </div>\n\n</div>"

/***/ }),

/***/ "./src/app/log/log.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world__ = __webpack_require__("./src/app/world/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let LogComponent = class LogComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world__["I" /* Logger */])
], LogComponent.prototype, "logger", void 0);
LogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-logs',
        template: __webpack_require__("./src/app/log/log.component.html"),
        styles: [__webpack_require__("./src/app/log/log.component.css")]
    }),
    __metadata("design:paramtypes", [])
], LogComponent);



/***/ }),

/***/ "./src/app/mob/mob.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.easy{\r\n\tcolor: white;\r\n}\r\n\r\n.normal{\r\n\tcolor: #24ee10;\r\n}\r\n\r\n.hard{\r\n\tcolor: #0070DD;\r\n}\r\n\r\n.heroic{\r\n\tcolor: #ad23ed;\r\n}"

/***/ }),

/***/ "./src/app/mob/mob.component.html":
/***/ (function(module, exports) {

module.exports = "<app-tooltip-icon [icon]=\"mob.icon\" [isDead]=\"mob.isDead\">\n\t\t<span class=\"{{qualityColor}}\">{{mob.name}}</span><br/>\t\t\n\t\t<span>Life:{{mob.maxLife}}</span><br/>\n\t\t<span>DPS:{{dps}}</span><br/>\n\t\t<span>Difficulty:<span [ngClass]=\"difficulty\">{{difficulty}}</span></span><br/>\n</app-tooltip-icon>"

/***/ }),

/***/ "./src/app/mob/mob.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let MobComponent = class MobComponent {
    constructor() {
        this.dps = 0;
        this.difficulty = 'normal';
    }
    ngOnInit() { }
    ngOnChanges() {
        this.dps = this.mob.getWeaponDps();
        if (this.focus && this.focus.selectedGroup) {
            this.difficulty = this.focus.selectedGroup.getFightDifficulty(this.mob);
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["K" /* Mob */])
], MobComponent.prototype, "mob", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__layout_focus__["a" /* Focus */])
], MobComponent.prototype, "focus", void 0);
MobComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-mob',
        template: __webpack_require__("./src/app/mob/mob.component.html"),
        styles: [__webpack_require__("./src/app/mob/mob.component.css")]
    }),
    __metadata("design:paramtypes", [])
], MobComponent);



/***/ }),

/***/ "./src/app/nav-group/nav-group.component.css":
/***/ (function(module, exports) {

module.exports = ".player{\r\n\tcursor: pointer;\r\n\tborder-bottom: 1px dotted gainsboro;\r\n}\r\n\r\n.selected{\r\n\tbackground-color: #ACE;\r\n\tborder-radius:2px;\r\n}\r\n\r\n.group{\r\n\tborder-left: 3px solid #114;\r\n\tborder-bottom: 1px solid #114;\r\n}"

/***/ }),

/***/ "./src/app/nav-group/nav-group.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let group of focus.world.groups\" [ngClass]=\"{group:group.players.length != 1}\">\n\t<div *ngFor=\"let player of group.players\" (click)=\"click(player, group)\" class=\"player\" [ngClass]=\"{selected:player===this.focus.selectedPlayer}\">\n\t\t<app-fighting-character [character]=\"player\" [world]=\"focus.world\" [showAbilities]=\"player===this.focus.selectedPlayer\"></app-fighting-character>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/nav-group/nav-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let NavGroupComponent = class NavGroupComponent {
    constructor() { }
    ngOnInit() {
    }
    click(player, group) {
        this.focus.selectGroup(player, group);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__layout_focus__["a" /* Focus */])
], NavGroupComponent.prototype, "focus", void 0);
NavGroupComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-nav-group',
        template: __webpack_require__("./src/app/nav-group/nav-group.component.html"),
        styles: [__webpack_require__("./src/app/nav-group/nav-group.component.css")]
    }),
    __metadata("design:paramtypes", [])
], NavGroupComponent);



/***/ }),

/***/ "./src/app/player-icon/player-icon.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/player-icon/player-icon.component.html":
/***/ (function(module, exports) {

module.exports = "<app-tooltip-icon [icon]=\"player.icon\" [isDead]=\"player.isDead\">\n\t<span class=\"{{qualityColor}}\">{{player.name}}</span>\n\t<br/>\n\t<span>Life:{{currentLife$|async}}/{{(player.$|async).maxLife}}</span>\n\n\t<span *ngIf=\"player.useMana\"><br/>Mana:{{currentMana$|async}}/{{(player.$|async).maxMana}}</span>\n\n\t<br/><span>Swing DPS: {{dps$|async}}</span>\n\t\n</app-tooltip-icon>"

/***/ }),

/***/ "./src/app/player-icon/player-icon.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world___ = __webpack_require__("./src/app/world/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let PlayerIconComponent = class PlayerIconComponent {
    constructor() { }
    ngOnInit() {
        this.dps$ = this.player.$.map(p => p.getWeaponDps());
        this.currentLife$ = this.player.$.map(p => Math.floor(p.currentLife));
        this.currentMana$ = this.player.$.map(p => Math.floor(p.currentMana));
    }
    ngOnChanges() { }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__world___["L" /* Player */])
], PlayerIconComponent.prototype, "player", void 0);
PlayerIconComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-player-icon',
        template: __webpack_require__("./src/app/player-icon/player-icon.component.html"),
        styles: [__webpack_require__("./src/app/player-icon/player-icon.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
    }),
    __metadata("design:paramtypes", [])
], PlayerIconComponent);



/***/ }),

/***/ "./src/app/progressbar/progressbar.component.css":
/***/ (function(module, exports) {

module.exports = ".progress{\r\n\tposition:relative;\r\n\tborder:1px solid #333;\t\t\r\n\tbackground-color:#bbb;\t\r\n  width: 100%;  \r\n}\r\n.bar{\t\t\t\r\n\theight:1em;\r\n}\r\n.text{\r\n\tposition:absolute;\r\n\tcolor: white;\t\r\n\tfont-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;\r\n\tfont-size: 0.875em;\t\r\n\ttop: 50%;\r\n\tleft: 50%;\r\n\tmargin-right: -50%;\r\n\t-webkit-transform: translate(-50%, -50%);\r\n\t        transform: translate(-50%, -50%)\r\n\t\r\n}"

/***/ }),

/***/ "./src/app/progressbar/progressbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"progress\">\n\t<div class=\"bar\" [ngStyle]=\"{'width.%':percent , 'background-color':color}\"></div>\n\t<div class=\"text\" *ngIf=\"showText\">{{text}}</div>\n</div>"

/***/ }),

/***/ "./src/app/progressbar/progressbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ProgressbarComponent = class ProgressbarComponent {
    constructor() {
        this.showText = true;
        this.color = 'green';
    }
    ngOnInit() { }
    ngOnChanges() {
        this.percent = Math.floor(this.value * 100 / (this.max !== 0 ? this.max : 100));
        this.text = Math.floor(this.value) + "/" + this.max;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Number)
], ProgressbarComponent.prototype, "value", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Number)
], ProgressbarComponent.prototype, "max", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Boolean)
], ProgressbarComponent.prototype, "showText", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", String)
], ProgressbarComponent.prototype, "color", void 0);
ProgressbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-progressbar',
        template: __webpack_require__("./src/app/progressbar/progressbar.component.html"),
        styles: [__webpack_require__("./src/app/progressbar/progressbar.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ProgressbarComponent);



/***/ }),

/***/ "./src/app/quest-dashboard/quest-dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ".locationIcon {\r\n\tcursor: inherit;\r\n\tfont-size: 2em;\t\r\n\tmargin: 0.1em;\r\n\tpadding: 0.1em;\t\r\n\tborder-radius: 0.1em;\r\n  text-align: center;\r\n  font-family: \"Noto Color Emoji\", \"Apple Color Emoji\", \"Segoe UI Emoji\", Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort;\r\n}\r\n.questIcon{\r\n\tfont-family: \"Noto Color Emoji\", \"Apple Color Emoji\", \"Segoe UI Emoji\", Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort;\t\r\n}\r\nul.list .selected {\r\n\tbackground-color: #CFD8DC !important;\r\n\tcolor: white;\r\n}\r\nul.list  {\r\n\tmargin: 0 0 2em 0;\r\n\tlist-style-type: none;\r\n\tpadding: 0;\r\n\twidth: 19em;\r\n}\r\nul.list li {\r\n\tcursor: pointer;\r\n\tposition: relative;\r\n\tleft: 0;\r\n\tbackground-color: #EEE;\r\n\tmargin: .5em;\r\n\tpadding: .3em 0;\r\n\theight: 1.6em;\r\n\tborder-radius: 4px;\r\n}\r\nul.list li.selected:hover {\r\n\tbackground-color: #BBD8DC !important;\r\n\tcolor: white;\r\n}\r\nul.list li:hover {\r\n\tcolor: #607D8B;\r\n\tbackground-color: #DDD;\r\n\tleft: .1em;\r\n}\r\nul.list  .text {\r\n\tposition: relative;\r\n\ttop: -3px;\r\n}\r\nul.list span {\r\n\tdisplay: inline-block;\r\n\tfont-size: small;\r\n\tcolor: white;\r\n\tpadding: 0.8em 0.7em 0 0.7em;\r\n\tbackground-color: #607D8B;\r\n\tline-height: 1em;\r\n\tposition: relative;\r\n\tleft: -1px;\r\n\ttop: -4px;\r\n\theight: 1.8em;\r\n\tmargin-right: .8em;\r\n\tborder-radius: 4px 0 0 4px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/quest-dashboard/quest-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n\t<span class=\"locationIcon\">{{location.icon}}</span>{{location.name}}\n</p>\n<ul class=\"list\">\n\t<li *ngFor=\"let quest of quests\">\n\t\t<div (click)=\"click(quest)\">\n\t\t\t<span class=\"questIcon\">{{quest.icon}}</span> {{quest.name}}\n\t\t</div>\n\t</li>\n</ul>\n\n<div *ngIf=\"selectedQuest\">\n\t<p>{{selectedQuest.name}}</p>\n\t<p *ngIf=\"selectedQuest.description && selectedQuest.description !== selectedQuest.name\">{{selectedQuest.description}}</p>\n\n\t<span *ngIf=\"selectedQuest.destination\">\n\t\tGo to <span class=\"locationIcon\">{{selectedQuest.destination.icon}}</span>{{selectedQuest.destination.name}} <br/>\n\t</span>\n\n\t<span *ngIf=\"selectedQuest.mobSample\">\n\t\tEnnemy:\n\t\t<br/>\n\t\t<app-mob [mob]=\"selectedQuest.mobSample\" [focus]=\"focus\" ></app-mob>\n\t\t<br/>\n\t\t<br/>\n\t</span>\n\n\t<span *ngIf=\"selectedQuest.ability\">\n\t\tLearn new ability:\n\t\t<div class=\"item-container\">\n\t\t\t<app-ability-icon [ability]=\"selectedQuest.ability\"></app-ability-icon>\n\t\t</div>\t\t\n\t\t<br/>\n\t</span>\n\n\t<span *ngIf=\"selectedQuest.rewards && selectedQuest.rewards.length != 0\">\n\t\tRewards:\n\t\t<div class=\"item-container\">\n\t\t\t<app-item *ngFor=\"let item of selectedQuest.rewards\" [item]=\"item\"></app-item>\n\t\t</div>\t\t\n\t</span>\n\n\t<br/><br/>\n\t<button (click)=\"startQuest()\">Start quest</button>\n</div>"

/***/ }),

/***/ "./src/app/quest-dashboard/quest-dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestDashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_focus__ = __webpack_require__("./src/app/layout/focus.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let QuestDashboardComponent = class QuestDashboardComponent {
    constructor() {
    }
    ngOnInit() { }
    ngOnChanges() {
        this.selectedQuest = null;
    }
    click(quest) {
        this.selectedQuest = quest;
    }
    startQuest() {
        this.focus.world.startActivity(this.focus.selectedGroup, this.selectedQuest);
        this.focus.refresh();
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__layout_focus__["a" /* Focus */])
], QuestDashboardComponent.prototype, "focus", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Array)
], QuestDashboardComponent.prototype, "quests", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Object)
], QuestDashboardComponent.prototype, "location", void 0);
QuestDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-quest-dashboard',
        template: __webpack_require__("./src/app/quest-dashboard/quest-dashboard.component.html"),
        styles: [__webpack_require__("./src/app/quest-dashboard/quest-dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [])
], QuestDashboardComponent);



/***/ }),

/***/ "./src/app/recruitment/recruitment.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/recruitment/recruitment.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  recruitment works!\n</p>\n<ul class=\"\">\n  <li *ngFor=\"let candidate of candidates\">\n    <a routerLink=\"/detail/{{candidate.character.id}}\">\n      <span class=\"badge\">{{candidate.character.name}}</span>\n    </a>\n  </li>    \n</ul>"

/***/ }),

/***/ "./src/app/recruitment/recruitment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecruitmentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let RecruitmentComponent = class RecruitmentComponent {
    constructor() {
    }
    ngOnInit() {
    }
};
RecruitmentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-recruitment',
        template: __webpack_require__("./src/app/recruitment/recruitment.component.html"),
        styles: [__webpack_require__("./src/app/recruitment/recruitment.component.css")]
    }),
    __metadata("design:paramtypes", [])
], RecruitmentComponent);



/***/ }),

/***/ "./src/app/start-menu/start-menu.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/start-menu/start-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<p>Welcome</p>\n<ul class=\"\">\n  <li>\n    <button (click)=\"play()\">\n        <span class=\"badge\">Play</span>\n    </button>\n  </li>  \n  <li>\n      <button (click)=\"reset()\">\n          <span class=\"badge\">Reset current game</span>\n      </button>\n    </li>\n</ul>"

/***/ }),

/***/ "./src/app/start-menu/start-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let StartMenuComponent = class StartMenuComponent {
    constructor() {
        this.start = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    ngOnInit() {
    }
    play() {
        this.start.emit(null);
    }
    reset() {
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
], StartMenuComponent.prototype, "start", void 0);
StartMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-start-menu',
        template: __webpack_require__("./src/app/start-menu/start-menu.component.html"),
        styles: [__webpack_require__("./src/app/start-menu/start-menu.component.css")]
    }),
    __metadata("design:paramtypes", [])
], StartMenuComponent);



/***/ }),

/***/ "./src/app/tooltip-icon/tooltip-icon.component.css":
/***/ (function(module, exports) {

module.exports = ".tooltip {\r\n\tposition: relative;\r\n\tdisplay: inline-block;\t\r\n\r\n}\r\n.clickable{\r\n\tcursor:pointer;\r\n}\r\n.icon {\r\n\tcursor: inherit;\r\n\tfont-size: 2em;\r\n\tbackground-color:#EEE;  \r\n\tmargin: 0.1em;\r\n\tpadding: 0.1em;\t\r\n\tborder-radius: 0.1em;\r\n  text-align: center;\r\n  font-family: \"Noto Color Emoji\", \"Apple Color Emoji\", \"Segoe UI Emoji\", Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort;\r\n}\r\n.clickable .icon{\r\n\tcursor:pointer;\r\n}\r\n.clickable .icon:hover {\r\n\t\tbackground-color: #DDD;\r\n\t\tmargin-left: 5px;\r\n\t\tmargin-right: 3px;\r\n}\r\n.quantity{\r\n\tposition: absolute;\r\n\ttext-align: right;\r\n\tpadding-right: 0.6em;\r\n\tz-index: 0.5;\r\n\tright: 0px;\r\n\tbottom: 0px;\r\n\tcolor: rgb(240, 240, 240);\r\n\ttext-shadow: 2px 2px 4px #000000;\r\n\tfont-weight: 600;\r\n}\r\n.tooltip .tooltiptext {\r\n\tvisibility: hidden;\r\n\twidth: 120px;\r\n\tbackground-color:rgba(10,0,5,0.8);\r\n\tcolor: #fff;\r\n\ttext-align: center;\r\n\tborder-radius: 6px;\r\n\tpadding: 5px 0;\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n\tbottom: 125%;\r\n\tleft: 50%;\r\n\tmargin-left: -60px;\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.3s;\r\n\ttransition: opacity 0.3s;\r\n\ttext-align: left;\r\n\tpadding: 1em;\r\n\tmin-width: 16em;\r\n\tfont-size: 1rem;\r\n}\r\n.tooltip:hover .tooltiptext {\r\n\tvisibility: visible;\r\n\topacity: 1;\r\n}\r\n.dead{\r\n\t-webkit-transform:rotate(-180deg);\r\n\ttransform:rotate(-180deg);\r\n\tfilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\r\n\tbackground: pink; \r\n}"

/***/ }),

/***/ "./src/app/tooltip-icon/tooltip-icon.component.html":
/***/ (function(module, exports) {

module.exports = "<div (click)=\"onClick()\" [ngClass]=\"{'tooltip':true, 'clickable':clickable}\">\n\t<span>\n\t\t<div [ngClass]=\"{'icon':true, 'dead': isDead}\">{{icon}}</div> \n\t\t<span class=\"quantity\">{{quantity}}</span>\n\t</span>\n\t<span class=\"tooltiptext\">\n\t\t<ng-content></ng-content>\n\t</span>\n</div> "

/***/ }),

/***/ "./src/app/tooltip-icon/tooltip-icon.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let TooltipIconComponent = class TooltipIconComponent {
    constructor() {
        this.isDead = false;
        this.click = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    ngOnInit() {
    }
    onClick() {
        this.click.emit();
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", String)
], TooltipIconComponent.prototype, "icon", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Boolean)
], TooltipIconComponent.prototype, "clickable", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Boolean)
], TooltipIconComponent.prototype, "isDead", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
    __metadata("design:type", Number)
], TooltipIconComponent.prototype, "quantity", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
    __metadata("design:type", Object)
], TooltipIconComponent.prototype, "click", void 0);
TooltipIconComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-tooltip-icon',
        template: __webpack_require__("./src/app/tooltip-icon/tooltip-icon.component.html"),
        styles: [__webpack_require__("./src/app/tooltip-icon/tooltip-icon.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TooltipIconComponent);



/***/ }),

/***/ "./src/app/world/ability/ability.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world__ = __webpack_require__("./src/app/world/index.ts");


class Ability {
    constructor(icon, name) {
        this.icon = icon;
        this.name = name;
        this.$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this);
        this.cooldown = 0;
        this.lastCastTick = -6000;
        this.lastActionDesc = '';
        this.lastActionTick = -6000;
        this.requirements = [];
    }
    dispatch() {
        this.$.next(this);
    }
    onCharacterChanges(character) {
    }
    setLastActionDesc(description, tick) {
        this.lastActionDesc = description;
        this.lastActionTick = tick;
    }
    tickCast(logger, tick, self, target, myGroup, targets, conditionTarget) {
        if ((tick - this.lastCastTick) < this.cooldown) {
            return false;
        }
        const ok = this.cast(logger, self, target, myGroup, targets, conditionTarget, tick);
        if (ok) {
            this.lastCastTick = tick;
            self.dispatchAbilities();
        }
        return ok;
    }
    getBaseDamage(dmgMultiplier, self, target) {
        const ap = self.characterStat.getAttackPower(self, this, target);
        const apBonus = ap * self.weaponCooldown / 14;
        return (self.weaponDamage + apBonus) * dmgMultiplier;
    }
    doPhysicalDamage(dmgMultiplier, logger, self, target, tick) {
        const baseDmg = this.getBaseDamage(dmgMultiplier, self, target);
        const dmg = Math.floor(baseDmg * __WEBPACK_IMPORTED_MODULE_1__world__["X" /* Tools */].random(0.5, 1.5));
        const reducedDamage = target.characterStat.armorReduceDamage(dmg, self, this, target);
        logger.log(`${self.name} do ${reducedDamage} damages to ${target.name} with a ${this.name}`);
        target.takeDamage(logger, reducedDamage);
        this.setLastActionDesc(`Done ${reducedDamage} damages`, tick);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ability;



/***/ }),

/***/ "./src/app/world/ability/abilityCondition.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AbilityCondition {
    constructor() {
        this.type = 'always';
        this.values = [];
    }
    static newMyLifeIsLess(ability, percent) {
        const c = new AbilityCondition();
        c.ability = ability;
        c.type = 'lifeIsLess';
        c.values = ['myself', percent];
        return c;
    }
    checkAction(logger, self, target, myGroup, targets, tick) {
        const conditionTarget = this.evaluate(self, target, myGroup, targets);
        return this.ability.tickCast(logger, tick, self, target, myGroup, targets, conditionTarget);
    }
    evaluate(self, target, myGroup, targets) {
        switch (this.type) {
            case 'always': return target;
            case 'lifeIsLess': return this.lifeIsLess(self, target, myGroup, targets, true);
            case 'lifeIsMore': return this.lifeIsLess(self, target, myGroup, targets, false);
        }
        return null;
    }
    lifeIsLess(self, target, myGroup, targets, isLess) {
        const targetType = this.values[0];
        const lifePercent = this.values[1];
        if (!lifePercent) {
            return null;
        }
        let lookIn;
        switch (targetType) {
            case 'myself':
                lookIn = [self];
                break;
            case 'tank':
                lookIn = [myGroup[0]];
                break;
            case 'mob':
                lookIn = [target];
                break;
            case 'friend':
                lookIn = myGroup;
                break;
            default: throw 'unknow option: ' + targetType;
        }
        for (let c of lookIn) {
            if (isLess) {
                if (c.getCurrentLifePercent() < lifePercent) {
                    return c;
                }
            }
            else {
                if (c.getCurrentLifePercent() > lifePercent) {
                    return c;
                }
            }
        }
        return null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbilityCondition;

AbilityCondition.allTypes = ['always', 'lifeIsLess', 'lifeIsMore'];


/***/ }),

/***/ "./src/app/world/ability/abilitySelector.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AbilitySelector {
    constructor() {
        this.abilityConditions = [];
        this.eatIfLifePercentUnder = 90;
    }
    choseAction(logger, self, target, myGroup, targets, tick) {
        if (self.casting) {
            if (self.casting.tick()) {
                const castingDone = self.casting.castingDone;
                self.casting.ability.casting = null;
                self.casting = null;
                castingDone(tick);
            }
            return;
        }
        for (let abilityCondition of this.abilityConditions) {
            if (abilityCondition.checkAction(logger, self, target, myGroup, targets, tick)) {
                return true;
            }
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbilitySelector;



/***/ }),

/***/ "./src/app/world/ability/casting.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Casting {
    constructor(durationTick, ability, castingDone) {
        this.durationTick = durationTick;
        this.ability = ability;
        this.castingDone = castingDone;
        this.percent = 0;
        this.tickCount = 0;
    }
    tick() {
        this.tickCount++;
        if (this.durationTick != 0) {
            this.percent = Math.min(100, Math.round(this.tickCount * 100 / this.durationTick));
        }
        return this.tickCount >= this.durationTick;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Casting;



/***/ }),

/***/ "./src/app/world/ability/castingHeal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class CastingHeal extends __WEBPACK_IMPORTED_MODULE_0__world__["a" /* Ability */] {
    constructor(icon, name, baseManaCost, castingDuration, cooldown, baseHeal, intellectPower) {
        super(icon, name);
        this.baseManaCost = baseManaCost;
        this.castingDuration = castingDuration;
        this.cooldown = cooldown;
        this.baseHeal = baseHeal;
        this.intellectPower = intellectPower;
        this.manaCost = baseManaCost;
        this.description = `Heals ${baseHeal} + ${intellectPower} INT lifes`;
        this.defaultAbilityCondition = new __WEBPACK_IMPORTED_MODULE_0__world__["b" /* AbilityCondition */]();
        this.defaultAbilityCondition.ability = this;
        this.defaultAbilityCondition.type = 'lifeIsLess';
        this.defaultAbilityCondition.values[0] = 'friend';
        this.defaultAbilityCondition.values[1] = 50;
    }
    onCharacterChanges(character) {
        super.onCharacterChanges(character);
        const baseHeal = this.getHealWithInt(character, null);
        this.description = `Heals ${baseHeal} lifes`;
        const intellect = character.characterStat.intellect.getValue(character, this, null);
        this.manaCost = Math.floor(this.baseManaCost + this.intellectPower * intellect / 3);
        this.dispatch();
    }
    getHealWithInt(self, target) {
        const intellect = self.characterStat.intellect.getValue(self, this, target);
        const heal = Math.round(this.baseHeal + this.intellectPower * intellect);
        return heal;
    }
    cast(logger, self, fightTarget, myGroup, targets, conditionTarget, tick) {
        if (!conditionTarget) {
            return false;
        }
        const target = (conditionTarget || self);
        if (conditionTarget.type !== self.type) {
            return false;
        }
        if (target.isDead) {
            return false;
        }
        if (self.currentMana < this.manaCost) {
            return false;
        }
        this.setLastActionDesc(`Casting on ${target.name}`, tick);
        this.casting = self.casting = new __WEBPACK_IMPORTED_MODULE_0__world__["m" /* Casting */](this.castingDuration, this, (tick2) => {
            if (target.isDead) {
                return;
            }
            if (self.currentMana < this.manaCost) {
                return;
            }
            self.currentMana -= this.manaCost;
            const baseHeal = this.getHealWithInt(self, target);
            const heal = Math.round(__WEBPACK_IMPORTED_MODULE_0__world__["X" /* Tools */].random(0.5, 1.5) * baseHeal);
            const incr = Math.min(heal, target.maxLife - target.currentLife);
            target.currentLife += incr;
            console.log(`${this.icon} ${self.name} restores ${incr} lifes on ${target.name}`);
            this.setLastActionDesc(`Restores ${incr} lifes on ${target.name}`, tick2);
            this.lastCastTick = tick2;
        });
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CastingHeal;



/***/ }),

/***/ "./src/app/world/ability/drinkPotion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class DrinkPotion extends __WEBPACK_IMPORTED_MODULE_0__world__["a" /* Ability */] {
    constructor(icon, name, cooldown) {
        super(icon, name);
        this.cooldown = cooldown;
        this.description = 'Consume a potion during fight to heal you';
        this.requirements = [{ description: 'Need potions', ok: true }];
    }
    cast(logger, self, target, myGroup, targets, conditionTarget, tick) {
        if (!conditionTarget) {
            return false;
        }
        const player = self;
        if (!player.isPlayer) {
            return false;
        }
        if (player.getCurrentLifePercent() >= 99) {
            return false;
        }
        const potion = player.group.world.bag.popPotion();
        if (!potion) {
            this.setLastActionDesc('No more potion in bank', tick);
            return false;
        }
        const incr = Math.min(potion.restoreLife, player.maxLife - player.currentLife);
        player.currentLife += incr;
        this.setLastActionDesc(`Restore ${incr} lifes`, tick);
        console.log(`${this.icon} ${self.name} drink potion for ${incr} lifes`);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DrinkPotion;



/***/ }),

/***/ "./src/app/world/ability/highBlow.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class HighBlow extends __WEBPACK_IMPORTED_MODULE_0__world__["a" /* Ability */] {
    constructor(icon, name, cooldown) {
        super(icon, name);
        this.dmgMultiplier = 1.8;
        this.cooldown = cooldown;
        this.requirements = [{ description: 'Requires two-handed weapon', ok: true }];
        this.description = `A high blow against the opponent's head. `;
    }
    onCharacterChanges(character) {
        super.onCharacterChanges(character);
        this.requirements = [{ description: 'Requires two-handed weapon', ok: character.weaponType === 'two-hand' }];
        const baseDmg = Math.round(this.getBaseDamage(this.dmgMultiplier, character, null));
        this.description = `A high blow doing ${baseDmg} damages on the opponent's head. `;
        this.dispatch();
    }
    cast(logger, self, target, myGroup, targets, conditionTarget, tick) {
        if (!conditionTarget) {
            return false;
        }
        if (self.weaponType !== 'two-hand') {
            return;
        }
        this.doPhysicalDamage(this.dmgMultiplier, logger, self, target, tick);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HighBlow;



/***/ }),

/***/ "./src/app/world/ability/instantBuff.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class InstantBuff extends __WEBPACK_IMPORTED_MODULE_0__world__["a" /* Ability */] {
    constructor(icon, name, buff, isDebuff, buffCountLimit = 1, cooldown = 0) {
        super(icon, name);
        this.buff = buff;
        this.isDebuff = isDebuff;
        this.buffCountLimit = buffCountLimit;
        this.cooldown = cooldown;
    }
    cast(logger, self, fightTarget, myGroup, targets, conditionTarget, tick) {
        if (!conditionTarget) {
            return false;
        }
        const target = this.isDebuff ? fightTarget : (conditionTarget || self);
        if (target.isDead) {
            return false;
        }
        const buffList = this.isDebuff ? target.debuffs : target.buffs;
        if (buffList.appliedBuffs
            .filter(a => a.buff.buffType === this.buff.buffType).length
            >= this.buffCountLimit) {
            return false;
        }
        buffList.addBuff(tick, self, target, this.buff);
        this.setLastActionDesc(`Used on ${target.name}`, tick);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InstantBuff;



/***/ }),

/***/ "./src/app/world/ability/shieldBuff.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class ShieldBuff extends __WEBPACK_IMPORTED_MODULE_0__world__["a" /* Ability */] {
    constructor(icon, name, buff, cooldown) {
        super(icon, name);
        this.buff = buff;
        this.cooldown = cooldown;
        if (buff.buffType.tag !== "shield") {
            throw 'invalid buff tag';
        }
        this.requirements = [{ description: 'Requires a shield', ok: true }];
    }
    onCharacterChanges(character) {
        super.onCharacterChanges(character);
        this.requirements = [{ description: 'Requires a shield', ok: character.hasShield() }];
        this.dispatch();
    }
    cast(logger, self, fightTarget, myGroup, targets, conditionTarget, tick) {
        if (!conditionTarget) {
            return false;
        }
        if (!self.hasShield()) {
            return false;
        }
        if (self.buffs.appliedBuffs.filter(a => a.buff.buffType.tag === "shield").length !== 0) {
            return false;
        }
        self.buffs.addBuff(tick, self, self, this.buff);
        this.setLastActionDesc(`Refreshed`, tick);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShieldBuff;



/***/ }),

/***/ "./src/app/world/ability/swing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Swing extends __WEBPACK_IMPORTED_MODULE_0__world__["a" /* Ability */] {
    constructor(icon, name) {
        super(icon, name);
        this.cooldown = 1;
        this.description = `Basic attack using current weapon`;
    }
    onCharacterChanges(character) {
        super.onCharacterChanges(character);
        this.cooldown = character.weaponCooldown;
        const baseDmg = Math.round(this.getBaseDamage(1, character, null));
        this.description = `Basic attack doing ${baseDmg} damages using current weapon`;
        this.dispatch();
    }
    cast(logger, self, target, myGroup, targets, conditionTarget, tick) {
        if (!conditionTarget) {
            return false;
        }
        this.cooldown = self.weaponCooldown;
        this.doPhysicalDamage(1, logger, self, target, tick);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Swing;



/***/ }),

/***/ "./src/app/world/activity/activity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Activity {
    constructor(name) {
        this.name = name;
        this.id = this.name;
        this.description = this.name;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Activity;



/***/ }),

/***/ "./src/app/world/activity/activityProgress.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class ActivityProgress {
    constructor(activity, group) {
        this.activity = activity;
        this.group = group;
        this.done = false;
        this.success = false;
        this.group.cleanLogs();
        const rootTask = activity.start(group);
        this.thread = new __WEBPACK_IMPORTED_MODULE_0__world__["W" /* Thread */](rootTask);
    }
    tick() {
        const threadAlive = this.thread.tick();
        if (!threadAlive) {
            this.done = true;
            if (this.thread.returnedValue) {
                this.success = true;
                this.group.world.progress.doneQuest(this.activity);
                this.activity.onQuestSuccess(this.group);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ActivityProgress;



/***/ }),

/***/ "./src/app/world/activity/killQuest.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class KillQuest extends __WEBPACK_IMPORTED_MODULE_0__world__["Q" /* Quest */] {
    constructor(mobBuilder, quantity) {
        super("");
        this.mobBuilder = mobBuilder;
        this.quantity = quantity;
        this.mobSample = this.mobBuilder();
        this.description = this.name = `Kill ${quantity} ${this.mobSample.name}s`;
        this.icon = this.mobSample.icon;
    }
    start(group) {
        return new __WEBPACK_IMPORTED_MODULE_0__world__["A" /* KillQuestTask */](group, this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KillQuest;



/***/ }),

/***/ "./src/app/world/activity/learnActivity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class LearnActivity extends __WEBPACK_IMPORTED_MODULE_0__world__["e" /* Activity */] {
    constructor(profession, abilityBuilder) {
        super(`Learn from the master`);
        this.profession = profession;
        this.abilityBuilder = abilityBuilder;
        this.icon = '👳🏼‍';
        this.ability = abilityBuilder();
        this.id = 'learn ' + this.ability.name;
    }
    start(group) {
        return new __WEBPACK_IMPORTED_MODULE_0__world__["V" /* TaskProgress */]('Learning ' + this.ability.name, 20);
    }
    canLearn(player) {
        if (this.profession != null && this.profession != player.profession) {
            return false;
        }
        if (player.abilities.filter(a => a.name == this.ability.name).length !== 0) {
            return false;
        }
        return true;
    }
    onQuestSuccess(group) {
        for (let p of group.players.filter(p => this.canLearn(p))) {
            p.addAndUseAbility(this.abilityBuilder);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LearnActivity;



/***/ }),

/***/ "./src/app/world/activity/quest.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Quest extends __WEBPACK_IMPORTED_MODULE_0__world__["e" /* Activity */] {
    constructor(name) {
        super(name);
        this.rewards = [];
    }
    onQuestSuccess(group) {
        if (this.rewards) {
            for (const reward of this.rewards) {
                group.loot(reward);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Quest;



/***/ }),

/***/ "./src/app/world/activity/recruitActivity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class RecruitActivity extends __WEBPACK_IMPORTED_MODULE_0__world__["e" /* Activity */] {
    constructor(player) {
        super(`Recruit a ${player.profession}`);
        this.player = player;
        this.icon = player.icon;
        this.id = 'recruit ' + player.name;
        this.description = `Ask ${player.name} to join your group.`;
    }
    start(group) {
        return new __WEBPACK_IMPORTED_MODULE_0__world__["V" /* TaskProgress */]('Recruiting ' + this.player.name, 20);
    }
    onQuestSuccess(group) {
        group.world.players.push(this.player);
        group.includePlayer(this.player);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RecruitActivity;



/***/ }),

/***/ "./src/app/world/activity/travelActivity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class TravelActivity extends __WEBPACK_IMPORTED_MODULE_0__world__["e" /* Activity */] {
    constructor(destination, direction) {
        super(`Travel ${direction} to ${destination.name}`);
        this.destination = destination;
        this.icon = destination.icon; //🦌
    }
    start(group) {
        return new __WEBPACK_IMPORTED_MODULE_0__world__["V" /* TaskProgress */]('Riding', 20);
    }
    onQuestSuccess(group) {
        group.setLocation(this.destination);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TravelActivity;



/***/ }),

/***/ "./src/app/world/buff/buff.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BuffType {
    constructor(icon, name, isVisible) {
        this.icon = icon;
        this.name = name;
        this.isVisible = isVisible;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = BuffType;

class Buff {
    constructor(buffType, _onCast, _descriptionFunc, applyStat, tick) {
        this.buffType = buffType;
        this._onCast = _onCast;
        this._descriptionFunc = _descriptionFunc;
        this.applyStat = applyStat;
        this.tick = tick;
    }
    onCast(caster, target) {
        const tag = this._onCast(caster, target);
        this.description = this._descriptionFunc(tag);
        return tag;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Buff;



/***/ }),

/***/ "./src/app/world/buff/buffList.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class AppliedBuff {
    constructor(buff, caster, startTick, tag) {
        this.buff = buff;
        this.caster = caster;
        this.startTick = startTick;
        this.tag = tag;
    }
}
/* unused harmony export AppliedBuff */

class BuffList {
    constructor() {
        this.appliedBuffs = [];
    }
    addBuff(tick, caster, target, buff) {
        const tag = buff.onCast(caster, target);
        const appliedBuff = new AppliedBuff(buff, caster, tick, tag);
        this.appliedBuffs.push(appliedBuff);
        target.refreshStat();
    }
    initCharaterStat(characterStat) {
        for (let appliedBuff of this.appliedBuffs) {
            appliedBuff.buff.applyStat(appliedBuff.caster, characterStat, appliedBuff.tag);
        }
    }
    tick(character, tick) {
        let changed = false;
        for (let appliedBuff of this.appliedBuffs) {
            const ok = appliedBuff.buff.tick(appliedBuff.caster, character, tick - appliedBuff.startTick, appliedBuff.tag);
            if (!ok) {
                __WEBPACK_IMPORTED_MODULE_0__world__["X" /* Tools */].removeItem(this.appliedBuffs, appliedBuff);
                changed = true;
            }
        }
        if (changed) {
            character.refreshStat();
        }
    }
    clear() {
        this.appliedBuffs.length = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BuffList;



/***/ }),

/***/ "./src/app/world/character/candidate.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Candidate {
    constructor(character) {
        this.character = character;
    }
}
/* unused harmony export Candidate */



/***/ }),

/***/ "./src/app/world/character/character.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world__ = __webpack_require__("./src/app/world/index.ts");


class Character {
    constructor(icon, name, type) {
        this.icon = icon;
        this.name = name;
        this.type = type;
        this.$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this);
        this.abilities$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this);
        this.characterStat = new __WEBPACK_IMPORTED_MODULE_1__world__["p" /* CharacterStat */]();
        this.isDead = false;
        this.currentLife = 300;
        this.maxLife = 300;
        this.weaponDamage = 0;
        this.weaponCooldown = 1;
        this.weaponType = 'nude'; //nude, main-hand, two-hand, both-hand
        this.abilities = [];
        this.globalCooldown = 5;
        this.lastActionTick = -100;
        this.buffs = new __WEBPACK_IMPORTED_MODULE_1__world__["k" /* BuffList */]();
        this.debuffs = new __WEBPACK_IMPORTED_MODULE_1__world__["k" /* BuffList */]();
        this.useMana = false;
        this.currentMana = 0;
        this.maxMana = 1;
        this.regenManaPerSecond = 0;
        this.abilitySelector = new __WEBPACK_IMPORTED_MODULE_1__world__["c" /* AbilitySelector */]();
        this.addAndUseAbility(() => new __WEBPACK_IMPORTED_MODULE_1__world__["U" /* Swing */]('🔨', "basic attack"));
    }
    getCurrentLifePercent() {
        return Math.round(this.currentLife * 100 / this.maxLife);
    }
    dispatch() {
        this.$.next(this);
    }
    dispatchAbilities() {
        this.abilities$.next(this);
    }
    refreshStat() {
        this.characterStat.clear();
        this.initCharaterStat();
        this.buffs.initCharaterStat(this.characterStat);
        this.debuffs.initCharaterStat(this.characterStat);
        this.maxLife = Math.max(10, this.characterStat.stamina.getValue(this, null, null) * 10);
        this.currentLife = Math.min(this.currentLife, this.maxLife);
        if (this.useMana) {
            this.maxMana = Math.max(10, this.characterStat.wisdom.getValue(this, null, null) * 10);
            this.currentMana = Math.min(this.currentMana, this.maxMana);
            this.regenManaPerSecond = Math.max(1, this.characterStat.spirit.getValue(this, null, null) / 10);
        }
        for (let ability of this.abilities) {
            ability.onCharacterChanges(this);
        }
        this.dispatch();
    }
    addAndUseAbility(abilityBuilder) {
        const ability = abilityBuilder();
        this.abilities.push(ability);
        const abilityCondition = ability.defaultAbilityCondition || new __WEBPACK_IMPORTED_MODULE_1__world__["b" /* AbilityCondition */]();
        abilityCondition.ability = ability;
        this.abilitySelector.abilityConditions.push(abilityCondition);
    }
    fightAction(logger, target, myGroup, targets, tick) {
        if (tick - this.lastActionTick < this.globalCooldown) {
            return;
        }
        if (this.abilitySelector.choseAction(logger, this, target, myGroup, targets, tick)) {
            this.lastActionTick = tick;
        }
    }
    getCooldownPercent(ability, tick) {
        if (this.isDead) {
            return 0;
        }
        const duration = tick - ability.lastCastTick;
        if (ability.cooldown <= 0 || duration >= ability.cooldown) {
            return 100;
        }
        return Math.round(duration * 100 / ability.cooldown);
    }
    getActiveAbilities() {
        return __WEBPACK_IMPORTED_MODULE_1__world__["X" /* Tools */].distinctItems(this.abilitySelector.abilityConditions.map(s => s.ability));
    }
    getWeaponDps() {
        const ap = this.characterStat.getAttackPower(null, null, null);
        const weaponDps = this.weaponDamage * 10 / this.weaponCooldown;
        return Math.round(weaponDps + ap);
    }
    evaluateDps() {
        return this.getWeaponDps() * this.getActiveAbilities().length;
    }
    takeDamage(logger, dmg) {
        this.currentLife -= dmg;
        if (!this.isDead && this.currentLife <= 0) {
            this.currentLife = 0;
            this.isDead = true;
            this.buffs.clear();
            this.debuffs.clear();
            console.log(`${this.icon} ${this.name} is dead`);
            this.dispatch();
        }
    }
    getArmoredLife() {
        return this.maxLife * (10 + this.characterStat.armor.getValue(null, null, null)) / 10;
    }
    onTick(tick) {
        if (this.isDead) {
            return;
        }
        this.onAliveTick(tick);
    }
    onAliveTick(tick) {
        this.buffs.tick(this, tick);
        this.debuffs.tick(this, tick);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Character;



/***/ }),

/***/ "./src/app/world/character/group.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world___ = __webpack_require__("./src/app/world/index.ts");

class Group {
    //foundGold = 0;
    //	foundXp = 0;
    constructor(world, leader) {
        this.world = world;
        this.players = [];
        this.logger = new __WEBPACK_IMPORTED_MODULE_0__world___["I" /* Logger */]();
        this.foundItems = [];
        this.players.push(leader);
        leader.group = this;
        this.location = leader.location;
    }
    includePlayer(player) {
        if (player.group) {
            player.group.removePlayer(player);
        }
        this.players.push(player);
        player.group = this;
        player.location = this.location;
    }
    removePlayer(player) {
        __WEBPACK_IMPORTED_MODULE_0__world___["X" /* Tools */].removeItem(this.players, player);
        if (this.players.length == 0) {
            __WEBPACK_IMPORTED_MODULE_0__world___["X" /* Tools */].removeItem(this.world.groups, this);
        }
    }
    excludePlayer(player) {
        if (!player || this.players.indexOf(player) === -1) {
            throw 'invalide arg';
        }
        this.removePlayer(player);
        this.world.groups.push(new Group(this.world, player));
    }
    promotePlayer(player) {
        if (!player || this.players.indexOf(player) === -1) {
            throw 'invalide arg';
        }
        this.removePlayer(player);
        this.players.unshift(player);
    }
    setLocation(location) {
        this.location = location;
        for (let p of this.players) {
            p.location = location;
        }
    }
    loot(item) {
        this.world.bag.add(item);
        this.foundItems.push(item);
        //this.log(`Found ${item.name}`);
    }
    /*	xp(incr: number) {
            this.foundXp += incr;
            for (let p of this.players) {
                p.gainXp(incr);
            }
        }
        gold(incr: number) {
            this.foundGold += incr;
            this.log(`Found ${incr} golds`);
        }*/
    log(msg) {
        this.logger.log(msg);
    }
    cleanLogs() {
        this.foundItems = [];
        //	this.foundXp = 0;
        //	this.foundGold = 0;
    }
    tick() {
        for (let player of this.players) {
            player.onTick(this.world.tick);
        }
        if (this.activityProgress && !this.activityProgress.done) {
            this.activityProgress.tick();
        }
        else {
            for (let player of this.players) {
                player.rest(this.world.tick);
            }
        }
    }
    getFightDifficulty(mob) {
        const mobLife = mob.getArmoredLife();
        const mobDps = mob.evaluateDps();
        const groupDps = this.players.map(p => p.evaluateDps()).reduce((a, b) => a + b, 0);
        const groupLife = this.players.map(p => p.getArmoredLife()).reduce((a, b) => Math.max(a, b), 0);
        if (groupDps <= 0.1) {
            return 'heroic';
        }
        if (mobDps <= 0.1) {
            return 'easy';
        }
        const timeToKillMob = mobLife / groupDps;
        const timeToKillPlayer = groupLife / mobDps;
        console.log(`${timeToKillMob} vs ${timeToKillPlayer}`);
        if (timeToKillMob < timeToKillPlayer * 0.50) {
            return 'easy';
        }
        if (timeToKillMob < timeToKillPlayer * 0.90) {
            return 'normal';
        }
        if (timeToKillMob < timeToKillPlayer * 1.50) {
            return 'hard';
        }
        return 'heroic';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Group;



/***/ }),

/***/ "./src/app/world/character/mob.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Mob extends __WEBPACK_IMPORTED_MODULE_0__world__["o" /* Character */] {
    constructor(icon, name, life, dps) {
        super(icon, name, 'mob');
        this.isMob = true;
        this.weaponCooldown = 26;
        this.weaponDamage = Math.round(this.weaponCooldown * dps / 20);
        this.characterStat.strength.initialValue = Math.max(1, Math.round(dps / 2));
        this.characterStat.stamina.initialValue = Math.max(1, Math.round(life / 10));
        this.refreshStat();
    }
    initCharaterStat() {
    }
    repop() {
        this.isDead = false;
        for (let ability of this.abilities) {
            ability.lastCastTick = -1;
        }
        this.refreshStat();
        this.currentLife = this.maxLife;
    }
    hasShield() {
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mob;



/***/ }),

/***/ "./src/app/world/character/player.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Player extends __WEBPACK_IMPORTED_MODULE_0__world__["o" /* Character */] {
    constructor(icon, name, profession) {
        super(icon, name, 'player');
        this.profession = profession;
        this.isPlayer = true;
        this.equipedItems = [];
        if (this.profession === 'fighter') {
            this.characterStat.computeAttakPower = (strength, agility) => {
                return strength * 2;
            };
            this.addAndUseAbility(__WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].highBlow);
        }
        else if (this.profession === 'priest') {
            this.useMana = true;
            this.addAndUseAbility(__WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].fastHeal);
            this.addAndUseAbility(__WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].strongHeal);
        }
        else if (this.profession === 'necromancer') {
            this.useMana = true;
            this.addAndUseAbility(__WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].poisonAbility);
        }
        else {
            throw 'unmanaged profession';
        }
        this.characterStat.stamina.initialValue = 7;
        this.refreshStat();
    }
    initCharaterStat() {
        for (let item of this.equipedItems) {
            item.addBuff(this.characterStat);
        }
        const weapons = this.equipedItems.filter(item => item.damage != 0);
        const mainWeapon = weapons[0];
        this.weaponDamage = (mainWeapon ? mainWeapon.damage : 3);
        this.weaponCooldown = (mainWeapon ? mainWeapon.damageCooldown : 15);
        this.weaponType = (mainWeapon ? mainWeapon.slot : 'hand');
    }
    hasShield() {
        return this.equipedItems.filter(item => item.slot === "off hand").length !== 0;
    }
    equip(item, bag) {
        if (!item.isEquipable) {
            return;
        }
        for (let previousItem of this.equipedItems.filter(previousItem => item.useSameSlot(previousItem))) {
            if (__WEBPACK_IMPORTED_MODULE_0__world__["X" /* Tools */].removeItem(this.equipedItems, previousItem)) {
                if (bag) {
                    bag.add(previousItem);
                }
            }
        }
        this.equipedItems.push(item);
        if (bag) {
            bag.remove(item);
        }
        this.refreshStat();
    }
    unequip(item, bag) {
        if (__WEBPACK_IMPORTED_MODULE_0__world__["X" /* Tools */].removeItem(this.equipedItems, item)) {
            if (bag) {
                bag.add(item);
            }
            this.refreshStat();
        }
    }
    popFoodBeforeFight(logger, group) {
        const lifePercent = this.currentLife * 100 / this.maxLife;
        if (lifePercent < 99 && lifePercent < this.abilitySelector.eatIfLifePercentUnder) {
            const food = group.world.bag.popFood();
            return food;
        }
        if (this.useMana && this.maxMana > 1) {
            const manaPercent = this.currentMana * 100 / this.maxMana;
            if (manaPercent < 99 && manaPercent < this.abilitySelector.eatIfLifePercentUnder) {
                const food = group.world.bag.popFood();
                return food;
            }
        }
        return null;
    }
    onAliveTick(tick) {
        super.onAliveTick(tick);
        if (this.useMana) {
            if (this.currentMana < this.maxMana) {
                const incr = this.regenManaPerSecond / 10;
                this.currentMana = Math.min(this.maxMana, this.currentMana + incr);
                this.dispatch();
            }
        }
    }
    rest(tick) {
        if (this.isDead) {
            this.isDead = false;
            this.currentLife = 1;
        }
        if (this.currentLife < this.maxLife) {
            const incr = Math.max(1, this.maxLife * 0.01);
            this.currentLife = Math.min(this.maxLife, this.currentLife + incr);
            this.dispatch();
        }
        if (this.useMana) {
            if (this.currentMana < this.maxMana) {
                const incr = Math.max(1, this.maxMana * 0.01);
                this.currentMana = Math.min(this.maxMana, this.currentMana + incr);
                this.dispatch();
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ }),

/***/ "./src/app/world/characterStat/attributePipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AttributePipe {
    constructor(name, initialValue, minValue = 0) {
        this.name = name;
        this.initialValue = initialValue;
        this.minValue = minValue;
        this.addPipe = [];
        this.addPercentPipe = [];
    }
    clear() {
        this.addPipe.length = 0;
        this.addPercentPipe.length = 0;
    }
    add(func) {
        this.addPipe.push(func);
    }
    addPercent(func) {
        this.addPercentPipe.push(func);
    }
    getValue(source, ability, target) {
        let baseValue = this.initialValue;
        for (let func of this.addPipe) {
            baseValue += func(source, ability, target);
        }
        let multiply = 100;
        for (let func of this.addPercentPipe) {
            multiply += func(source, ability, target);
        }
        return Math.max(this.minValue, Math.round(baseValue * multiply / 100));
    }
    get defaultValue() {
        return this.getValue(null, null, null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AttributePipe;



/***/ }),

/***/ "./src/app/world/characterStat/characterStat.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class CharacterStat {
    constructor() {
        this.computeAttakPower = (strength, agility) => {
            return strength;
        };
        this.stamina = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("stamina", 3, 1);
        this.strength = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("strength", 0);
        this.agility = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("agility", 0);
        this.intellect = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("intellect", 0);
        this.spirit = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("spirit", 10);
        this.wisdom = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("wisdom", 10);
        this.armor = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("armor", 0);
        this.damageReduction = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("damageReduction", 0);
        this.critPercent = new __WEBPACK_IMPORTED_MODULE_0__world__["h" /* AttributePipe */]("critPercent", 0);
    }
    clear() {
        this.stamina.clear();
        this.strength.clear();
        this.agility.clear();
        this.intellect.clear();
        this.spirit.clear();
        this.wisdom.clear();
        this.armor.clear();
        this.damageReduction.clear();
        this.critPercent.clear();
    }
    getAttackPower(source, ability, target) {
        const strength = this.strength.getValue(source, ability, target);
        const agility = this.agility.getValue(source, ability, target);
        return this.computeAttakPower(strength, agility);
    }
    armorReduceDamage(damage, self, ability, target) {
        if (damage < 1) {
            return 0;
        }
        const armor = this.armor.getValue(self, ability, target);
        const armorReducedDamage = Math.floor(damage * armor / (10 + armor));
        const damageReduction = this.damageReduction.getValue(self, ability, target);
        const endDamage = Math.max(1, Math.round(damage - armorReducedDamage - damageReduction));
        return endDamage;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CharacterStat;



/***/ }),

/***/ "./src/app/world/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_tools__ = __webpack_require__("./src/app/world/tools/tools.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "X", function() { return __WEBPACK_IMPORTED_MODULE_0__tools_tools__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_logger__ = __webpack_require__("./src/app/world/tools/logger.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_1__tools_logger__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_store__ = __webpack_require__("./src/app/world/tools/store.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_testTools__ = __webpack_require__("./src/app/world/tools/testTools.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_progress__ = __webpack_require__("./src/app/world/tools/progress.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "P", function() { return __WEBPACK_IMPORTED_MODULE_4__tools_progress__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ability_ability__ = __webpack_require__("./src/app/world/ability/ability.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__ability_ability__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ability_abilityCondition__ = __webpack_require__("./src/app/world/ability/abilityCondition.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__ability_abilityCondition__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ability_abilitySelector__ = __webpack_require__("./src/app/world/ability/abilitySelector.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__ability_abilitySelector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ability_swing__ = __webpack_require__("./src/app/world/ability/swing.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "U", function() { return __WEBPACK_IMPORTED_MODULE_8__ability_swing__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ability_drinkPotion__ = __webpack_require__("./src/app/world/ability/drinkPotion.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_9__ability_drinkPotion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ability_instantBuff__ = __webpack_require__("./src/app/world/ability/instantBuff.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_10__ability_instantBuff__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ability_casting__ = __webpack_require__("./src/app/world/ability/casting.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_11__ability_casting__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ability_castingHeal__ = __webpack_require__("./src/app/world/ability/castingHeal.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_12__ability_castingHeal__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ability_highBlow__ = __webpack_require__("./src/app/world/ability/highBlow.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_13__ability_highBlow__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ability_shieldBuff__ = __webpack_require__("./src/app/world/ability/shieldBuff.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "S", function() { return __WEBPACK_IMPORTED_MODULE_14__ability_shieldBuff__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__buff_buff__ = __webpack_require__("./src/app/world/buff/buff.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_15__buff_buff__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_15__buff_buff__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__buff_buffList__ = __webpack_require__("./src/app/world/buff/buffList.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_16__buff_buffList__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__character_character__ = __webpack_require__("./src/app/world/character/character.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_17__character_character__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__character_mob__ = __webpack_require__("./src/app/world/character/mob.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __WEBPACK_IMPORTED_MODULE_18__character_mob__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__character_player__ = __webpack_require__("./src/app/world/character/player.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __WEBPACK_IMPORTED_MODULE_19__character_player__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__character_candidate__ = __webpack_require__("./src/app/world/character/candidate.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__character_group__ = __webpack_require__("./src/app/world/character/group.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_21__character_group__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__activity_activity__ = __webpack_require__("./src/app/world/activity/activity.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_22__activity_activity__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__activity_quest__ = __webpack_require__("./src/app/world/activity/quest.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return __WEBPACK_IMPORTED_MODULE_23__activity_quest__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__activity_killQuest__ = __webpack_require__("./src/app/world/activity/killQuest.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_24__activity_killQuest__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__activity_activityProgress__ = __webpack_require__("./src/app/world/activity/activityProgress.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_25__activity_activityProgress__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__activity_travelActivity__ = __webpack_require__("./src/app/world/activity/travelActivity.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return __WEBPACK_IMPORTED_MODULE_26__activity_travelActivity__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__activity_learnActivity__ = __webpack_require__("./src/app/world/activity/learnActivity.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_27__activity_learnActivity__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__activity_recruitActivity__ = __webpack_require__("./src/app/world/activity/recruitActivity.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "R", function() { return __WEBPACK_IMPORTED_MODULE_28__activity_recruitActivity__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__task_thread__ = __webpack_require__("./src/app/world/task/thread.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "W", function() { return __WEBPACK_IMPORTED_MODULE_29__task_thread__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__task_killQuestTask__ = __webpack_require__("./src/app/world/task/killQuestTask.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_30__task_killQuestTask__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__task_taskProgress__ = __webpack_require__("./src/app/world/task/taskProgress.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "V", function() { return __WEBPACK_IMPORTED_MODULE_31__task_taskProgress__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__task_fight__ = __webpack_require__("./src/app/world/task/fight.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_32__task_fight__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__task_lunchTask__ = __webpack_require__("./src/app/world/task/lunchTask.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __WEBPACK_IMPORTED_MODULE_33__task_lunchTask__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__characterStat_attributePipe__ = __webpack_require__("./src/app/world/characterStat/attributePipe.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_34__characterStat_attributePipe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__characterStat_characterStat__ = __webpack_require__("./src/app/world/characterStat/characterStat.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_35__characterStat_characterStat__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__item_item__ = __webpack_require__("./src/app/world/item/item.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_36__item_item__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__item_equipableItem__ = __webpack_require__("./src/app/world/item/equipableItem.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_37__item_equipableItem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__item_attributeDescription__ = __webpack_require__("./src/app/world/item/attributeDescription.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_38__item_attributeDescription__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__item_food__ = __webpack_require__("./src/app/world/item/food.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_39__item_food__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__item_potion__ = __webpack_require__("./src/app/world/item/potion.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "N", function() { return __WEBPACK_IMPORTED_MODULE_40__item_potion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__item_bag__ = __webpack_require__("./src/app/world/item/bag.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_41__item_bag__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__item_stackItem__ = __webpack_require__("./src/app/world/item/stackItem.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "T", function() { return __WEBPACK_IMPORTED_MODULE_42__item_stackItem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__store_foodStore__ = __webpack_require__("./src/app/world/store/foodStore.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_43__store_foodStore__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__store_potionStore__ = __webpack_require__("./src/app/world/store/potionStore.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "O", function() { return __WEBPACK_IMPORTED_MODULE_44__store_potionStore__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__store_equipableStore__ = __webpack_require__("./src/app/world/store/equipableStore.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__store_abilityStore__ = __webpack_require__("./src/app/world/store/abilityStore.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_46__store_abilityStore__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__store_playerStore__ = __webpack_require__("./src/app/world/store/playerStore.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "M", function() { return __WEBPACK_IMPORTED_MODULE_47__store_playerStore__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__store_mobStore__ = __webpack_require__("./src/app/world/store/mobStore.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__zone_levelTools__ = __webpack_require__("./src/app/world/zone/levelTools.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_49__zone_levelTools__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__zone_level1__ = __webpack_require__("./src/app/world/zone/level1.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_50__zone_level1__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__zone_level2__ = __webpack_require__("./src/app/world/zone/level2.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_51__zone_level2__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__zone_level3__ = __webpack_require__("./src/app/world/zone/level3.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_52__zone_level3__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__zone_level4__ = __webpack_require__("./src/app/world/zone/level4.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_53__zone_level4__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__store_levelStore__ = __webpack_require__("./src/app/world/store/levelStore.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_54__store_levelStore__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__world__ = __webpack_require__("./src/app/world/world.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return __WEBPACK_IMPORTED_MODULE_55__world__["a"]; });


























































/***/ }),

/***/ "./src/app/world/item/attributeDescription.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AttributeDescription {
    constructor(attribute, value, template) {
        this.attribute = attribute;
        this.value = value;
        this.template = template;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AttributeDescription;



/***/ }),

/***/ "./src/app/world/item/bag.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");


class Bag {
    constructor() {
        this.stacks = [];
        this.$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this);
    }
    dispatch() {
        this.$.next(this);
    }
    add(item) {
        for (let stack of this.stacks.filter(s => s.item === item)) {
            const stackPlace = item.stackSize - stack.quantity;
            if (stack.quantity < item.stackSize) {
                stack.quantity++;
                this.dispatch();
                return;
            }
        }
        this.stacks.unshift(new __WEBPACK_IMPORTED_MODULE_0__world__["T" /* StackItem */](item, 1));
        this.dispatch();
    }
    remove(item) {
        for (let stack of this.stacks.filter(s => s.item === item)) {
            if (stack.quantity >= 2) {
                stack.quantity--;
            }
            else {
                __WEBPACK_IMPORTED_MODULE_0__world__["X" /* Tools */].removeItem(this.stacks, stack);
            }
            this.dispatch();
            return;
        }
    }
    getFoods() {
        return this.stacks.filter(s => s.item.isFood);
    }
    getPotions() {
        return this.stacks.filter(s => s.item.isPotion);
    }
    getEquipables() {
        return this.stacks.filter(s => s.item.isEquipable).map(s => s.item);
    }
    popFood() {
        const food = this.getFoods()[0];
        if (food) {
            this.remove(food.item);
            return food.item;
        }
        return null;
    }
    popPotion() {
        const stack = this.getPotions()[0];
        if (stack) {
            this.remove(stack.item);
            return stack.item;
        }
        return null;
    }
    equip(player, item) {
        player.equip(item, this);
    }
    unequip(player, item) {
        player.unequip(item, this);
    }
    countItems(item) {
        return this.stacks
            .filter(s => s.item === item)
            .map(s => s.quantity)
            .reduce((a, b) => a + b, 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bag;



/***/ }),

/***/ "./src/app/world/item/equipableItem.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class EquipableItem extends __WEBPACK_IMPORTED_MODULE_0__world__["y" /* Item */] {
    constructor(name) {
        super(name);
        this.isEquipable = true;
        this.slot = null;
        this.damage = 0;
        this.damageCooldown = 0;
        this.armor = 0;
        this.stamina = 0;
        this.strength = 0;
        this.agility = 0;
        this.intellect = 0;
        this.spirit = 0;
        this.wisdom = 0;
        this.stackSize = 1;
    }
    useSameSlot(item) {
        if (this.slot === item.slot) {
            return true;
        }
        if (this.slot === "main hand" || this.slot == "off hand") {
            if (item.slot === "two-hand") {
                return true;
            }
        }
        if (item.slot === "main hand" || item.slot == "off hand") {
            if (this.slot === "two-hand") {
                return true;
            }
        }
        return false;
    }
    addBuff(characterStat) {
        if (this.armor != 0) {
            characterStat.armor.add(() => this.armor);
        }
        if (this.stamina != 0) {
            characterStat.stamina.add(() => this.stamina);
        }
        if (this.strength != 0) {
            characterStat.strength.add(() => this.strength);
        }
        if (this.agility != 0) {
            characterStat.agility.add(() => this.agility);
        }
        if (this.intellect != 0) {
            characterStat.intellect.add(() => this.intellect);
        }
        if (this.spirit != 0) {
            characterStat.spirit.add(() => this.spirit);
        }
        if (this.wisdom != 0) {
            characterStat.wisdom.add(() => this.wisdom);
        }
    }
    getAttributeDescriptions() {
        const attr = [];
        if (this.damage != 0) {
            const dps = Math.round(this.damage * 100 / this.damageCooldown) / 10;
            const speed = this.damageCooldown / 10;
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("damage", dps, `${this.damage} damages every ${speed} sec (${dps} dps)`));
        }
        if (this.armor != 0) {
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("armor", this.armor, "+ {0} armor"));
        }
        if (this.stamina != 0) {
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("stamina", this.stamina, "+ {0} stamina"));
        }
        if (this.strength != 0) {
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("strength", this.strength, "+ {0} strength"));
        }
        if (this.agility != 0) {
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("agility", this.agility, "+ {0} agility"));
        }
        if (this.intellect != 0) {
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("intellect", this.intellect, "+ {0} intellect"));
        }
        if (this.spirit != 0) {
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("spirit", this.spirit, "+ {0} spirit"));
        }
        if (this.wisdom != 0) {
            attr.push(new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("wisdom", this.wisdom, "+ {0} wisdom"));
        }
        return attr;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EquipableItem;



/***/ }),

/***/ "./src/app/world/item/food.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Food extends __WEBPACK_IMPORTED_MODULE_0__world__["y" /* Item */] {
    constructor(name, restoreLife) {
        super(name);
        this.restoreLife = restoreLife;
        this.isFood = true;
        this.stackSize = 999;
    }
    consume(logger, player) {
        const incr = Math.min(this.restoreLife, player.maxLife - player.currentLife);
        player.currentLife += incr;
        if (player.useMana) {
            const mana = Math.min(this.restoreLife, player.maxMana - player.currentMana);
            player.currentMana += mana;
        }
        logger.log(`${player.name} eat ${this.name} and regain ${incr} lifes`);
    }
    getAttributeDescriptions() {
        return [new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("food", this.restoreLife, "Consume to restore {0} lifes before a fight.")];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Food;



/***/ }),

/***/ "./src/app/world/item/item.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Item {
    constructor(name) {
        this.name = name;
        this.stackSize = 1;
        this.qualityColor = "white";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;



/***/ }),

/***/ "./src/app/world/item/potion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Potion extends __WEBPACK_IMPORTED_MODULE_0__world__["y" /* Item */] {
    constructor(icon, name, restoreLife) {
        super(name);
        this.restoreLife = restoreLife;
        this.isPotion = true;
        this.icon = icon;
        this.stackSize = 999;
    }
    getAttributeDescriptions() {
        return [new __WEBPACK_IMPORTED_MODULE_0__world__["g" /* AttributeDescription */]("potion", this.restoreLife, "Consume to restore {0} lifes during a fight.")];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Potion;



/***/ }),

/***/ "./src/app/world/item/stackItem.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class StackItem {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StackItem;



/***/ }),

/***/ "./src/app/world/store/abilityStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class AbilityStore {
    static createDrinkPotion() {
        const d = new __WEBPACK_IMPORTED_MODULE_0__world__["q" /* DrinkPotion */]('🍷', "drink potion", 600);
        d.defaultAbilityCondition = __WEBPACK_IMPORTED_MODULE_0__world__["b" /* AbilityCondition */].newMyLifeIsLess(d, 50);
        return d;
    }
    static createDotBuff(buffType, damage, during) {
        return new __WEBPACK_IMPORTED_MODULE_0__world__["j" /* Buff */](buffType, (source, target) => {
            return { damage: damage, during: during };
        }, (tag) => `Do ${tag.damage} damages every 3 sec during ${tag.during} sec`, () => { }, (source, target, age, tag) => {
            if (age > 1 && age % 30 == 0) {
                target.takeDamage(null, tag.damage);
            }
            return age < 10 * tag.during;
        });
    }
    static createDot(icon, name, damage, during, buffStack) {
        const buffType = new __WEBPACK_IMPORTED_MODULE_0__world__["l" /* BuffType */](icon, name, true);
        const buff = AbilityStore.createDotBuff(buffType, damage, during);
        const ability = new __WEBPACK_IMPORTED_MODULE_0__world__["x" /* InstantBuff */](icon, name, buff, true, buffStack, 10);
        ability.description = `Do ${damage} damages every 3 sec during ${during} sec `;
        return ability;
    }
    static createStoneShield(icon, name) {
        const buffType = new __WEBPACK_IMPORTED_MODULE_0__world__["l" /* BuffType */](icon, name, true);
        buffType.tag = "shield";
        const buff = new __WEBPACK_IMPORTED_MODULE_0__world__["j" /* Buff */](buffType, (source, target) => {
            return {};
        }, (tag) => `Double the armor during 5 sec`, (self, characterStat) => {
            characterStat.armor.addPercent(() => 100);
        }, (source, target, age, tag) => {
            return age < 50;
        });
        const ability = new __WEBPACK_IMPORTED_MODULE_0__world__["S" /* ShieldBuff */](icon, name, buff, 10);
        ability.description = `Double the armor during 5 sec. Only one type of shield ability can be active at any time.`;
        return ability;
    }
    static createCristalShield(icon, name) {
        const buffType = new __WEBPACK_IMPORTED_MODULE_0__world__["l" /* BuffType */](icon, name, true);
        buffType.tag = "shield";
        const buff = new __WEBPACK_IMPORTED_MODULE_0__world__["j" /* Buff */](buffType, (source, target) => {
            const armor = source.characterStat.armor.getValue(source, null, target);
            return { reduction: armor };
        }, (tag) => `Damage received is reduced by ${tag.reduction}`, (self, characterStat, tag) => {
            characterStat.damageReduction.add(() => tag.reduction);
        }, (source, target, age, tag) => {
            return age < 50;
        });
        const ability = new __WEBPACK_IMPORTED_MODULE_0__world__["S" /* ShieldBuff */](icon, name, buff, 10);
        ability.description = `Reduce the damage by the level of armor during 5 sec. Only one type of shield ability can be active at any time.`;
        return ability;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbilityStore;

AbilityStore.drinkPotion = () => AbilityStore.createDrinkPotion();
AbilityStore.highBlow = () => new __WEBPACK_IMPORTED_MODULE_0__world__["w" /* HighBlow */]('⛏', 'high blow', 50);
AbilityStore.hotWoundAbility = () => AbilityStore.createDot('🌶', 'hot wound', 10, 9, 1);
AbilityStore.stoneShield = () => AbilityStore.createStoneShield('🗿', 'stone shield');
AbilityStore.cristalShield = () => AbilityStore.createCristalShield('🔮', 'cristal shield');
AbilityStore.fastHeal = () => new __WEBPACK_IMPORTED_MODULE_0__world__["n" /* CastingHeal */]('❣', 'fast heal', 15, 12, 10, 30, 1);
AbilityStore.strongHeal = () => new __WEBPACK_IMPORTED_MODULE_0__world__["n" /* CastingHeal */]('💖', 'strong heal', 35, 35, 10, 100, 3);
//💞
AbilityStore.poisonAbility = () => AbilityStore.createDot('☣', 'poisonous', 10, 15, 3);


/***/ }),

/***/ "./src/app/world/store/equipableStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class EquipableStore {
    static createWeapon(icon, name) {
        const item = new __WEBPACK_IMPORTED_MODULE_0__world__["r" /* EquipableItem */](name);
        item.slot = "two-hand";
        item.stamina = 2;
        item.strength = 2;
        item.damageCooldown = 21;
        item.damage = 10;
        item.icon = icon;
        item.qualityColor = "green";
        return item;
    }
    static createArmor(icon, name) {
        const item = new __WEBPACK_IMPORTED_MODULE_0__world__["r" /* EquipableItem */](name);
        item.icon = icon;
        item.slot = "chest";
        item.armor = 2;
        item.stamina = 3;
        item.strength = 2;
        item.qualityColor = "green";
        return item;
    }
}
/* unused harmony export EquipableStore */

//🏹 ⛏ ⚔ 👞 👚 🧥 🧤  👖  🕶  ⛑ 💍 💎
EquipableStore.bronzeSword = EquipableStore.createWeapon('🗡', 'bronze sword');
EquipableStore.bronzeChest = EquipableStore.createArmor('🛡', 'bronze chest');


/***/ }),

/***/ "./src/app/world/store/foodStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class FoodStore {
    static createFood(icon, name, life) {
        const item = new __WEBPACK_IMPORTED_MODULE_0__world__["t" /* Food */](name, life);
        item.icon = icon;
        return item;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FoodStore;

FoodStore.carrot = FoodStore.createFood('🥕', 'carrot', 30);


/***/ }),

/***/ "./src/app/world/store/levelStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class LevelStore {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelStore;

LevelStore.level1 = new __WEBPACK_IMPORTED_MODULE_0__world__["C" /* Level1 */]();
LevelStore.level2 = new __WEBPACK_IMPORTED_MODULE_0__world__["D" /* Level2 */]();
LevelStore.level3 = new __WEBPACK_IMPORTED_MODULE_0__world__["E" /* Level3 */]();
LevelStore.level4 = new __WEBPACK_IMPORTED_MODULE_0__world__["F" /* Level4 */]();


/***/ }),

/***/ "./src/app/world/store/mobStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MobStore {
}
/* unused harmony export MobStore */



/***/ }),

/***/ "./src/app/world/store/playerStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class PlayerStore {
    static createPlayer(icon, name, profession) {
        const item = new __WEBPACK_IMPORTED_MODULE_0__world__["L" /* Player */](icon, name, profession);
        return item;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerStore;

PlayerStore.Fighter1 = PlayerStore.createPlayer('🧖', 'Jane the warrior', 'fighter');
PlayerStore.Fighter2 = PlayerStore.createPlayer('🙋🏾‍♂️', 'Marg the fearless', 'fighter');
PlayerStore.Priest1 = PlayerStore.createPlayer('🧞‍♀️', 'Gana the wise', 'priest');
PlayerStore.Necromancer1 = PlayerStore.createPlayer('🧛🏿‍♀️', 'Hotep the gifted', 'necromancer');


/***/ }),

/***/ "./src/app/world/store/potionStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class PotionStore {
    static createPotion(icon, name, life) {
        const item = new __WEBPACK_IMPORTED_MODULE_0__world__["N" /* Potion */](icon, name, life);
        item.icon = icon;
        return item;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PotionStore;

PotionStore.smallPotion = PotionStore.createPotion('❤', 'small potion', 50);


/***/ }),

/***/ "./src/app/world/task/fight.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Fight {
    constructor(group, mob) {
        this.group = group;
        this.progress = '';
        this.mob = mob;
        this.mob.repop();
        this.mob.lastActionTick = group.world.tick - 5;
        this.players = group.players;
        this.name = "Fight " + mob.name;
    }
    *sleep(ticks) {
        for (let i = 0; i < ticks; i++) {
            yield;
        }
    }
    *start() {
        yield this.sleep(10);
        while (true) {
            if (this.mob.isDead) {
                //this.group.logger.log("Mob is dead");
                this.progress = 'win';
                yield this.sleep(1);
                return true;
            }
            const alivePlayers = this.players.filter(p => !p.isDead);
            if (alivePlayers.length === 0) {
                this.group.logger.log("All members of the group are deads");
                this.progress = 'lost';
                yield this.sleep(3);
                return false;
            }
            for (let player of alivePlayers) {
                player.fightAction(this.group.logger, this.mob, this.players, [this.mob], this.group.world.tick);
            }
            if (!this.mob.isDead) {
                this.mob.onTick(this.group.world.tick);
                this.mob.fightAction(this.group.logger, alivePlayers[0], [this.mob], this.players, this.group.world.tick);
            }
            this.progress = 'fighting';
            yield;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fight;



/***/ }),

/***/ "./src/app/world/task/killQuestTask.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class KillQuestTask {
    constructor(group, quest) {
        this.group = group;
        this.quest = quest;
        this.progress = '';
        this.name = quest.name;
        this.progress = `0/${this.quest.quantity}`;
    }
    *start() {
        yield new __WEBPACK_IMPORTED_MODULE_0__world__["V" /* TaskProgress */]("Go to location", 12);
        for (let i = 0; i < this.quest.quantity; i++) {
            const lunch = __WEBPACK_IMPORTED_MODULE_0__world__["J" /* LunchTask */].tryGetLunch(this.group);
            if (lunch) {
                yield lunch;
            }
            const success = yield new __WEBPACK_IMPORTED_MODULE_0__world__["s" /* Fight */](this.group, this.quest.mobBuilder());
            if (!success) {
                return false;
            }
            this.progress = `${i + 1} / ${this.quest.quantity}`;
        }
        yield new __WEBPACK_IMPORTED_MODULE_0__world__["V" /* TaskProgress */]("Come back town", 12);
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KillQuestTask;



/***/ }),

/***/ "./src/app/world/task/lunchTask.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LunchTask {
    constructor(group, lunches) {
        this.group = group;
        this.lunches = lunches;
        this.progressTick = 0;
        this.progress = '';
        this.name = `Eat ${lunches[0].food.name}`;
        this.endTick = 8;
    }
    static tryGetLunch(group) {
        const lunches = [];
        for (let player of group.players) {
            if (!player.isDead) {
                const food = player.popFoodBeforeFight(group.logger, group);
                if (food) {
                    lunches.push({ player: player, food: food });
                }
                else {
                    group.logger.log(`No more food`);
                }
            }
            if (lunches.length == 0) {
                return null;
            }
            return new LunchTask(group, lunches);
        }
    }
    *start() {
        for (; this.progressTick <= this.endTick; this.progressTick++) {
            this.progress = Math.round(this.progressTick * 100 / this.endTick) + '%';
            yield;
        }
        for (let lunch of this.lunches) {
            lunch.food.consume(this.group.logger, lunch.player);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LunchTask;



/***/ }),

/***/ "./src/app/world/task/taskProgress.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TaskProgress {
    constructor(name, endTick) {
        this.name = name;
        this.endTick = endTick;
        this.progressTick = 0;
        this.progress = '';
    }
    *start() {
        for (; this.progressTick <= this.endTick; this.progressTick++) {
            this.progress = Math.round(this.progressTick * 100 / this.endTick) + '%';
            yield;
        }
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TaskProgress;



/***/ }),

/***/ "./src/app/world/task/thread.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Thread {
    constructor(task) {
        this.stack = [];
        this.allTasks = [];
        this.lastValue = null;
        this.returnedValue = null;
        this.push(task);
    }
    push(task) {
        const asTask = task;
        if (asTask.start) {
            this.stack.push(asTask.start());
            if (asTask.progress != null) {
                this.allTasks.push(asTask);
            }
        }
        else if (task.next) {
            this.stack.push(task);
        }
        else {
            throw "invalid type: " + typeof task;
        }
    }
    tick() {
        if (this.stack.length == 0) {
            return false;
        }
        const top = this.stack[this.stack.length - 1];
        const next = top.next(this.lastValue);
        this.lastValue = next.value;
        if (next.done) {
            this.stack.pop();
        }
        else if (next.value) {
            if (next.value.next) {
                this.push(next.value);
            }
            else if (next.value.start) {
                this.push(next.value);
            }
        }
        this.returnedValue = this.lastValue;
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Thread;



/***/ }),

/***/ "./src/app/world/tools/logger.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Logger {
    constructor() {
        this.messages = [];
    }
    log(message) {
        console.log(message);
        this.messages.push(message);
        if (this.messages.length > 10) {
            this.messages.splice(0, 1);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Logger;



/***/ }),

/***/ "./src/app/world/tools/progress.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Progress {
    constructor() {
        this.activities = {};
    }
    doneQuest(activity) {
        if (!activity.id) {
            console.dir(activity);
            throw 'missing activity id';
        }
        if (this.activities[activity.id]) {
            this.activities[activity.id]++;
        }
        else {
            this.activities[activity.id] = 1;
        }
    }
    hasDoneQuest(activity) {
        if (!activity.id) {
            console.dir(activity);
            throw 'missing activity id';
        }
        return !!this.activities[activity.id];
    }
    pushIfNotDone(activities, activity) {
        if (this.hasDoneQuest(activity)) {
            return false;
        }
        activities.push(activity);
        return true;
    }
    pushIfUnknown(activities, group, activity) {
        if (group.players.filter(p => activity.canLearn(p)).length == 0) {
            return false;
        }
        activities.push(activity);
        return true;
    }
    pushFarmQuest(activities, activity, world) {
        const reward = activity.rewards[0];
        if (!reward) {
            throw 'Not a farming quest';
        }
        if (world.bag.countItems(reward) < 10) {
            activities.push(activity);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Progress;



/***/ }),

/***/ "./src/app/world/tools/store.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let Store = Store_1 = class Store {
    constructor() {
        this._storage = window.localStorage;
        try {
            this.world = JSON.parse(Store_1.WORLD_SAVE);
        }
        catch (_a) { }
    }
    save() {
        this._storage.setItem(Store_1.WORLD_SAVE, JSON.stringify(this.world));
    }
    clear() {
        this._storage.removeItem(Store_1.WORLD_SAVE);
        this.world = null;
    }
};
Store.WORLD_SAVE = "WORLD_SAVE";
Store = Store_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], Store);

var Store_1;


/***/ }),

/***/ "./src/app/world/tools/testTools.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class TestTools {
    static fastRunTest(world, task) {
        const thread = new __WEBPACK_IMPORTED_MODULE_0__world__["W" /* Thread */](task);
        const tickLimit = world.tick + 10000;
        while (thread.tick()) {
            world.tick++;
            if (world.tick > tickLimit) {
                throw 'infinite loop thread error';
            }
        }
    }
    static runFight(players, mob, options) {
        for (let player of players) {
            player.currentLife = player.maxLife;
            player.currentMana = player.maxMana;
        }
        const world = new __WEBPACK_IMPORTED_MODULE_0__world__["Z" /* World */]();
        const group = new __WEBPACK_IMPORTED_MODULE_0__world__["v" /* Group */](world, players[0]);
        for (let i = 1; i < players.length; i++) {
            group.includePlayer(players[i]);
        }
        const fight = new __WEBPACK_IMPORTED_MODULE_0__world__["s" /* Fight */](group, mob);
        if (options && options.initWorld) {
            options.initWorld(world, group);
        }
        TestTools.fastRunTest(world, fight);
    }
    static assertEasyFigth(player, mob, options = {}) {
        TestTools.runFight([player], mob, options);
        expect(mob.isDead).toBeTruthy(`${mob.name} still has ${mob.getCurrentLifePercent()}% life`);
        const playerLifePercent = player.getCurrentLifePercent();
        expect(playerLifePercent).toBeLessThanOrEqual(99, `${player.name} life percent`);
        expect(playerLifePercent).toBeGreaterThanOrEqual(50, `${player.name} life percent`);
    }
    static assertFairFigth(player, mob, options = {}) {
        TestTools.runFight([player], mob, options);
        expect(mob.isDead).toBeTruthy(`${mob.name} still has ${mob.getCurrentLifePercent()}% life`);
        const playerLifePercent = player.getCurrentLifePercent();
        expect(playerLifePercent).toBeLessThanOrEqual(75, `${player.name} life percent`);
        expect(playerLifePercent).toBeGreaterThanOrEqual(25, `${player.name} life percent`);
    }
    static assertLoseFigth(player, mob, options = {}) {
        TestTools.runFight([player], mob, options);
        expect(player.isDead).toBeTruthy(`${player.name} still has ${player.getCurrentLifePercent()}% life`);
        const mobLifePercent = mob.getCurrentLifePercent();
        expect(mobLifePercent).toBeGreaterThanOrEqual(5, `${mob.name} should have some life left`);
    }
    static assertEasyGroupFigth(players, mob, options = {}) {
        TestTools.runFight(players, mob, options);
        expect(mob.isDead).toBeTruthy(`${mob.name} still has ${mob.getCurrentLifePercent()}% life`);
        expect(!players[0].isDead).toBeTruthy(`Tank is dead`);
        const priest = players.filter(p => p.profession === 'priest')[0];
        const priestManaPercent = priest.currentMana * 100 / priest.maxMana;
        expect(priestManaPercent).toBeGreaterThanOrEqual(50, `priest mana percent`);
    }
    static assertFairGroupFigth(players, mob, options = {}) {
        TestTools.runFight(players, mob, options);
        expect(mob.isDead).toBeTruthy(`${mob.name} still has ${mob.getCurrentLifePercent()}% life`);
        expect(!players[0].isDead).toBeTruthy(`Tank is dead`);
        const priest = players.filter(p => p.profession === 'priest')[0];
        const priestManaPercent = priest.currentMana * 100 / priest.maxMana;
        expect(priestManaPercent).toBeLessThanOrEqual(30, `priest mana percent`);
    }
}
/* unused harmony export TestTools */



/***/ }),

/***/ "./src/app/world/tools/tools.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tools {
    static randomPick(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    static removeItem(list, item) {
        const index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }
    static distinctItems(list) {
        return list.filter((item, i, ar) => { return ar.indexOf(item) === i; });
    }
    static fillArray(value, len) {
        const arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(value);
        }
        return arr;
    }
    static format(value, ...args) {
        try {
            return value.replace(/{(\d+(:.*)?)}/g, function (match, i) {
                var s = match.split(':');
                if (s.length > 1) {
                    i = i[0];
                    match = s[1].replace('}', '');
                }
                var arg = Tools.formatPattern(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : "";
            });
        }
        catch (e) {
            return "";
        }
    }
    static formatPattern(match, arg) {
        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                break;
            case 'U':
                arg = arg.toUpperCase();
                break;
            default:
                break;
        }
        return arg;
    }
    static niceAssign(target, source) {
        return Object.assign(target, source);
    }
    static arrayAssign(target, source) {
        target.length = source.length;
        for (let i = 0; i < source.length; i++) {
            target[i] = Tools.niceAssign(target[i] || {}, source[i]);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tools;

Tools.random = function (min, max) {
    return min + Math.random() * (max - min);
};


/***/ }),

/***/ "./src/app/world/world.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world___ = __webpack_require__("./src/app/world/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm2015/BehaviorSubject.js");


class World {
    //private availableQuests: Activity[] = [];
    constructor() {
        this.players = [];
        this.groups = [];
        this.candidates = [];
        this.bankItems = [];
        this.bag = new __WEBPACK_IMPORTED_MODULE_0__world___["i" /* Bag */]();
        this.tick = 0;
        this.tick$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this.tick);
        this.progress = new __WEBPACK_IMPORTED_MODULE_0__world___["P" /* Progress */]();
        this.level = new __WEBPACK_IMPORTED_MODULE_0__world___["C" /* Level1 */]();
        this.bag.add(__WEBPACK_IMPORTED_MODULE_0__world___["u" /* FoodStore */].carrot);
        __WEBPACK_IMPORTED_MODULE_0__world___["M" /* PlayerStore */].Fighter1.location = __WEBPACK_IMPORTED_MODULE_0__world___["G" /* LevelStore */].level1;
        this.players.push(__WEBPACK_IMPORTED_MODULE_0__world___["M" /* PlayerStore */].Fighter1);
        //setInterval(() => this._tick(), 5);
        /*
                PlayerStore.Fighter2.location = LevelStore.level3;
                this.players.push(PlayerStore.Fighter2);
                PlayerStore.Fighter2.equip(Level1.needleSword, null);
                PlayerStore.Fighter2.equip(Level1.hamsterHelmet, null);
                PlayerStore.Fighter2.abilities.push(AbilityStore.stoneShield());
                PlayerStore.Fighter2.abilities.push(AbilityStore.cristalShield());
                PlayerStore.Fighter2.abilities.push(AbilityStore.poisonAbility());
                PlayerStore.Fighter2.refreshStat();
                this.bag.add(Level3.blowFishShield);
                this.bag.add(Level3.hedgehogSword);
                this.bag.add(Level1.needleSword);
        
                PlayerStore.Priest1.location = LevelStore.level2;
                PlayerStore.Priest1.equip(Level3.hedgehogTunic, null);
                this.players.push(PlayerStore.Priest1);
        
                /*		*/
        this.cleanGroup();
        /*
        this.bag.add(PotionStore.smallPotion);
        this.bag.add(PotionStore.smallPotion);
        this.bag.add(PotionStore.smallPotion);
        this.bag.add(PotionStore.smallPotion);
*/
        //Debug
        //	PlayerStore.Warrior1.debuffs.addBuff(0, PlayerStore.Warrior1, PlayerStore.Warrior1, AbilityStore.poisonBuff);
        /**/
        //	this.availableQuests = this.level.getAvailableActivities(this.progress, this);
        setInterval(() => this._tick(), 100);
    }
    _tick() {
        this.tick++;
        for (let group of this.groups) {
            group.tick();
        }
        this.tick$.next(this.tick);
    }
    cleanGroup() {
        this.groups = [];
        for (const p of this.players) {
            this.groups.push(new __WEBPACK_IMPORTED_MODULE_0__world___["v" /* Group */](this, p));
        }
    }
    getAvailableQuests(group) {
        return group.location.getAvailableActivities(this.progress, this, group);
        ;
    }
    startActivity(group, quest) {
        //	this.availableQuests = [];
        /*var index = this.availableQuests.indexOf(quest, 0);
        if (index > -1) {
            this.availableQuests.splice(index, 1);
        } */
        group.activityProgress = new __WEBPACK_IMPORTED_MODULE_0__world___["f" /* ActivityProgress */](quest, group);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = World;



/***/ }),

/***/ "./src/app/world/zone/level1.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Level1 {
    constructor() {
        this.name = 'the home';
        this.icon = '💒';
    }
    getAvailableActivities(progress, world, group) {
        const activities = [];
        if (progress.pushIfNotDone(activities, Level1.firstQuest)) {
            return activities;
        }
        if (world.bag.countItems(Level1.findSomeFood.rewards[0]) < 12) {
            activities.push(Level1.findSomeFood);
        }
        progress.pushIfNotDone(activities, Level1.findNeedleSword);
        progress.pushIfNotDone(activities, Level1.findHelmet);
        progress.pushIfNotDone(activities, Level1.beatBoar);
        if (progress.hasDoneQuest(Level1.beatBoar)) {
            activities.push(new __WEBPACK_IMPORTED_MODULE_0__world__["Y" /* TravelActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["G" /* LevelStore */].level2, 'north'));
        }
        return activities;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Level1;

//name = 'the camp';
//icon = '🏕';
Level1.mouse = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🐁', 'mouse', 10, 2);
Level1.spoonSword = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createWeapon('🥄', 'spoon sword', 6, 21, { qualityColor: 'white', slot: 'two-hand' });
Level1.firstQuest = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(1, Level1.mouse, 2, Level1.spoonSword);
Level1.findSomeFood = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(1, Level1.mouse, 2, __WEBPACK_IMPORTED_MODULE_0__world__["X" /* Tools */].fillArray(__WEBPACK_IMPORTED_MODULE_0__world__["u" /* FoodStore */].carrot, 3), 'Find some food');
Level1.rat = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🐀', 'rat', 30, 3);
Level1.needleSword = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createWeapon('⚔', 'needle sword', 7, 21, { slot: 'two-hand', strength: 1, stamina: 1 });
Level1.findNeedleSword = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(1, Level1.rat, 5, Level1.needleSword);
Level1.hamster = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🐹', 'hamster', 70, 5);
Level1.hamsterHelmet = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👕', 'hamster tunic', { slot: 'chest', armor: 2, stamina: 2 });
Level1.findHelmet = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(1, Level1.hamster, 1, Level1.hamsterHelmet, "The haunter hamster");
Level1.boar = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🐗', 'boar', 120, 8);
Level1.beatBoar = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(1, Level1.boar, 1, [], "The dangerous forest");


/***/ }),

/***/ "./src/app/world/zone/level2.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Level2 {
    constructor() {
        this.name = 'the town';
        this.icon = '🏯';
    }
    getAvailableActivities(progress, world, group) {
        const activities = [];
        activities.push(new __WEBPACK_IMPORTED_MODULE_0__world__["Y" /* TravelActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["G" /* LevelStore */].level1, 'south'));
        progress.pushIfUnknown(activities, group, Level2.learnToDrinkPotion);
        progress.pushIfNotDone(activities, Level2.killRooster);
        progress.pushIfNotDone(activities, Level2.killTurtle);
        if (progress.hasDoneQuest(Level2.killRooster) || progress.hasDoneQuest(Level2.killTurtle)) {
            progress.pushIfUnknown(activities, group, Level2.learnHotWound);
        }
        if (progress.hasDoneQuest(Level2.learnToDrinkPotion)) {
            progress.pushFarmQuest(activities, Level2.farmPotion, world);
        }
        if (progress.hasDoneQuest(Level2.learnHotWound)) {
            activities.push(new __WEBPACK_IMPORTED_MODULE_0__world__["Y" /* TravelActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["G" /* LevelStore */].level3, 'east'));
        }
        if (progress.hasDoneQuest(__WEBPACK_IMPORTED_MODULE_0__world__["E" /* Level3 */].recruitPriest)) {
            progress.pushIfNotDone(activities, Level2.recruitFighter2);
            progress.pushIfNotDone(activities, Level2.recruitNecromancer1);
            progress.pushIfUnknown(activities, group, Level2.learnPoisonAbility);
        }
        if (progress.hasDoneQuest(Level2.recruitFighter2)) {
            activities.push(new __WEBPACK_IMPORTED_MODULE_0__world__["Y" /* TravelActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["G" /* LevelStore */].level4, 'north'));
        }
        return activities;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Level2;

Level2.learnToDrinkPotion = new __WEBPACK_IMPORTED_MODULE_0__world__["B" /* LearnActivity */](null, __WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].drinkPotion);
Level2.bat = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🦇', 'bat', 40, 3);
Level2.farmPotion = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(2, Level2.bat, 4, __WEBPACK_IMPORTED_MODULE_0__world__["X" /* Tools */].fillArray(__WEBPACK_IMPORTED_MODULE_0__world__["O" /* PotionStore */].smallPotion, 4), 'Get some potions');
Level2.rooster = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🐓', 'rooster', 120, 11);
Level2.roosterLeggings = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👖', 'rooster leggings', { slot: 'leg', strength: 2, stamina: 2 });
Level2.killRooster = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(2, Level2.rooster, 1, Level2.roosterLeggings, "The infected farm");
Level2.turtle = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🐢', 'small turtle', 220, 8);
Level2.turtleLeggings = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👖', 'turtle leggings', { slot: 'leg', spirit: 2, stamina: 2 });
Level2.killTurtle = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(2, Level2.turtle, 4, Level2.turtleLeggings, "Wild pit");
Level2.learnHotWound = new __WEBPACK_IMPORTED_MODULE_0__world__["B" /* LearnActivity */]('fighter', __WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].hotWoundAbility);
Level2.recruitFighter2 = new __WEBPACK_IMPORTED_MODULE_0__world__["R" /* RecruitActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["M" /* PlayerStore */].Fighter2);
Level2.recruitNecromancer1 = new __WEBPACK_IMPORTED_MODULE_0__world__["R" /* RecruitActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["M" /* PlayerStore */].Necromancer1);
Level2.learnPoisonAbility = new __WEBPACK_IMPORTED_MODULE_0__world__["B" /* LearnActivity */]('necromancer', __WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].poisonAbility);


/***/ }),

/***/ "./src/app/world/zone/level3.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Level3 {
    constructor() {
        this.name = 'the temple';
        this.icon = '🕌';
    }
    getAvailableActivities(progress, world, group) {
        const activities = [];
        activities.push(new __WEBPACK_IMPORTED_MODULE_0__world__["Y" /* TravelActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["G" /* LevelStore */].level2, 'west'));
        progress.pushIfNotDone(activities, Level3.recruitPriest);
        progress.pushIfNotDone(activities, Level3.letsDress1);
        progress.pushIfNotDone(activities, Level3.letsDress2);
        if (progress.hasDoneQuest(Level3.letsDress1) || progress.hasDoneQuest(Level3.letsDress2)) {
            progress.pushIfUnknown(activities, group, Level3.learnShield1);
            progress.pushIfUnknown(activities, group, Level3.learnShield2);
        }
        return activities;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Level3;

Level3.levelId = 3;
Level3.recruitPriest = new __WEBPACK_IMPORTED_MODULE_0__world__["R" /* RecruitActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["M" /* PlayerStore */].Priest1);
Level3.hedgehog = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🦔', 'hedgehog', 300, 10);
Level3.hedgehogTunic = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👗', 'hedgehog tunic', { slot: 'chest', spirit: 2, intellect: 2 });
Level3.hedgehogSword = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createWeapon('🗡', 'hedgehog sword', 6, 25, { slot: 'main hand', stamina: 5 });
Level3.letsDress1 = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(Level3.levelId, Level3.hedgehog, 1, [Level3.hedgehogTunic, Level3.hedgehogSword], "Let's dress");
Level3.blowFish = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createMob('🐡', 'blowFish', 200, 16);
Level3.blowFishShoe = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👞', 'blowFish shoe', { slot: 'feet', wisdom: 2, stamina: 2 });
Level3.blowFishShield = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('🛡', 'blowFish shield', { slot: 'off hand', armor: 3, stamina: 3 });
Level3.letsDress2 = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(Level3.levelId, Level3.blowFish, 1, [Level3.blowFishShoe, Level3.blowFishShield], "Tie the shoelaces");
Level3.learnShield1 = new __WEBPACK_IMPORTED_MODULE_0__world__["B" /* LearnActivity */]('fighter', __WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].stoneShield);
Level3.learnShield2 = new __WEBPACK_IMPORTED_MODULE_0__world__["B" /* LearnActivity */]('fighter', __WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].cristalShield);


/***/ }),

/***/ "./src/app/world/zone/level4.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class Level4 {
    constructor() {
        this.name = 'the desert';
        this.icon = '🏜';
    }
    getAvailableActivities(progress, world, group) {
        const activities = [];
        activities.push(new __WEBPACK_IMPORTED_MODULE_0__world__["Y" /* TravelActivity */](__WEBPACK_IMPORTED_MODULE_0__world__["G" /* LevelStore */].level2, 'south'));
        progress.pushIfNotDone(activities, Level4.fightScorpion);
        return activities;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Level4;

Level4.levelId = 4;
Level4.scorpion = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createFastMob('🦂', 'scorpion', 10, 600, 35);
Level4.scorpionTunic = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👕', 'scorpion tunic', { slot: 'chest', qualityColor: 'blue', wisdom: 5, strength: 5, armor: 5 });
Level4.scorpionLeggings = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👖', 'scorpion leggings', { slot: 'leg', qualityColor: 'blue', intellect: 5, stamina: 5, armor: 5 });
Level4.scorpionShoe = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('👞', 'scorpion shoe', { slot: 'feet', qualityColor: 'blue', wisdom: 5, spirit: 5, stamina: 5 });
Level4.scorpionSword = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createWeapon('🗡', 'scorpion sword', 15, 10, { slot: 'main hand', qualityColor: 'blue', intellect: 5, strength: 5, armor: 5 });
Level4.scorpionShield = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createArmor('🛡', 'scorpion shield', { slot: 'off hand', qualityColor: 'blue', intellect: 5, spirit: 5, stamina: 5 });
Level4.fightScorpion = __WEBPACK_IMPORTED_MODULE_0__world__["H" /* LevelTools */].createKillQuest(Level4.levelId, Level4.scorpion, 1, [Level4.scorpionTunic, Level4.scorpionLeggings, Level4.scorpionShoe, Level4.scorpionSword, Level4.scorpionShield], "Desert master");


/***/ }),

/***/ "./src/app/world/zone/levelTools.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__("./src/app/world/index.ts");

class LevelTools {
    static createArmor(icon, name, stat) {
        const item = new __WEBPACK_IMPORTED_MODULE_0__world__["r" /* EquipableItem */](name);
        item.icon = icon;
        item.qualityColor = "green";
        Object.assign(item, stat);
        return item;
    }
    static createWeapon(icon, name, damage, damageCooldown, stat) {
        const item = new __WEBPACK_IMPORTED_MODULE_0__world__["r" /* EquipableItem */](name);
        item.icon = icon;
        item.slot = "two-hand";
        item.qualityColor = "green";
        item.damage = damage;
        item.damageCooldown = damageCooldown;
        Object.assign(item, stat);
        return item;
    }
    static createMob(icon, name, life, dps) {
        return () => new __WEBPACK_IMPORTED_MODULE_0__world__["K" /* Mob */](icon, name, life, dps);
    }
    static createKillQuest(levelName, mob, quantity, rewards, questName = null) {
        const quest = new __WEBPACK_IMPORTED_MODULE_0__world__["z" /* KillQuest */](mob, quantity);
        quest.id = 'level_' + levelName + '_kill_' + quantity + "_" + quest.mobSample.name;
        if (questName) {
            quest.name = questName;
        }
        if (rewards) {
            if (rewards instanceof Array) {
                for (let reward of rewards) {
                    quest.rewards.push(reward);
                }
            }
            else {
                quest.rewards.push(rewards);
            }
        }
        return quest;
    }
    static createFastMob(icon, name, armor, life, dps) {
        return () => {
            const visibleLife = Math.round(1 + (life / (10 + armor))) * 10;
            const mob = new __WEBPACK_IMPORTED_MODULE_0__world__["K" /* Mob */](icon, name, visibleLife, dps);
            mob.weaponCooldown = 15;
            mob.weaponDamage = Math.round(mob.weaponCooldown * dps / 20);
            mob.characterStat.armor.initialValue = armor;
            mob.addAndUseAbility(__WEBPACK_IMPORTED_MODULE_0__world__["d" /* AbilityStore */].cristalShield);
            mob.refreshStat();
            return mob;
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelTools;



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;



/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm2015/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(err => console.log(err));


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map