module.exports = {
  port: process.env.PORT || 8080,
  sqs: {
    region: process.env.SQS_REGION || 'eu-west-2',
    accessKey: process.env.SQS_ACCESS_KEY,
    secret: process.env.SQS_SECRET,
    url: process.env.SQS_URL
  },
  taskflowDB: {
    database: process.env.DATABASE_NAME || 'taskflow',
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME || 'postgres'
  },
  db: {
    database: process.env.ASL_DATABASE_NAME || 'asl',
    host: process.env.ASL_DATABASE_HOST,
    password: process.env.ASL_DATABASE_PASSWORD,
    port: process.env.ASL_DATABASE_PORT,
    user: process.env.ASL_DATABASE_USERNAME || 'postgres',
    application_name: 'workflow'
  },
  auth: {
    realm: process.env.KEYCLOAK_REALM,
    url: process.env.KEYCLOAK_URL,
    client: process.env.KEYCLOAK_CLIENT,
    secret: process.env.KEYCLOAK_SECRET,
    permissions: process.env.PERMISSIONS_SERVICE
  },
  notifications: process.env.NOTIFICATIONS_SERVICE
};
