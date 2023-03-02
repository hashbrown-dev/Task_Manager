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
const src_1 = __webpack_require__("./libs/todo/todo-api/src/index.ts");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            src_1.TodoModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'local',
                autoLoadEntities: true,
                entities: [src_1.TodoEntity],
                synchronize: true,
            })
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./libs/todo/todo-api/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/index.ts"), exports);


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/controllers/todo.controller.ts"), exports);


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/controllers/todo.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const todo_domain_1 = __webpack_require__("./libs/todo/todo-domain/src/index.ts");
const model_1 = __webpack_require__("./libs/todo/todo-domain/src/lib/model/index.ts");
const entity_1 = __webpack_require__("./libs/todo/todo-api/src/lib/entity/index.ts");
// import { Status, Todo } from "../../../../../apps/nest-api/src/entity/Todo";
// import { UpdateStatusEntity, UpdateTaskEntity } from "../../../../../apps/nest-api/src/entity/updateTodo";
const todo_service_1 = __webpack_require__("./libs/todo/todo-api/src/lib/services/todo.service.ts");
let TodoController = class TodoController {
    constructor(todoServices) {
        this.todoServices = todoServices;
    }
    findAll() {
        return this.todoServices.getAllTodos();
    }
    findTodo(id) {
        return this.todoServices.getTodoById(id);
    }
    getPendingTodos(pending) {
        return this.todoServices.getPendingTodos(pending);
    }
    getCompletedTodos(completed) {
        return this.todoServices.getCompletedTodos(completed);
    }
    createTodo(newTodo) {
        return this.todoServices.createTodo(newTodo);
    }
    queryTodoParams(paginator) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log("Reached in fulltext search controller");
            const todo = yield this.todoServices.queryTodoParams(paginator);
            return todo;
        });
    }
    markAsDone(id, payload) {
        const todo = this.todoServices.markAsDone(id, payload);
    }
    updateTodo(id, payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const todo = yield this.todoServices.updateTodo(id, payload);
        });
    }
    deleteTodo(id) {
        const deleteTodo = this.todoServices.deleteTodoById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], TodoController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)("getTodoById/:id"),
    (0, tslib_1.__param)(0, (0, common_1.Param)("id")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], TodoController.prototype, "findTodo", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)("getPending/:pending"),
    (0, tslib_1.__param)(0, (0, common_1.Param)("pending")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof todo_domain_1.Todo !== "undefined" && todo_domain_1.Todo.Status) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], TodoController.prototype, "getPendingTodos", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)("getCompleted/:completed"),
    (0, tslib_1.__param)(0, (0, common_1.Param)("completed")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], TodoController.prototype, "getCompletedTodos", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)("createTodo/"),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof entity_1.TodoEntity !== "undefined" && entity_1.TodoEntity) === "function" ? _f : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], TodoController.prototype, "createTodo", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)("queryTodoParams"),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_h = typeof todo_domain_1.Todo !== "undefined" && todo_domain_1.Todo.PaginationDto) === "function" ? _h : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], TodoController.prototype, "queryTodoParams", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)("markAsDone/:id"),
    (0, tslib_1.__param)(0, (0, common_1.Param)("id")),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, typeof (_k = typeof model_1.UpdateStatusDto !== "undefined" && model_1.UpdateStatusDto) === "function" ? _k : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TodoController.prototype, "markAsDone", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)("updateTodo/:id"),
    (0, tslib_1.__param)(0, (0, common_1.Param)("id")),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, typeof (_l = typeof model_1.UpdateTodoDto !== "undefined" && model_1.UpdateTodoDto) === "function" ? _l : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], TodoController.prototype, "updateTodo", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)("removeTodo/:id"),
    (0, tslib_1.__param)(0, (0, common_1.Param)("id")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TodoController.prototype, "deleteTodo", null);
