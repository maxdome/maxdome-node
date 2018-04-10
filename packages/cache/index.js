module.exports = client => async (key, get, options) => {
  if ((typeof options === 'object' && options.asSeconds) || typeof options === 'number') {
    options = { expire: options };
  }
  if (typeof options.expire === 'object' && options.expire.asSeconds) {
    options.expire = options.expire.asSeconds();
  }
  let value;
  if (client.getJSON) {
    value = await client.getJSON(key);
  } else {
    value = await client.get(key);
  }
  if (!value || (options.invalidate && options.invalidate(value))) {
    value = await get();
    if (client.setJSON) {
      await client.setJSON(key, value, options.expire);
    } else {
      if (options.expire) {
        await client.set(key, value, 'EX', options.expire);
      } else {
        await client.set(key, value);
      }
    }
  } else if (options.refresh) {
    await client.expire(key, options.expire);
  }
  return value;
};
