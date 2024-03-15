"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatient = exports.getAllPatients = exports.goodbye = exports.hello = void 0;
const promise_1 = require("mysql2/promise");
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello World!");
    return "Hello World";
});
exports.hello = hello;
const goodbye = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Goodbye Wordl!");
    return "Goodbye Wordl!";
});
exports.goodbye = goodbye;
const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnection = yield (0, promise_1.createConnection)({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAMEDB,
            port: parseInt(process.env.DB_PORT || "3306")
        });
        const [rows] = yield dbConnection.query("SELECT * FROM Pazienti");
        yield dbConnection.end();
        console.table(rows);
        const response = {
            statusCode: 200,
            body: JSON.stringify(rows)
        };
        return response;
    }
    catch (error) {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: error
            })
        };
        return response;
    }
});
exports.getAllPatients = getAllPatients;
const getPatient = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            nome: "Joao",
            cognome: "Silvia",
            dataNascita: "01/01/1990"
        }),
    };
    return response;
});
exports.getPatient = getPatient;