TodoController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('todo'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_o = typeof todo_service_1.TodoService !== "undefined" && todo_service_1.TodoService) === "function" ? _o : Object])
], TodoController);
exports.TodoController = TodoController;


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/entity/Todo.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const todo_domain_1 = __webpack_require__("./libs/todo/todo-domain/src/index.ts");
const typeorm_1 = __webpack_require__("typeorm");
let TodoEntity = class TodoEntity extends typeorm_1.BaseEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    (0, tslib_1.__metadata)("design:type", String)
], TodoEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500
    }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: todo_domain_1.Todo.Priority,
        // default: Todo.Priority.LOW
    }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof todo_domain_1.Todo !== "undefined" && todo_domain_1.Todo.Priority) === "function" ? _a : Object)
], TodoEntity.prototype, "priority", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: todo_domain_1.Todo.Status,
        // default: Todo.Status.PENDING,
    }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof todo_domain_1.Todo !== "undefined" && todo_domain_1.Todo.Status) === "function" ? _b : Object)
], TodoEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], TodoEntity.prototype, "created_date", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        // type: 'date',
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], TodoEntity.prototype, "due_date", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({
        // type: 'date',
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], TodoEntity.prototype, "updated_date", void 0);
TodoEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], TodoEntity);
exports.TodoEntity = TodoEntity;


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/entity/create.entity.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createTodo = void 0;
class createTodo {
}
exports.createTodo = createTodo;


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/entity/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/entity/Todo.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/entity/create.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/entity/paginationDTO.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/entity/updateTodo.ts"), exports);


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/entity/paginationDTO.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationEntity = void 0;
const todo_domain_1 = __webpack_require__("./libs/todo/todo-domain/src/index.ts");
class PaginationEntity {
    constructor() {
        this.search = "";
        this.take = 10,
            this.skip = 0,
            this.page = 1,
            this.status = todo_domain_1.Todo.Status.PENDING;
    }
}
exports.PaginationEntity = PaginationEntity;


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/entity/updateTodo.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTaskEntity = exports.UpdateStatusEntity = void 0;
const todo_domain_1 = __webpack_require__("./libs/todo/todo-domain/src/index.ts");
class UpdateStatusEntity {
}
exports.UpdateStatusEntity = UpdateStatusEntity;
class UpdateTaskEntity {
    constructor() {
        this.name = "";
        this.description = "";
        this.priority = todo_domain_1.Todo.Priority.LOW;
        this.due_date = new Date();
        this.status = todo_domain_1.Todo.Status.PENDING;
    }
}
exports.UpdateTaskEntity = UpdateTaskEntity;


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/controllers/index.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/entity/index.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/services/index.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/todo.module.ts"), exports);


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-api/src/lib/services/todo.service.ts"), exports);


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/services/todo.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const entity_1 = __webpack_require__("./libs/todo/todo-api/src/lib/entity/index.ts");
let TodoService = class TodoService {
    constructor() { }
    getAllTodos() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.todo = yield entity_1.TodoEntity.find();
            return this.todo;
        });
    }
    // async getAllTodos(page:number, limit: number): Promise<Todo[]> {
    //   this.todo = await Todo.find({
    //     take: limit,
    //     skip: limit * page
    //   });
    //   return this.todo;
    // }
    getTodoById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield entity_1.TodoEntity.findOne(id);
        });
    }
    getPendingTodos(status) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const todo = yield entity_1.TodoEntity.find({
                where: { status: status },
                take: 7
            });
            return todo;
        });
    }
    getCompletedTodos(status) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const todo = yield entity_1.TodoEntity.find({
                where: { status: status },
                take: 7
            });
            // const todo = await getManager().createQueryBuilder(Todo, "pendingTodo").where('pendingTodo.status = :status', {status}).getMany();
            return todo;
        });
    }
    createTodo(todo) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield entity_1.TodoEntity.save(todo);
        });
    }
    queryTodoParams(paginator) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log("Inside the backend service method");
            let query = entity_1.TodoEntity.createQueryBuilder().select("todo").from(entity_1.TodoEntity, "todo").where(`todo.status = '${paginator.status}'`).andWhere('todo.name LIKE :search', { search: `%${paginator.search}%` });
            // query = await query.select();
            // query =query.where("todo.status = '${paginator.status}'");
            // let query = Todo.createQueryBuilder("todo");
            // query = await query.select();
            // query = query.where(
            //   `status = '${paginator.status}' and (name LIKE  '%${paginator.search}%' or MATCH(description) AGAINST ('${paginator.search}' IN BOOLEAN MODE))`
            // );
            // if (paginator.status === Status.PENDING) {
            //   query = query.where(
            //     `status = '${paginator.status}' and (name LIKE  '%${paginator.search}%' or MATCH(description) AGAINST ('${paginator.search}' IN BOOLEAN MODE))`
            //   );
            // }
            // if (paginator.status === Status.COMPLETED) {
            //   query
            //     .where(`title LIKE  '%${paginator.search}%' `)
            //     .orWhere(
            //       `MATCH(description) AGAINST ('${paginator.search}' IN BOOLEAN MODE)`
            //     );
            // }     
            const todos = yield query
                // .orderBy("id", "DESC")
                .take(paginator.take)
                .skip(paginator.skip)
                .getManyAndCount();
            if (todos[1] == 0)
                console.log("No match found");
            if (todos[1] != 0)
                todos[1] = Math.round(todos[1] / 203);
            console.log("Printing count", todos[1]);
            console.log(query.getSql());
            console.log('todos from backend', todos);
            return todos;
        });
    }
    updateTodo(id, payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const todo = yield entity_1.TodoEntity.findOne(id);
            if (todo === undefined) {
                throw new common_1.HttpException("The task was not found in the database!", 404);
            }
            try {
                todo.title = payload.title;
                todo.description = payload.description;
                todo.status = payload.status;
                todo.due_date = new Date(payload.due_date);
                todo.updated_date = new Date();
                todo.priority = payload.priority;
                return yield entity_1.TodoEntity.save(todo);
            }
            catch (error) {
                throw new common_1.HttpException(`Sorry! An error occurred: ${error}`, 1000);
            }
        });
    }
    markAsDone(id, payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const todo = yield entity_1.TodoEntity.findOne(id);
            if (todo === undefined) {
                throw new common_1.HttpException("The task was not found in the database!", 404);
            }
            try {
                todo.status = payload.status;
                todo.updated_date = new Date();
                return yield entity_1.TodoEntity.save(todo);
            }
            catch (error) {
                throw new common_1.HttpException(`Sorry! An error occurred: ${error}`, 1000);
            }
        });
    }
    deleteTodoById(id) {
        entity_1.TodoEntity.delete(id);
    }
};
TodoService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], TodoService);
exports.TodoService = TodoService;


