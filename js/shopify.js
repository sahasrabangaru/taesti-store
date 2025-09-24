window.taestiShopifyClient = (function () {
  const domain = 'vk009q-ne.myshopify.com';
  const token = '68658f29831d54af40b0163aed05afa5';
  let client;
  return function () {
    if (!client) {
      client = ShopifyBuy.buildClient({
        domain,
        storefrontAccessToken: token
      });
    }
    return client;
  };
})();
