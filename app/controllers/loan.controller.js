const db = require("../models");
const user = db.user;
const people = db.people;
const bank = db.bank;
const loan = db.loan;
const loanstate = db.loanstate;

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.createLoan = async (req, res) => {
  if (req.body.peopleId != null) {
    const peopleId = req.body.peopleId;
    // loanstate.findOne({ where: { peopleId: peopleId } }).then(async (check) => {
      // if (check) {
        // loanstate
        //   .update(req.body, {
        //     where: { id: req.body.id },
        //   })
        //   .then((data) => {
        //     people.update(
        //       { amount: req.body.loanreq },
        //       {
        //         where: { id: peopleId },
        //       }
        //     );
        //     res.status(200).send({ status: true });
        //   })
        //   .catch((err) => {
        //     res.status(500).send({
        //       status: 500,
        //       message:
        //         err.message || "Some error occurred while creating the Loan.",
        //     });
        //   });
        // return;
      // }
      data_loan = {
        idloanstate: makeid(12),
        loanreq: req.body.loanreq,
        peopleId: req.body.peopleId,
        loanId: req.body.loanId,
      };
      return await loanstate
        .create(data_loan)
        .then((data) => {
          res.status(200).send({ status: true });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            status: 500,
            message:
              err.message || "Some error occurred while creating the Loan.",
          });
        });
    // });
  }
};

exports.updateloanuser = (req, res) => {
  const id = req.body.id;
  const peopleId = req.body.peopleId;
  const status = req.body.status;

  if (status === 0) {
    loanstate
      .update(
        { status: status },
        {
          where: { id: id },
        }
      )
      .then((data) => {
        people.update(
          { amount: 0 },
          {
            where: { id: peopleId },
          }
        );
        res.status(200).send({ status: true });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message:
            err.message || "Some error occurred while creating the Loan.",
        });
      });
  } else if (status === 1) {
    loanstate
      .update(
        { status: status },
        {
          where: { id: id },
        }
      )
      .then((data) => {
        people.update(
          { amount:  req.body.loanreq},
          {
            where: { id: peopleId },
          }
        );
        res.status(200).send({ status: true });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message:
            err.message || "Some error occurred while creating the Loan.",
        });
      });
  } else {
    loanstate
      .update(
        { status: status },
        {
          where: { id: id },
        }
      )
      .then((data) => {
        people.update(
          { amount:  0.0 },
          {
            where: { id: peopleId },
          }
        );
        res.status(200).send({ status: true });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message:
            err.message || "Some error occurred while creating the Loan.",
        });
      });
  }
};

exports.deleteLoan = (req, res) => {
  const id = req.params.id;

  loanstate
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.status(200).send({
        message: "Loan was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Loan with id=" + id,
      });
    });
};

exports.getreqloan = async (req, res) => {
  loanstate
    .findAll({
      include: [
        {
          model: people,
          as: "people",
        },
        {
          model: loan,
          as: "loans",
        },
      ],
      where: { status: 0 },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving loan.",
      });
    });
};

exports.getAllLoan = async (req, res) => {
  loan
    .findAll({order: [
      ['interest', 'DESC']
  ],})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving loan.",
      });
    });
};