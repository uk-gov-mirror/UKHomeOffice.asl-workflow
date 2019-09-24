const assert = require('assert');

const decorator = require('../../../lib/decorators/deadline');

describe('Deadline', () => {

  it('does not set a deadline on recalled tasks', () => {
    const task = {
      status: 'recalled',
      createdAt: '2019-09-20T10:00:00.000Z',
      data: {
        model: 'project',
        action: 'grant',
        modelData: {
          status: 'inactive'
        },
        meta: {
          authority: 'yes',
          awerb: 'yes',
          ready: 'yes'
        }
      },
      activityLog: [
        {
          eventName: 'create',
          createdAt: '2019-09-20T10:00:00.000Z'
        },
        {
          eventName: 'status:new:with-inspectorate',
          createdAt: '2019-09-20T10:00:00.100Z'
        },
        {
          eventName: 'status:with-inspectorate:recalled',
          createdAt: '2019-09-20T10:00:00.100Z'
        }
      ]
    };
    return decorator()(task).then(result => {
      assert.ok(!result.deadline);
    });
  });

  it('does not set a deadline on returned tasks', () => {
    const task = {
      status: 'returned-to-applicant',
      createdAt: '2019-09-20T10:00:00.000Z',
      data: {
        model: 'project',
        action: 'grant',
        modelData: {
          status: 'inactive'
        },
        meta: {
          authority: 'yes',
          awerb: 'yes',
          ready: 'yes'
        }
      },
      activityLog: [
        {
          eventName: 'create',
          createdAt: '2019-09-20T10:00:00.000Z'
        },
        {
          eventName: 'status:new:with-inspectorate',
          createdAt: '2019-09-20T10:00:00.100Z'
        },
        {
          eventName: 'status:with-inspectorate:returned-to-applicant',
          createdAt: '2019-09-20T10:00:00.100Z'
        }
      ]
    };
    return decorator()(task).then(result => {
      assert.ok(!result.deadline);
    });
  });

  it('does not set a deadline on tasks with incomplete declarations', () => {
    const task = {
      status: 'with-inspectorate',
      createdAt: '2019-09-20T10:00:00.000Z',
      data: {
        model: 'project',
        action: 'grant',
        modelData: {
          status: 'inactive'
        },
        meta: {
          authority: 'yes',
          awerb: 'yes',
          ready: 'no'
        }
      },
      activityLog: [
        {
          eventName: 'create',
          createdAt: '2019-09-20T10:00:00.000Z'
        },
        {
          eventName: 'status:new:with-inspectorate',
          createdAt: '2019-09-20T10:00:00.100Z'
        }
      ]
    };
    return decorator()(task).then(result => {
      assert.ok(!result.deadline);
    });
  });

  it('does not set a deadline on amendment tasks', () => {
    const task = {
      status: 'with-inspectorate',
      createdAt: '2019-09-20T10:00:00.000Z',
      data: {
        model: 'project',
        action: 'grant',
        modelData: {
          status: 'active'
        },
        meta: {
          authority: 'yes',
          awerb: 'yes',
          ready: 'yes'
        }
      },
      activityLog: [
        {
          eventName: 'create',
          createdAt: '2019-09-20T10:00:00.000Z'
        },
        {
          eventName: 'status:new:with-inspectorate',
          createdAt: '2019-09-20T10:00:00.100Z'
        }
      ]
    };
    return decorator()(task).then(result => {
      assert.ok(!result.deadline);
    });
  });

  it('sets a deadline on complete applications with ASRU', () => {
    const task = {
      status: 'with-inspectorate',
      createdAt: '2019-09-20T10:00:00.000Z',
      data: {
        model: 'project',
        action: 'grant',
        modelData: {
          status: 'inactive'
        },
        meta: {
          authority: 'yes',
          awerb: 'yes',
          ready: 'yes'
        }
      },
      activityLog: [
        {
          eventName: 'create',
          createdAt: '2019-09-20T10:00:00.000Z'
        },
        {
          eventName: 'status:new:with-inspectorate',
          createdAt: '2019-09-20T10:00:00.100Z'
        }
      ]
    };
    return decorator()(task).then(result => {
      assert.ok(result.deadline);
      assert.equal(result.deadline.format('YYYY-MM-DD'), '2019-11-15');
    });
  });

});
