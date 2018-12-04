const { has, isEmpty } = require('lodash');
const { getAllSteps } = require('../../flow');
const BadRequestError = require('../../errors/bad-request');

module.exports = () => {
  return model => {
    const next = getAllSteps().find(step => step.id === model.meta.next);

    if (next.commentRequired && (!has(model.meta.payload, 'comment') || isEmpty(model.meta.payload.comment))) {
      throw new BadRequestError(`Changing status to '${model.meta.next}' requires a comment`);
    }

    return Promise.resolve();
  };
};