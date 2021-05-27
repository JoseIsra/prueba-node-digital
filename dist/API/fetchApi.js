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
exports.fetchApi = void 0;
const fetchConnection = require('node-fetch');
function fetchApi(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchConnection('https://lxp.fractaluptest.xyz/api/graphiql', {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2ZyYWN0YWx1cC5iMmNsb2dpbi5jb20vNzQzN2UyOWEtOTI3MC00NTAwLTllMDEtN2NmNTk1ZTQzMmNhL3YyLjAvIiwiZXhwIjoxNjIyMTMxODIwLCJuYmYiOjE2MjIxMzAwMjAsImF1ZCI6IjEwYWI1NGU5LTVkNDAtNGUxMS1iMzM5LTY4ZGM0ODM2Zjc5MSIsInN1YiI6ImE3M2ZlNDNmLWIxNjUtNGFlNC1hZDlkLTBlYWJmYjMwMzA5ZSIsImdpdmVuX25hbWUiOiJsZXN0ZXIiLCJmYW1pbHlfbmFtZSI6InZhcmdhcyIsImV4dGVuc2lvbl9BcGVsbGlkb01hdGVybm8iOiJhbmdlbGVzIiwiZXh0ZW5zaW9uX0ROSSI6NzI0MjM0ODEsImVtYWlscyI6WyJmdS52YXJnYXMubGVzLnRlckBnbWFpbC5jb20iXSwidGZwIjoiQjJDXzFfbHhwIiwibm9uY2UiOiJhMzU2YmQzMC0xYWZlLTRiZjEtOWYwMy1hNGY3NTQ5M2Y5ZmYiLCJhenAiOiIxMGFiNTRlOS01ZDQwLTRlMTEtYjMzOS02OGRjNDgzNmY3OTEiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2MjIxMzAwMjB9.hGZL180qaGlwFWE3YYpBiv1dSVezeyUTLTQfnW6pO0sazUTa526a6iwt6Ejc5zWzJJ0HWo1Lp3CGckpe6bJzwhNUbZR9r65p3olUfjX05OdH3WAjjrIoEi6_uPZwSy1qCyMGjJraBxuGd32QXkC8F1K0B61-NqzQxOtp0mvTdeXiMcyDgHYfUXACJ7XMk10u-Yyjsh7vHT43rS9jJfB1YiD68W1llf-uC0OSZGCPRWURYeEFcOjnk64HKZKvCGaML0MqNnTxTF22kAON7A9-oxSmWO3AeszhSd9IQeH70x65S1ivZoDaOnK-2tAxqzDmonbkYKV1NB5zR8QrMNlLnA',
                'User-Agent': 'Node',
            },
        });
        const json = yield response.json();
        console.log(json);
        return json.data;
    });
}
exports.fetchApi = fetchApi;
