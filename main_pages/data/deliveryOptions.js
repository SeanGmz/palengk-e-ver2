export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 8000
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 20000
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 35000
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