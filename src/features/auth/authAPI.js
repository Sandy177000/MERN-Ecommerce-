import { isRejected } from "@reduxjs/toolkit";

export function createUser(data) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/users',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'content-type': 'application/json'}
    }
    )
    const result = await response.json();
    resolve({result});
  });
}


export function checkUser(loginInfo) {
  return new Promise(async(resolve) =>{
    const email = loginInfo.email;
    const password = loginInfo.password;
    
    const response = await fetch('http://localhost:8080/users?email='+email)
    
    const result = await response.json();
    console.log(result);
    if(result.length){
      resolve({data:result[0]});
    }else{
      isRejected({message:"wrong credentials"});
    }

    isRejected({message:"user not found"})
  });
}



export function updateUser(update) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/users/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type': 'application/json'}
    }
    )
    const result = await response.json();
    resolve({result});
  });
}
