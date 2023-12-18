export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    //console.log(data)
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter :{ "category" : ["smartphone","laptops"]}

  let queryString = "";
  for (let key in filter) {
    const categoryVal = filter[key];
    if (categoryVal.length > 0) {
      const lastCategoryVal = categoryVal[categoryVal.length - 1];
      queryString += `${key}=${lastCategoryVal}&`; //queryString => category=smartphone
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    console.log(queryString);
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/category");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    //console.log(data)
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();

    resolve({ data });
  });
}

export function createProduct(data) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const result = await response.json();
    resolve({ result });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );

    const result = await response.json();
    resolve({ result });
  });
}
