const Asset = require('@maxdome/request-maxdome').Asset;

module.exports = {
  detect: data => data instanceof Asset,
  from: 'asset',
  to: 'schema.org',
  run: asset => {
    const data = {
      '@context': 'http://schema.org',
      '@type': {
        episode: 'TVEpisode',
        movie: 'Movie',
        season: 'TVSeason',
        series: 'TVSeries',
      }[asset.type],
      '@id': asset.url,
      name: asset.title,
      url: asset.getCanonicalURL(),
      description: asset.description,
      potentialAction: [
        {
          '@type': 'WatchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${asset.url}?autoplay=true`,
            inLanguage: 'de',
            actionPlatform: [
              'http://schema.googleapis.com/GoogleVideoCast',
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
              'http://schema.org/IOSPlatform',
              'http://schema.org/AndroidPlatform',
            ],
          },
          expectsAcceptanceOf: [
            {
              '@type': 'Offer',
              category: 'subscription',
              availabilityStarts: '1970-01-01T00:00+02:00',
              availabilityEnds: '2020-01-01T00:00+02:00',
              eligibleRegion: [
                {
                  '@type': 'Country',
                  name: 'DE',
                },
                {
                  '@type': 'Country',
                  name: 'AT',
                },
              ],
              seller: {
                '@type': 'Organization',
                name: 'maxdome',
              },
            },
          ],
        },
      ],
      image: {
        '@type': 'ImageObject',
        url: asset.getImage(),
      },
      actor: (asset.actors || []).map(actor => ({ '@type': 'Person', name: actor.name })),
      director: (asset.directors || []).map(director => ({ '@type': 'Person', name: director.name })),
    };

    if (asset.image) {
      const image = asset.getImage();
      data.image = {
        '@type': 'ImageObject',
        height: '' + image.height,
        url: image.url,
        width: '' + image.width,
      };
    }

    if (asset.type === 'episode') {
      data.name = asset.episodeTitle || `Staffel ${asset.seasonNumber} Episode ${asset.episodeNumber}`;
      data.episodeNumber = asset.episodeNumber;
      data.partOfSeason = {
        '@type': 'TVSeason',
        '@id': `${asset.protocol}://${asset.hostnames.package}/${asset.seasonId}`,
        seasonNumber: asset.seasonNumber,
      };
      data.partOfSeries = {
        '@type': 'TVSeries',
        '@id': `${asset.protocol}://${asset.hostnames.package}/${asset.seriesId}`,
        name: asset.title,
      };
    }

    if (asset.type === 'movie') {
      data.duration = `PT${parseInt(asset.duration / 60)}H${asset.duration % 60}M`;
    }

    if (asset.type === 'season') {
      delete data.name;
      data.seasonNumber = asset.seasonNumber;
      data.partOfSeries = {
        '@type': 'TVSeries',
        '@id': `${asset.protocol}://${asset.hostnames.package}/${asset.seriesId}`,
        name: asset.title.replace(/ \(.*\)/, ''),
      };
    }

    if (['season', 'series'].includes(asset.type)) {
      data.potentialAction.push({
        '@type': 'ViewAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: asset.url,
          inLanguage: 'de',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform',
          ],
        },
      });
    }

    if (data.actor.length === 0) {
      delete data.actor;
    }

    if (data.director.length === 0) {
      delete data.director;
    }

    return data;
  },
};
