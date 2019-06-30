## Getting Started
Please follow this through before you start and use the server.
1. Run this script in the terminal to install all dependencies
```
npm install
```
2. Create .env file. You could copy paste value in .env, from .env-template.
- JWT_TOKEN is used for package
- CLIENT_ID is used for google oAuth. You could get it here https://developers.google.com/identity/sign-in/web/sign-in
- CLOUD_BUCKET your bucket name in GCS (google cloud service)
- GCLOUD_PROJECT your project name in GCS (google cloud service)
- KEYFILE_PATH your credential path file, get it from GCS (google cloud service)

3. Run this in your terminal to start the server
```
npm start
```

# Route
## User
### Register Customer
Register new customer as default login path, not using third party oAuth.
URL : /users/register
Method : Post
Request Header : NONE
Request Body : 
```
{
  full_name: Robby Caesar Putra,
  username: robbycp,
  password; robbycp,
  email: robby@mail.com,
  admin: false
}
```
Success Status Code : 201
Success Response : No Response
Error Status Code : 400, 500
Error Response :
```
{
  message: 'User validation failed: username: robbycp is already in our database. Please use other username. email: robby@mail.com is already in our database. Please use other email'
}
```
### Login Customer
Login for both default login or oAuth google login. The difference is in the request body.
URL : /users/login
Method : Post
Request Header : NONE
Request Body : 
```
{
  username: robbycp,
  password; robbycp,
  login_type: 'default'
}
```
Success Status Code : 200
Success Response : 
```
{ 
  token: 'jsfiowjoefi29sd9d8fsa0aef890ewf8s9a',
}
```
### Logout Customer
Logout for both default login user and google login user
URL : /users/register
Method : Post
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 201
Success Response : 
```
{
  message: 'Successfully log out'
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### MyProfile Customer
Get login user basic profile data : full name, username, and email
URL : /users/myprofile
Method : Post
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
Success Response : 
```
{ 
  full_name: 'robby caesar putra',
  username: 'robbycp',
  email: 'robby@gmail.com',
  admin: true
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

##Product
### Get All Products
Get all listed product that has been inputed by admin of the website
URL : /products
Method : GET 
Request Body : NONE
Success Status Code : 200
Success Response : 
```
[
    {
        "_id": "5d17b95edbb0cc1558bc564a",
        "name": "Black Hat",
        "description": "This black hat is as comfort as you might imagine",
        "stock": 0,
        "image": "https://storage.googleapis.com/ecommerce.robbycp.com/1561835863428hat-black.jpg",
        "price": 250000,
        "currency": "IDR",
        "category": "accessories",
        "createdAt": "2019-06-29T19:17:50.433Z",
        "updatedAt": "2019-06-30T13:07:46.049Z",
        "__v": 0
    },
    {...}
]
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Get One Product
Get one product data by product Id, that has been inputted by admin of the website
URL : /products/:id
Method : GET 
Request Body : NONE
Success Status Code : 200
Success Response : 
```
{
  "_id": "5d17b95edbb0cc1558bc564a",
  "name": "Black Hat",
  "description": "This black hat is as comfort as you might imagine",
  "stock": 0,
  "image": "https://storage.googleapis.com/ecommerce.robbycp.com/1561835863428hat-black.jpg",
  "price": 250000,
  "currency": "IDR",
  "category": "accessories",
  "createdAt": "2019-06-29T19:17:50.433Z",
  "updatedAt": "2019-06-30T13:07:46.049Z",
  "__v": 0
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Create Product
Create one new product to be listed on the website. This routing could be accessed only by admin user.
URL : /products
Method : POST
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body :
- image should be file
- stock must be above 0
- price must be above 0
- currency only IDR
```
{
  name: name of the product
  description: description of the product,
  stock: 10,
  image: file,
  price: 100000,
  currency: 'IDR',
  category: 'accessories
}
```
Success Status Code : 200
Success Response : 
```
{
  "_id": "5d17b95edbb0cc1558bc564a",
  "name": "Black Hat",
  "description": "This black hat is as comfort as you might imagine",
  "stock": 0,
  "image": "https://storage.googleapis.com/ecommerce.robbycp.com/1561835863428hat-black.jpg",
  "price": 250000,
  "currency": "IDR",
  "category": "accessories",
  "createdAt": "2019-06-29T19:17:50.433Z",
  "updatedAt": "2019-06-30T13:07:46.049Z",
  "__v": 0
}
```
Error Status Code : 400, 500
Stock should be above 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Update Product
Update one existing product data, photo, and stock. This routing could be accessed only by admin user.
URL : /products
Method : PUT
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body :
- image should be file
- stock must be above 0
- price must be above 0
- currency only IDR
```
{
  name: name of the product
  description: description of the product,
  stock: 10,
  image: file,
  price: 100000,
  currency: 'IDR',
  category: 'accessories
}
```
Success Status Code : 200
Success Response : 
```
{
  "_id": "5d17b95edbb0cc1558bc564a",
  "name": "Black Hat",
  "description": "This black hat is as comfort as you might imagine",
  "stock": 0,
  "image": "https://storage.googleapis.com/ecommerce.robbycp.com/1561835863428hat-black.jpg",
  "price": 250000,
  "currency": "IDR",
  "category": "accessories",
  "createdAt": "2019-06-29T19:17:50.433Z",
  "updatedAt": "2019-06-30T13:07:46.049Z",
  "__v": 0
}
```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Delete Product
Deleting one product. This routing could be accessed only by admin user.
URL : /products
Method : DELETE
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
```
{
  message: 'successfully delete product'
}
```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

## Transaction
### Create or Add Product to Cart
Create new transaction if no cart available for one user, or add product and the quantity to the transaction if the cart transaction exist.
URL : /transactions
Method : POST
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body :
```
{
  _id: '231283920',
  quantity: 2
}
```
Success Status Code : 200
Success Response : 
```
{ _id: 5d18c79878e64b2cdd2d7a11,
  itemBought:
   [ { _id: 5d18c79878e64b2cdd2d7a12,
       item: 5d17ba09dbb0cc1558bc564c,
       quantity: 1 } ],
  paymentStatus: 'unpaid',
  transactionStatus: 'cart',
  buyerId: 5d1742fbe4b5c30213d3eab5,
  createdAt: 2019-06-30T14:30:48.359Z,
  updatedAt: 2019-06-30T14:30:48.359Z,
  __v: 0 
}

```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Read All transaction one user
Get history of transaction by one user
URL : /transactions
Method : GET
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
Success Response : 
```
[
  { 
    _id: 5d18c79878e64b2cdd2d7a11,
    itemBought:
    [ { _id: 5d18c79878e64b2cdd2d7a12,
        item: 5d17ba09dbb0cc1558bc564c,
        quantity: 1 } ],
    paymentStatus: 'unpaid',
    transactionStatus: 'cart',
    buyerId: 5d1742fbe4b5c30213d3eab5,
    createdAt: 2019-06-30T14:30:48.359Z,
    updatedAt: 2019-06-30T14:30:48.359Z,
    __v: 0 
  },
  {...}
]
```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Read Cart Transaction
Get cart transaction by one user
URL : /transactions/cart
Method : GET
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
Success Response : 
```
{ _id: 5d18c79878e64b2cdd2d7a11,
  itemBought:
   [ { _id: 5d18c79878e64b2cdd2d7a12,
       item: 5d17ba09dbb0cc1558bc564c,
       quantity: 1 } ],
  paymentStatus: 'unpaid',
  transactionStatus: 'cart',
  buyerId: 5d1742fbe4b5c30213d3eab5,
  createdAt: 2019-06-30T14:30:48.359Z,
  updatedAt: 2019-06-30T14:30:48.359Z,
  __v: 0 
}

```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Read All transaction for admin
Get all transactions in the website. This route could only be accessed by admin user.
URL : /transactions/alltrx
Method : GET
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
Success Response : 
```
[
  { 
    _id: 5d18c79878e64b2cdd2d7a11,
    itemBought:
    [ { _id: 5d18c79878e64b2cdd2d7a12,
        item: 5d17ba09dbb0cc1558bc564c,
        quantity: 1 } ],
    paymentStatus: 'unpaid',
    transactionStatus: 'cart',
    buyerId: 5d1742fbe4b5c30213d3eab5,
    createdAt: 2019-06-30T14:30:48.359Z,
    updatedAt: 2019-06-30T14:30:48.359Z,
    __v: 0 
  },
  {...}
]
```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Update quantity in cart
Update quantity of the product in the cart by customer.
URL : /transactions/:id
Method : PUT
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request body :
```
{
  updatedTrx: {
    _id: 5d18c79878e64b2cdd2d7a11,
    itemBought:
    [ { _id: 5d18c79878e64b2cdd2d7a12,
        item: 5d17ba09dbb0cc1558bc564c,
        quantity: 1 } ],
    paymentStatus: 'unpaid',
    transactionStatus: 'cart',
    buyerId: 5d1742fbe4b5c30213d3eab5,
    createdAt: 2019-06-30T14:30:48.359Z,
    updatedAt: 2019-06-30T14:30:48.359Z,
    __v: 0 
  }
}
```
Success Status Code : 200
Success Response : 
```
{ 
  _id: 5d18c79878e64b2cdd2d7a11,
  itemBought:
  [ { _id: 5d18c79878e64b2cdd2d7a12,
      item: 5d17ba09dbb0cc1558bc564c,
      quantity: 1 } ],
  paymentStatus: 'unpaid',
  transactionStatus: 'cart',
  buyerId: 5d1742fbe4b5c30213d3eab5,
  createdAt: 2019-06-30T14:30:48.359Z,
  updatedAt: 2019-06-30T14:30:48.359Z,
  __v: 0 
}
```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Delete one product in cart
Delete the product in the cart by customer.
URL : /transactions/:id
Method : DELETE
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request body:
- Send the id of the product
```
{
  _id: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Success Status Code : 200
Success Response : 
```
{
  message: 'successfully delete transaction'
}
```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Checkout the cart
Checkout the cart by customer.
URL : /transactions/:id/checkout
Method : POST
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
Success Response : 
```
{ 
  _id: 5d18c79878e64b2cdd2d7a11,
  itemBought:
  [ { _id: 5d18c79878e64b2cdd2d7a12,
      item: 5d17ba09dbb0cc1558bc564c,
      quantity: 1 } ],
  paymentStatus: 'unpaid',
  transactionStatus: 'checkout',
  buyerId: 5d1742fbe4b5c30213d3eab5,
  createdAt: 2019-06-30T14:30:48.359Z,
  updatedAt: 2019-06-30T14:30:48.359Z,
  __v: 0 
}
```
Error Status Code : 400, 500 
Error Response :
```
{
  message: 'Internal Server Error'
}
```
