const fetch = require('node-fetch');

module.exports = {
    list: async (req, res) => {
        let product = req.query.q;
        product = product.replace(" ", "+");
        const url = `https://api.mercadolibre.com/sites/MLA/search?q=${product}`;
        try {
            let response = await fetch(url)
            let products = await response.json()
            let categories = products.filters[0]?.values[0].path_from_root;
            categories = categories?.map(category => category.name)
            products = products.results.map((product, i) => {
                    return {
                        id: product.id,
                        title: product.title,
                        price: {
                            currency: product.currency_id,
                            amount: product.price
                        },
                        picture: product.thumbnail,
                        condition: product.condition,
                        free_shipping: product.shipping.free_shipping,
                        state_name: product.address.state_name
                    };
                })
            res.status(200).json({
                author: {
                    name: "Franco",
                    lastName: "Spinelli"
                },
                categories,
                items: products,
            })     
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (req, res) => {
        let id = req.params.id;
        const url = 
        `https://api.mercadolibre.com/items/${id}`;
        const urlDesc = 
        `https://api.mercadolibre.com/items/${id}/description`;
        
        try {
            let response = await fetch(url);
            let product = await response.json();
            let response2 = await fetch(urlDesc);
            let description = await response2.json();
            const urlcategoty = `https://api.mercadolibre.com/categories/${product.category_id}`;
            let response3 = await fetch(urlcategoty);
            let categories = await response3.json();
            categories = categories.path_from_root;
            categories = categories?.map(category => category.name)
            
            product = {
                id: product.id,
                title: product.title,
                price: {
                    currency: product.currency_id,
                    amount: product.price
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping,
                sold_quantity: product.sold_quantity,
                description: description.plain_text,
            };
            res.status(200).json({
                author: {
                    name: "Franco",
                    lastName: "Spinelli"
                },
                categories,
                item: product,
            })     
        } catch (error) {
            console.log(error);
        }
    }
}