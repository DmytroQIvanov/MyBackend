import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'ec2-176-34-215-248.eu-west-1.compute.amazonaws.com',
        port: 5432,
        username: 'almhiwvhqduwmb',
        password:
          'fff18658b86daa2491975b668ec0ce63f08b9028fb03b8029cde829c15137e5b',
        database: 'd603e3nfplmmgb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: false,
        // autoLoadEntities: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      });

      return dataSource.initialize();
    },
  },
];
