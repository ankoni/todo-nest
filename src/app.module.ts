import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DbModule } from './database/db.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            playground: true,
            driver: ApolloDriver,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'docker/.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                port: configService.get<number>('DB_PORT'),
                entities: [__dirname + '**/database/**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true,
                logging: true,
            }),
            inject: [ConfigService],
        }),
        DbModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
