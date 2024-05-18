export const deliveryOptions = [{
  id: '1',
  deliveryDays: 14,
  priceCents: 7500
}, {
  id: '2',
  deliveryDays: 7,
  priceCents: 11500
},{
  id: '3',
  deliveryDays: 5,
  priceCents: 20000
},{
  id: '4',
  deliveryDays: 3,
  priceCents: 31500
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}