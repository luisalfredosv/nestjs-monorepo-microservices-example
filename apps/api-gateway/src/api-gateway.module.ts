import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
