// inversify.config.ts content
import { Container } from 'inversify';
import { UserController,HealthController, BookController, AuthorController, CategoryController } from '../controller';
import { BookService, CategoryService, UserService } from '../services';
import { AuthorRepository, BookRepository, CategoryRepository, UserRepository } from '../dal';
import { ErrorHandler } from '../handler/error.handler';
import { ResponseMiddleware } from '../middleware/responseMidleware';
import { AuthorService } from '../services/author.service';
import { AuthMiddleware, IsAdminMiddleware } from '../middleware';

const container = new Container();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<HealthController>(HealthController).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<ErrorHandler>(ErrorHandler).toSelf();
container.bind<ResponseMiddleware>(ResponseMiddleware).toSelf();
container.bind<BookController>(BookController).toSelf();
container.bind<BookService>(BookService).toSelf();
container.bind<BookRepository>(BookRepository).toSelf();
container.bind<AuthorController>(AuthorController).toSelf();
container.bind<AuthorService>(AuthorService).toSelf();
container.bind<AuthorRepository>(AuthorRepository).toSelf();
container.bind<CategoryRepository>(CategoryRepository).toSelf();
container.bind<CategoryController>(CategoryController).toSelf();
container.bind<CategoryService>(CategoryService).toSelf();
container.bind<AuthMiddleware>(AuthMiddleware).toSelf();
container.bind<IsAdminMiddleware>(IsAdminMiddleware).toSelf();

export default container;

