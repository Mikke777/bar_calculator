# Bar Calculator

This app is a cash register application with the following purpose:
- Add products to a cart.
- Compute the total price, including special discounts.

---

## Built With
- **Ruby**: 3.3.5
- **Ruby on Rails**: 7.2.2.1
- **PostgreSQL**: 14.17
- **Node.js**: v22.11.0
- **React.js**: 18.3.1
- **Vite**: 6.2.3 (for frontend development and builds)

---

## Development Status
All the important features have been developed and are functioning as expected. The application provides a solid foundation with a fully working backend and a functional frontend. However, due to time constraints, the frontend design could not be made as visually appealing or "fancy" as desired. Despite this, the app delivers good functionality and meets the core requirements.

If you have any questions or need further clarification, please don’t hesitate to contact me.

## Setup Instructions

Please run:
- Bundle install.
- Move to: cd backend.
- rails db:create db:migrate db:seed.
- Start the server for the backend: rails s.
- Open: http://127.0.0.1:3000/
- Move to: cd frontend.
- Run: npm install.
- Start the server: npm run dev.
- Open: http://localhost:5173/

## Special Discount Rules
1. Buy-One-Get-One-Free:
- Applies to Green Tea (GR1). For every 2 items, only 1 is charged.

2. Bulk Discount:
- Applies to Strawberries (SR1). If you buy 3 or more, the price drops to 4.50€ per item.
3. Price Reduction:
-Applies to Coffee (CF1). If you buy 3 or more, the price of all coffees drops to 2/3 of the original price.

## Run tests:
- Move to backend: cd backend
- Run bundle exec rspec

## View

When the application is started, it will be possible to immediately open a new cart. Once done, on the left, there will be a Sidebar with our Products. To add a product to the cart, press the button corresponding to the product you would like to add.

### Cart Features
1. **Adding Products**:
   - After adding a product, it will appear in the cart section on the right.
   - You can increase the quantity of a product using the "+" button.
   - You can decrease the quantity of a product using the "-" button.

2. **Removing Products**:
   - If the quantity of a product is reduced to 1, pressing the "x" button will remove the product from the cart.

3. **Real-Time Updates**:
   - The cart updates in real-time using **ActionCable**. Any changes to the cart (e.g., adding, removing, or updating quantities) are reflected immediately.

4. **Total Price Calculation**:
   - The total price of the cart is displayed at the bottom of the cart section.
   - The total price includes any applicable discounts (e.g., Buy-One-Get-One-Free, Bulk Discounts, or Price Reductions).

### Discount Rules
1. **Buy-One-Get-One-Free**:
   - Applies to Green Tea (`GR1`).
   - For every 2 items added to the cart, only 1 is charged.

2. **Bulk Discount**:
   - Applies to Strawberries (`SR1`).
   - If you add 3 or more Strawberries to the cart, the price per item drops to **4.50€**.

3. **Price Reduction**:
   - Applies to Coffee (`CF1`).
   - If you add 3 or more Coffees to the cart, the price of all Coffees drops to **2/3 of the original price**.

### Sidebar Features
1. **Product List**:
   - The Sidebar displays all available products with their names and prices.
   - Each product has a button to add it to the cart.

### Rightsidebar feauture

The Right Sidebar serves as the action bar and provides key functionalities for managing the cart and navigating the application.

1. **Calculate Price**:
    - A button is available to calculate the total price of the cart.
      When pressed, it displays the bill with the final price, including any applicable discounts.

2. **Pay and Close Cart**:
    - After reviewing the bill, you can press the "Pay" button to finalize the cart.
    - Once paid, the cart will be closed, and you can start a new session if needed.
    - If there are still open carts, it will be opened the index to show all opened    carts

3. **Open a New Cart**:
    - The "Open New Cart" button allows you to create a new cart.

4. **View All Open Carts**:
    - The "Overview All Open Carts" button provides a summary of all currently open carts.
    - This feature is helpful for managing multiple carts simultaneously or reviewing ongoing transactions.

---
