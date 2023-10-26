import { faker } from '@faker-js/faker'
import { randProductCategory, rand } from '@ngneat/falso';
import productModel from '../models/schemas/products.schema.js';
import productsDao from '../models/daos/products.dao.js';

const createProducts = async (quantity) => {
    const products = []
    for (let i = 0; i < quantity; i++) {
        const ownerOpts = ['admin', 'hmsalomon86@gmail.com', 'lulu@tattoo.com'];
        const randProduct = {
            owner: rand(ownerOpts),
            title: faker.commerce.productName(),
            category: randProductCategory(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 2, max: 900 }),
            thumbnail: faker.image.urlLoremFlickr(),
            code: faker.number.hex({ min: 0, max: 655356 }),
            stock: faker.number.int({ min: 15, max: 100 })
        }
        products.push(randProduct)
    }

    // const result = await productsDao.createMany(products)
    return products

}

export default createProducts