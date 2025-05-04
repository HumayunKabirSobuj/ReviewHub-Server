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

## 🔴🔴 Auth

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

## 🔴🔴 Category

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

## 🔴🔴 Review

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

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/review?searchTerm=Humayun Kabir&page=3&limit=1&categoryId=5473c071-1193-45e4-aa4a-e2eebb38c40d&isPaid=true&isPublished=true`**\

#### searchTerm for searching & page, limit for pagination
#### isPaid value example =true, false, or ""
#### isPublished value example =true, false, or ""

### 8\. **Get Single Review ( Review Details ) **

#### Authorization Token Need ( Anyone can view Review details)

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/review/72823e1a-d349-4b96-88a8-753fb5c4dd9a`**

### 9\. **Myself all reviews**

#### Authorization Token Need

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/review/my-reviews`**

### 10\. **Pending Reviews**

#### Authorization Token Need ( Only admin can show)

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/review/pending-reviews`**

### 11\. **Make Review Active**

#### Authorization Token Need ( Only admin can do this)

#### ✅ **.** **`PATCH https://reviewhub-backend-one.vercel.app/api/review/make-review-published/de71f985-3a61-4a28-8d05-ad258d656bff`**

### 12\. **Update Review**

#### Authorization Token Need ( Only user can do this for this own review)

#### ✅ **.** **`PATCH https://reviewhub-backend-one.vercel.app/api/review/update-review/e0917ce7-196c-4c93-aaa6-b343d3b6c41e`**

### 13\. **Delete Review**

#### Authorization Token Need ( user can do this for this own review, and admin can delete any review)

#### ✅ **.** **`DELETE https://reviewhub-backend-one.vercel.app/api/review/delete-review/e0917ce7-196c-4c93-aaa6-b343d3b6c41e`**

## 🔴🔴 **Comment**

### 14\. **Add Comment**

#### Authorization Token Need

#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/comment/create-comment`**

#### 📥 Request Body

```
{
  "content": "Test 1, thank you!",
  "reviewId": "de71f985-3a61-4a28-8d05-ad258d656bff"
}

```

### 15\. **MySelf Comments**

#### Authorization Token Need

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/comment/my-comments`**

## 🔴🔴 **Vote**

### 16\. **Add Vote**

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

### 17\. **MySelf Vote**

#### Authorization Token Need

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/vote/my-votes`**


## 🔴🔴 **Payment**
### 18\. **Make Order**

#### Authorization Token Need ( Only user can do this )

#### A user can buy on a review only once. Multiple payment by the same user on the same review are not allowed.

#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/payment/make-order/04787a62-9764-4ed2-91df-c5767808523a`**
#### ✅ **.** **`POST https://reviewhub-backend-one.vercel.app/api/payment/make-order/reviewId`**


### 19\. **MySelf Payments**

#### Authorization Token Need ( Only user can do this )

#### ✅ **.** **`GET https://reviewhub-backend-one.vercel.app/api/payment/my-payments`**