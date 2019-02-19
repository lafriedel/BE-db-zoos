const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const router = express.Router();

const db = knex(knexConfig.development);

const errors = {
  "19": "A record with that name already exists."
};

// GET at /api/bears
router.get("/", (req, res) => {
  db("bears")
    .then(bears => {
        res.status(200).json(bears);
    })
    .catch(err => {
        res.status(500).json({error: "There was an error."});
    });
});

// GET at /api/bears/:id
router.get("/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .then(bear => {
        if (res) {
            const [requestedBear] = bear;
            res.status(200).json(requestedBear);
        } else {
            res.status(404).json({error: "A bear with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "There was an error."};
    });
});

// POST at /api/bears
router.post("/", (req, res) => {
  db("bears")
    .insert(req.body)
    .then(id => {
        const [bearid] = id;
      res.status(201).json(bearid);
    })
    .catch(err => {
      const errorMsg = errors[error.errno] || "There was an error.";
      res.status(500).json(errorMsg);
    });
});

module.exports = router;
