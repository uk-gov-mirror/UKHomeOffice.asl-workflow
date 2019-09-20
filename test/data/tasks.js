const uuid = require('uuid/v4');
const { user, holc, inspector } = require('./profiles');
const ids = require('./ids');
const moment = require('moment');

const generateDates = daysAgo => {
  const date = moment().subtract(daysAgo, 'days').toISOString();
  return {
    createdAt: date,
    updatedAt: date
  };
};

module.exports = query => query.insert([
  {
    id: uuid(),
    data: {
      data: {
        name: 'pil with ntco'
      },
      establishmentId: 100,
      subject: user.id,
      model: 'pil',
      action: 'grant',
      id: ids.pil.applied,
      changedBy: user.id
    },
    status: 'with-ntco',
    ...generateDates(0)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'pil with ntco - other establishment'
      },
      establishmentId: 101,
      subject: uuid(),
      model: 'pil',
      action: 'grant',
      changedBy: uuid()
    },
    status: 'with-ntco',
    ...generateDates(1)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'pil returned'
      },
      establishmentId: 100,
      subject: user.id,
      model: 'pil',
      action: 'grant',
      changedBy: holc.id
    },
    status: 'returned-to-applicant',
    ...generateDates(2)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'pil with licensing'
      },
      establishmentId: 100,
      subject: user.id,
      model: 'pil',
      action: 'grant',
      changedBy: holc.id
    },
    status: 'with-licensing',
    ...generateDates(3)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'recalled ppl'
      },
      establishmentId: 100,
      subject: user.id,
      model: 'projects',
      action: 'grant',
      changedBy: user.id
    },
    status: 'recalled-by-applicant',
    ...generateDates(4)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'discarded ppl'
      },
      establishmentId: 100,
      subject: user.id,
      model: 'projects',
      action: 'grant',
      changedBy: user.id
    },
    status: 'discarded-by-applicant',
    ...generateDates(5)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'place update with licensing'
      },
      establishmentId: 100,
      model: 'place',
      action: 'update',
      changedBy: holc.id
    },
    status: 'with-licensing',
    ...generateDates(6)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'place update with licensing - other establishment'
      },
      establishmentId: 101,
      model: 'place',
      action: 'update',
      changedBy: uuid()
    },
    status: 'with-licensing',
    ...generateDates(7)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'place update with inspector'
      },
      establishmentId: 100,
      model: 'place',
      action: 'update',
      changedBy: holc.id
    },
    status: 'with-inspectorate',
    ...generateDates(8)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'place update recommended'
      },
      establishmentId: 100,
      model: 'place',
      action: 'update',
      id: ids.place.applied,
      changedBy: holc.id
    },
    status: 'inspector-recommended',
    ...generateDates(9)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'place update recommend rejected'
      },
      establishmentId: 100,
      model: 'place',
      action: 'update',
      changedBy: holc.id
    },
    status: 'inspector-rejected',
    ...generateDates(10)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'granted pil'
      },
      establishmentId: 100,
      subject: user.id,
      model: 'pil',
      action: 'grant',
      changedBy: holc.id
    },
    status: 'resolved',
    ...generateDates(11)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'granted place update'
      },
      establishmentId: 100,
      model: 'place',
      action: 'update',
      id: ids.place.resolved,
      changedBy: holc.id
    },
    status: 'resolved',
    ...generateDates(12)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'granted place update - other establishment'
      },
      establishmentId: 101,
      model: 'place',
      action: 'update',
      changedBy: uuid()
    },
    status: 'resolved',
    ...generateDates(13)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'rejected pil'
      },
      establishmentId: 100,
      subject: uuid(),
      model: 'pil',
      action: 'grant',
      id: ids.pil.rejected,
      changedBy: holc.id
    },
    status: 'rejected',
    ...generateDates(14)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'profile update'
      },
      subject: user.id,
      model: 'profile',
      action: 'update',
      id: user.id,
      changedBy: user.id
    },
    status: 'autoresolved',
    ...generateDates(15)
  },
  {
    id: uuid(),
    data: {
      data: {
        name: 'conditions update'
      },
      model: 'establishment',
      action: 'update-conditions',
      id: 100,
      changedBy: inspector.id
    },
    status: 'returned-to-applicant',
    ...generateDates(16)
  },
  // test for the case where the applicant is not
  // `changedBy` or `subject`
  {
    id: uuid(),
    data: {
      data: {
        name: 'Submitted by HOLC'
      },
      changedBy: holc.id,
      // subject _should_ be the licenceHolderId, but in some cases is not.
      subject: holc.id,
      modelData: {
        licenceHolderId: user.id
      }
    },
    status: 'returned-to-applicant',
    ...generateDates(17)
  }
]);
