# React Native Furniture Store (RNFurnitureStore)

Furniture Store mobile app built with Typescript, React Native, Redux Toolkit.

## Figma Design

- Presentation View (Prototype): [Jason Furniture Store's Prototype](https://www.figma.com/proto/vOntm5dRAkYiK1en1iF2pw/Jason-Furniture-Store?node-id=9-6&t=LOTPKuSc16nWTmnC-1)
- Dev Mode Link: [Jason Furniture Store's Dev Mode](https://www.figma.com/design/vOntm5dRAkYiK1en1iF2pw/Jason-Furniture-Store?node-id=0-1&m=dev&t=LOTPKuSc16nWTmnC-1)

<div style='display:grid;gap:16px 16px;grid-template-columns: auto auto;'>
    <img src="/src/assets/figma/1-initial-screen.png">
    <img src="/src/assets/figma/2-home-category-furniture-screen.png">
    <img src="/src/assets/figma/3-cart-checkout-orders-screen.png">
    <img src="/src/assets/figma/4-search-screen.png">
    <img src="/src/assets/figma/5-favorite-profile-screen.png">
    <img src="/src/assets/figma/6-payment-method-address-screen.png">

</div>

## API Used In This Project

- Node Sequelize Furniture Store: [node-sequelize-furniture-store](https://github.com/litojason/node-sequelize-furniture-store)

## Additional Dependencies

Please refer to `package.json`.

- [React Navigation](https://reactnavigation.org/): routing and navigation (Native Stack, Drawer)
- [React Hook Form](https://react-hook-form.com/): manage forms
- [yup](https://www.npmjs.com/package/yup): validation
- [Redux Toolkit](https://redux-toolkit.js.org/): state management
- [React Native Vector Icons](https://www.npmjs.com/package/react-native-vector-icons): customizable vector icons
- [axios](https://www.npmjs.com/package/axios): promise based HTTP client
- [moment](https://momentjs.com/): parse and display dates and times

## Installation

    git clone https://github.com/litojason/RNFurnitureStore

    cd RNFurnitureStore

    yarn

    yarn pod

## Setup Env

Please open /src/client.ts folder and change `API_URL`

```ts
const Config = {
  API_URL: 'YOUR_OWN_API_URL', -> Change to your url
};
```

## Run

```bash
# Start
yarn start

## Open in other terminal after yarn start
# Android
yarn android
# iOS
yarn ios
```

## Feature Done (But May Need Improvement)

- Login, Register, Edit Profile, Change Password.
- Show Category, Furniture, Furniture Option, Search Furniture.
- Add To Cart, Delete Cart Item.
- Add User Address, User Payment Method.
- Get User Orders, Order Details.

## Todo

- Update Furniture image and other image from url.
- Update Cart Item quantity.
- Add Update Order Status API and update UI accordingly.
- Add User Favorite API.
- Add Furniture Review API.
- Add Discount API.
- Add multiple env variable.
- Add App Icon.
- Change App Theme.
