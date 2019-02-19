const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const router = express.Router();

const db = knex(knexConfig.development);

const errors = {
    '19':"A record with that name already exists."
}

//POST /api/zoos
router.post("/", async (req, res) => {
    try {
      const [id] = await db("zoos").insert(req.body);
  
      res.status(201).json(id);
    } catch (error) {
        const errorMsg = errors[error.errno] || "There was an error.";
      res.status(500).json(errorMsg);
    }
  });
  
  //GET /api/zoos
  router.get("/", async (req, res) => {
    try {
      const zoos = await db("zoos");
      res.status(200).json(zoos);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //GET /api/zoos/:id
  router.get("/:id", async (req, res) => {
    try {
      const zoo = await db("zoos").where({ id: req.params.id });
      if (zoo.length === 0) {
        res
          .status(404)
          .json({ error: "The specified ID does not exist in the database." });
      } else {
        res.status(200).json(zoo);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //DELETE /api/zoos/:id
  router.delete("/:id", async (req, res) => {
    try {
      const records = await db("zoos")
        .where({ id: req.params.id })
        .del();
      if (records === 0) {
        res
          .status(404)
          .json({
            error:
              "A record with the specified ID does not exist and cannot be deleted."
          });
      } else {
        res.status(204).end();
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //PUT /api/zoos/:id
  router.put("/:id", async (req, res) => {
    try {
      const record = await db("zoos")
        .where({ id: req.params.id })
        .update(req.body);
      console.log(record);
      if (record === 0) {
        res
          .status(404)
          .json({
            error:
              "A record with the specified ID does not exist and cannot be updated."
          });
      } else {
        const zoo = await db("zoos")
          .where({ id: req.params.id })
          .first();
        res.status(200).json(zoo);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  module.exports = router;