import { isRejected } from "@reduxjs/toolkit";

export function createUser(data) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login/", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        isRejected({ err });
      }
    } catch (err) {
      isRejected({ err });
    }
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
