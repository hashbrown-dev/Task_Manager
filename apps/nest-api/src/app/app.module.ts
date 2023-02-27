import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { Todo } from '../entity/todo';
import { Todo } from '../../../../libs/todo/todo-api/src/lib/entity/Todo';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'local',
      autoLoadEntities: true,
      entities: [Todo],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
