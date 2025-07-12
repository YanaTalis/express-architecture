import { Router } from 'express'
import { validateMiddleware } from '../../middlewares/validation.middleware'
import type { Controller } from '../../types/controller'
import { createCategoryDto } from './dto/create-category.dto'
import type { CategoryService } from './category.service'

export class CategoryController implements Controller {
  private readonly _path
  private readonly _router

  constructor(private categoryService: CategoryService) {
    this._path = '/categories'
    this._router = Router()
    // метод, который добавлякт эндпоинты в роутер
    this.initRoutes()
  }
  // геттер чтоб полученить значения _path --> можно обращаться к path как к обычному свойству
  get path() {
    return this._path
  }

  // Геттер для получения объекта _router
  get router() {
    return this._router
  }

  //добавляет маршруты в роутер
  private initRoutes() {
    // Добавляем маршрут GET по адресу "/categories"
    this.router.get('/', (req, res) => {
      // Получаем ВСЕ категории
      const result = this.categoryService.getAll()
      res.send(result)
    })

    // Добавляем маршрут чтоб найти по индексу ОДИН элемет
    this.router.get('/:id', (req, res) => {
      const result = this.categoryService.getOne(req.params.id)
      res.send(result)
    })

    // POST по адресу "/categories"
    this.router.post(
      '/',
      // промежуточная функция для проверки данных
      validateMiddleware(createCategoryDto, 'categories'),
      (req, res) => {
        // Создаём новую категорию из body
        const result = this.categoryService.create(req.body)
        res.send(result)
      }
    )

    // DELETE
    this.router.delete('/:id', (req, res) => {
      const result = this.categoryService.delete(Number(req.params.id))
      res.send(result)
    })
  }
}
