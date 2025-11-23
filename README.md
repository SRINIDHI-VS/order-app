# Order Management App

A simple React app to manage orders with create, read, update, and delete functionality. Built with React, AG Grid, and Tailwind CSS.

## 🚀 Live Demo

🔗 [View Live App](https://order-app-mu-six.vercel.app/)

## 📦 GitHub Repository

📦 [GitHub Repo](https://github.com/SRINIDHI-VS/order-app)

## ✨ Features

- ✅ Create and edit orders
- ✅ Delete orders with confirmation
- ✅ Auto-calculated total price
- ✅ AG Grid table with pagination and sorting
- ✅ Responsive Tailwind CSS design
- ✅ Form validation
- ✅ Loading states and error handling

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

```bash
git clone https://github.com/your-username/order-app.git
cd order-app
npm install
npm start
```

The app will open at `http://localhost:3000`

## 🛠️ Technologies

| Technology | Purpose |
|-----------|---------|
| React | UI Framework |
| AG Grid | Data Grid |
| Tailwind CSS | Styling |
| MockAPI | Backend API |
| Custom Hooks | State Management |

## 📜 Scripts

```bash
npm start       # Run development server
npm run build   # Create production build
```

## 🔌 API Configuration

The app uses MockAPI for backend services. Update the API endpoint in `src/api/orderApi.js`:

```javascript
const API_BASE = 'https://your-mockapi-url.mockapi.io/api/v1/order';
```

## 📋 Order Data Structure

```javascript
{
  id: string,
  productName: string,
  quantity: number,
  price: number,
  totalPrice: number  // Auto-calculated
}
```

## 🧠 Key Features Explained

### Order Form
- Add new orders or edit existing ones
- Real-time total price calculation
- Form validation before submission
- Auto-close success message after 3 seconds

### Orders Grid
- Paginated table view
- Edit and delete actions
- Sorting on all columns
- Responsive design

### Custom Hook
The `useOrders` hook handles:
- Fetching orders from API
- Managing selected order
- Loading and error states
- Grid refresh functionality

## 👤 Author

SRINIDHI V S - [GitHub](https://github.com/SRINIDHI-VS)
