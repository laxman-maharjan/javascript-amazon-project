import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

const today = dayjs();

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];
  
export function getDeliveryOption(deliveryOptionId) {
    return deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0];
}

export function calculateDeliveryDate(daysToAdd){
    return today.add(daysToAdd, 'days').format('dddd, MMMM D');
}
