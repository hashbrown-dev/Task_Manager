import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity, TodoModule } from '../../../../libs/todo/todo-api/src';


@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'local',
      autoLoadEntities: true,
      entities: [TodoEntity],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
