const {
  endorsed,
  withLicensing,
  inspectorRecommended,
  inspectorRejected,
  returnedToApplicant,
  resolved,
  rejected,
  withdrawnByApplicant,
  withInspectorate,
  referredToInspector,
  discardedByApplicant,
  discardedByAsru
} = require('../flow/status');

module.exports = {
  myTasks: (queryBuilder, profile) => {
    queryBuilder.where(builder => {
      profile.asru
        .forEach(establishment => {
          builder.orWhereJsonSupersetOf('data', { establishmentId: establishment.id });
          builder.orWhereJsonSupersetOf('data', { id: establishment.id, model: 'establishment' });
        });
    })
      .whereIn('status', [
        withInspectorate.id,
        referredToInspector.id,
        endorsed.id
      ]);
  },

  outstanding: (queryBuilder, profile) => {
    queryBuilder.whereIn('status', [
      withInspectorate.id,
      referredToInspector.id,
      endorsed.id
    ]);
  },

  inProgress: (queryBuilder, profile) => {
    queryBuilder.whereIn('status', [
      endorsed.id,
      withLicensing.id,
      inspectorRecommended.id,
      inspectorRejected.id
    ])
      .orWhere(builder => {
        builder.where('status', returnedToApplicant.id)
          .whereJsonNotSupersetOf('data', { changedBy: profile.id });
      });
  },

  completed: (queryBuilder, profile) => {
    queryBuilder.whereIn('status', [
      resolved.id,
      rejected.id,
      withdrawnByApplicant.id,
      discardedByApplicant.id,
      discardedByAsru.id
    ]);
  }
};
