# Plans-Checkout With Offer Rules

To get started follow below steps:

```
cd plans-checout
npm install

cd client
npm install

cd ..
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the server running!

**Note for Windows Users:** If you encounter errors during installation, I recommend giving [CMDer](http://cmder.net/) a try.

By default the customer is set as "Apple"
to change this please update /config.js

```
customerName: "Apple"
```

## TODO

Promotion Names and Plan Names are hard coded - should be cleaned up
Promotion is applied on cart total level, need to be applied at line item level.
