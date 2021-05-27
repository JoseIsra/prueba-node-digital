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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2ZyYWN0YWx1cC5iMmNsb2dpbi5jb20vNzQzN2UyOWEtOTI3MC00NTAwLTllMDEtN2NmNTk1ZTQzMmNhL3YyLjAvIiwiZXhwIjoxNjIyMTI5NTM2LCJuYmYiOjE2MjIxMjc3MzYsImF1ZCI6IjEwYWI1NGU5LTVkNDAtNGUxMS1iMzM5LTY4ZGM0ODM2Zjc5MSIsInN1YiI6ImE3M2ZlNDNmLWIxNjUtNGFlNC1hZDlkLTBlYWJmYjMwMzA5ZSIsImdpdmVuX25hbWUiOiJsZXN0ZXIiLCJmYW1pbHlfbmFtZSI6InZhcmdhcyIsImV4dGVuc2lvbl9BcGVsbGlkb01hdGVybm8iOiJhbmdlbGVzIiwiZXh0ZW5zaW9uX0ROSSI6NzI0MjM0ODEsImVtYWlscyI6WyJmdS52YXJnYXMubGVzLnRlckBnbWFpbC5jb20iXSwidGZwIjoiQjJDXzFfbHhwIiwibm9uY2UiOiJhMzU2YmQzMC0xYWZlLTRiZjEtOWYwMy1hNGY3NTQ5M2Y5ZmYiLCJhenAiOiIxMGFiNTRlOS01ZDQwLTRlMTEtYjMzOS02OGRjNDgzNmY3OTEiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2MjIxMjc3MzZ9.fVgCLPsFRCmEsQgfWM1_abzNZ00kjhPgGOMnWjMHEFuIGDnvYqsLI6ax2eAqef6ulwA-_8VFtLIjXbfoMXTZf6mAnhv_B_bGQCMzBAx9jTRY3dXkcEt39bCr_D88Epqd6m_7e8IKlbGv6XVDvTc496V-i06oAj_LEg2eb_fRuK9FjKv5y7KiBJ5mWfvQcq_TsEwNnLYAoDE3MvWOmKkXmf71-jIpesM1SbQCMAyUKSkFMmNWpyvGJRnYbcSvWI69S9H5EwoxsBj02I2GK6z1XJR-eqzhSmjcT8VmXPbfRXemRlEbrVq491KcAgfkD00HxHyZhnVA6A2mzspITnK9lQ',
                'User-Agent': 'Node',
            },
        });
        const json = yield response.json();
        console.log(json);
        return json.data;
    });
}
exports.fetchApi = fetchApi;
