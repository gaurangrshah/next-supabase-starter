// export const fetcher = (url, token, method = "GET") =>
//   fetch(url, {
//     method,
//     headers:
//       token && new Headers({ "Content-Type": "application/json", token }),
//     credentials: "same-origin",
//   }).then((res) => res.json());

export async function fetcher(...args) {
  const res = await fetch(...args);

  return res.json();
}

export const postData = async ({ url, token, data = {} }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (res.error) {
    throw error;
  }

  return res.json();
};
