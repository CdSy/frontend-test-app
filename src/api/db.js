import faker from 'faker';

export const autoGenerateTable1 = [...new Array(50)].map((val, index) => {
    const object = {
        id: index + 1,
        productName: faker.commerce.productName(),
        price: faker.commerce.price(),
        link: faker.internet.url()
    };

    return object;
});

export const autoGenerateTable2 = [...new Array(50)].map((val, index) => {
    const object = {
        id: index + 1,
        userName: faker.internet.userName(),
        avatar: faker.image.avatar()
    };

    return object;
});

export const db = {
    "products": [
        {
            "id": 1,
            "productName": "Galaxy S8",
            "value": 499.9999,
            "link": 'https://www.samsung.com/us/explore/galaxy-s8/buy/s/Device/'
        },
        {
            "id": 2,
            "productName": "Galaxy S8+",
            "value": 400.5954,
            "link": 'https://www.samsung.com/us/explore/galaxy-s8/buy/s/Device/'
        },
        {
            "id": 3,
            "productName": "Galaxy S8",
            "value": "300.1",
            "link": 'https://www.samsung.com/us/explore/galaxy-s8/buy/s/Device/'
        },
        {
            "id": 4,
            "productName": "iPhoneX",
            "value": 1200.5,
            "link": 'https://www.samsung.com/us/explore/galaxy-s8/buy/s/Device/'
        },
        {
            "id": 5,
            "productName": "iPhone 7",
            "value": "499",
            "link": 'https://www.samsung.com/us/explore/galaxy-s8/buy/s/Device/'
        },
        {
            "id": 6,
            "productName": "Samsung H",
            "value": 399.99,
            "link": 'https://www.samsung.com/us/explore/galaxy-s8/buy/s/Device/'
        }
    ],
    
    "users": [
        {
            "id": 1,
            "userName": "John",
            "avatar": 'https://findicons.com/files/icons/1072/face_avatars/300/g05.png',
            "list": {
                "field1": "description filed1",
                "field2": "description filed2",
                "field3": "description filed3",
            }
        },
        {
            "id": 2,
            "userName": "Anna",
            "avatar": 'https://findicons.com/files/icons/1072/face_avatars/300/fh04.png',
            "list": {
                "field1": "description filed1",
                "field2": "description filed2",
                "field3": "description filed3",
            }
        },
        {
            "id": 3,
            "userName": "Peter",
            "avatar": 'https://findicons.com/files/icons/1072/face_avatars/300/a01.png',
            "list": {
                "field1": "description filed1",
                "field2": "description filed2",
                "field3": "description filed3",
            }
        }
    ],

    "employees": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "age": 25,
            "last_seen": "2018-07-05T10:55:45.000Z"
        },
        {
            "id": 2,
            "first_name": "Anna",
            "last_name": "Smith",
            "age": 32,
            "last_seen": "2018-05-07T10:55:45.000Z"
        },
        {
            "id": 3,
            "first_name": "Peter",
            "last_name": "Jones",
            "age": 27,
            "last_seen": "2012-11-19T10:55:45.000Z"
        }
    ],

    "autoGenerateTable1": autoGenerateTable1,

    "autoGenerateTable2": autoGenerateTable2
};