/***/ }),

/***/ "./libs/todo/todo-api/src/lib/todo.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const todo_service_1 = __webpack_require__("./libs/todo/todo-api/src/lib/services/todo.service.ts");
const todo_controller_1 = __webpack_require__("./libs/todo/todo-api/src/lib/controllers/todo.controller.ts");
let TodoModule = class TodoModule {
};
TodoModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        providers: [todo_service_1.TodoService],
        controllers: [todo_controller_1.TodoController]
    })
], TodoModule);
exports.TodoModule = TodoModule;


/***/ }),

/***/ "./libs/todo/todo-domain/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-domain/src/lib/index.ts"), exports);


/***/ }),

/***/ "./libs/todo/todo-domain/src/lib/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Todo = void 0;
exports.Todo = __webpack_require__("./libs/todo/todo-domain/src/lib/model/index.ts");


/***/ }),

/***/ "./libs/todo/todo-domain/src/lib/model/create-todo.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/todo/todo-domain/src/lib/model/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-domain/src/lib/model/todo.dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-domain/src/lib/model/pagination.dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-domain/src/lib/model/update-status.dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-domain/src/lib/model/update-todo.dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/todo/todo-domain/src/lib/model/create-todo.dto.ts"), exports);


/***/ }),

/***/ "./libs/todo/todo-domain/src/lib/model/pagination.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/todo/todo-domain/src/lib/model/todo.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Priority = exports.Status = void 0;
var Status;
(function (Status) {
    Status["PENDING"] = "Pending";
    Status["COMPLETED"] = "Completed";
})(Status = exports.Status || (exports.Status = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "Low";
    Priority["MED"] = "Medium";
    Priority["HIGH"] = "High";
})(Priority = exports.Priority || (exports.Priority = {}));


/***/ }),

/***/ "./libs/todo/todo-domain/src/lib/model/update-status.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/todo/todo-domain/src/lib/model/update-todo.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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