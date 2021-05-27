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
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2ZyYWN0YWx1cC5iMmNsb2dpbi5jb20vNzQzN2UyOWEtOTI3MC00NTAwLTllMDEtN2NmNTk1ZTQzMmNhL3YyLjAvIiwiZXhwIjoxNjIyMTM4NDg3LCJuYmYiOjE2MjIxMzY2ODcsImF1ZCI6IjEwYWI1NGU5LTVkNDAtNGUxMS1iMzM5LTY4ZGM0ODM2Zjc5MSIsInN1YiI6ImE3M2ZlNDNmLWIxNjUtNGFlNC1hZDlkLTBlYWJmYjMwMzA5ZSIsImdpdmVuX25hbWUiOiJsZXN0ZXIiLCJmYW1pbHlfbmFtZSI6InZhcmdhcyIsImV4dGVuc2lvbl9BcGVsbGlkb01hdGVybm8iOiJhbmdlbGVzIiwiZXh0ZW5zaW9uX0ROSSI6NzI0MjM0ODEsImVtYWlscyI6WyJmdS52YXJnYXMubGVzLnRlckBnbWFpbC5jb20iXSwidGZwIjoiQjJDXzFfbHhwIiwibm9uY2UiOiJhMzU2YmQzMC0xYWZlLTRiZjEtOWYwMy1hNGY3NTQ5M2Y5ZmYiLCJhenAiOiIxMGFiNTRlOS01ZDQwLTRlMTEtYjMzOS02OGRjNDgzNmY3OTEiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2MjIxMzY2ODd9.FmDPa0qEjjfztiU63nDj_KvEyHZ1nTi2W5R_4o-W2s6N2S0Q8IidbA2aYAuCTaw1SNFR45LuTmoqXCCpvXR1wj73SFuivHgN5bBkGYWe5bxMH92Zwm1dut2ezU-7STgmRT_MiQxRnrjKp_7y03oXx0UgoR0eU8zHDoxqw6bH4oPkjvidYxvJnmn2GcVEPB-XFSyXyVRhet7JUT0tcJcXQLjS0EWGVy6loQo6bjGyjmqnh8hpBcOgSFnwSO6JVF-VlpQmPjlVY4xhNNP9Wh8lt0PLemdcCOMAZ5HkRTmMxURMmrlLooYwrOTaSrz88_jXhAJODJ8Jv8WEhbsdxo7SBA',
        'User-Agent': 'Node',
      },
    }
  );

  const json = await response.json();
  console.log(json)
  return json.data;
}

