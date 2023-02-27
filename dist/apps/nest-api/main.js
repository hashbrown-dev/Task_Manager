/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/nest-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
// import { Todo } from '../entity/todo';
const Todo_1 = __webpack_require__("./libs/todo/todo-api/src/lib/entity/Todo.ts");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'local',
                autoLoadEntities: true,
                entities: [Todo_1.Todo],
                synchronize: true,
            })
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/entity/Todo.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Todo = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let Todo = class Todo extends typeorm_1.BaseEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    (0, tslib_1.__metadata)("design:type", Number)
], Todo.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], Todo.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Todo.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PRIORITY,
        default: PRIORITY.LOW
    }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof PRIORITY !== "undefined" && PRIORITY) === "function" ? _a : Object)
], Todo.prototype, "priority", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
    }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Status !== "undefined" && Status) === "function" ? _b : Object)
], Todo.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Todo.prototype, "created_date", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Todo.prototype, "due_date", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Todo.prototype, "updated_date", void 0);
Todo = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Todo);
exports.Todo = Todo;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/swagger":
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "reflect-metadata":
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
__webpack_require__("reflect-metadata");
const app_module_1 = __webpack_require__("./apps/nest-api/src/app/app.module.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.enableCors();
        setupSwagger(app);
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle("myToDoApp")
        .setVersion("1.0")
        .addServer("http://localhost:3333", "Localhost")
        .addBearerAuth()
        .build();
    const options = { customSiteTitle: "My ToDo App", swaggerOptions: { docExpansion: "list" } };
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document, options);
}

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map