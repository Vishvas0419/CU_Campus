export const dummyOutlets = [
  { id: 1, name: 'Barista' },
  { id: 2, name: 'Subway' },
  { id: 3, name: 'Indian Chaat Bhandar' },
  { id: 4, name: 'Grab N Go' },
];

export const dummyItemsByOutlet = {
  1: [
    { id: 101, name: 'Espresso', price: 120, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1519089363955-c6ca31d1a2b2?q=80&w=400' },
    { id: 102, name: 'Cappuccino', price: 160, category: 'Coffee' },
    { id: 103, name: 'Latte', price: 170, category: 'Coffee' },
    { id: 104, name: 'Americano', price: 140, category: 'Coffee' },
    { id: 105, name: 'Mocha', price: 180, category: 'Coffee' },
    { id: 106, name: 'Cold Coffee', price: 150, category: 'Cold Beverages' },
    { id: 107, name: 'Iced Latte', price: 180, category: 'Cold Beverages' },
    { id: 108, name: 'Brownie', price: 120, category: 'Bakery' },
    { id: 109, name: 'Muffin', price: 90, category: 'Bakery' },
    { id: 110, name: 'Croissant', price: 110, category: 'Bakery' },
    { id: 111, name: 'Sandwich', price: 130, category: 'Snacks' },
    { id: 112, name: 'Garlic Bread', price: 100, category: 'Snacks' },
  ],
  2: [
    { id: 201, name: 'Veggie Delite 6"', price: 160, category: 'Sub' },
    { id: 202, name: 'Paneer Tikka 6"', price: 190, category: 'Sub' },
    { id: 203, name: 'Aloo Patty 6"', price: 150, category: 'Sub' },
    { id: 204, name: 'Chicken Tandoori 6"', price: 220, category: 'Sub' },
    { id: 205, name: 'Tuna 6"', price: 230, category: 'Sub' },
    { id: 206, name: 'Veggie Delite 12"', price: 280, category: 'Sub' },
    { id: 207, name: 'Paneer Tikka 12"', price: 320, category: 'Sub' },
    { id: 208, name: 'Cookies (2 pc)', price: 80, category: 'Sides' },
    { id: 209, name: 'Chips', price: 50, category: 'Sides' },
    { id: 210, name: 'Coke', price: 60, category: 'Beverage' },
    { id: 211, name: 'Sprite', price: 60, category: 'Beverage' },
    { id: 212, name: 'Diet Coke', price: 70, category: 'Beverage' },
  ],
  3: [
    { id: 301, name: 'Pani Puri', price: 60, category: 'Chaat' },
    { id: 302, name: 'Bhel Puri', price: 80, category: 'Chaat' },
    { id: 303, name: 'Dahi Papdi', price: 100, category: 'Chaat' },
    { id: 304, name: 'Pav Bhaji', price: 140, category: 'Snacks' },
    { id: 305, name: 'Aloo Tikki', price: 90, category: 'Snacks' },
    { id: 306, name: 'Chole Bhature', price: 160, category: 'Meal' },
    { id: 307, name: 'Samosa (2 pc)', price: 50, category: 'Snacks' },
    { id: 308, name: 'Masala Chai', price: 25, category: 'Beverage' },
    { id: 309, name: 'Lassi', price: 70, category: 'Beverage' },
    { id: 310, name: 'Jalebi', price: 80, category: 'Dessert' },
    { id: 311, name: 'Rasgulla', price: 70, category: 'Dessert' },
    { id: 312, name: 'Kulfi', price: 60, category: 'Dessert' },
  ],
  4: [
    { id: 401, name: 'Greek Salad', price: 160, category: 'Salad' },
    { id: 402, name: 'Caesar Salad', price: 170, category: 'Salad' },
    { id: 403, name: 'Quinoa Bowl', price: 190, category: 'Bowl' },
    { id: 404, name: 'Fruit Bowl', price: 120, category: 'Bowl' },
    { id: 405, name: 'Grilled Chicken Bowl', price: 240, category: 'Bowl' },
    { id: 406, name: 'Protein Shake', price: 150, category: 'Beverage' },
    { id: 407, name: 'Green Smoothie', price: 150, category: 'Beverage' },
    { id: 408, name: 'Iced Tea', price: 80, category: 'Beverage' },
    { id: 409, name: 'Energy Bar', price: 60, category: 'Snack' },
    { id: 410, name: 'Yogurt Parfait', price: 110, category: 'Dessert' },
    { id: 411, name: 'Hummus Platter', price: 140, category: 'Snack' },
    { id: 412, name: 'Avocado Toast', price: 130, category: 'Snack' },
  ],
};

export function findOutletByNameLike(nameLike) {
  const lower = (nameLike || '').toLowerCase();
  return dummyOutlets.find(o => o.name.toLowerCase().includes(lower));
}
