module.exports = (sequelize, Sequelize) => {
  const loanstate = sequelize.define("loanstate", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idloanstate: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    loanreq: {
      type: Sequelize.FLOAT(11, 2),
      defaultValue: 0.0,
    },
    status: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
  });
  return loanstate;
};
