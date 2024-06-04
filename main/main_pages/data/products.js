import { formatCurrency } from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `₱ ${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}
export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/tilapia.png",
    name: "Tilapia (Batangas) | 5kg",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 105000,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/petbaguio.png",
    name: "Pechay (Baguio) | 3kg",
    rating: {
      stars: 4,
      count: 127,
    },
    priceCents: 27000,
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/asin.png",
    name: "Asin Tibuok | per vase",
    rating: {
      stars: 4.5,
      count: 57,
    },
    priceCents: 79000,
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/carabaomilk.png",
    name: "Carabao Milk | 5gal",
    rating: {
      stars: 5,
      count: 2021,
    },
    priceCents: 177500,
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/lakatan.png",
    name: "Banana (Lakatan) | 3kg",
    rating: {
      stars: 4,
      count: 57,
    },
    priceCents: 27000,
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/strawberry.png",
    name: "Strawberry (Baguio) | 3kg",
    rating: {
      stars: 4,
      count: 817,
    },
    priceCents: 45000,
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/alumahan.png",
    name: "Alumahan Fish | 3kg",
    rating: {
      stars: 4.5,
      count: 217,
    },
    priceCents: 75000,
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/chicken.png",
    name: "Chicken (Native) | 3 whole",
    rating: {
      stars: 5,
      count: 134,
    },
    priceCents: 135000,
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/kalingag.png",
    name: "Kalingag (Philippine Cinnamon) | 500g",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 75000,
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/liempo.png",
    name: "Pork Liempo | 5kg",
    rating: {
      stars: 5,
      count: 562,
    },
    priceCents: 145000,
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/vinegar.png",
    name: "Coconut Vinegar | 1gal",
    rating: {
      stars: 5,
      count: 20,
    },
    priceCents: 15090,
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/barako.png",
    name: "Barako Coffee (Batangas) | 1kg",
    rating: {
      stars: 4,
      count: 89,
    },
    priceCents: 50000,
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/goat.png",
    name: "Goat Ribs (Native) | 3kg",
    rating: {
      stars: 5,
      count: 307,
    },
    priceCents: 117000,
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/petnative.png",
    name: "Pechay (Native) | 3kg",
    rating: {
      stars: 5,
      count: 307,
    },
    priceCents: 24000,
  },
].map((productDetails) => {
  return new Product(productDetails);
});
