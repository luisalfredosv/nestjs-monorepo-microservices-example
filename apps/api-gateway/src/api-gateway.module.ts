import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ModulesModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
