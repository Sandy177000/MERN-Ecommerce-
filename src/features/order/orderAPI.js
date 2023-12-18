
export function createOrder(order) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/orders',{
      method:'POST',
      body:JSON.stringify(order),
      headers:{'content-type': 'application/json'}
    });

    const result = await response.json();
    //console.log(result)
    resolve({data:result});
  });
}


export function updateOrder(order) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/orders/'+order.id,{
      method:'PATCH',
      body:JSON.stringify(order),
      headers:{'content-type': 'application/json'}
    });

    const data = await response.json();
    //console.log(result)
    resolve({data});
  });
}


export function fetchAllOrders({sort,pagination}) {
  
  let queryString = '';
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
   
   // pagination = {_page: page , _limit:limit}
   for(let key in pagination){
     queryString+= `${key}=${pagination[key]}&` //example : _page=4&_limit=10
   } 
   
   return new Promise(async(resolve) =>{
     const response = await fetch('http://localhost:8080/orders?'+queryString);
     const data = await response.json();
     const totalOrders =  response.headers.get('X-Total-Count');
     console.log(queryString);
     resolve({data:{orders:data,totalOrders:+totalOrders}});  // + is added to convert the string to number format
   });
}
