# ReviewHub

Live:

```
https://reviewhub-backend-one.vercel.app
```

---

### 🛠 **Technologies Used**

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**

---

### 📦 **API Features & Endpoints**

---

### 1\. **Create User**

---

#### ✅ **1\.** **`POST https://reviewhub-backend-one.vercel.app/api/auth/create-user`**

#### 📥 Request Body

##### Example

```
{
    "name": "test3",
    "email": "test3@gmail.com",
    "password": "******"
}
```

### 2\. **Login User**

---

#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/auth/login`**

#### 📥 Request Body

##### Example

```
{
    "email": "test1@gmail.com",
    "password": "*****"
}
```

### 3\. **Create Category**

#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/category/create-category`**

#### 📥 Request Body

##### Example

#### Need Admin Authorization Token

```
{
    "name": "Gadgets"
}
```

### 4\. **Get All Category**

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/category`**

### 5\. **Get Single Category**

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/category/8b00f961-4a54-4419-bd37-bf149d163e34`**

### 6\. **Add Review**

#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/review/create-review`**

#### 📥 Request Body

##### Example

#### Authorization Token Need ( Anyone can add Review)

```
{
  "title": "Amazing Noise Cancelling Headphones",
  "description": "These headphones provide crystal clear sound and outstanding noise cancellation. Battery life is also impressive with over 30 hours of playback.",
  "rating": 5,
  "purchaseSource": "BestBuy",
  "imageUrls": [
    "https://example.com/images/headphone-front.jpg",
    "https://example.com/images/headphone-side.jpg"
  ],
  "excerp": "Top-notch noise cancelling headphones with long battery life.",
  "isPremium": true,
  "price": 7.99,
  "isPublished": false,
  "categoryId": "8b00f961-4a54-4419-bd37-bf149d163e34"
}

```
### 7\. **Get All Review**

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/review`**


### 8\. **Get Single Review ( Review Details ) **
#### Authorization Token Need ( Anyone can view Review details)

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/review/72823e1a-d349-4b96-88a8-753fb5c4dd9a`**


### 9\. **Myself all reviews**
#### Authorization Token Need 

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/review/my-reviews`**


### 10\. **Add Comment**
#### Authorization Token Need 

#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/comment/create-comment`**

#### 📥 Request Body

```
{
  "content": "Test 1, thank you!",
  "reviewId": "de71f985-3a61-4a28-8d05-ad258d656bff"
}

```

### 11\. **MySelf Comments**
#### Authorization Token Need 

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/comment/my-comments`**



### 12\. **Add Vote**
#### Authorization Token Need 
#### A user can vote on a review only once. Multiple votes by the same user on the same review are not allowed.

#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/vote/create-vote`**

#### 📥 Request Body

```

{
  "type": "DOWN",                   //UP or "DOWN"   
  "reviewId": "de71f985-3a61-4a28-8d05-ad258d656bff"  // valid review ID
}


```

### 13\. **MySelf Comment**
#### Authorization Token Need 

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/vote/my-votes`**

