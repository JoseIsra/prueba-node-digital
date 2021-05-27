const fetchConnection = require('node-fetch');

export async function fetchApi(data: any){
  const response = await fetchConnection(
    'https://lxp.fractaluptest.xyz/api/graphiql',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2ZyYWN0YWx1cC5iMmNsb2dpbi5jb20vNzQzN2UyOWEtOTI3MC00NTAwLTllMDEtN2NmNTk1ZTQzMmNhL3YyLjAvIiwiZXhwIjoxNjIyMTQ0MTUxLCJuYmYiOjE2MjIxNDIzNTEsImF1ZCI6IjEwYWI1NGU5LTVkNDAtNGUxMS1iMzM5LTY4ZGM0ODM2Zjc5MSIsInN1YiI6ImE3M2ZlNDNmLWIxNjUtNGFlNC1hZDlkLTBlYWJmYjMwMzA5ZSIsImdpdmVuX25hbWUiOiJsZXN0ZXIiLCJmYW1pbHlfbmFtZSI6InZhcmdhcyIsImV4dGVuc2lvbl9BcGVsbGlkb01hdGVybm8iOiJhbmdlbGVzIiwiZXh0ZW5zaW9uX0ROSSI6NzI0MjM0ODEsImVtYWlscyI6WyJmdS52YXJnYXMubGVzLnRlckBnbWFpbC5jb20iXSwidGZwIjoiQjJDXzFfbHhwIiwibm9uY2UiOiJhMzU2YmQzMC0xYWZlLTRiZjEtOWYwMy1hNGY3NTQ5M2Y5ZmYiLCJhenAiOiIxMGFiNTRlOS01ZDQwLTRlMTEtYjMzOS02OGRjNDgzNmY3OTEiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2MjIxNDIzNTF9.Bad4GIjwEcjcVSL2LshdOb5HoivYpxxABiCez-Mun74CSEvJYxr980_qTOW9Anmr-D1hRff3QbbIXgMOgwYraUmU52hwi7CeXO86NzShstJZdxxI0eIB7mLJgyXKnM4JvwUoEhB4KRKfrJP_fOfsv-IIn5PyfU30sW81-KTqcdlyG6DrGcmMMhZ9D3u-QMHJAUODDtO8jonKxezlXn40DhLKxFgs2a7_TnIjB0Awfnlq1l6WUC9Nt9-jlyBImJiie3EyhKre8emJZOvykgPkNngKjTn77YhhUIKphH69EgchaT-TBZc9C4rS2FIihDs4F4mh-m1cOSCOk0t1fNaKkA',
        'User-Agent': 'Node',
      },
    }
  );

  const json = await response.json();
  console.log(json)
  return json.data;
}

