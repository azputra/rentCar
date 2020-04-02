const request = require("supertest")
const app = require("../app")

describe('Test Car router', function () {
    describe('Test post /cars route', () => {
        it('should return status code 400 when property brand is empty', async () => {
            const res = await request(app)
                .post('/cars')
                .send({
                    brand: "",
                    carYear: 2015,
                    rentPrice: 25000,
                    licensePlate: "B 4332 ASD"
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill brand')
        })

        it('should return status code 400 when property carYear is empty', async () => {
            const res = await request(app)
                .post('/cars')
                .send({
                    brand: "avanza",
                    carYear: "",
                    rentPrice: 25000,
                    licensePlate: "B 4332 ASD"
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill car year')
        })

        it('should return status code 400 when property rentPrice is empty', async () => {
            const res = await request(app)
                .post('/cars')
                .send({
                    brand: "avanza",
                    carYear: 2015,
                    rentPrice: "",
                    licensePlate: "B 4332 ASD"
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill price')
        })

        it('should return status code 400 when property licensePlate is empty', async () => {
            const res = await request(app)
                .post('/cars')
                .send({
                    brand: "avanza",
                    carYear: 2015,
                    rentPrice: 25000,
                    licensePlate: ""
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill license plate')
        })

        it('should return cars and status code 201', async (done) => {
            const res = await request(app)
                .post('/cars')
                .send({
                    brand: "avanza",
                    carYear: 2015,
                    rentPrice: 25000,
                    licensePlate: "B 4332 ASD"
                })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(2)
            expect(res.body).toHaveProperty('brand')
            expect(res.body.brand).toEqual('avanza')
            expect(res.body).toHaveProperty('carYear')
            expect(res.body.carYear).toEqual(2015)
            expect(res.body).toHaveProperty('rentPrice')
            expect(res.body.rentPrice).toEqual(25000)
            expect(res.body).toHaveProperty('licensePlate')
            expect(res.body.licensePlate).toEqual('B 4332 ASD')
            done()
        })

        it('should return status code 400 when property licensePlate duplicate', async () => {
            const res = await request(app)
                .post('/cars')
                .send({
                    brand: "daihatsu",
                    carYear: 2012,
                    rentPrice: 105000,
                    licensePlate: "B 4332 ASD"
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('lisence plate already exist')
        })
    })

    describe('Test get /cars route', () => {
        it('should return cars and status code 200', async (done) => {
            const res = await request(app)
                .get('/cars')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual(res.body)
            done()
        })
    })

    describe('Test get /cars/:id route', () => {
        it('should return cars and status code 200', async (done) => {
            const res = await request(app)
                .get('/cars/2')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(2)
            expect(res.body).toHaveProperty('brand')
            expect(res.body.brand).toEqual('avanza')
            expect(res.body).toHaveProperty('carYear')
            expect(res.body.carYear).toEqual(2015)
            expect(res.body).toHaveProperty('rentPrice')
            expect(res.body.rentPrice).toEqual(25000)
            expect(res.body).toHaveProperty('licensePlate')
            expect(res.body.licensePlate).toEqual('B 4332 ASD')
            done()
        })

        it('return error when wrong id and status code 404', async (done) => {
            const res = await request(app)
                .get('/cars/100')
            expect(res.statusCode).toEqual(404)
            expect(res.body).toEqual('Not Found Car')
            done()
        })
    })

    describe('Test put /cars route', () => {
        it('should return cars and status code 200', async (done) => {
            const res = await request(app)
                .put('/cars/1')
                .send({
                    brand: "avanza edit",
                    carYear: 2012,
                    rentPrice: 55000
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(1)
            expect(res.body).toHaveProperty('brand')
            expect(res.body.brand).toEqual('avanza edit')
            expect(res.body).toHaveProperty('carYear')
            expect(res.body.carYear).toEqual(2012)
            expect(res.body).toHaveProperty('rentPrice')
            expect(res.body.rentPrice).toEqual(55000)
            done()
        })
        it('should return error code 404 when car id not found', async (done) => {
            const res = await request(app)
                .delete('/cars/100')
            expect(res.statusCode).toEqual(404)
            expect(res.body).toEqual('Not Found Car')
            done()
        })
    })

    describe('Test delete /cars route', () => {
        // FOR TESTING DELETE CAR
        it('should return cars and status code 200', async (done) => {
            const res = await request(app)
                .delete('/cars/1')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(1)
            expect(res.body).toHaveProperty('brand')
            expect(res.body.brand).toEqual('avanza edit')
            expect(res.body).toHaveProperty('carYear')
            expect(res.body.carYear).toEqual(2012)
            expect(res.body).toHaveProperty('rentPrice')
            expect(res.body.rentPrice).toEqual(55000)
            done()
        })

        it('should return error code 404 when car id not found', async (done) => {
            const res = await request(app)
                .delete('/cars/100')
            expect(res.statusCode).toEqual(404)
            expect(res.body).toEqual('Not Found Car')
            done()
        })
    })
})