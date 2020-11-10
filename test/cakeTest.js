const expect = require('chai').expect;
const mongoose = require('mongoose');

const Cake = require('../models/cake');
const CakeController = require('../controllers/cakes');

const uri = 'mongodb://127.0.0.1:27017/test';

describe('Cake Controller', function () {
    before(function (done) {
        mongoose
            .connect(
                uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            )
            .then(() => {
                done();
            });
    });

    beforeEach(async () => {});

    afterEach(function () {});

    it('should created cake', async () => {
        const req = {
            body: {
                name: "my test cupcake",
                price: 4.8,
                flavors: ["chocolate"]
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: function () {}
        };

        CakeController.createCake(req, res, () => {}).then(result => {
            expect(result).to.have.property('data');
            expect(result.data).to.have.length(1);
            done();
        });
    });

    it('should get a created cake', async () => {
        const req = {
            params: {
                name: "my test cupcake"
            }
        };

        const res = {
            status: function () {
                return this;
            },
            json: function () {}
        };

        CakeController.getCake(req, res, () => {}).then(cake => {
            expect(cake).to.have.property('data');
            expect(cake.data).to.have.length(1);
            done();
        });
    });

    it('should updated a created cake', async () => {
        const req = {
            params: {
                searchName: "my test cupcake"
            },
            body: {
                name: "my test cupcake updated",
                price: 3.8,
                flavors: ["mint"]
            }
        };

        const res = {
            status: function () {
                return this;
            },
            json: function () {}
        };


        CakeController.updateCake(req, res, () => {}).then(result => {
            expect(result).to.have.property('data');
            expect(result.data).to.have.property('name');
            expect(result.data.name).to.equal("my test cupcake updated");
            expect(result.data).to.have.length(1);
            done();
        });
    });


    after(function (done) {
        Cake.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
});