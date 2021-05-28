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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2ZyYWN0YWx1cC5iMmNsb2dpbi5jb20vNzQzN2UyOWEtOTI3MC00NTAwLTllMDEtN2NmNTk1ZTQzMmNhL3YyLjAvIiwiZXhwIjoxNjIyMTQ2NDEyLCJuYmYiOjE2MjIxNDQ2MTIsImF1ZCI6IjEwYWI1NGU5LTVkNDAtNGUxMS1iMzM5LTY4ZGM0ODM2Zjc5MSIsInN1YiI6ImE3M2ZlNDNmLWIxNjUtNGFlNC1hZDlkLTBlYWJmYjMwMzA5ZSIsImdpdmVuX25hbWUiOiJsZXN0ZXIiLCJmYW1pbHlfbmFtZSI6InZhcmdhcyIsImV4dGVuc2lvbl9BcGVsbGlkb01hdGVybm8iOiJhbmdlbGVzIiwiZXh0ZW5zaW9uX0ROSSI6NzI0MjM0ODEsImVtYWlscyI6WyJmdS52YXJnYXMubGVzLnRlckBnbWFpbC5jb20iXSwidGZwIjoiQjJDXzFfbHhwIiwibm9uY2UiOiJhMzU2YmQzMC0xYWZlLTRiZjEtOWYwMy1hNGY3NTQ5M2Y5ZmYiLCJhenAiOiIxMGFiNTRlOS01ZDQwLTRlMTEtYjMzOS02OGRjNDgzNmY3OTEiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2MjIxNDQ2MTJ9.I9UqUVGsYCj3WJkx4--PBcxGfVNfGa1KPq1mEFn81xhDWHt3PEOK3ZxrBrRiN7oOwfHNcqMNJkk4ZCcYT7OcKmW7JOEKI53k1Y5YTGTZaiQjHlVKt2x_TO5b4O00Th2qLHe-l0Brj60Jl0H8mc0q6ZGlNuQUVPsCkQHKBmIM-o6yFKZBswk1vNP3qzYTKLqaHM1eBBKY4Gr4IemwAV99XeXoUzxYA0MWwxSjSIDmtNqGivRUieeGpH1VW3Z2hMhdtfO9FFeonqoR66X3TqXmiQlIigDpUQhJsan9_9LBjjLlXLkOa_ZhkLlMieg1GlrpUqRoS6vARpJTNS9MWr6cyg',
                'User-Agent': 'Node',
            },
        });
        const json = yield response.json();
        console.log(json);
        return json.data;
    });
}
exports.fetchApi = fetchApi;
