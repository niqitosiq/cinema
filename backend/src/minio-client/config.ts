export const config = {
  MINIO_ENDPOINT: 'http://s3.cinema-hack.rednite.ru/',
  MINIO_PORT: 9000,
  MINIO_ACCESSKEY: process.env.MINIO_ACCESSKEY,
  MINIO_SECRETKEY: process.env.MINIO_SECRETKEY,
  MINIO_BUCKET: 'cinema'
}