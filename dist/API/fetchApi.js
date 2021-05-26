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
        console.log(data);
        const response = yield fetchConnection('https://lxp.fractaluptest.xyz/api/graphiql', {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2ZyYWN0YWx1cC5iMmNsb2dpbi5jb20vNzQzN2UyOWEtOTI3MC00NTAwLTllMDEtN2NmNTk1ZTQzMmNhL3YyLjAvIiwiZXhwIjoxNjIyMDQ2Njk4LCJuYmYiOjE2MjIwNDQ4OTgsImF1ZCI6IjEwYWI1NGU5LTVkNDAtNGUxMS1iMzM5LTY4ZGM0ODM2Zjc5MSIsInN1YiI6IjI5MjU2MWQwLTM5ZWUtNDEwYi1iMTVjLTU2NWVkOWQ0ZTljMCIsImdpdmVuX25hbWUiOiJGYWJyaXppbyIsImZhbWlseV9uYW1lIjoiQWd1aXJyZSIsImV4dGVuc2lvbl9BcGVsbGlkb01hdGVybm8iOiJDcnV6IiwiZXh0ZW5zaW9uX0ROSSI6Nzg5NDU2MTIsImV4dGVuc2lvbl9UZXJtaW5vc3lDb25kaWNpb25lcyI6IkFjZXB0byIsImVtYWlscyI6WyJmYWd1aXJyZUBmcmFjdGFsdXAuY29tIl0sInRmcCI6IkIyQ18xX2x4cCIsIm5vbmNlIjoiOWFlNjQ2MTMtNWU1Ni00MWQ5LTk4M2EtMzRhM2M4NTMwZDYzIiwiYXpwIjoiMTBhYjU0ZTktNWQ0MC00ZTExLWIzMzktNjhkYzQ4MzZmNzkxIiwidmVyIjoiMS4wIiwiaWF0IjoxNjIyMDQ0ODk4fQ.V3dXep1c1MTyLhdIRpT3IDSdOdz7DkFeadgwqoWzm7PHewe6RyjsOU4mBtJVd_3T369gGjK7eL09q6ki_F_QZ28CbGNgKTNsngVnUfODp-ZF5G1cYoFR3N9XBsEpV4gE4-dEafq0cxePm0hsVLR1c7rSRFrKmVnIF5Q_soR6qh6tz8BEm2UhlGpB6bRTccxlNLIHJIZQdb5FAAMfhTgD7sMLyjlWFxuLUp6wgMSTzNI3lmUWIgXV4ja1UWHrIRcZMGD-vNVqrOhm7HZH3iCasvolVanb-NS1av3xWmgQppjFgpyn0xTGzto2IdaYvL_39C9Kni3O69IdNhOy__h7oA',
                'User-Agent': 'Node',
            },
        });
        const json = yield response.json();
        console.log(json);
        return json.data;
    });
}
exports.fetchApi = fetchApi;
