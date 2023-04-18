const auth = {
  type: 'OAuth2',
  user: 'vincenzo33.pellegrini@gmail.com',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: 'Vincenzo <vincenzo33.pellegrini@gmail.com>',
  to: 'vincenzo33.pellegrini@gmail.com',
  subject: 'Gmail API NodeJS',
};

export { auth, mailoptions };
