import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { CacheModule } from '../cache/cache.module';
import { HttpCacheInterceptor } from '../interceptors/cache.interceptor';
import { ServiceModule } from '../service/service.module';

import { RestApiModule } from './api-internal-modules';
import { JwtAuthGuard } from './middleware/guards/auth.guard';
import { HumanizedJwtAuthGuard } from './middleware/guards/humanized-auth.guard';
import { AuthController } from './controllers/auth/auth.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CommentController } from './controllers/comments/comment.controller';
import { OptionController } from './controllers/options/option.controller';
import { PostController } from './controllers/posts/post.controller';
import { UserController } from './controllers/users/user.controller';
import { WechatController } from './controllers/wechat/wechat.controller';

const controllers = [
  AuthController,
  CategoriesController,
  CommentController,
  OptionController,
  PostController,
  UserController,
  WechatController,
];
@Module({
  imports: [
    CacheModule,
    ServiceModule,
  ],
  controllers: [...controllers],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: HumanizedJwtAuthGuard,
    },
  ],
})
export class ApiModule {

}
