const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then((drones) => {
      res.render('drones/list', { drones });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form');
});

router.post('/drones/create', async (req, res, next) => {
  try {
    const newDrone = await Drone.create(req.body);
    console.log("Drone created:", newDrone);
    res.redirect("/drones");
  }
  catch (err) {
    console.log("Drone couldn't be added:", err);
    res.redirect("/drones/create");
}
});


router.get('/drones/:id/edit', (req, res, next) => {
  Drone.findById(req.params.id)
    .then((drone) => {
      res.render('drones/update-form', { drone });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone
  .findByIdAndUpdate(id, { name, propellers, maxSpeed })
  .then((drone)=>{
      res.redirect(`/drones`);
  })
  .catch(err =>{
      console.error(err);
  });
});


router.post('/drones/:id/delete', (req, res, next) => {
  Drone.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/drones");
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
