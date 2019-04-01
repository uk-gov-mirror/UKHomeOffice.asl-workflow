const { get, pick, size } = require('lodash');

module.exports = (settings, model) => {
  const allowed = ['authority', 'awerb', 'version'];
  const meta = get(model, 'meta.payload.meta', {});
  const updates = pick(meta, allowed);
  if (size(updates)) {
    const data = get(model, 'data');
    Object.assign(data.data, updates);
    return model.update(data);
  }

  return Promise.resolve();
};