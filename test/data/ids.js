const uuid = require('uuid/v4');

module.exports = {
  task: {
    pil: {
      grant: uuid(),
      rejected: uuid(),
      transfer: uuid(),
      asruinitiated: uuid()
    },
    place: {
      applied: uuid(),
      resolved: uuid(),
      returned: uuid(),
      inspector: uuid()
    },
    project: {
      grant: uuid()
    }
  },
  model: {
    pil: {
      applied: uuid(),
      rejected: uuid()
    },
    place: {
      applied: uuid(),
      resolved: uuid(),
      returned: uuid()
    },
    project: {
      grant: uuid(),
      transfer: uuid(),
      updateIssueDate: uuid(),
      updateLicenceNumber: uuid()
    }
  }
};
