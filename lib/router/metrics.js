const { Router } = require('express');
const moment = require('moment');
const Case = require('@ukhomeoffice/taskflow/lib/models/case');

module.exports = taskflow => {
  const router = Router({ mergeParams: true });

  Case.db(taskflow.db);

  router.use((req, res, next) => {
    req.since = req.query.since || moment().subtract(2, 'weeks').format('YYYY-MM-DD');
    next();
  });

  router.get('/', (req, res, next) => {
    Promise.resolve()
      .then(() => {
        return Case.query()
          .eager('[activityLog]')
          .where('updated_at', '>', req.since)
          .where({ status: 'resolved' });
      })
      // exclude ASRU TEST
      .then(cases => {
        return cases.filter(c => c.data.establishmentId !== 1502162);
      })
      .then(cases => {
        return cases.map(c => {
          let type = `${c.data.model}-${c.data.action}`;
          if (c.data.model === 'project' && c.data.action === 'grant') {
            const isAmendment = c.data.modelData.status !== 'inactive';
            type = `project-${isAmendment ? 'amendment' : 'application'}`;
          }
          const resubmissions = c.activityLog.filter(activity => activity.event.status === 'resubmitted');
          const iterations = resubmissions.length + 1;
          return { type, iterations, createdAt: c.createdAt, updatedAt: c.updatedAt };
        });
      })
      .then(cases => {
        return res.json(cases);
      })
      .catch(next);
  });

  return router;
};