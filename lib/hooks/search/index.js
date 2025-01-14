const { get } = require('lodash');

module.exports = settings => event => {
  if (settings.search) {
    const allowed = ['establishment', 'profile', 'project', 'asruEstablishment', 'place', 'pil', 'permission'];

    let model = get(event, 'data.model');
    let id = get(event, 'data.id');
    const action = get(event, 'data.action');

    if (!allowed.includes(model)) {
      return Promise.resolve();
    }

    if (model === 'pil' || model === 'trainingPil' || model === 'permission') {
      model = 'profile';
      id = get(event, 'data.data.profileId');
    }

    if (model === 'asruEstablishment') {
      model = 'establishment';
      id = get(event, 'data.data.establishmentId');
    }

    if (!id) {
      return Promise.resolve();
    }

    // note the extra `s` on the model name
    const url = `${settings.search}/${model}s/${id}`;
    const headers = {
      Authorization: `bearer ${event.meta.user.access_token}`
    };

    // don't wait for a response - the action should still complete if search indexing fails
    fetch(url, { method: 'put', headers })
      .catch(e => null); // swallow errors

    // send a second request to the other profile when merging profiles
    if (model === 'profile' && action === 'merge') {
      id = get(event, 'data.data.target');
      fetch(`${settings.search}/${model}s/${id}`, { method: 'put', headers })
        .catch(e => null); // swallow errors
    }
  }
  return Promise.resolve();
};
