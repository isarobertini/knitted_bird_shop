# Birds Shop

[Live Frontend Demo](https://knittedbirdshop.netlify.app/)  
[Deployed Backend API](https://knitted-bird-shop.onrender.com/)

A full-stack React + Node.js application for buying and selling birds online. Users can browse birds, add them to a shopping cart, and admins can manage inventory.

---

## Features

### User Features
- Browse available birds with images, descriptions, and prices.  
- Add birds to a shopping cart.  
- Cart updates dynamically to reflect available stock.  
- Quantity selection in the cart is restricted to available stock.  
- Users are alerted when attempting to add more than the available quantity.  
- Login required to add items to the cart.

### Admin Features
- Admin-only page to add, edit, and delete birds.  
- Upload bird images and provide details (name, price, stock amount, description, size, material).  
- Real-time inventory updates after CRUD operations.  
- Role-based access ensures only admins can manage birds.

---

## Key Problem: Stock Quantity Management

Originally, the front-end allowed users to select a quantity based on the stock, but it was possible to click "Add to Cart" multiple times and exceed the available stock.  

**How it was solved:**
- The cart now keeps track of how many of each bird are already in the cart.  
- If the user reaches the stock limit, the "Add to Cart" button is disabled, and a message is shown.  
- This prevents users from adding more items than are available, both in the UI and in the backend.

---

## Tech Stack

- **Front-end:** React, React Router, Tailwind CSS  
- **Back-end:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT, role-based access  
- **API:** RESTful endpoints for birds and cart  

---

## Future Improvements

- Implement real checkout and payment flow  
- Add search, filtering, and sorting functionality  
- Show user cart and order history  
- Enhance responsive design for mobile devices  

---

**Live Frontend Demo:** [https://knittedbirdshop.netlify.app/](https://knittedbirdshop.netlify.app/)  
**Deployed Backend API:** [https://knitted-bird-shop.onrender.com/](https://knitted-bird-shop.onrender.com/)
