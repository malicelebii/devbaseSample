const router = require("express").Router();
const Car = require("../models/Car");

//Get all car datas
router.get("/", async (req, res) => {
  let cars = await Car.find();
  res.json(cars);
});

//Get a specific car
router.get("/:id", async (req, res) => {
  let car = await Car.findById(req.params.id);
  res.json(car);
});

router.post("/", async (req, res) => {
  let car = new Car({
    brand: req.body.brand,
    model: req.body.model,
    image: req.body.image,
    description: req.body.description,
    engineVolume: req.body.engineVolume,
    enginePower: req.body.enginePower,
    price: req.body.price,
    stock: req.body.stock,
  });

  await car.save();
  res.json(car);
});
router.put("/:id", async (req, res) => {
  let newCar = {
    brand: req.body.brand,
    model: req.body.model,
    image: req.body.image,
    description: req.body.description,
    engineVolume: req.body.engineVolume,
    enginePower: req.body.enginePower,
    price: req.body.price,
    stock: req.body.stock,
  };
  let oldCar = await Car.findByIdAndUpdate(req.params.id, newCar);
  res.json(newCar)
});


router.delete('/:id',async(req,res)=>{
    let deletedCar= await Car.findByIdAndRemove(req.params.id);
    res.json(deletedCar)
})



module.exports = router;
