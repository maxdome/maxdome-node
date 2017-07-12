module.exports = mamAsset => {
  const type = {
    _: 'TVEpisode',
    Spielfilm: 'Movie',
    _: 'TVSeason',
    _: 'TVSeries',
  }[mamAsset.media_kind];

  if (!type) {
    throw new Error(`unsupported media_kind '${mamAsset.media_kind}'`);
  }

  const schemaAsset = {
    '@context': 'http://schema.org',
    '@type': type,
    '@id': mamAsset.content_id,
    name: mamAsset.title,
    url: `http://maxdome.de/${mamAsset.content_id}`,
    description: mamAsset.meta_description,
    actor: mamAsset.actor.map(actor => ({
      '@type': 'Person',
      name: actor.name,
    })),
    director: mamAsset.director.map(actor => ({
      '@type': 'Person',
      name: actor.name,
    })),
  };

  if (type === 'Movie') {
    schemaAsset.duration = '';
  }

  if (type === 'TVEpisode') {
    schemaAsset.name = '';
    schemaAsset.episodeNumber = '';
    schemaAsset.partOfSeason = { seasonNumber: '' };
    schemaAsset.partOfSeries = { name: '' };
  }

  if (type === 'TVSeason') {
    delete schemaAsset.name;
    schemaAsset.seasonNumber = '';
    schemaAsset.partOfSeries = { name: '' };
  }

  return schemaAsset;
};
