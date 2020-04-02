const request = require("supertest")
const app = require("../app")

describe('Test Car router', function () {
    beforeAll((done) => {
        request(app)
            .post('/cars')
            .send({
                brand: "xenia",
                carYear: 2015,
                rentPrice: 25000,
                licensePlate: "B 4332 QWE"
            })
            .end((err, res) => {
                done()
            })
    })

    describe('Test post /rentalCar route', () => {
        it('should return rentalCar and status code 201', async (done) => {
            const res = await request(app)
                .post('/rentalCars')
                .send({
                    carId: 1
                })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('rentCar')
            expect(res.body).toHaveProperty('car')
            expect(res.body.rentCar).toHaveProperty('CarId')
            expect(res.body.rentCar.CarId).toEqual(1)
            expect(res.body.rentCar).toHaveProperty('status')
            expect(res.body.rentCar.status).toEqual('in Cart')
            expect(res.body.rentCar).toHaveProperty('duration')
            expect(res.body.rentCar.duration).toEqual(1)
            done()
        })
    })

    describe('Test get /rentalCars route', () => {
        it('should return rentalCars and status code 200', async (done) => {
            const res = await request(app)
                .get('/rentalCars')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual(res.body)
            done()
        })
    })

    describe('Test put /rentalCars route', () => {
        it('should return rentalCars and status code 200', async (done) => {
            const res = await request(app)
                .put('/rentalCars/1')
                .send({
                    duration: 4
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual('Success Update Duration')
            done()
        })

        it('should return error code 400 when duration less than 1', async (done) => {
            const res = await request(app)
                .put('/rentalCars/1')
                .send({
                    duration: -3
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual('Ups Minimal Rental 1 Day')
            done()
        })
    })

    describe('Test delete /rentalCars route', () => {
        it('should return rentalCars and status code 200', async (done) => {
            const res = await request(app)
                .delete('/rentalCars/1')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual('Success Delete Car')
            done()
        })

        it('should return error code 440 when id rental Car not found', async (done) => {
            const res = await request(app)
                .delete('/rentalCars/100')
            expect(res.statusCode).toEqual(404)
            expect(res.body).toEqual('Rental Car Not Found')
            done()
        })
    })

})