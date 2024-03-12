import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UserModule } from './api/user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, { dbName: process.env.DB_NAME }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,

      // format error message with status code
      formatError: (err) => {
        const errObj = {
          message: 'INTERNAL_SERVER_ERROR',
          statusCode: '500',
        };
        errObj.message = err.message;
        errObj.statusCode = `${err.extensions.code}`;
        return errObj;
      },

    }),
    UserModule
  ],
})
export class AppModule { }
